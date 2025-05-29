import '../../index.css';

import {firestore} from '../../firestoreConfig';
import {doc, setDoc} from 'firebase/firestore';

function Regist() {

  //회원정보입력. 매개변수는 컬렉션명~이름까지의 정보를 받도록 선언.
  const memberWrite = async (p_id, p_pass, p_name,
    p_email, p_phone, p_addr
  ) => {
    //doc으로 입력을 위한 컬렉션과 도큐먼트를 만든 후 JS객체로 정보 입력
    await setDoc(doc(firestore, 'members', p_id), {
      id: p_id,
      pass: p_pass,
      name: p_name,
      email: p_email,
      phone: p_phone,
      addr: p_addr,
    });
    console.log("화원가입 성공");
  }


  return (<>
    <div className="signup-container">
      <h2>회원가입</h2>
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

        let addr1 = event.target.addr1.value;
        let addr2 = event.target.addr2.value;
        let addr = addr1 + ' ' + addr2;

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
      //회원정보 추가
      memberWrite(id, pass, name, email, phone, addr);
      
      //빈값으로 초기화
      event.target.id.value = '';
      event.target.pass.value = '';
      event.target.name.value = '';

      // +로그인이 완료상태로 홈화면으로 들어가는 것을 구현하기

      }}>
    <table>
        <tr>
            <th><label for="userid">아이디</label></th>
            <td>
                <input type="text" id="userid" name="id" />&nbsp;&nbsp;
                <button type="button">중복확인</button>
                <span>&nbsp;+ 4~15자, 첫 영문자, 영문자와 숫자 조합</span>
            </td>
        </tr>
        <tr>
            <th><label for="password">비밀번호</label></th>
            <td><input type="password" id="password" name="pass" /></td>
        </tr>
        <tr>
            <th><label for="password_check">비밀번호 확인</label></th>
            <td>
                <input type="password" id="password_check" name="password_check" />
                <span>&nbsp;(확인을 위해 다시 입력해 주세요)</span>
            </td>
        </tr>
        <tr>
            <th><label for="name">이름</label></th>
            <td><input type="text" id="name" name="name" /></td>
        </tr>
        <tr>
            <th><label for="email">이메일</label></th>
            <td>
                <input type="text" name="email_id" style={{width: "100px"}} />
                @ <input type="text" id="email" name="email_domain" style={{width:"150px"}} /> 
                <select>
                    <option>gmail.com</option>
                    <option>naver.com</option>
                    <option>daum.net</option>
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
                <input type="text" name="phone1" style={{width:"60px"}} /> -
                <input type="text" name="phone2" style={{width:"60px"}} /> -
                <input type="text" name="phone3" style={{width:"60px"}} />&nbsp;&nbsp;
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
                <button type="button">주소찾기</button> (우편번호)<br />
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

    <div class="button-group">
        <button type="submit">등록하기</button>
        <button type="reset">새로쓰기</button>
    </div>
</form>
    </div>
  </>);
}

export default Regist;
