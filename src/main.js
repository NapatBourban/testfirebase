import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



//import "./assets/main.css";

const app = createApp(App);
const firebaseConfig = {
    apiKey: "AIzaSyDs0cK9N2LCExgvXRp2oNsosGhJ0wjSyzg",
    authDomain: "testvuefirebase-4ab44.firebaseapp.com",
    projectId: "testvuefirebase-4ab44",
    storageBucket: "testvuefirebase-4ab44.appspot.com",
    messagingSenderId: "498119263832",
    appId: "1:498119263832:web:1e472a0341133fc4a3ac2d",
    measurementId: "G-DCV4GLTQ3Q"
  };
  const initFirebase = initializeApp(firebaseConfig);
  export const db= getFirestore(initFirebase); //export เอาไปใช้งานไฟล์อื่น
  

app.use(router);

app.mount("#app");
