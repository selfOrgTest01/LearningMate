import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpPage from './pages/SignupPage';
import SignInPage from './pages/SignInPage';
import Layout from './components/Layout';
import AboutPage from './pages/AboutPage';
import TestPage from './pages/TestPage';
import HomePage from './pages/HomePage';
import UserListPage from './pages/UserListPage';
import Mypage from './pages/Mypage';
import Courses from './pages/lectures/Courses';
import RegisterLecturePage from './pages/lectures/RegisterLecturePage';
import MeetList from './pages/meets/MeetList';
import MeetDetail from './pages/meets/MeetDetail';
import MeetInsert from './pages/meets/MeetInsert';
import MeetUpdate from './pages/meets/MeetUpdate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/sign-in' element={<SignInPage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/test' element={<TestPage />} />
          <Route path='/user-list' element={<UserListPage />} />
          <Route path='/mypage' element={<Mypage />} />
          {/* 중첩할때 앞에 /붙이면 에러나므로 주의할것 ex)/register(x) register(o) */}
          <Route path='/courses'>
            <Route index element={<Courses />} />
            <Route path='register' element={<RegisterLecturePage />}></Route>
          </Route>
          <Route path='/meets' element={<MeetList />} />
          <Route path='/detail/:id' element={<MeetDetail />} />
          <Route path='/insert' element={<MeetInsert />} />
          <Route path='/update' element={<MeetUpdate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
