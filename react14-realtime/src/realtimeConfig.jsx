
//파이어베이스 서비스에 연결하기 위한 임포트
import { initializeApp } from "firebase/app"
//파이어스토어 데이터베이스 사용을 위한 임포트
import { getDatabase } from "firebase/database"

//.env 파일 생성 전
//파이어베이스 콘솔에서 발급받은 API정보(SDK정보)
// const firebaseConfig = {
//   apiKey: "AIzaSyBZ1WpMBLv_3qFBzG-kdlrOi1XiT2lCI3o",
//   authDomain: "myreactapp-dcdbf.firebaseapp.com",
//   projectId: "myreactapp-dcdbf",
//   storageBucket: "myreactapp-dcdbf.firebasestorage.app",
//   messagingSenderId: "89975558481",
//   appId: "1:89975558481:web:ac111af4335fe5c17f0370",
//   measurementId: "G-RWDTFGR7RV"
// };

// .env 파일 생성 후
// 파이어베이스 콘솔에서 발급받은 API정보(SDK정보)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apikey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
  databaseURL: import.meta.env.VITE_databaseURL
};

//앱 초기화
const app = initializeApp(firebaseConfig);
//realtime 객체 생성
const realtime = getDatabase(app);
//익스포트(내보내기)
export { realtime };