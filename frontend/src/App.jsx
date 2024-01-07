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
import Courses from './pages/Courses';
import MeetList from './pages/meets/MeetList';
import MeetDetail from './pages/meets/MeetDetail';
import MeetInsert from './pages/meets/MeetInsert';
import MeetUpdate from './pages/meets/MeetUpdate';
// 나현
import Mypage from './pages/mypage/Mypage';
import MyInfo from './pages/mypage/MyInfo';
import MyReviews from './pages/mypage/MyReviews';
import LikeMeets from './pages/mypage/LikeMeets';
import LikeCourses from './pages/mypage/LikeCourses';
import WaitingMeets from './pages/mypage/WaitingMeets';
import MyMeets from './pages/mypage/MyMeets';
import MyCourses from './pages/mypage/MyCourses';
import Withdraw from './pages/mypage/Withdraw';

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
          <Route path='/courses' element={<Courses />} />
          <Route path='/meets' element={<MeetList />} />
          <Route path='/detail/:id' element={<MeetDetail />} />
          <Route path='/insert' element={<MeetInsert />} />
          <Route path='/update' element={<MeetUpdate />} />
        </Route>
        <Route>
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/my-info' element={<MyInfo />} />
          <Route path='/my-reviews' element={<MyReviews />} />
          <Route path='/like-meets' element={<LikeMeets />} />
          <Route path='/like-courses' element={<LikeCourses />} />
          <Route path='/waiting-meets' element={<WaitingMeets />} />
          <Route path='/my-meets' element={<MyMeets />} />
          <Route path='/my-courses' element={<MyCourses />} />
          <Route path='/withdraw' element={<Withdraw />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
