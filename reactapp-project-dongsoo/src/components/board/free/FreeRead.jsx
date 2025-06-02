import './FreeRead.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {firestore} from '../../../firestoreConfig';
import {addDoc, collection, doc, getDoc, setDoc} from 'firebase/firestore';

function FreeRead(props) {

  const navigate = useNavigate();
  
  const [formState, setFormState] = useState({
    title: '',
    writer: '',
    content: '',
  });

  const { id } = useParams();

   // 회원정보 가져오기 및 formState.writer에 설정
  useEffect(() => {
    const getPostData = async () => {
      const docRef = doc(firestore, "freeboard", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        setFormState({
          title: data.title,
          writer: data.writer,
          content: data.content,
        })
      }
    }
    getPostData();
  }, []);


  return (<>
    <div className="write-container">
      <h2 className="write-title">게시물</h2>
      <form className="write-form">
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={formState.title}
            required
            readOnly
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
            readOnly
          ></textarea>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary1">수정</button>
          <button type="submit" className="btn btn-primary2">삭제</button>
          <Link to="/free" className="btn btn-secondary">목록</Link>
        </div>
      </form>
    </div>
  </>); 
}
export default FreeRead; 