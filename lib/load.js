/**
 * Created by lixiaodong on 16/8/15.
 */
var fs = require('fs');
var _ = require('underscore');

var Load = function(opt){
    this.configKey = opt.configKey || [];
    this.config = {};
    this.loadConfig();
}

var p = Load.prototype;

p.loadConfig = function () {
    var self = this;
    var config = self.config;
    var fileNames = Object.keys(this.configKey);
    var baseDir = __dirname + '/../config/';
    fileNames.forEach(function (name) {
        var filename = baseDir + name + '.json';

        var filestat = fs.statSync(filename);
        if(filestat.isFile()){
            //delete config from cache
            delete require.cache[ require.resolve( filename ) ];
            var fileKeys = self.configKey[name];

            var jsonConfig = require(filename);

            var all = [];//所有项
            var arrayByKey = {};//同一数值 多项
            var objectByKey = {};//单一项

            for(var i = 0 ; i < jsonConfig.length; i++){
                all.push(jsonConfig[i]);

                fileKeys.forEach(function (fileKey) {
                    var value = jsonConfig[i][fileKey];
                    if(value != undefined && value != null){
                        arrayByKey[fileKey] = arrayByKey[fileKey] || {};
                        arrayByKey[fileKey][value] = arrayByKey[fileKey][value] || [];
                        arrayByKey[fileKey][value].push(jsonConfig[i]);

                        objectByKey[fileKey] = objectByKey[fileKey] || {};
                        objectByKey[fileKey][value] = jsonConfig[i];
                    }
                });
            }

            self.config[name] = {
                all         :   all,
                arrayByKey  :   arrayByKey,
                objectByKey :   objectByKey
            }
        }
    });
}

p.getAll = function (name) {
    var self = this;

    return self.config[name];
}

/**
 *
 * @param name
 * @param key
 * @param value
 * @returns {*}
 */
p.getObjByKey = function (name, key ,value) {
    var self = this;

    if(!self.config[name] || !self.config[name].objectByKey || !self.config[name].objectByKey[key]){
        return null;
    }

    return self.config[name].objectByKey[key][value];
}

/**
 *
 * @param name
 * @param key
 * @param value
 * @returns {*}
 */
p.getObjArrayByKey = function (name, key, value) {
    var self = this;

    if(!self.config[name] || !self.config[name].arrayByKey || !self.config[name].arrayByKey[key]){
        return null;
    }

    return self.config[name].arrayByKey[key][value];
}

/**
 *
 * @param name
 * @param key
 * @param value
 * @param key2
 * @param value2
 * @returns {null}
 */
p.getObjFromArrayByKey = function (name, key, value, key2, value2) {
    var self = this;

    if(!self.config[name] || !self.config[name].arrayByKey || !self.config[name].arrayByKey[key]){
        return null;
    }

    var array = self.config[name].arrayByKey[key][value];

    var objs = _.filter(array, function (item) {
        return item[key2] == value2;
    });

    if(!!objs && objs.length){
        return objs[0];
    }
    return null;
}



module.exports = Load;

