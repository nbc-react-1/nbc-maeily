import './App.css';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Mypage from './pages/Mypage/Mypage';
import SignIn from './pages/SignIn';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { app } from './firebase';

function App() {
  useEffect(() => {
    console.log('app', app);
  });
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
