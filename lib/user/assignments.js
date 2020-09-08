module.exports = class Assignments {
    constructor(edlink, user){
        this.edlink = edlink;
        this.user = user;

        return this;
    }

    list(course){
        return this.user.request({
            method: 'get',
            url: `/v1/my/courses/${course}/assignments`
        })
        .then(response => response.$data);
    }

    fetch(course, id){
        return this.user.request({
            method: 'get',
            url: `/v1/my/courses/${course}/assignments/${id}`
        })
        .then(response => response.$data);
    }

    create(course, data){
        return this.user.request({
            method: 'post',
            url: `/v1/my/courses/${course}/assignments`,
            data
        })
        .then(response => response.$data);
    }

    delete(course, assignment){
        return this.user.request({
            method: 'delete',
            url: `/v1/my/courses/${course}/assignments/${assignment}`
        });
    }

    submit(course, assignment, data = {}){
        return this.user.request({
            method: 'post',
            url: `/v1/my/courses/${course}/assignments/${assignment}/submissions`,
            data
        })
        .then(response => response.$data);
    }
}
