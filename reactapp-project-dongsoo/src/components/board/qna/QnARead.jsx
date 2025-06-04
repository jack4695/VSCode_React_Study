import './QnARead.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {firestore} from '../../../firestoreConfig';
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, where} from 'firebase/firestore';

import CommentModal from './CommentModal';
import CommentList from './CommentList';

function QnARead(props) {

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

  const [comments, setComments] = useState([]);



  useEffect(() => {
    if(userId) {
      setInLogin(true);
    }
    else {
      setInLogin(false);
    }
    const getPostData = async () => {
      const docRef = doc(firestore, "qnaboard", id);
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

   /* 🚩댓글 새로고침 (props로 하위 컴포넌트에 넘겨줌)
    댓글 작성, 삭제 후 곧바로 렌더링되기 위함 */
  const fetchComments = async () => {
    // 마찬가지로 순서 정렬
    const q = query(
      collection(firestore, 'comments'),
      where('id', '==', id),
      orderBy('createAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const commentData = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      docId: doc.id,
    }));
    //댓글 상태 변경
    setComments(commentData);
  };

  
  useEffect(() => {
    fetchComments();
  }, [id]); // id가 바뀔 때마다 댓글 다시 불러오기

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
        {/* 🚩 마찬가지로 댓글 작성자 본인만 수정 삭제 가능. */}
        {isMine ? (<>
          <Link to={`/qna/edit/${id}`}>
            <button type="button" className="btn btn-primary1">수정</button>
          </Link>
          <button type="button" className="btn btn-primary2"
            onClick={postDelete}>삭제</button>

        </>) : (<>

          <Link to="/qna" className="btn btn-secondary">목록</Link>
        </>)}
        </div>
      </form>
    </div>

    {/* 댓글 작성 버튼 */}
    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#commentModal">
      댓글 작성
    </button>
    {/* 🚩useParams으로 가져온 게시물 고유 id */}
    <CommentModal id={id} fetchComments={fetchComments} />
    {/* useState 댓글 상태 */}
    <CommentList comments={comments} fetchComments={fetchComments} />
  </>); 
}
export default QnARead; 