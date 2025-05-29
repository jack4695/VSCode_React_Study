import {NavLink} from 'react-router-dom';
import {useState} from 'react';


// 상단 네비게이션
function TopNavi(props) {

  const [showBoardMenu, setShowBoardMenu] = useState(false);

  return (<>
    <nav>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container px-5">
          <a class="navbar-brand" href="#!">🚗오디가디</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span></button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                  <NavLink to='/'><li class="nav-item"><a class="nav-link active" aria-current="page" href="#!">
                    홈</a></li></NavLink>
                  <NavLink to='/login'><li class="nav-item"><a class="nav-link" href="#!">로그인</a></li></NavLink>
                  <NavLink to='/regist'><li class="nav-item"><a class="nav-link" href="#!">회원가입</a></li></NavLink>
                  {/* 게시판 메뉴 */}
                  <li className="nav-item dropdown"
                    onMouseEnter={() => setShowBoardMenu(true)}
                    onMouseLeave={() => setShowBoardMenu(false)}
                  >
                    <span className="nav-link dropdown-toggle" style={{ cursor: 'pointer' }}>
                      게시판
                    </span>
                    {showBoardMenu && (
                      <ul className="dropdown-menu show board-dropdown">
                        <li><NavLink className="dropdown-item" to="/free">자유게시판</NavLink></li>
                        <li><NavLink className="dropdown-item" to="/qna">QnA게시판</NavLink></li>
                        <li><NavLink className="dropdown-item" to="/data">자료게시판</NavLink></li>
                      </ul>
                    )}
                  </li>
                  <NavLink to='/chat'><li class="nav-item"><a class="nav-link" href="#!">채팅방</a></li></NavLink>
              </ul>
          </div>
      </div>
      </nav>
    </nav>
  </>);
}

export default TopNavi; 