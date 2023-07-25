// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA_IzEQY0QCZChK2EBL2uV93NlH84uDC80",
    authDomain: "musicapp-143c8.firebaseapp.com",
    projectId: "musicapp-143c8",
    storageBucket: "musicapp-143c8.appspot.com",
    messagingSenderId: "259419205444",
    appId: "1:259419205444:web:0f8c5a02a74a7e9393f111"
}

export const initFireBase = initializeApp(firebaseConfig)