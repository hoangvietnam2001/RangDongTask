import firebase from '@react-native-firebase/app';
// Cấu hình thông tin kết nối với Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA39UkJCbq0JWxL4VXrXLyb7PxCgPRQMwc",
    authDomain: "rangdongtask.firebaseapp.com",
    projectId: "rangdongtask",
    storageBucket: "rangdongtask.appspot.com",
    messagingSenderId: "639301190484",
    appId: "1:639301190484:web:794cc4d151adaf84a57ec1"
};

// Khởi tạo kết nối với Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };