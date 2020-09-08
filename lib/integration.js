const axios = require('axios');

module.exports = class Integration {
    constructor(edlink, {access_token}){
        this.edlink = edlink;
        this.token = access_token;
    }
}