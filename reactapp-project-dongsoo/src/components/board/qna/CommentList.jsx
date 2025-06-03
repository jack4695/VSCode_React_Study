import { useEffect, useState } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../../firestoreConfig';

import './CommentList.css';

function CommentList({ comments, fetchComments }) {


  // 댓글 삭제
    const commentDelete = async (id) => {
      const confirmDelete = window.confirm("댓글 삭제하시겠습니까?");
      if(!confirmDelete) {
        return;
      }
      else {
        await deleteDoc(doc(firestore, 'comments', id));
        alert('삭제되었습니다.🗑')
        fetchComments(); //삭제 후 패치
      }
  
    }

  return (
    <div className="comment-list">
      <h3>댓글 🗨️</h3>
      <ul>
        {comments.map((c) => (
          <li key={c.docId} className="comment-item">
            <strong>{c.writer}</strong> : {c.comment} <br />
            <button onClick={() => commentDelete(c.docId)}>삭제</button>
            <button onClick={() => commentDelete(c.docId)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
