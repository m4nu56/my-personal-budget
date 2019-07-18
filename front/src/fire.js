import firebase from 'firebase';

// Initialize Firebase
let config = {
    apiKey: 'AIzaSyDxKg4CGW6j3131vruUtU56dlhqNHjXRW8',
    authDomain: 'el-budget.firebaseapp.com',
    databaseURL: 'https://el-budget.firebaseio.com',
    projectId: 'el-budget',
    storageBucket: '',
    messagingSenderId: '186653765158'
};
let fire = firebase.initializeApp(config);
export default fire;
