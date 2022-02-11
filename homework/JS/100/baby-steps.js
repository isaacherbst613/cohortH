(function sum(){
    const arr = process.argv.slice(2);
    console.log(arr.reduce((a,b)=>+a + +b));

}());