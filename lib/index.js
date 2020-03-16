const resources = require('./resources');

function Edlink(application_id, application_secret, configuration = {}){
    if(!(this instanceof Edlink)){
        return new Edlink(application_id, application_secret, configuration);
    }
}

module.exports = Edlink;
module.exports.default = Edlink;
