const nativeModule = require('./native-addon/build/Release/greet.node');

console.log(nativeModule);

console.log(nativeModule.greetHello("Branch Channels"));