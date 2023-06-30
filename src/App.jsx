import './App.css';
import GlobalStyle from './GlobalStyle';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Mypage from './pages/Mypage/Mypage';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { useDispatch } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user !== null) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        dispatch({ type: 'SUCESS_USER_LOGIN', payload: { user: user, store: docSnap.data() } });
      }
    });
  }, []);

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
