// keys.js
if(process.env.NODE_ENV === 'prod'){
    // provide prod.js
    module.exports = require('./prod.js');
}else{
    // provide dev.js
    module.exports = require('./dev.js');
}