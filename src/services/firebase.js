// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; // Thêm import này

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3uX1cJLVe_JFukbTsATbhsMPxzIW2cx8",
  authDomain: "test-api-c2ab4.firebaseapp.com",
  databaseURL:
    "https://test-api-c2ab4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-api-c2ab4",
  storageBucket: "test-api-c2ab4.firebasestorage.app",
  messagingSenderId: "927424943020",
  appId: "1:927424943020:web:4a7ab33d2b613c2acf2009",
  measurementId: "G-ERC1WLSWRY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app); // Khởi tạo Realtime Database

// Export các services cần thiết
export { app, analytics, db };
export default app;
