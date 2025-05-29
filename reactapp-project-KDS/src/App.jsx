import {Routes, Route} from 'react-router-dom';



//상단 네비게이션
function Navbar(props) {


  return (<>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container px-5">
          <a class="navbar-brand" href="#!">🚗여행 플랫폼</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span></button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li class="nav-item"><a class="nav-link active" aria-current="page" href="#!">
                    홈</a></li>
                  <li class="nav-item"><a class="nav-link" href="#!">로그인</a></li>
                  <li class="nav-item"><a class="nav-link" href="#!">회원가입</a></li>
                  <li class="nav-item"><a class="nav-link" href="#!">게시판</a></li>
                  <li class="nav-item"><a class="nav-link" href="#!">채팅방</a></li>
              </ul>
          </div>
      </div>
  </nav>
  </>); 
}

//웹 애플리케이션 소개
function HeadingRow(props) {


  return (<>
    <div class="row gx-4 gx-lg-5 align-items-center my-5">
      <div class="col-lg-7"><img class="img-fluid rounded mb-4 mb-lg-0"
        src="../images/mainphoto.jpg" alt="..." /></div>
      <div class="col-lg-5">
          <h1 class="font-weight-light">✈여행 플랫폼🛫</h1>
          <p>여행플렛폼은 여행 정보를 공유하는 플랫폼입니다. 여러분의 여행 일정, 체험한 어트렉션,
            여행지 맛집 후기를 공유해보세요. 성향에 맞는 여행지도 추천을 위해 회원가입할때 
            MBTI를 꼭 알려주세요.😁
          </p>
          <a class="btn btn-primary" href="#!">Call to Action!</a>
      </div>
    </div>
  </>); 
}

function CalltoAction(props) {


  return (<>
    <div class="card text-white bg-secondary my-5 py-4 text-center">
        <div class="card-body"><p class="text-white m-0">This call to action card is a great place to showcase some important information or display a clever tagline!</p></div>
    </div>
  </>); 
}


function ContentRow(props) {


  return (<>
    <div class="row gx-4 gx-lg-5">
      <div class="col-md-4 mb-5">
          <div class="card h-100">
              <div class="card-body">
                  <h2 class="card-title">Card One</h2>
                  <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.</p>
              </div>
              <div class="card-footer"><a class="btn btn-primary btn-sm" href="#!">More Info</a></div>
          </div>
      </div>
      <div class="col-md-4 mb-5">
          <div class="card h-100">
              <div class="card-body">
                  <h2 class="card-title">Card Two</h2>
                  <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod tenetur ex natus at dolorem enim! Nesciunt pariatur voluptatem sunt quam eaque, vel, non in id dolore voluptates quos eligendi labore.</p>
              </div>
              <div class="card-footer"><a class="btn btn-primary btn-sm" href="#!">More Info</a></div>
          </div>
      </div>
      <div class="col-md-4 mb-5">
          <div class="card h-100">
              <div class="card-body">
                  <h2 class="card-title">Card Three</h2>
                  <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.</p>
              </div>
              <div class="card-footer"><a class="btn btn-primary btn-sm" href="#!">More Info</a></div>
          </div>
      </div>
  </div>
  </>); 
}

function Footer(props) {


  return (<>
    <footer class="py-5 bg-dark">
        <div class="container px-4 px-lg-5"><p class="m-0 text-center text-white">Copyright &copy; Your Website 2023</p></div>
    </footer>
</>); 
}


function App() {

  return (<>
    <Routes>
      <Route path='/' element={<Navbar />}/>
      <Route path='' element={<HeadingRow />}/>
      <Route path='' element={<CalltoAction />}/>
      <Route path='' element={<Footer />}/>
    </Routes>



    {/* <Navbar />
    <HeadingRow />
    <CalltoAction />
    <ContentRow />
    <Footer /> */}
  </>)
}

export default App
