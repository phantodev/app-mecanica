// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuWLYN860jUr4hMxVp00JFki97rWW6kt0",
  authDomain: "app-mecanica-elaborata.firebaseapp.com",
  projectId: "app-mecanica-elaborata",
  storageBucket: "app-mecanica-elaborata.appspot.com",
  messagingSenderId: "617033942849",
  appId: "1:617033942849:web:1b253f2f349e3ab561c3c0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export default app;
