const axios = require('axios');

module.exports = class Token {
    constructor(edlink, {access_token, refresh_token, access_token_expiration}){
        this.edlink = edlink;
        this.access_token = access_token;
        this.access_token_expiration = new Date(access_token_expiration);
        this.refresh_token = refresh_token;

        return this;
    }

    expired(buffer = 0){
        return Date.now() > this.access_token_expiration.getTime() - buffer;
    }

    refresh(){
        return axios.post(`${this.edlink.api}/authentication/token`, {
            client_id: this.edlink.application_id,
            client_secret: this.edlink.application_secret,
            grant_type: 'refresh_token',
            refresh_token: this.refresh_token
        })
        .then(response => response.data)
        .then(response => {
            this.access_token = response.$data.access_token;
            this.access_token_expiration = new Date(Date.now() + response.$data.expires_in * 1000);

            return this;
        });
    }
}