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
            auth: {
                saltRounds: 10,
                secret: "toomuchsauce"
            }
        }
    }
    return config[env];
};

module.exports = getConfig;