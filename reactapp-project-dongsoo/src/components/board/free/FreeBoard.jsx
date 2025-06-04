import { useEffect, useState } from 'react';
import './FreeBoard.css';
import { Link } from 'react-router-dom';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { firestore } from '../../../firestoreConfig';
import { Outlet } from 'react-router-dom';

// 🚩 List(리스트)에 해당합니다.
function FreeBoard(props) {

  const {formatDate} = props;

  const [posts, setPosts] = useState([]); // 게시물 목록을 담을 상태 변수

  // 🚩 페이징 처리를 위한 변수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const postsPerPage = 5;                       // 한 페이지당 게시글 수

  // 게시물 데이터 가져오기
  useEffect(() => {
    const getBoardData = async () => {
      // 🚩쿼리를 이용하여 정렬된 데이터를 가져옴
      const q = query(collection(firestore, "freeboard"), orderBy("createAt", "desc"));
        const querySnapshot = await getDocs(q);

        const fetchedPosts = [];
        querySnapshot.forEach((doc) => {

          const data = doc.data();
          fetchedPosts.push({
            id: doc.id, // 문서 ID (게시글의 고유 ID)
            title: data.title,
            writer: data.writer,
            content: data.content, // 내용도 가져올 수 있음
            createAt: data.createAt, // createAt으로 필드명 일치
          });
        });

        setPosts(fetchedPosts); // 가져온 게시물 목록으로 상태 업데이트
        console.log('데이터 가져옴', fetchedPosts);
    };
    getBoardData();
  }, []);

  // 🚩 페이징 처리

  /* 만약에 currentPage = 2, postsPerPage = 5
      -> 마지막 게시글의 '인덱스'는 10번째 */
  const indexOfLastPost = currentPage * postsPerPage;
  // 10 - 5 => 페이지에서 보여줘야 할 게시글은 5번부터 5개
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // 보여줄 만큼만 자르기
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
  // 총 페이지 수 계산, ceil(올림처리)
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // 페이지 번호 배열 생성
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="board-container">
      <h2 className="board-title">자유게시판</h2>
      
      <table className="board-table">
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => {
          return (
          <tr key={post.id}>
            <td><Link to={`read/${post.id}`}>{post.title}</Link></td>
            <td>{post.writer}</td>
            <td>{formatDate(post.createAt)}</td>
          </tr>
          )
          })}
        </tbody>
      </table>

      {/* 글쓰기 버튼 */}
      <div className="write-btn-box">
        <Link to="/free/write" className="btn btn-primary">글쓰기</Link>
      </div>

      {/* 페이지네이션 */}
      <div className="pagination">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >&laquo;</button>

        {pageNumbers.map((num) => (
          <button
            key={num}
            className={currentPage === num ? 'active' : ''}
            onClick={() => setCurrentPage(num)}
          >
            {num}
          </button>
        ))}

        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >&raquo;</button>
      </div>
      <Outlet />
    </div>
  );
}

export default FreeBoard;
