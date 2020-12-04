/*
    gyp - generate your project
    Run `node-gyp configure` in ./native-addon folder to setup project
    Run `node-gyp build` to build it
*/

const nativeModule = require('./native-addon/build/Release/greet.node');

console.log(nativeModule);

console.log(nativeModule.greetHello("Branch Channels"));