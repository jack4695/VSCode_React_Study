function ViewComponent(props) {
  /**
  JSX는 HTML과 유사한 문법을 사용하지만, XML 문법을 따르므로 반드시
  쌍(Pair)를 이뤄야한다. 따라서 <input>태그도 종료태그를 사용하거나
  self-closing을 해줘야한다.
  Ex) <input /> 혹은 <input></input>
  */
  return(<>
    <header>
      <h2>게시판-읽기</h2>
   </header>
   <nav>
    <a href="/" onClick={(event) => {
      event.preventDefault();
      props.changeMode('list');
    }}>목록</a>&nbsp;&nbsp;
    <a href="/" onClick={(e)=>{
      alert('수정');
      e.preventDefault();
    }}>수정</a>&nbsp;&nbsp;
    <a href="/" onClick={(e)=>{
      alert('삭제');
      e.preventDefault();
    }}>삭제</a>
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
          {/* br태그도 self-closing으로 표현해야 한다. */}
          <th>열심히 해봅시당<br />열공 합시당</th>
        </tr>
      </tbody>
    </table>
   </article>
  </>)
}

export default ViewComponent;