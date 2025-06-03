import './registForm.css';

import {firestore} from '../../firestoreConfig';
import {doc, getDoc, setDoc} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Regist() {

  const navigate = useNavigate();

  // 🚩중복확인 상태
  const [isIdChecked, setIsIdChecked] = useState(false);

  const [emailReadonly, setEmailReadonly] = useState(false);

  // 🚩 회원가입 폼 전체를 하나의 객체에 담아서 상태 관리
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

  /*  🚩 입력값이 바뀔 때마다 실행, 기존 상태인 formState를 (...prev)복사해서,,
   바뀐부분만 새로 업데이트! */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev)=> ({...prev, [name] : value}) );

    if (name === 'id') {
    setIsIdChecked(false); // 아이디가 바뀌면 다시 확인 중복확인 해야함
  }
  }
  
  
  // 같은 아이디가 FireBase에 있는지 확인
  const findId = async (id) => {
    const docRef = doc(firestore, 'members', id);
    const docSnap = await getDoc(docRef);
    
    return docSnap.exists(); // 이미 존재하면 true
  }
  
  // 중복확인 후 메세지 출력
  const checkId = async () => {
    const inputId = document.getElementById('userid').value;
    const msgSpan = document.getElementById('id-msg');
    
    if (inputId === '') {
      msgSpan.innerText = '아이디를 입력해주세요.';
      msgSpan.style.color = 'red';
      setIsIdChecked(false);
      return;
    }
    
    const isExist = await findId(inputId);
    
    if (isExist) {
      msgSpan.innerText = '❌ 이미 사용 중인 아이디입니다.';
      msgSpan.style.color = 'red';
      // 🚩중복 id. 회원가입 불가
      setIsIdChecked(false);
    }
    else {
      msgSpan.innerText = '✅ 사용 가능한 아이디입니다!';
      msgSpan.style.color = 'green';
      // 🚩중복확인 완료. 회원가입가능
      setIsIdChecked(true);
    }
  };
  

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

  // 비밀번호 체크시 span 문구 출력을 위함
  useEffect(()=> {
    checkPass();
  },[formState.pwCheck, formState.pw] )
  

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

    // 전화번호 3-4-4 포커스 이동시키는 함수
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
  
   //  🚩 파이어베이스에 회원정보 저장.
  const memberWrite = async (p_id, p_pass, p_name,
    p_email, p_phone, p_addr
  ) => {
    // doc으로 입력을 위한 컬렉션과 도큐먼트를 만든 후 JS객체로 정보 입력
    await setDoc(doc(firestore, 'members', p_id), {
      id: p_id,
      pass: p_pass,
      name: p_name,
      email: p_email,
      phone: p_phone,
      addr: p_addr,
    });
    console.log("회원가입 성공");

    navigate('/');
  }
  

  return (<>
    <div className="signup-container">
      <h2>🛫&nbsp;회원가입&nbsp;🛬</h2>
      <form onSubmit={(event) => {
        event.preventDefault();

        // 🚩 중복확인을 안하면 회원가입 불가
        if (!isIdChecked) {
          alert("아이디 중복확인을 해주세요!");
          return;
        }

        //폼값 얻기
        let id = formState.id;
        let pass = formState.pw;
        let name = formState.name;
        // 🚩 구조분해 할당.
        const { emailId, emailDomain } = formState;
        const email = `${emailId}@${emailDomain}`;

        const { phone1, phone2, phone3 } = formState;
        const phone = `${phone1}-${phone2}-${phone3}`

        const { postcode, addr1, addr2 } = formState;
        const addr = `${postcode}|${addr1}|${addr2}`
        

        //폼값에 빈값이 있는지 검증
        if(id === '') { 
            alert('아이디를 입력하세요'); 
            return; 
        }
        if(pass === '') { 
            alert('비밀번호를 입력하세요'); 
            return; 
        }
        if(name === '') { 
            alert('이름을 입력하세요'); 
            return; 
        }
        if(emailId === '' || emailDomain === '') { 
            alert('이메일을 입력하세요'); 
            return; 
        }
        if(phone1 === '' || phone2 === '' || phone3 === '') { 
            alert('전화번호를 입력하세요'); 
            return; 
        }
        if(addr1 === '' || addr2 === '') { 
            alert('주소를 입력하세요'); 
            return; 
        }
      // 🚩모든 검증이 끝난 후, 회원정보 추가
      memberWrite(id, pass, name, email, phone, addr);

      alert('회원가입이 완료되었습니다.😀')

      navigate('/');

      }}>
    <table>
      <tbody>
        <tr>
            <th>아이디</th>
            <td>
                <input type="text" id="userid" name="id" value={formState.id}
                  onChange={(e)=>handleInputChange(e)} />&nbsp;&nbsp;
                <button type="button" onClick={checkId}>중복확인</button>
                <span id="id-msg" style={{ fontWeight: 'bold' }}></span>
            </td>
        </tr>
        <tr>
            <th>비밀번호</th>
            <td><input type="password" id="password" name="pw"
              value={formState.pw} onChange={handleInputChange} /></td>
        </tr>
        <tr>
            <th>비밀번호 확인</th>
            <td>
                <input type="password" id="password_check" name="pwCheck"
                  value={formState.pwCheck} onChange={(e)=>{
                    handleInputChange(e);
                  }}/>
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
        <button type="submit">가입하기</button>
    </div>
</form>
    </div>
  </>);
}

export default Regist;
