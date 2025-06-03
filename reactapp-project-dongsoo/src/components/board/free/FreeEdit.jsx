import './FreeRead.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {firestore} from '../../../firestoreConfig';
import {addDoc, collection, doc, getDoc, setDoc} from 'firebase/firestore';

function FreeEdit(props) {

  const navigate = useNavigate();

  const { id } = useParams();
  
  const [formState, setFormState] = useState({
    title: '',
    writer: '',
    content: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState((prev)=> ({...prev, [id] : value}) );
  }


   // 게시판 정보 가져오기
  useEffect(() => {
    const getPostData = async () => {
      const docRef = doc(firestore, "freeboard", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        setFormState({
          ...data
        })
      }
    }
    getPostData();
  }, []);

    // 게시물 수정
  const postEdit = async () => {

    const docRef = doc(firestore, "freeboard", id);

    await setDoc(docRef, {
      ...formState
    });

    console.log("수정 성공");

  } 


  return (<>
    <div className="write-container">
      <h2 className="write-title">글 수정</h2>
      <form className="write-form"
        onSubmit={(event)=> {
          event.preventDefault();

          //게시물 수정
          postEdit();

          alert('게시물 수정이 완료되었습니다.😊')

          navigate('/free');
        }}>
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={formState.title}
            required
            onChange={(e)=>handleInputChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="writer">작성자</label>
          <input
            type="text"
            id="writer"
            value={formState.writer}
            required
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            rows="10"
            value={formState.content}
            required
            onChange={(e)=>handleInputChange(e)}
          ></textarea>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary1">저장</button>
          <Link to="/free" className="btn btn-secondary">목록</Link>
        </div>
      </form>
    </div>
  </>); 
}
export default FreeEdit; 