
import { useState, useEffect } from 'react';
import './CommentModal.css';
import { addDoc, collection } from 'firebase/firestore';
import {firestore} from '../../../firestoreConfig';


const CommentModal = ({ id, fetchComments }) => {

  const [writer, setWriter] = useState('');
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const nowUser = localStorage.getItem("user");
    if (nowUser) {
      // 🚩 현재 로그인한 유저의 id가 작성자명에 자동입력.
      setWriter(nowUser);
    }
  }, []);

  // 🚩 댓글 작성
  const addComment = async(e) => {
    e.preventDefault();
    // 🚩 게시물 작성과 마찬가지로 addDoc 사용
    await addDoc(collection(firestore, 'comments'), {
      id,
      writer: writer,
      comment: commentText,
      createAt: new Date(),
    })


    setCommentText('');
    alert('댓글 작성이 완료되었습니다!😁');
    // 🚩작성 후 패치
    fetchComments();
  }



  return (<>

    {/* 댓글 작성 Modal */}
    <div className="modal fade" id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
      <div className="modal-dialog">
          <div className="modal-content">
              <div className="modal-header">
                  <h5 className="modal-title" id="commentModalLabel">댓글 작성</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                  {/* 작성자명 입력 상자 추가 */}
                  <div className="mb-3">
                      <label htmlFor="commentAuthor" className="htmlForm-label">작성자명</label>
                      <input type="text" className="htmlForm-control" id="commentAuthor" placeholder="이름을 입력하세요"
                        value={writer} readOnly/>
                  </div>
                  {/* 댓글 입력 상자 */}
                  <label htmlFor="commentContent" className="htmlForm-label">댓글 내용</label>
                  <textarea className="htmlForm-control" id="commentContent" rows="3" placeholder="댓글을 입력하세요"
                    value={commentText} onChange={(e)=>setCommentText(e.target.value)}></textarea>
              </div>
              <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                   onClick={addComment}
                   >작성</button>
              </div>
          </div>
      </div>
    </div>
  </>);
};

export default CommentModal;
