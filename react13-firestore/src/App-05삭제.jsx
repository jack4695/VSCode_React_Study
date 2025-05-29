import { firestore } from './firestoreConfig';
import { doc, deleteDoc, getDoc, collection, getDocs } from 'firebase/firestore';

import { useState, useEffect } from "react";


function App() {

  const [showData, setShowData] = useState([]);

  //기존의 도큐먼트를 불러와서 select태그에 설정
  useEffect(() => {
    const getCollection = async () => {
      let trArray = [];
      const querySnapshot = await getDocs(collection(firestore, "members"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        let memberInfo = doc.data();
        trArray.push(
          <option key={doc.id} value={doc.id}>{memberInfo.name}</option>
        );
      });
      return trArray;
    }

    //함수 호출 후 콜백 데이터를 then절에서 처리
    getCollection().then((result) => {
      console.log('result', result);
      //스테이트를 변경하면 리렌더링 되면서 option이 추가된다.
      setShowData(result);
    })

  }, []);
  /* useEffect의 두번째 인자인 의존성배열을 빈배열을 적용하여 렌더링 후
  딱 한번만 실행되도록 처리한다. */

  //input에 설정할 스테이트 선언
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');


  return (
    <div>
      <h2>Firebase - Firestore 연동 App</h2>
      <h3>개별 조회 및 삭제하기</h3>
      {/* 항목을 선택하면 change 이벤트가 발생된다. */}
      <form onSubmit={async (event) => {
        event.preventDefault();
        let id = event.target.id.value;
        console.log('삭제', id);
        if(id===''){alert('사용자를 먼저 선택해주세요'); return;}

        /* 선택한 아이디로 도큐먼트의 참조를 얻은 후에 deleteDoc 함수를
        실행해서 삭제한다. */
        await deleteDoc(doc(firestore, "members", event.target.id.value));
        //삭제가 완료되면 입력폼을 비워준다.
        setId('');
        setPass('');
        setName('');
      }}>
        <div className='input-group' id='myForm'>
          <select className='form-control' onChange={async (e)=>{
            //select에서 선택한 항목의 데이터를 불러와서 input에 설정
            let user_id = e.target.value;
            console.log('선택', user_id);
            const docRef = doc(firestore, 'members', user_id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              console.log('Document data', docSnap.data());
              //해당 도큐먼트가 존재하면 데이터를 인출해서..
              let callData = docSnap.data();
              //각 스테이트를 변경하여 input에 값을 설정한다.
              setId(user_id);
              setPass(callData.pass);
              setName(callData.name);
            }
            else {
              console.log('No such document!');
            }
          }}>
            <option value="">선택하세요</option>
            {showData}
          </select>
          <button type='submit' className='btn btn-danger'>삭제</button>
        </div>
        <table className='table table-bordered table-striped'>
          <tbody>
          <tr>
            <td>컬렉션(테이블)</td>
            <td><input type="text" name="collection" value="members"
              className='form-control'/></td>
          </tr>
          <tr>
            <td>아이디</td>
            <td><input type="text" name="id" value={id}
              className='form-control'/></td>
          </tr>
          <tr>
            <td>비밀번호</td>
            <td><input type="text" name="pass" value={pass}
              className='form-control'/></td>
          </tr>
          <tr>
            <td>이름</td>
            <td><input type="text" name="name" value={name}
              className='form-control'/></td>
          </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
export default App;
