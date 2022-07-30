// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCdeqc5ChGZviOKRaZEMWcK8aDM99EB13Y',
	authDomain: 'todo-list-dbf75.firebaseapp.com',
	databaseURL: 'https://todo-list-dbf75-default-rtdb.firebaseio.com',
	projectId: 'todo-list-dbf75',
	storageBucket: 'todo-list-dbf75.appspot.com',
	messagingSenderId: '442900989696',
	appId: '1:442900989696:web:e1ae658107d10b1dc555e5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
