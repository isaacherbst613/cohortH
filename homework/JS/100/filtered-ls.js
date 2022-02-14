'use strict';
const fs = require('fs');
const ext = process.argv[3];
fs.readdir(process.argv[2], (e,list)=>{
    list.forEach(file=>{
        if(file.slice(-(ext.length+1))=== `.${ext}`){
            console.log(file);
        }
    });
});