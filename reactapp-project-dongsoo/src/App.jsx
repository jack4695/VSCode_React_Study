
import { Outlet, Route, Routes } from 'react-router-dom';
import './index.css'

import TopNavi from './components/TopNavi';
import Footer from './components/Footer';
import MainIntro from './components/MainIntro';
import Chat from './components/Chat';

import Regist from './components/members/regist';
import Login from './components/members/Login';
import Edit from './components/members/Edit';

import Free from './components/board/Free';
import QnA from './components/board/QnA';
import Data from './components/board/Data';


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

function App() {

  return (<>
    <Routes>
      <Route path='/' element={<Layout />} >

        <Route index element={<MainIntro />} />
        <Route path='/regist' element={<Regist />} />
        <Route path='/login' element={<Login />} />
        <Route path='/edit' element={<Edit />} />
        <Route path='/free' element={<Free />} />
        <Route path='/qna' element={<QnA />} />
        <Route path='/data' element={<Data />} />
        <Route path='/chat' element={<Chat />} />

      </Route>
    </Routes>
    </>)
}

export default App
