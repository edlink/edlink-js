module.exports = class Courses {
    constructor(edlink, user){
        this.edlink = edlink;
        this.user = user;

        return this;
    }

    list(params = {}){
        return this.user.request({
            method: 'get',
            url: '/v1/my/courses',
            params
        })
        .then(response => response.$data);
    }

    fetch(id){
        return this.user.request({
            method: 'get',
            url: `/v1/my/courses/${id}`
        })
        .then(response => response.$data);
    }
}
