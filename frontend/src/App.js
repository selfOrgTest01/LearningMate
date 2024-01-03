import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import Test from './pages/Test';
import Home from './pages/Home';
import Userlist from './pages/Userlist';
import ParentComponent from './utils/ParentComponent';
import WorkspaceLayout from './layouts/WorkspaceLayout';



function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/test" element={<Test />} />
        <Route path="/userlist" element={<Userlist />} />
        <Route path="/ParentComponent" element={<ParentComponent />} />
        <Route path="/WorkspaceLayout" element={<WorkspaceLayout />} />
      
      
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

