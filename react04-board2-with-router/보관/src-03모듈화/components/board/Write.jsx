import {Link} from 'react-router-dom';

function Write(props) {
  return (<>
    <header>
      <h2>게시판-작성</h2>
   </header>
   <nav>
    {/* <a href="/list">목록</a> */}
    <Link to="/list">목록</Link>
   </nav>
   <article>
    <form>
    <table id="boardTable">
      <tbody>
        <tr>
          <th>작성자</th>
          <th><input type="text" name="writer" /></th>
        </tr>
        <tr>
          <th>제목</th>
          <th ><input type="text" name="title" /></th>
        </tr>
        <tr>
          <th>내용</th>
          <th><textarea name="contents" cols="22" rows="3"></textarea></th>
        </tr>
      </tbody>
    </table>
    <input type="submit" value="전송" />
    </form>
   </article>
  </>);
}

export default Write;