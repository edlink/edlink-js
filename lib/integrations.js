const axios = require('axios');

module.exports = class Integrations {
    constructor(edlink){
        this.edlink = edlink;
    }

    list(params){
        return axios({
            method: 'get',
            url: '/v1/integrations',
            baseURL: this.edlink.api,
            params,
            headers: {
                authorization: `Bearer ${this.edlink.application_secret}`
            }
        }).then(response => response.data);
    }

    fetch(integration){
        return axios({
            method: 'get',
            url: `/v1/integrations/${integration}`,
            baseURL: this.edlink.api,
            headers: {
                authorization: `Bearer ${this.edlink.application_secret}`
            }
        }).then(response => response.data);
    }
}