import './FreeRead.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {firestore} from '../../../firestoreConfig';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';

function FreeRead(props) {

  const navigate = useNavigate();
  
  const [formState, setFormState] = useState({
    title: '',
    writer: '',
    content: '',
  });

  const { id } = useParams();

  const userId = JSON.parse(localStorage.getItem("user"));

  const [inLogin, setInLogin] = useState(false);

  const [isMine, setIsMine] = useState(false);


    // 로그인 상태 + 게시글이 작성자 본인인지 확인
   // 회원정보 가져오기 및 formState.writer에 설정
  useEffect(() => {
    if(userId) {
      setInLogin(true);
    }
    else {
      setInLogin(false);
    }
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

        if(data.writer===userId) {
          setIsMine(true);
        }
      }
    }
    getPostData();
  }, [userId]);


  // 게시물 삭제
  const postDelete = async () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if(!confirmDelete) {
      return;
    }
    else {
      await deleteDoc(doc(firestore, 'freeboard', id));
      alert('삭제되었습니다.🗑')
      navigate("/free");
    }

  }

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
        {isMine ? (<>
          <Link to={`/free/edit/${id}`}>
            <button type="button" className="btn btn-primary1">수정</button>
          </Link>
          <button type="button" className="btn btn-primary2"
            onClick={postDelete}>삭제</button>
        </>) : (<>
          <Link to="/free" className="btn btn-secondary">목록</Link>
        </>)}
        </div>
      </form>
    </div>
  </>); 
}
export default FreeRead; 