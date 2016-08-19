# Wiki

### first step

```javascript
var loadjsonconfig = require('loadjsonconfig');
```

### second step

```javascript

var configKey = {
    filename    :   ["key1", "key2" ,"key3",,,,]
    ,,,
};

var configDir = __dirname + '/config/';

var configManager = new loadjsonconfig({configKey : configKey, configDir :  configDir});
```

### Useage

```javascript

//get one object by key name and value
var obj = configManager.getObjByKey('configName','keyName',keyValue);

//get objects by key name and value
var objs = configManager.getObjArrayByKey('configName', 'keyName', keyValue);

//get obj by two keys name and values
var obj = configManager.getObjFromArrayByKey('configName','keyName1',keyValue1,'keyName2',keyValue2);
```
