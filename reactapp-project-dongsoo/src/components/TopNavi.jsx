import {NavLink, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';


// 상단 네비게이션
function TopNavi(props) {

  const navigate = useNavigate();

  const [showBoardMenu, setShowBoardMenu] = useState(false);

  const [inLogin, setInLogin] = useState(false);

  // 로그인 상태 확인. !!는 문자열이 있으면 true를 반환.
  useEffect(()=>{
    const storageUser = localStorage.getItem("user");
    setInLogin(!!storageUser);
  })

  // 로그아웃 함수
  const goLogout = () => {
    localStorage.clear();
    setInLogin(false);

    alert('로그아웃 성공')
    navigate('/');
  }

  return (<>
    <nav>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container px-5">
          <div className="navbar-brand" href="#!">🚗오디가디</div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span></button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  
                  <NavLink to='/'><li className="nav-item"><div className="nav-link active" aria-current="page" href="#!">
                    홈</div></li></NavLink>
                  
                  {inLogin ? (<>
                    <NavLink to='/edit'><li className="nav-item"><div className="nav-link" href="#!"
                      >내정보</div></li></NavLink>
                    <NavLink to='/'><li className="nav-item"><div className="nav-link" href="#!"
                      onClick={goLogout}>로그아웃</div></li></NavLink>
                  </>) : (<>
                    <NavLink to='/login'><li className="nav-item"><div className="nav-link" href="#!">로그인</div></li></NavLink>
                  <NavLink to='/regist'><li className="nav-item"><div className="nav-link" href="#!">회원가입</div></li></NavLink>
                  </>)}
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
                  <NavLink to='/chat'><li className="nav-item"><div className="nav-link" href="#!">채팅방</div></li></NavLink>
              </ul>
          </div>
      </div>
      </nav>
    </nav>
  </>);
}

export default TopNavi; 