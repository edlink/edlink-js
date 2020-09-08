const axios = require('axios');

module.exports = class Submissions {
    constructor(edlink, user){
        this.edlink = edlink;
        this.user = user;

        return this;
    }

    list(){
        return this.user.request({
            method: 'get',
            url: '/v1/my/courses'
        });
    }

    fetch(id){
        return this.user.request({
            method: 'get',
            url: `/v1/my/courses/${id}`
        });
    }

    grade(course, assignment, submission, data = {}){
        return this.user.request({
            method: 'put',
            url: `/v1/my/courses/${course}/assignments/${assignment}/submissions/${submission}/grade`,
            data
        })
        .then(response => response.$data);
    }
}
