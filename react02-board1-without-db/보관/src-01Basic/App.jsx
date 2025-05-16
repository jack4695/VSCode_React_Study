
function Header(props) {
  return (
    <header>
      <h2>게시판-목록</h2>
    </header>
  )
}
function Nav() {
  return (
    <nav>
      <a href="/">글쓰기</a>
   </nav>
  )
}

function Article() {
  return (
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
          <th class="cen">1</th>
          <th>오늘은 React 공부하는날</th>
          <th class="cen">낙짜쌤</th>
          <th class="cen">2030-05-05</th>
        </tr>
      </tbody>
    </table>
   </article>
  )
}

function App() {

  return (
    <div className="App"> 
      <Header></Header>
      <Nav></Nav>
      <Article></Article>
    </div>
  )
}

export default App
