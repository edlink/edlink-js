module.exports = class Organizations {
    constructor(edlink, user){
        this.edlink = edlink;
        this.user = user;

        return this;
    }

    list(params = {}){
        return this.user.request({
            method: 'get',
            url: '/v1/my/organizations',
            params
        })
        .then(response => response.$data);
    }

    fetch(id){
        return this.user.request({
            method: 'get',
            url: `/v1/my/organizations/${id}`
        })
        .then(response => response.$data);
    }
}
