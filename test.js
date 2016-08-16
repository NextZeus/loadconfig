var load = require('./lib/load');

var model = new load({
    configKey:{
        person:['id','age']
    }
});

model.loadConfig();
//var obj = model.getObjByKey('person', 'id' , 1);
//var objs = model.getObjArrayByKey('person', 'age', 18);
var obj = model.getObjFromArrayByKey('person', 'age', 18 , 'id' ,2)
console.log(obj);
