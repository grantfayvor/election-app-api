const getConfig = env => {
    const config = {
        dev: {
            app: {
                host: 'localhost',
                port: 9000
            },
            database: {
                name: 'election_app',
                host: 'localhost',
                port: 27017,
                user: '',
                password: ''
            },
            auth: {
                saltRounds: 10,
                secret: "toomuchsauce"
            },
            googleOauth: {
                credentials: {
                    installed: {
                        client_id: "558367869731-hh09okdcqojode5mo354md1oia45fhfp.apps.googleusercontent.com",
                        project_id: "trymoi-223814",
                        auth_uri: "https://accounts.google.com/o/oauth2/auth",
                        token_uri: "https://www.googleapis.com/oauth2/v3/token",
                        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
                        client_secret: "6aRsQq-JaWGuyZscviF_gt6w",
                        redirect_uris: ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"]
                    }
                },
                scopes: ['https://www.googleapis.com/auth/youtube']
            }
        },
        prod: {
            app: {
                host: 'localhost',
                port: 9000
            },
            database: {
                name: 'election_app',
                host: 'localhost',
                port: 27017,
                user: '',
                password: ''
            },
            mongourl: "mongodb://heroku_h6zr8sts:bf5d5sv3kqn53ah04t0o1qernt@ds237574.mlab.com:37574/heroku_h6zr8sts",
            auth: {
                saltRounds: 10,
                secret: "toomuchsauce"
            },
            googleOauth: {
                credentials: {
                    installed: {
                        client_id: "558367869731-hh09okdcqojode5mo354md1oia45fhfp.apps.googleusercontent.com",
                        project_id: "trymoi-223814",
                        auth_uri: "https://accounts.google.com/o/oauth2/auth",
                        token_uri: "https://www.googleapis.com/oauth2/v3/token",
                        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
                        client_secret: "6aRsQq-JaWGuyZscviF_gt6w",
                        redirect_uris: ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"]
                    }
                },
                scopes: ['https://www.googleapis.com/auth/youtube']
            }
        }
    };
    return config[env];
}

module.exports = getConfig;