
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
import QnABoard from './components/board/qna/QnABoard';
import DataBoard from './components/board/data/DataBoard';
import FreeWrite from './components/board/free/FreeWrite';
import FreeRead from './components/board/free/FreeRead';



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
        <Route path='free' element={<FreeBoard formatDate={formatDate} />} />
          <Route path='free/read/:id' element={<FreeRead />} />
          <Route path='free/write' element={<FreeWrite />} />

        <Route path='/qna' element={<QnABoard />} />
        <Route path='/data' element={<DataBoard />} />
        <Route path='/chat' element={<Chat />} />

      </Route>
    </Routes>

    </>)
}

export default App
