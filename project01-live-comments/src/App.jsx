import { useState } from "react";

function BoardView(props) {
  return (<>
    {/* 게시판 열람 */}
    <div class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">댓글 작성 구현하기</h5>
        <p class="card-text">
            구현할 기능은 댓글작성, 좋아요, 수정, 삭제입니다. <br />
            기능 구현은 아래 댓글 작성부터 하면 됩니다. 
        </p>
      </div>
    </div>
  </>);
}

const CommentBtn = () => {
  return (<>
  {/* 댓글 작성 버튼 */}
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#commentModal">
      댓글 작성
    </button>
  </>);
}

function ModalWindow(props) {

  const [boardData, setBoardData] = useState([]);

  // 댓글 입력 함수
  const addPost = () => {
    let no = boardData.length + 1;
    let w = document.getElementById('commentAuthor').value ;
    let c = document.getElementById('commentContent').value ;
    let d = getCurrentDateTime() ;
    let l = 0 ;

    newBoard = {
      idx: no, writer: w, date: d,
      contents: c, likes: l
    }

    setBoardData([...boardData, newBoard])
  }


  return (<>
    {/* 댓글 작성 Modal */}
    <div class="modal fade" id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="commentModalLabel">댓글 작성</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  {/* 작성자명 입력 상자 추가 */}
                  <div class="mb-3">
                      <label for="commentAuthor" class="form-label">작성자명</label>
                      <input type="text" class="form-control" id="commentAuthor" placeholder="이름을 입력하세요" />
                  </div>
                  {/* 댓글 입력 상자 */}
                  <label for="commentContent" class="form-label">댓글 내용</label>
                  <textarea class="form-control" id="commentContent" rows="3" placeholder="댓글을 입력하세요"></textarea>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                  <button type="button" class="btn btn-primary"
                   onClick={addPost}>작성</button>
              </div>
          </div>
      </div>
    </div>
  </>); 
}

function CommentList(props) {

  // map으로 반복하는 함수

  return (<>
    {/* 댓글 목록 출력 */}
    <ul class="list-group mt-3">
        <li class="list-group-item">
            <div class="d-flex justify-content-between">
                <div class="d-flex align-items-center">
                    <strong>작성자이름</strong>
                    <small class="ms-2">날짜 시분초 시간까지</small>
                </div>
                <div>
                    <button className="btn btn-outline-success btn-sm">좋아요 (0)</button>
                    <button className="btn btn-outline-warning btn-sm">수정</button>
                    <button className="btn btn-outline-danger btn-sm">삭제</button>
                </div>
            </div>
            <p class="mt-2 mb-0">
                dadada
            </p>
        </li>
    </ul>
  </>); 
}

function App(props) {

  return (<>
    <div class="container mt-4">
      <BoardView />
      <CommentBtn />
      <ModalWindow addPost={props.addPost} />
      <CommentList boardData={boardData} />
    </div>
  </>);
}

export default App
