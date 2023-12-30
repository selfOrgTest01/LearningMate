import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import Test from './pages/Test';
import Home from './pages/Home';
import Userlist from './pages/Userlist';
import Mypage from './pages/Mypage';
import Courses from './pages/Courses';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/signup' element={<Signup />}></Route>
                <Route path='/about' element={<About />}></Route>
                <Route path='/test' element={<Test />}></Route>
                <Route path='/userlist' element={<Userlist />}></Route>
                <Route path='/mypage' element={<Mypage />}></Route>
                <Route path='/courses' element={<Courses />}></Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
export default App;