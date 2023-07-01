import React, { useEffect, useState } from 'react';
import { keyframes, styled } from 'styled-components';
import { collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { useSelector } from 'react-redux';
import EditPostModal from './modal/EditPostModal';

function MyPosts() {
  const { storeInfo, isUserTrue } = useSelector(state => state.userLogIn);
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState([]);

  const [itemId, setItemId] = useState('');
  const [editList, setEditList] = useState(false);
  const [editItemId, setEditItemId] = useState('');
  const [updatePhoto, setUpdatePhoto] = useState(false);
  const [originalData, setOriginalData] = useState({});

  //모달인풋사진관련
  const [imgFile, setImgFile] = useState('');

  const openModal = () => {
    setItemId('');
    setEditList(false);
    setIsOpen(!isOpen);
  };
  const closeModal = () => {
    setIsOpen(!isOpen);
  };

  // 게시글 불러오기
  useEffect(() => {
    const initialPostItem = [];
    const fetchData = async () => {
      const queryValue = query(collection(db, 'post-item'), orderBy('date', 'desc'));
      const unsubscribe = onSnapshot(queryValue, querySnapshot => {
        const initialPostItem = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPost(initialPostItem);
      });
      return unsubscribe;
    };
    fetchData();
    console.log('불러오기완료');
  }, [updatePhoto]);

  // 게시글 삭제
  const deletePost = async () => {
    setItemId('');
    setEditList(!editList);
    const deletePostConfirm = window.confirm('정말로 삭제하시겠습니까?');
    if (deletePostConfirm) {
      await deleteDoc(doc(db, 'post-item', editItemId))
        .then(() => {
          setUpdatePhoto(!updatePhoto);
        })
        .catch(error => {
          console.log('error', error.code);
        });
    }
  };

  // edit 말풍선 열기
  const openBubble = item => {
    setEditItemId(item.id);
    setImgFile(item.photoURL);
    if (editList) {
      setItemId('');
      setEditList(!editList);
    } else {
      setItemId(item.id);
      setEditList(!editList);
    }
  };

  const originData = [];
  useEffect(() => {
    const read = async () => {
      // 모든 문서 불러오기
      const queryVal = query(collection(db, 'post-item'), orderBy('date', 'desc'));
      const querySnapshot = await getDocs(queryVal);
      querySnapshot.forEach(doc => {
        const data = {
          postId: doc.id,
          ...doc.data(),
        };
        originData.push(data);
      });
      console.log('originData', originData);
      const newCon = originData.filter(item => {
        console.log('여기여기 ', editItemId);
        return item.postId === editItemId;
      });
      setOriginalData(...newCon);
      console.log('originalData', originalData);
    };
    read();
  }, [editList]);

  return (
    <StCardContainer>
      {post
        .filter(item => {
          return item.uid === storeInfo.uid;
        })
        .map(item => {
          return (
            <StCard key={item.id}>
              <StImg id="img-wrap">
                <img src={item.photoURL} alt="" />
              </StImg>
              <StContents>
                <StContentDate>{item.date}</StContentDate>
                <StContent>{item.contents}</StContent>
              </StContents>
              <StEditButton>
                <StEditButtonIcon onClick={() => openBubble(item)}>
                  <SettingSvg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512">
                    <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
                  </SettingSvg>
                </StEditButtonIcon>
                {itemId === item.id ? (
                  <StEditBubble>
                    <ul>
                      <li onClick={openModal}>수정</li>
                      <li onClick={deletePost}>삭제</li>
                    </ul>
                  </StEditBubble>
                ) : null}
              </StEditButton>
            </StCard>
          );
        })}
      <EditPostModal
        editItemId={editItemId}
        isUserTrue={isUserTrue}
        isOpen={isOpen}
        closeModal={closeModal}
        originalData={originalData}
        setOriginalData={setOriginalData}
        //모달인풋사진관련
        imgFile={imgFile}
        setImgFile={setImgFile}
      />
    </StCardContainer>
  );
}

export default MyPosts;
// list style
const StCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  max-width: 1300px;
  min-height: 500px;
  margin: 0 auto;
  padding: 50px 0;
  @media only screen and (max-width: 890px) {
    gap: 20px;
  }
`;
const StCard = styled.div`
  border: none;
  width: calc((100% - 90px) / 4);
  position: relative;
  // background-image: url(${props => props.url});
  // background-position: center;
  // background-size: cover;
  transition: all 0.3s;
  @media only screen and (max-width: 1200px) {
    width: calc((100% - 60px) / 3);
  }
  @media only screen and (max-width: 890px) {
    width: calc((100% - 20px) / 2);
  }
`;
const StImg = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;

  img {
    object-fit: cover;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  @media only screen and (max-width: 590px) {
    height: 170px;
  }
`;
const StContents = styled.div`
  width: 100%;
  padding: 12px 0 20px;
  @media only screen and (max-width: 890px) {
    padding: 8px 0 5px;
  }
`;
const StId = styled.h4`
  width: 100%;
  padding: 5px 0;
  font-weight: bold;
  font-size: 20px;
  display: none;
`;
const StContent = styled.p`
  width: 100%;
  padding: 5px 0;
  font-size: 14px;
`;
const StContentDate = styled.p`
  width: 100%;
  padding: 0 0 5px;
  font-size: 12px;
  color: #a5a5a5;
`;
const StEditButton = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
`;
const StEditBubble = styled.div`
  position: relative;
  top: 8px;
  width: 90%;
  margin: 0 5%;
  background: #ffffff;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  &::after {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 0 10px 10px;
    border-color: #ffffff transparent;
    display: block;
    width: 0;
    z-index: 1;
    top: -10px;
    right: 7px;
  }
  ul {
    padding: 10px 0;
    li {
      cursor: pointer;
      width: 100%;
      text-align: center;
      padding: 15px;
      &:hover {
        background-color: #d8d8d8;
      }
    }
  }
`;

const StEditButtonIcon = styled.div`
  position: relative;
  text-align: right;
  top: 0;
  right: 0;
  margin: 10px;
`;
const rotation = keyframes`
    100%{
    transform:rotate(180deg);
  }
`;
const SettingSvg = styled.svg`
  cursor: pointer;
  fill: #fff;
  &:hover {
    animation: ${rotation} 0.6s linear;
  }
`;
