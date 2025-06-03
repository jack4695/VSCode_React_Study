import "./LoginForm.css";

import {firestore} from '../../firestoreConfig';

import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();
  /* 
  🚩<< localStorage 기본 문법 >>
 
 저장 -> (로그인할때)
  :	localStorage.setItem(key, value)	key에 value를 저장함
 불러오기 -> (당사자만 수정,삭제 가능하도록)
  :	localStorage.getItem(key)	해당 key의 값을 불러옴
 전체 삭제 -> (로그아웃할때)
  :	localStorage.clear()	저장된 모든 데이터 삭제
  */

  const [userId, setUserId] = useState("");
  const [userPass, setUserPass] = useState("");

  // 파이어베이스에서 가져온 데이터를 저장할 상태
  const [fireData, setFireData] = useState(null);


  // 1. 파이어 데이터(ID, PASS) 가지고 오는 비동기 함수
  const getFireId = async (inputId) => {
    const docRef = doc(firestore, "members", inputId)
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
      const data = docSnap.data();    // 예: { id: "dada", pass: "1234" }
      const fireId = data.id;
      const firePass = data.pass;

      setFireData(data);

      console.log("파이어 데이터 가져옴", fireId, firePass);
      return { fireId, firePass }
    }
    else {
      console.log('문서가 존재하지 않음');
      return null;   // 아이디 또는 비밀번호가 입력없음
    }
  }


  // 2. 로그인 버튼 클릭시, ID,PW검증 후 로그인 처리
  const doLogin = async (e) => {
    e.preventDefault();
    const result = await getFireId(userId); // Firestore에서 데이터 가져오기 → fireData 상태 바뀜
    const msgSpan = document.getElementById('error-msg');

    
    // 🚩 span 메세지를 보여줌. 사용자 경험 UP!
    if(!result) {
      msgSpan.innerText = '❌ 존재하지 않는 계정입니다.';
      msgSpan.style.color = 'red';
      return; 
    }
    
    // 로그인 검증
    const { fireId, firePass } = result;
    console.log('가져온거', fireId, firePass );
    
    if (userId === fireId && userPass === firePass) {
      // 🚩아이디를 로컬스토리지에 저장
      localStorage.setItem("user", JSON.stringify(userId));
      alert("로그인 성공👋")
      navigate('/');
    }
    else {
      msgSpan.innerText = '❌ 아이디 또는 비밀번호가 일치하지 않습니다.';
      msgSpan.style.color = 'red';
    }

  }

  return (<>
    <div className="login-container">
      <h2>🔐 로그인</h2>
      
      <form className="login-form" >
        <div className="form-group">
          <label htmlFor="userid">아이디</label>
          <input type="text" id="userid" name="userid" placeholder="아이디를 입력하세요"
            value={userId} onChange={(e)=>setUserId(e.target.value)} />

        </div>

        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" name="password" placeholder="비밀번호를 입력하세요"
            value={userPass} onChange={(e)=>setUserPass(e.target.value) 
            } />
        </div>
        {/* 🚩 span 메세지 출력 */}
        <span id="error-msg" style={{ fontWeight: 'bold' }}></span>

        <button type="button" className="login-btn" onClick={doLogin}>로그인</button>
      </form>
      
    </div>
  </>); 
}
export default Login; 