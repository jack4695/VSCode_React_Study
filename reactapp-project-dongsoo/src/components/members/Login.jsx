import "./LoginForm.css";

import {firestore} from '../../firestoreConfig';

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

function Login(props) {

  /* 
    << localStorage 기본 문법 >>
 
 저장
  :	localStorage.setItem(key, value)	key에 value를 저장함
 불러오기
  :	localStorage.getItem(key)	해당 key의 값을 불러옴
 삭제
  :	localStorage.removeItem(key)	해당 key만 삭제
 전체 삭제
  :	localStorage.clear()	저장된 모든 데이터 삭제
  */

  const [userId, setUserId] = useState("");
  const [userPass, setUserPass] = useState("");
  // 🔹 파이어베이스에서 가져온 데이터를 저장할 상태
  const [fireData, setFireData] = useState(null);

  // 파이어 데이터(ID, PASS) 가지고 오는 비동기 함수
  const getFireId = async (inputId) => {
    const docRef = doc(firestore, "members", inputId)
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
      const data = docSnap.data();    // 예: { id: "dada", pass: "1234" }
      const fireId = data.id;
      const firePass = data.pass;

      setFireData(data); // 🔹 상태에 저장 (→ 이게 바뀌면 useEffect가 실행됨)

      console.log("파이어 데이터 가져옴", fireId, firePass);

      return { fireId, firePass }
    }
    else {
      console.log('문서가 존재하지 않음'); // 아이디 또는 비밀번호가 입력없음

      setFireData(null);
    }
    
  }

  // 로그인 클릭시, 아이디를 로컬스토리지에 저장
  const doLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(userId));
    getFireId(userId); // 🔹 Firestore에서 데이터 가져오기 → fireData 상태 바뀜
  }
  
  // 🔹 fireData가 바뀔 때마다 자동으로 실행되는 useEffect
  // (fireData를 먼저 가져오고 난 후) 실질적으로 로그인을 실행시키는 함수.
  useEffect(()=>{
    if(fireData !== null) {
      if(userId === fireData.id && userPass === fireData.pass) {
        console.log('로그인 성공!', );
      }
      else {
        console.log('로그인 실패', );
      }
    }
  }, [fireData]); // 🔹 fireData가 바뀔 때마다 실행됨
  
  

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
            value={userPass} onChange={(e)=>setUserPass(e.target.value)} />
        </div>

        <div className="form-options">
          <label>
            <input type="checkbox" /> 아이디 저장
          </label>
        </div>

        <button type="button" className="login-btn" onClick={doLogin}>로그인</button>
      </form>
      
    </div>
  </>); 
}
export default Login; 