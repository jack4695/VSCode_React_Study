import {Link} from 'react-router-dom';


function View(props) {
  return (<>
    <header>
      <h2>게시판-읽기</h2>
   </header>
   <nav>
      {/* <a href="/list">목록</a>&nbsp;
      <a href="/edit">수정</a>&nbsp;
      <a href="/delete">삭제</a> */}
      <Link to="/list">목록</Link>&nbsp;
      <Link to="/edit">수정</Link>&nbsp;
      <Link to="/delete">삭제</Link>
   </nav>
   <article>
    <table id="boardTable">
      <colgroup>
        <col width="30%" /><col width="*" />
      </colgroup>
      <tbody>
        <tr>
          <th>작성자</th>
          <th>성유겸</th>
        </tr>
        <tr>
          <th>제목</th>
          <th>오늘은 React 공부하는날</th>
        </tr>
        <tr>
          <th>날짜</th>
          <th>2023-05-05</th>
        </tr>
        <tr>
          <th>내용</th>
          <th>열심히 해봅시당<br />열공 합시당</th>
        </tr>
      </tbody>
    </table>
   </article>
  </>);
}
export default View;