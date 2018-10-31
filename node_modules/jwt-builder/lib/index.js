'use strict';

const JWTTokenBuilder = require( './builder' );

function builder( jwtConfig ) {

    let instance = new JWTTokenBuilder( jwtConfig );

    if( jwtConfig ) {

        return instance.build();
    }
    else {

        return instance;
    }
}

module.exports = {

    builder
};
