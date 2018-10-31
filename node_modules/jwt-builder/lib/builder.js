'use strict';

const fs = require( 'fs' );

const jwt = require( 'jwt-simple' );

const ALGORITHM_HS256 = 'HS256';
const ALGORITHM_HS384 = 'HS384';
const ALGORITHM_HS512 = 'HS512';
const ALGORITHM_RS256 = 'RS256';

const JAN_1_2016 = 1451606400;

function nowInSeconds() {

    return Math.floor( Date.now() / 1000 );
}

function offsetTimeValue( value ) {

    let relative;

    if( value === undefined ) {

        value = 0;

        relative = true;
    }
    else
    {
        value = Math.floor( value );

        relative = (value < JAN_1_2016);
    }

    return {

        value: value,
        relative: relative
    };
}

function addClaimTimeValue( claims, name, value, relative ) {

    if( value !== undefined ) {

        if( relative ) {

            value += nowInSeconds();
        }

        claims[ name ] = value;
    }
}

function setFromConfig( builder, config ) {

    if( !config ) {

        return;
    }

    let claims = {};

    Object.keys( config ).forEach( function( key ) {

        let value = config[ key ];

        switch( key ) {

            case 'algorithm':
            case 'secret':
            case 'privateKey':
            case 'exp':
                builder[ key ]( value );
                break;

            case 'iat':
                if( value === true ) {

                    builder.iat();
                }
                else if( value !== false ) {

                    builder.iat( value );
                }
                break;

            case 'nbf':
                if( value === true ) {

                    builder.nbf();
                }
                else if( value !== false ) {

                    builder.nbf( value );
                }
                break;

            case 'headers':
                builder.headers( value );
                break;

            default:
                claims[ key ] = value;
                break;
        }
    });

    builder.claims( claims );
}

class JWTTokenBuilder {

    constructor( config ) {

        this._algorithm = ALGORITHM_HS256;
        this._claims = {};

        setFromConfig( this, config );
    }

    claims( userClaims ) {

        this._claims = Object.assign( {}, userClaims );

        return this;
    }

    headers( userHeaders ) {

        this._headers = Object.assign( {}, userHeaders );

        return this;
    }

    algorithm( alg ) {

        switch( alg ) {

            case ALGORITHM_HS256:
            case ALGORITHM_HS384:
            case ALGORITHM_HS512:
            case ALGORITHM_RS256:
                this._algorithm = alg;
                break;

            default:
                throw new Error( 'unknown algorithm: ' + alg );
        }

        return this;
    }

    secret( sec ) {

        this._secret = sec;

        return this;
    }

    privateKey( key ) {

        this._key = key;

        return this;
    }

    privateKeyFromFile( filePath ) {

        return this.privateKey( fs.readFileSync( filePath ) );
    }

    iat( value ) {

        let result = offsetTimeValue( value );

        this._iat = result.value;
        this._iat_relative = result.relative;

        return this;
    }

    nbf( value ) {

        let result = offsetTimeValue( value );

        this._nbf = result.value;
        this._nbf_relative = result.relative;

        return this;
    }

    exp( value ) {

        this._exp = Math.floor( value );

        return this;
    }

    build() {

        let keyOrSecret;

        if( this._algorithm === ALGORITHM_RS256 ) {

            if( !this._key ) {

                throw new Error( 'missing private key' );
            }

            keyOrSecret = this._key;
        }
        else {

            if( !this._secret ) {

                throw new Error( 'missing secret' );
            }

            keyOrSecret = this._secret;
        }

        let jwtClaims = {};

        addClaimTimeValue( jwtClaims, 'iat', this._iat, this._iat_relative );
        addClaimTimeValue( jwtClaims, 'nbf', this._nbf, this._nbf_relative );
        addClaimTimeValue( jwtClaims, 'exp', this._exp, true );

        Object.assign( jwtClaims, this._claims );

        let additional = {};

        if( this._headers ) {

            additional.header = this._headers;
        }

        return jwt.encode( jwtClaims, keyOrSecret, this._algorithm, additional );
    }
}


module.exports = JWTTokenBuilder;
