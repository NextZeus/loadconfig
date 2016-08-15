/**
 * Created by lixiaodong on 16/8/15.
 */
var fs = require('fs');

var Load = function(opt){
    this.configKey = opt.configKey || [];
    this.config = {};
}

var p = Load.prototype;

p.loadConfig = function () {
    var self = this;
    var config = self.config;
    var fileNames = Object.keys(this.configKey);
    var baseDir = __dirname + '/../config/';
    console.log('baseDir---->>',fileNames);

    fileNames.forEach(function (name) {
        console.log('index-->>',name);
        var filename = baseDir + name + '.json';
        console.log('filename---->>',filename);

        var filestat = fs.statSync(filename);
        console.log('filestat-->>>',name,filestat.isFile());
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

            console.log('objectByKey--->>>>',objectByKey);
            //console.log('arrayByKey--->>>>',JSON.stringify(arrayByKey.age));

            self.config[name] = {
                all         :   all,
                arrayByKey  :   arrayByKey,
                objectByKey :   objectByKey
            }
        }
    });

}

module.exports = Load;

