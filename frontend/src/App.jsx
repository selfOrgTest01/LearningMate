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

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/user-list" element={<UserListPage />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
