//작성
function ArticleWrite(props) {
  return (
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
  )
}

export default ArticleWrite;