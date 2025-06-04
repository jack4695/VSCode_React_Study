import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {firestore} from '../../../firestoreConfig';
import {addDoc, collection} from 'firebase/firestore';
import './FreeWrite.css'; 

function FreeWrite() {

  const navigate = useNavigate();
  
  const [formState, setFormState] = useState({
    title: '',
    writer: '',
    content: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState((prev)=> ({...prev, [id] : value}) );
  }

  
  // 🚩 로컬스토리지에 저장된 user ID를 formState.writer에 설정
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"));
    if (userId) {
      setFormState((prev) => ({
        ...prev,
        writer: userId,
      }));
    }
    
  }, []);


  // 폼 제출 핸들러
  const posting = async (e) => {
    e.preventDefault();

   /*  🚩 setDoc이 아닌 addDoc을 사용 -> 자동으로 문서 ID를 생성.
    해당 문서 ID는 수정, 삭제 등의 기능에서 사용함. */
    await addDoc(collection(firestore, 'freeboard'), {
      title: formState.title,
      writer: formState.writer,
      content: formState.content,
      createAt: new Date(),
    })

    alert('글 작성이 완료되었습니다!😁');
    navigate('/free');
  };

  return (
    <div className="write-container">
      <h2 className="write-title">글쓰기</h2>
      <form onSubmit={posting} className="write-form">
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={formState.title}
            onChange={(e) => handleInputChange(e)}
            required
            placeholder="제목을 입력하세요."
          />
        </div>
        <div className="form-group">
          <label htmlFor="writer">작성자</label>
          <input
            type="text"
            id="writer"
            value={formState.writer}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            rows="10"
            value={formState.content}
            onChange={(e) => handleInputChange(e)}
            required
            placeholder="내용을 입력하세요."
          ></textarea>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">등록</button>
          <Link to="/free" className="btn btn-secondary">목록</Link>
        </div>
      </form>
    </div>
  );
}

export default FreeWrite;