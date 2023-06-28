import './App.css';
import GlobalStyle from './GlobalStyle';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Mypage from './pages/Mypage/Mypage';
// import SignIn from './pages/SignIn';
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div>
      <GlobalStyle />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signin" element={<SignIn />} /> */}
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </div>
  );
}

export default App;
