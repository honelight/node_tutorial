console.log("Starting app");

setTimeout(function(){
    console.log('Inside of callback');
}, 2000);

setTimeout(function(){
    console.log("Second set timeout works");
}, 0);

console.log("Finishing app");