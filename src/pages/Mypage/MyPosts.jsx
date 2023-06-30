import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import EditPostModal from '../../components/modal/EditPostModal';

function MyPosts() {
  const { storeInfo, isUserTrue } = useSelector(state => state.userLogIn);
  const [editList, setEditList] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState([]);
  const [contents, setContents] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [itemId, setItemId] = useState('');

  const openModal = () => {
    setItemId('');
    setEditList(false);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setContents('');
    setSelectedFile(null);
  };

  // console.log('mypage', storeInfo);
  // console.log('postInfo', post);
  const { profileImg, nickname } = storeInfo;

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
    };
    fetchData();
  }, []);

  const openBubble = id => {
    if (editList) {
      setItemId('');
      setEditList(!editList);
    } else {
      setItemId(id);
      setEditList(!editList);
    }
  };
  return (
    <StCardContainer>
      {post
        .filter(item => {
          return item.uid === storeInfo.uid;
        })
        .map(item => {
          return (
            <StCard key={item.id}>
              <StImg>
                <img src={item.photoURL} alt="" />
              </StImg>
              <StContents>
                <StId>{item.id}</StId>
                <StContent>{item.contents}</StContent>
              </StContents>
              <StEditButton>
                <StEditButtonIcon onClick={() => openBubble(item.id)}>X</StEditButtonIcon>
                {itemId === item.id ? (
                  <StEditBubble>
                    <ul>
                      <li onClick={openModal}>수정</li>
                      <li>삭제</li>
                    </ul>
                  </StEditBubble>
                ) : null}
              </StEditButton>
            </StCard>
          );
        })}
      <EditPostModal isUserTrue={isUserTrue} isOpen={isOpen} closeModal={closeModal} selectedFile={selectedFile} setSelectedFile={setSelectedFile} contents={contents} setContents={setContents} post={post} setPost={setPost} />
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
  min-width: 800px;
  min-height: 500px;
  margin: 0 auto;
  padding-top: 50px;
`;
const StCard = styled.div`
  border: none;
  width: calc((100% - 90px) / 4);
  cursor: pointer;
  position: relative;
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
  width: 100%;
  padding: 20px 0;
`;
const StId = styled.h4`
  width: 100%;
  padding: 5px 0;
  font-weight: bold;
  font-size: 20px;
`;
const StContent = styled.p`
  width: 100%;
  padding: 5px 0;
  font-size: 14px;
`;
const StEditButton = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 90%;
  margin-right: 5%;
`;
const StEditButtonIcon = styled.div`
  position: relative;
  text-align: right;
  top: 0;
  right: 5px;
  margin: 10px;
`;
const StEditBubble = styled.div`
  position: relative;
  width: 100%;
  padding: 0px;
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
    right: 15px;
  }
  ul {
    padding: 10px 0;
    li {
      width: 100%;
      text-align: center;
      padding: 15px;
    }
  }
`;
