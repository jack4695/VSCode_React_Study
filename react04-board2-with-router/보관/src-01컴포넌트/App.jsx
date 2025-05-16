import {BrowserRouter} from 'react-router-dom';
import {Routes, Route, Link} from 'react-router-dom';


function List(props) {
  return (<>
    <header>
      <h2>게시판-목록</h2>
   </header>
   <nav>
    <a href="/write">글쓰기</a>
   </nav>
   <article>
    <table id="boardTable">
      <thead>
        <tr>
          <th>No</th>
          <th>제목</th>
          <th>작성자</th>
          <th>날짜</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th className="cen">1</th>
          <th><a href="/view/1">오늘은 React 공부하는날</a></th>
          <th className="cen">낙짜쌤</th>
          <th className="cen">2030-05-05</th>
        </tr>
      </tbody>
    </table>
   </article>
  </>);
}

function View(props) {
  return (<>
    <header>
      <h2>게시판-읽기</h2>
   </header>
   <nav>
    <a href="/list">목록</a>&nbsp;
    <a href="/edit">수정</a>&nbsp;
    <a href="/delete">삭제</a>
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

function Write(props) {
  return (<>
    <header>
      <h2>게시판-작성</h2>
   </header>
   <nav>
    <a href="/list">목록</a>
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

function NotFound() {
  return(
    <div>
      <h2>Not Found</h2>
      <p>
        페이지를 찾을 수 없습니다. ㅜㅜ <br />
      </p>
    </div>
  )
}

function App() {

  return (
    <div className="App">
      <List></List>
      <View></View>
      <Write></Write>
      <NotFound></NotFound>
    </div>
  )
}

export default App
