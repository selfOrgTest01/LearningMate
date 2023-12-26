import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import Test from './pages/Test';
import Home from './pages/Home';
import Userlist from './pages/Userlist';
import { Workspace, WorkspaceRoutes } from './layouts/WorkSpace/index';
import Channel from './pages/Channel/index';
import DirectMessage from './pages/DirectMessage/index';



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
                <Route path='/Channel' element={<Channel />}></Route>
                <Route path='/DirectMessage' element={<DirectMessage />}></Route>
                
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
export default App;