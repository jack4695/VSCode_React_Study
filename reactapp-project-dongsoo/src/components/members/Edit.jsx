import './registForm.css';

import {firestore} from '../../firestoreConfig';
import {doc, getDoc, setDoc} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Edit() {

  const navigate = useNavigate();

  const [emailReadonly, setEmailReadonly] = useState(false);
  // 🚩 마찬가지
  const [formState, setFormState] = useState({
    id: '',
    pw: '',
    pwCheck: '',
    name: '',
    emailId: '',
    emailDomain: '',
    phone1: '',
    phone2: '',
    phone3: '',
    postcode: '',
    addr1: '',
    addr2: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev)=> ({...prev, [name] : value}) );
  }

  // 비밀번호 체크시 span 문구 출력을 위함
  useEffect(()=> {
    checkPass();
  },[formState.pwCheck, formState.pw] )



  // 🚩 회원정보 가져오기
  useEffect(() => {
    const getUserData = async () => {
      const userId = JSON.parse(localStorage.getItem("user"));

      const docRef = doc(firestore, "members", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        // 🚩 구분을 위한 특수문자를 이용하여 할당.
        const [emailId, emailDomain] = data.email.split('@');
        const [phone1, phone2, phone3] = data.phone.split('-');
        const [postcode, addr1, addr2] = data.addr.split('|');

        setFormState({
          id: data.id,
          pw: data.pass,
          pwCheck: '',
          name: data.name,
          emailId,
          emailDomain,
          phone1,
          phone2,
          phone3,
          postcode,
          addr1,
          addr2,
        });


      }
    };
    getUserData();
  }, []);



  // 회원 정보 수정
  const memberEdit = async () => {
    // 🚩 localStorage.getItem이용하여 id를 가져옴
    const userId = JSON.parse(localStorage.getItem("user"));

    const docRef = doc(firestore, "members", userId);
    // 🚩 수정된 데이터를 firebase에 저장
    await setDoc(docRef, {
      id: formState.id,
      pass: formState.pw,
      name: formState.name,
      email: `${formState.emailId}@${formState.emailDomain}`,
      phone: `${formState.phone1}-${formState.phone2}-${formState.phone3}`,
      addr: `${formState.postcode}|${formState.addr1}|${formState.addr2}`,
    });

    console.log("수정 성공");

  } 



  // 주소찾기 버튼 (다음 카카오 API)
  const addrSearch = () => {
    new daum.Postcode({
      oncomplete: function(data) {
        // 주소 데이터를 받아오는 콜백
        // data.zonecode: 우편번호
        // data.roadAddress: 도로명 주소

        setFormState((prev) => ({
          ...prev,
          postcode: data.zonecode,
          addr1: data.roadAddress
        }));

        // addr2 input으로 포커스 이동
        document.querySelector('input[name="addr2"]').focus();
      }
    }).open();
  };

  // 포커스 이동시키는 함수
  const moveFocus = (e, maxLength, nextInputName) => {
    const current = e.target; // 지금 입력 중인 그 input 박스

    if (current.value.length >= maxLength) {
      const form = current.form;
      const nextInput = form[nextInputName];

      if (nextInput) {
        nextInput.focus(); // 다음 입력창으로 포커스 이동
      }
    }
  }

  // 이메일 직접입력 아니면 readonly 처리
  const emailSelect = (e) => {
    const selectedDomain = e.target.value;
    
    if(selectedDomain === '') {
      setFormState((prev) => ({...prev, emailDomain: ''}));
      setEmailReadonly(false);
    }
    else {
      setFormState((prev) => ({...prev, emailDomain: selectedDomain}));
      setEmailReadonly(true);
    }
  }

  // 비밀번호 확인 span태그 함수
  const checkPass = () => {

    let msgSpan =document.getElementById('pass-msg');

    if(formState.pwCheck === '') {
      msgSpan.innerText = '';
      return;
    }

    if(formState.pw === formState.pwCheck) {
      msgSpan.innerText = '✔ 비밀번호가 일치합니다.'
      msgSpan.style.color = 'green';
    }
    else {
      msgSpan.innerText = '❗ 비밀번호가 일치하지 않습니다.'
      msgSpan.style.color = 'red';
    }
  };

  


  return (<>
    <div className="signup-container">
      <h2>🛫&nbsp;내 정보&nbsp;🛬</h2>
      <form onSubmit={(event) => {
        event.preventDefault();
        
        //회원정보 수정
        memberEdit();

        alert('회원정보 수정이 완료되었습니다.😊')

        navigate('/');

      }}>
    <table>
      <tbody>
        <tr>
            <th>아이디</th>
            <td>
                <input type="text" id="userid" name="id" value={formState.id}
                  onChange={(e)=>handleInputChange(e)}
                  readOnly />&nbsp;&nbsp;
                <span id="id-msg" style={{ fontWeight: 'bold' }}></span>
            </td>
        </tr>
        <tr>
            <th>비밀번호</th>
            <td><input type="password" id="password" name="pw"
              value={formState.pw} onChange={handleInputChange} required/></td>
        </tr>
        <tr>
            <th>비밀번호 확인</th>
            <td>
                <input type="password" id="password_check" name="pwCheck"
                  value={formState.pwCheck} onChange={(e)=>{
                    handleInputChange(e);
                    // checkPass(e);
                  }} required/>
                <span>&nbsp;(확인을 위해 다시 입력해 주세요)</span><br />
                <span id="pass-msg" style={{ fontWeight: 'bold' }}></span>
            </td>
        </tr>
        <tr>
            <th>이름</th>
            <td><input type="text" id="name" name="name"
              value={formState.name} onChange={handleInputChange} /></td>
        </tr>
        <tr>
            <th>이메일</th>
            <td>
                <input type="text" name="emailId" style={{width: "100px"}}
                  value={formState.emailId} onChange={handleInputChange} />
                @ <input type="text" id="email" name="emailDomain" style={{width:"150px"}}
                  value={formState.emailDomain} onChange={handleInputChange} 
                    readOnly={emailReadonly} /> 
                <select onChange={(e) => emailSelect(e)}>
                  <option value="">직접입력</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="naver.com">naver.com</option>
                  <option value="daum.net">daum.net</option>
                  <option value="nate.com">nate.com</option>
                  <option value="yahoo.com">yahoo.com</option>
                  <option value="korea.kr">korea.kr</option>
                </select>&nbsp;&nbsp;
                <label>
                <input type="radio" name="email_recv" value="yes" />수신동의
                </label>
                <label>
                <input type="radio" name="email_recv" value="no"  />수신거부
                </label>
            </td>
        </tr>
        <tr>
            <th>휴대전화</th>
            <td>
                <input type="text" name="phone1" style={{width:"60px"}}
                 value={formState.phone1} maxLength={3} onChange={(e)=>{
                  moveFocus(e, 3, "phone2");
                  handleInputChange(e);
                  }} /> -
                <input type="text" name="phone2" style={{width:"60px"}}
                 value={formState.phone2} maxLength={4} onChange={(e)=>{
                  moveFocus(e, 4, "phone3");
                  handleInputChange(e);
                  }} /> -
                <input type="text" name="phone3" style={{width:"60px"}}
                 value={formState.phone3} maxLength={4} onChange={(e)=>{
                  moveFocus(e, 4, "postcode");
                  handleInputChange(e);
                  }} />&nbsp;&nbsp;
            </td>
        </tr>
        <tr>
            <th>주소</th>
            <td>
                <input type="text" name="postcode" style={{width:"90px"}}
                  value={formState.postcode} onChange={handleInputChange} />&nbsp;
                <button type="button" onClick={addrSearch}>주소찾기</button> (우편번호)<br />
                <input type="text" name="addr1" style={{width:"100%", marginTop:"5px"}}
                  value={formState.addr1} onChange={handleInputChange} />
                <br />
                <input type="text" name="addr2" style={{width:"65%", marginTop:"5px"}}
                  value={formState.addr2} onChange={handleInputChange} />
                <span>+ 나머지 주소</span>
            </td>
        </tr>
        
        <tr>
            <th>나의 MBTI</th>
            <td>
                <select>
                    <option>:: 나의 MBTI ::</option>
                    <option>ISTJ</option>
                    <option>ISFJ</option>
                    <option>INFJ</option>
                    <option>INTJ</option>
                    <option>ISTP</option>
                    <option>ISFP</option>
                    <option>INFP</option>
                    <option>INTP</option>
                </select>
            </td>
        </tr>
        <tr>
            <th>여행스타일</th>
            <td>
                <select>
                    <option>:: 여행스타일 ::</option>
                    <option>액티비티</option>
                    <option>명소 관광</option>
                    <option>휴양지</option>
                    <option>맛집투어</option>
                </select>
            </td>
        </tr>
      </tbody>
    </table>

    <div className="button-group">
        <button type="submit">수정하기</button>
    </div>
</form>
    </div>
  </>);
}

export default Edit;
