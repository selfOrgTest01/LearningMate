import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpPage from './pages/SignupPage';
import SignInPage from './pages/SignInPage';
// import Header from './components/Header';
// import Footer from './components/Footer';
import Layout from './components/Layout';

import AboutPage from './pages/AboutPage';
import TestPage from './pages/TestPage';
import HomePage from './pages/HomePage';
import UserListPage from './pages/UserListPage';
import Mypage from './pages/Mypage';
import Courses from './pages/Courses';
// 민경
import MeetList from './pages/meets/MeetList';
import MeetDetail from './pages/meets/MeetDetail';
import MeetInsert from './pages/meets/MeetInsert';

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
          <Route path='/courses' element={<Courses />} />
          {/* 민경 */}
          <Route path='/meets' element={<MeetList />} />
          <Route path='/detail/:id' element={<MeetDetail />} />
          <Route path='/insert' element={<MeetInsert />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
