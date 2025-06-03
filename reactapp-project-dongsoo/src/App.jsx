
import { Outlet, Route, Routes, useParams } from 'react-router-dom';
import './index.css'

import TopNavi from './components/TopNavi';
import Footer from './components/Footer';
import MainIntro from './components/MainIntro';
import Chat from './components/Chat';

import Regist from './components/members/regist';
import Login from './components/members/Login';
import Edit from './components/members/Edit';

import FreeBoard from './components/board/free/FreeBoard';
import FreeWrite from './components/board/free/FreeWrite';
import FreeRead from './components/board/free/FreeRead';
import FreeEdit from './components/board/free/FreeEdit';

import QnABoard from './components/board/qna/QnABoard';
import QnARead from './components/board/qna/QnARead';
import QnAEdit from './components/board/qna/QnAEdit';
import QnAWrite from './components/board/qna/QnAWrite';


import DataBoard from './components/board/data/DataBoard';


// 🚩레이아웃
const Layout = () => {
  return (<>
    <div>
    <header><TopNavi /></header>
    <article>
      <Outlet />
    </article>
    <footer><Footer /></footer>
    </div>
  </>);
}

// 🚩게시판 날짜 및 시간을 표현하는 함수, 자식컴포넌트에 props로 전달하여 사용
const formatDate = (timestamp) => {
  const now = new Date();
  const target = timestamp.toDate();

  const pad = (n) => n.toString().padStart(2, '0');

  const isSameDay =
    now.getFullYear() === target.getFullYear() &&
    now.getMonth() === target.getMonth() &&
    now.getDate() === target.getDate();

  const year = target.getFullYear();
  const month = pad(target.getMonth() + 1);
  const day = pad(target.getDate());
  const hour = pad(target.getHours());
  const minute = pad(target.getMinutes());

  return isSameDay
    ? `${hour}:${minute}`
    : `${year}-${month}-${day}`;
};



function App() {

  return (<>

    <Routes>
      <Route path='/' element={<Layout />} >

        <Route index element={<MainIntro />} />
        <Route path='/regist' element={<Regist />} />
        <Route path='/login' element={<Login />} />
        <Route path='/edit' element={<Edit />} />

        {/* 자유게시판 */}
        <Route path='/free' element={<FreeBoard formatDate={formatDate} />} />
          <Route path='/free/read/:id' element={<FreeRead />} />
          <Route path='/free/edit/:id' element={<FreeEdit />} />
          <Route path='/free/write' element={<FreeWrite />} />

        {/* QnA게시판 */}
        <Route path='/qna' element={<QnABoard formatDate={formatDate} />} />
          <Route path='/qna/read/:id' element={<QnARead />} />
          <Route path='/qna/edit/:id' element={<QnAEdit />} />
          <Route path='/qna/write' element={<QnAWrite />} />


        <Route path='/data' element={<DataBoard />} />
        <Route path='/chat' element={<Chat />} />

      </Route>
    </Routes>

    </>)
}

export default App
