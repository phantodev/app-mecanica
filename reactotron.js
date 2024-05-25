import Reactotron from "reactotron-react-native";

Reactotron.configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

// Clear logs on every new app load
Reactotron.clear();

console.tron = Reactotron; // Para facilitar o uso do console.tron.log
