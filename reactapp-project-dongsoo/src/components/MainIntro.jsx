//웹 애플리케이션 소개
function MainIntro(props) {

  return (<>
    <div className="row gx-4 gx-lg-5 align-items-center my-5">
      <div className="col-lg-7"><img className="img-fluid rounded mb-4 mb-lg-0"
        src="../images/mainphoto.jpg" alt="..." /></div>
      <div className="col-lg-5">
          <h1 className="font-weight-light">✈오디가디🛫</h1>
          <p>"오디가디"은 여행 정보를 공유하는 플랫폼입니다. 여러분의 여행 일정, 체험한 어트렉션,
            여행지 맛집 후기를 공유해보세요. 성향에 맞는 여행지도 추천을 위해 회원가입할때 
            MBTI를 꼭 알려주세요.😁
          </p>
      </div>
    </div>
    <div className="row gx-4 gx-lg-5">
      <div className="col-md-4 mb-5">
          <div className="card h-100">
              <div className="card-body">
                  <h2 className="card-title">Card One</h2>
                  <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.</p>
              </div>
              <div className="card-footer">More Info</div>
          </div>
      </div>
      <div className="col-md-4 mb-5">
          <div className="card h-100">
              <div className="card-body">
                  <h2 className="card-title">Card Two</h2>
                  <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod tenetur ex natus at dolorem enim! Nesciunt pariatur voluptatem sunt quam eaque, vel, non in id dolore voluptates quos eligendi labore.</p>
              </div>
              <div className="card-footer">More Info</div>
          </div>
      </div>
      <div className="col-md-4 mb-5">
          <div className="card h-100">
              <div className="card-body">
                  <h2 className="card-title">Card Three</h2>
                  <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.</p>
              </div>
              <div className="card-footer">More Info</div>
          </div>
      </div>
  </div>
  </>); 
}

export default MainIntro;