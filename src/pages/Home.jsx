import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { auth, db, storage } from '../firebase';
import { doc, getDocs, setDoc, addDoc, updateDoc, collection, query } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { StButton, ButtonWrap } from '../components/Button';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setContents('');
    setSelectedFile(null);
  };

  const [post, setPost] = useState([]);

  // 아이디 별로 객체로 저장???????
  const dispatch = useDispatch();
  const { sucessUserInfo, storeInfo, isUserTrue } = useSelector(state => state.userLogIn);

  const updatePost = async () => {
    const washingtonRef = doc(db, 'post-item', '필드명');

    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
      aa: [{ sfsdfd: 'sfsf' }, { sfsdf: 'sfsfsdf' }],
    });
  };

  // 데이터 리스트로 불러오기
  useEffect(() => {
    const initialPostItem = [];
    const fetchData = async () => {
      const queryValue = query(collection(db, 'post-item'));
      const querySnapshot = await getDocs(queryValue);

      querySnapshot.forEach(doc => {
        const data = {
          id: doc.id,
          ...doc.data(),
        };
        initialPostItem.push(data);
      });
      setPost(initialPostItem);

      console.log(sucessUserInfo.name);
      console.log(storeInfo);
      console.log(isUserTrue);
    };
    fetchData();
  }, []);

  const [contents, setContents] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const selectFile = event => setSelectedFile(event.target.files[0]);
  const contentsOnchange = event => setContents(event.target.value);

  const addPostHandler = async event => {
    event.preventDefault();

    try {
      const storageRef = ref(storage, auth.currentUser.uid);
      const uploadPost = uploadBytesResumable(storageRef, selectedFile);

      uploadPost.on(
        'state_changed',
        snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        error => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadPost.snapshot.ref).then(async downloadURL => {
            const imageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
            await uploadBytes(imageRef, selectedFile);
            const newUsers = { uid: userCredential.user.uid, email, password, nickname, name, profileImg: 'https://em-content.zobj.net/thumbs/160/apple/81/dog-face_1f436.png' };
            const collectionRef = collection(db,  'users', userCredential.user.uid), newUsers);
            await setDoc(collectionRef, {
              uid: auth.currentUser.uid,
              contents,
              photoURL: downloadURL,
            });
          });
        },
      );
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* 상단 게시글 등록 버튼  */}
      <div>
        <Navigation />
        <Banner>
          <div>
            <h1>Title banner here</h1>
          </div>
          <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </div>
          <button onClick={openModal}>글작성하기 일단여기 넣어둠요 ㅎㅎ</button>
        </Banner>
        <StCardContainer>
          {post.map(item => {
            return (
              <StCard key={item.id} onClick={openModal}>
                <StImg>
                  <img src={item.photoURL} alt="" />
                </StImg>
                <StContents>
                  <StId>{item.id}</StId>
                  <StContent>{item.contents}</StContent>
                </StContents>
              </StCard>
            );
          })}
        </StCardContainer>
        <Footer />
      </div>

      {/* modal */}
      <div>
        {isOpen && (
          <ModalBg onClick={closeModal}>
            <ModalContents
              onClick={event => {
                event.stopPropagation();
              }}
            >
              {/* 수정페이지에서 보여줘야함 */}
              {isUserTrue && (
                <ButtonWrap style={{ float: 'right' }}>
                  <StButton acColor={'#39ddc2'}>수정</StButton>
                  <StButton acColor={'#39ddc2'}>삭제</StButton>
                </ButtonWrap>
              )}

              {/* 모달 닫기 버튼 */}
              <StModalCloseButton onClick={closeModal}>
                <StSvg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                </StSvg>
              </StModalCloseButton>

              <form onSubmit={addPostHandler} style={{ clear: 'both', overflow: 'hidden' }}>
                <Label>사진 첨부 </Label>
                <Input type="file" onChange={selectFile} />
                <Label>내용</Label>
                <InputArea value={contents} onChange={contentsOnchange} />
                <StButton type="submit" style={{ float: 'right' }}>
                  등록
                </StButton>
                {/* <StButton onClick={updatePost}>update TEST</StButton> */}
              </form>
            </ModalContents>
          </ModalBg>
        )}
      </div>
    </div>
  );
};

export default Home;

// banner
const Banner = styled.div`
  width: 100vw;
  height: 600px;
  background-color: #f4f5f9;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  & > div {
    width: 50vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

// list style
const StCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  max-width: 1300px;
  min-width: 800px;
  margin: 0 auto;
  padding-top: 50px;
`;
const StCard = styled.div`
  border: none;
  width: calc((100% - 90px) / 4);
  cursor: pointer;
`;
const StImg = styled.div`
  width: 100%;
  overflow: hidden;
  img {
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
`;
const StContents = styled.div`
  padding: 20px 0;
`;
const StId = styled.h4`
  padding: 5px 0;
  font-weight: bold;
  font-size: 20px;
`;
const StContent = styled.p`
  padding: 5px 0;
  font-size: 14px;
`;

// modal
const ModalBg = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
`;
const ModalContents = styled.div`
  width: 60%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5%;
`;
// 모달 닫기 컴포넌트
const StModalCloseButton = styled.button`
  background-color: transparent;
  font-size: 38px;
  position: absolute;
  top: 6px;
  right: 0px;
`;
const StSvg = styled.svg`
  fill: #7c7c7c;
  transition: scale 0.3s;
  &:hover {
    fill: #000;
    scale: 1.2;
  }
`;
const Label = styled.label`
  width: 100%;
  display: block;
  line-height: 35px;
`;
const Input = styled.input`
  width: 100%;
  border: 0;
  border: solid 1px #ddd;
  padding: 10px;
  border-radius: 5px;
`;
const InputArea = styled.textarea`
  width: 100%;
  height: 300px;
  border: 0;
  border: solid 1px #ddd;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 25px;
`;
