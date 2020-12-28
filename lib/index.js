const User = require('./user');
const Token = require('./token');
const Integrations = require('./integrations');
const Integration = require('./integration');

class Edlink {
    constructor(application_id, application_secret, configuration){
        this.url = 'https://ed.link';
        this.api = 'https://ed.link/api';

        this.application_id = application_id;
        this.application_secret = application_secret;
        this.configuration = configuration;

        this.integrations = new Integrations(this);
    }

    user(token){
        return new User(this, token);
    }

    token(attributes){
        return new Token(this, attributes);
    }

    integration(attributes){
        return new Integration(this, attributes);
    }
}

module.exports = (application_id, application_secret, configuration = {}) => {
    return new Edlink(application_id, application_secret, configuration);
};