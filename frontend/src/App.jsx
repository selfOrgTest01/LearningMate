import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpPage from './pages/SignupPage';
import SignInPage from './pages/SignInPage';
import Header from './components/Header';
import Footer from './components/Footer';
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
// 소영
import WorkSpace from './layouts/WorkSpace/index';
import ParentComponent from './utils/ParentComponent';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
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
        {/* 소영 */}
        <Route path='/workspace' element={<WorkSpace />} />
        <Route path='/ParentComponent' element={<ParentComponent />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
