import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const API_KEY = process.env.REACT_APP_API_KEY;
const APP_ID = process.env.REACT_APP_APP_ID;

// Your web app's Firebase configuration


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore(app);
