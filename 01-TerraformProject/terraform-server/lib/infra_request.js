var _ = require('underscore');
var extend = require('util')._extend;

const {all_infra_attributes, all_software_attributes} = require("./config/infra_request_attributes");
const terraformgen = require('./terraform_gen');

let infraReqObj_local = undefined;

const createRequest = (req, res, infraReqObj) => {
    let copied = extend({}, infraReqObj)
    copied.environmentAttribObjs = [];
    // Store into local instance. DB capabilities to be enhanced
    infraReqObj_local = copied;
};

const reviewRequest = (req, res) => {
    
    let tmpObj = infraReqObj_local ? infraReqObj_local : infrarequest_dummy;
    let copied = extend({}, tmpObj);
    copied.environmentAttribObjs = [];
    
    _.map(copied.environments, function(envName){
        let environmentAttrib = extend({}, empty_environmentAttribs);
        environmentAttrib.env_name = envName;
        environmentAttrib.env_value = envName;
        copied.environment = envName;
        copied.server_tag = `${copied.appName}-${copied.environment}`;

        environmentAttrib.infra_details = _.filter(_.map(all_infra_attributes, function(attributeObj){
            let tmp = extend({}, attributeObj);
            tmp.cur_value = copied[tmp.attribute_type];
            return tmp;
        }), function(finalObj){
            return finalObj.cur_value !== undefined && finalObj.cur_value.length > 0;
        });
        
        environmentAttrib.software_details = _.filter(_.map(all_software_attributes, function(attributeObj){
            let tmp = extend({}, attributeObj);
            tmp.cur_value = copied[tmp.attribute_type];
            return tmp;
        }), function(finalObj){
            return finalObj.cur_value !== undefined && finalObj.cur_value.length > 0;
        });
        copied.environmentAttribObjs.push(environmentAttrib);
    });
    
    return copied;

};

const validateRequest = (req, res, infraReqObj) => {
    // TODO 
    return infraReqObj;
};

const applyRequest = (req, res, infraReqObj) => {
    
    let finalList = [];

    _.map(infraReqObj.environmentAttribObjs, function(envAttribsObj){
        let reqObjByEnv = extend({}, infraReqObj);    

        reqObjByEnv.environment = envAttribsObj.env_value;
        if(!reqObjByEnv.javaVersion && reqObjByEnv.javaVersion.length < 1){
            reqObjByEnv.jdkSwCommand = 'sleep 1';
        }
        if(!reqObjByEnv.nodeJsVersion && reqObjByEnv.nodeJsVersion.length < 1){
            reqObjByEnv.nodeJsSwCommand = 'sleep 1';
        }
        reqObjByEnv.environment = envAttribsObj.env_value;

        _.map(envAttribsObj.infra_details, function(infraObj){
            reqObjByEnv[infraObj.attribute_type] = infraObj.cur_value; 
        });

        _.map(envAttribsObj.software_details, function(swObj){
            reqObjByEnv[swObj.attribute_type] = swObj.cur_value; 
        });

        finalList.push(reqObjByEnv);
    });

    _.map(finalList, function(obj){
        let destDir = terraformgen.generateTfFiles(obj);
        if(destDir){
            terraformgen.validateAndApplyTerraform(destDir);
        }
    });
     
    return infraReqObj;

};

const scheduleRequest = (req, res, infraReqObj) => {
    // TODO - Store state into DB to schedule later.
    return infraReqObj;
};

const empty_environmentAttribs = {
    env_name : '',
    env_value : '',
    infra_details : [],
    software_details : []
};

const infrarequest_dummy = {
    appName: '',
    appCI : '',
    description: '',
    orgAccount : '',
    provider : '',
    environment : '',
    region : '',
    vpc : '',
    subnet : '',
    cidr_ips : '',
    subnet_zone : '',
    server_tag : '',
    server : '',
    serverAMI : '',
    amiKeyPair : '',
    applnPortRangeFrom : 3000, 
    applnPortRangeTo : 3000,
    nodeJsSwCommand : '',
    jdkSwCommand : '',
    javaVersion : '',
    nodeJsVersion : '',
    environments : [],
    environmentAttribObjs : []
};

module.exports = {
    createRequest,
    reviewRequest,
    applyRequest,
    validateRequest,
    scheduleRequest
};