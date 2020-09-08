const axios = require('axios');

const Courses = require('./user/courses');
const Organizations = require('./user/organizations');
const Assignments = require('./user/assignments');
const Submissions = require('./user/submissions');

module.exports = class User {
    constructor(edlink, token){
        this.edlink = edlink;
        this.token = token;

        this.courses = new Courses(edlink, this);
        this.organizations = new Organizations(edlink, this);
        this.assignments = new Assignments(edlink, this);
        this.submissions = new Submissions(edlink, this);

        return this;
    }

    request(config){
        Object.assign(config, {
            baseURL: this.edlink.api,
            headers: {
                authorization: `Bearer ${this.token.access_token}`
            }
        });

        return axios(config).then(response => response.data);
    }

    me(){
        return this.request({
            method: 'get',
            url: '/v1/my/profile'
        })
        .then(response => response.$data);
    }
}
