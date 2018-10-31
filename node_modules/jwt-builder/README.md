[![Build Status](https://travis-ci.org/vandium-io/jwt-builder.svg?branch=master)](https://travis-ci.org/vandium-io/jwt-builder)

# jwt-builder

Builds JSON Web Tokens (JWT) programatically.

## Features
* Easy to use chained API to create JWT
* Works with HS256, HS384, HS512, and RS256
* Great for unit testing services that use JWT

## Installation
Install via npm.

	npm install jwt-builder --save

## Getting Started

If you only need to create a single JWT, then you can pass a configuration object to the builder:

```js
'use strict'

const jwtBuilder = require( 'jwt-builder' );

let token = jwtBuilder( {
				algorithm: 'HS256',
				secret: 'super-secret',
				nbf: true,
				exp: 3600,
				iss: 'https://auth.vandium.io',
				userId: '539e4cba-4893-428a-bafd-1110f023514f',
				headers: {

					kid: '2016-11-17'
				}
			});
```

For creating one or more JWTs, using a builder instance might be easier:

```js
'use strict';

const jwtBuilder = require( 'jwt-builder' );

let builder = jwtBuilder()
                .nbf()             // can't be used before current time
                .exp( 3600 )       // expire in 1 hour
                .algorithm( 'HS256' )
                .secret( 'super-secret' );


let tokenUser1 = builder.claims( {
	                		iss: 'https://auth.vandium.io',
	                		userId: '539e4cba-4893-428a-bafd-1110f023514f'
	                	})
                        .headers( {
                            kid: '2016-11-17'
                        })
	                .build();

let tokenUser2 = builder.claims( {
	                		iss: 'https://auth.vandium.io',
	                		userId: 'd24e1e20-4058-4cd2-87dd-2ba64414f4af'
	                	})
                        .headers( {
                            kid: '2016-11-17'
                        })
	                .build();
```

## Creating Tokens from a Configuration Object

Tokens can be generated using a configuration object as follows:

```js
'use strict'

const jwtBuilder = require( 'jwt-builder' );

let token = jwtBuilder( {

				// configuration options here

			});
```

The following properties are available when creating tokens using a configuration object:




| Property     | Description
|--------------| ----------------------------------------------------
| algorithm    | Algorithm type. Can be one of the following: HS256, HS384, HS512 or RS256. Algorithms prefixed with "HS" use a symetric key, where as "RS256" uses a private key to sign and a public key for verification. Defaults to HS256|
| secret       | Secret key for use with algorithms: HS256, HS384 and RS512. Required when algorithms is prefixed with "HS"|
| privateKey   | Private key use with RS256 algorithm. Required when when algorithm is RS256.|
| iat          | iat (issued at time). Can be set to true or 0 to use current time or a specified value in seconds |
| nbf          | nbf (not before time). Can be set to true or 0 to use current time or a specified value in seconds. |
| exp          | exp (expiry time). Offset from the current time in seconds |
| headers      | Object of key value pairs to include in the header of the token |
| *user_value* | Can be any user value other than the ones above. |



## Using the Builder

A builder instance can be created by calling the `jwt-builder` module without parameters. The following demonstrates how to create a builder instance:

```js
'use strict';

const jwtBuilder = require( 'jwt-builder' );

let builder = jwtBuilder();
```


### Methods

All the methods can be chained together except for `.build` which produces the token.

***

#### `.algorithm( name )`

Algorithm to use for signing the token. Valid values are `HS256`, `HS384`, `HS512` and `RS256`

***

#### `.secret( value )`

Secret value to use to sign the token. Required when algorithm is set with `HS256`, `HS384` or `HS512`.

***

#### `.privateKey( value )`

Private key to use to sign the token when the `RS256` algorithm is used.

***

####`.iat( [value] )`
Issued At (iat) time. If value is set it will represent an offset in seconds from the current time. When not set it will use the current time.

***

#### `.nbf( [value] )`
Not Before (nbf) time. If value is set it will represent an offset in seconds from the current time. When not set it will use the current time.

***

#### `.exp( value )`

Expiry (exp) time as an offset from the current time.

***

#### `.claims( object )`

Claims to add to the token. The object contains one or more key value pairs.

```js
builder.claims( {

	userId: 'd24e1e20-4058-4cd2-87dd-2ba64414f4af'
});
```

***

#### `.headers( object )`

Headers to add to the token. The object contains one or more key value pairs.

```js
builder.headers( {

	kid: '2016-11-17'
});
```

***

#### `.build()`

Generates the token. This method can be called multiple times to generate new tokens.


## Time Values

Values that are less than `1451606400` (Jan 1, 2016 0:00:00 GMT) will be treated as offsets. If they are equal or greater, then they will be absolute.


## License

[BSD-3-Clause](https://en.wikipedia.org/wiki/BSD_licenses)

Copyright (c) 2016, Vandium Software Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of Vandium Software Inc. nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
