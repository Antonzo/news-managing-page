import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyALMwZAZRkY8x_wLg9eVbkj6-JygCoJb7o",
    authDomain: "news-adding.firebaseapp.com",
    projectId: "news-adding", 
    storageBucket: "news-adding.appspot.com",
    messagingSenderId: "609245078827",
    appId: "1:609245078827:web:45231a02e8abc1696c516e"
};

const app = initializeApp(firebaseConfig);

export default getFirestore(app);