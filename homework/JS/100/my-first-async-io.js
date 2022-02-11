'use strict';

const fs = require('fs');
fs.readFile(process.argv[2], (e,s)=>{ 
    if(e) throw e;
    console.log(s.toString().split('\n').length -1);
});
