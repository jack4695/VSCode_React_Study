import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { firestore } from "../../firestoreConfig";
import { useEffect, useState } from "react";

const getUserData = async(id) => {
  const docRef = doc(firestore, 'members', id);
  const docSnap = await getDoc(docRef);

  return docSnap;
}

function Edit(props) {

  const navigate = useNavigate();

  const [data, setData] = useState();

  // 회원정보입력. 매개변수는 컬렉션명~이름까지의 정보를 받도록 선언.
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



  useEffect(()=>{
    const fetchData = async () => {
      const id = JSON.parse(localStorage.getItem('user'));
      console.log('id', id);
      const userData = await getUserData(id);
      if (userData.exists()) {
        setData(userData.data());
      } else {
        console.log("❌ 해당 사용자 정보가 없습니다.");
      }
    }
    fetchData();

    console.log('data', data.phone);
  },[])



  // 주소찾기 버튼 (다음 카카오 API)
  const addrSearch = () => {
    new daum.Postcode({
      oncomplete: function(data) {
        // 주소 데이터를 받아오는 콜백
        // data.zonecode: 우편번호
        // data.roadAddress: 도로명 주소

        // postcode input에 주소 채우기
        document.querySelector('input[name="postcode"]').value = data.zonecode;

        // addr1 input에 주소 채우기
        document.querySelector('input[name="addr1"]').value = data.roadAddress;

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
    const domainInput = document.querySelector('input[name="email_domain"]');

    if (selectedDomain === '') {
      // 직접입력 선택 시
      domainInput.value = '';
      domainInput.readOnly = false;
    }
    else {
      // 선택된 도메인 자동 입력
      domainInput.value = selectedDomain;
      domainInput.readOnly = true;
    }
  }

  // 비밀번호 확인 span태그 함수
  const checkPass = () => {
    const pass = document.getElementById('password').value;
    const passCheck = document.getElementById('password_check').value;
    const msgSpan = document.getElementById('pass-msg')

    if(passCheck === '') {
      msgSpan.innerText = '';
      return;
    }

    if(pass === passCheck) {
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
      <h2>🛫&nbsp;내정보수정&nbsp;🛬</h2>
      <form onSubmit={(event) => {
        event.preventDefault();
        //폼값 얻기
        let id = event.target.id.value;
        let pass = event.target.pass.value;
        let name = event.target.name.value;

        let emailId = event.target.email_id.value; 
        let emailDomain = event.target.email_domain.value;

        let email = emailId + '@' + emailDomain;

        let phone1 = event.target.phone1.value;
        let phone2 = event.target.phone2.value;
        let phone3 = event.target.phone3.value;

        let phone = phone1 + '-' + phone2 + '-' + phone3;

        let postcode = event.target.postcode.value;
        let addr1 = event.target.addr1.value;
        let addr2 = event.target.addr2.value;
        
        let addr = postcode + addr1 + ' ' + addr2;

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
      //회원정보 추가
      memberWrite(id, pass, name, email, phone, addr);

      // +로그인이 완료상태로 홈화면으로 들어가는 것을 구현하기

      }}>
    <table>
        <tr>
            <th>아이디</th>
            <td>
                <input type="text" id="userid" name="id" />&nbsp;&nbsp;
                <button type="button" disabled>중복확인</button>
                <span>&nbsp;+ 4~15자, 첫 영문자, 영문자와 숫자 조합</span><br />
                <span id="id-msg" style={{ fontWeight: 'bold' }}></span>
            </td>
        </tr>
        <tr>
            <th>비밀번호</th>
            <td><input type="password" id="password" name="pass" /></td>
        </tr>
        <tr>
            <th>비밀번호 확인</th>
            <td>
                <input type="password" id="password_check" name="password_check"
                onChange={checkPass} />
                <span>&nbsp;(확인을 위해 다시 입력해 주세요)</span><br />
                <span id="pass-msg" style={{ fontWeight: 'bold' }}></span>
            </td>
        </tr>
        <tr>
            <th>이름</th>
            <td><input type="text" id="name" name="name" /></td>
        </tr>
        <tr>
            <th>이메일</th>
            <td>
                <input type="text" name="email_id" style={{width: "100px"}} />
                @ <input type="text" id="email" name="email_domain" style={{width:"150px"}} /> 
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
                <br />
                <small>* hanmail, net은 수신이 어려울 수 있습니다.</small>
            </td>
        </tr>
        <tr>
            <th>휴대전화</th>
            <td>
                <input type="text" name="phone1" style={{width:"60px"}}
                 maxLength={3} onChange={(e)=>{moveFocus(e, 3, "phone2")}} /> -
                <input type="text" name="phone2" style={{width:"60px"}}
                 maxLength={4} onChange={(e)=>{moveFocus(e, 4, "phone3")}} /> -
                <input type="text" name="phone3" style={{width:"60px"}}
                 maxLength={4} onChange={(e)=>{moveFocus(e, 4, "sms_recv")}} />&nbsp;&nbsp;
                <label>
                <input type="radio" name="sms_recv" value="yes" />SMS 수신허용
                </label>
                <label>
                <input type="radio" name="sms_recv" value="no" />SMS 수신불가
                </label>
            </td>
        </tr>
        <tr>
            <th>주소</th>
            <td>
                <input type="text" name="postcode" style={{width:"90px"}} />&nbsp;
                <button type="button" onClick={addrSearch}>주소찾기</button> (우편번호)<br />
                <input type="text" name="addr1" style={{width:"100%", marginTop:"5px"}} />
                <br />
                <input type="text" name="addr2" style={{width:"65%", marginTop:"5px"}} />
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
    </table>

    <div className="button-group">
        <button type="submit">가입하기</button>
    </div>
</form>
    </div>
  </>); 
}
export default Edit; 