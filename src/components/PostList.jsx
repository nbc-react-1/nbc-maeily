import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { db } from '../firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';

const PostList = () => {
  const [post, setPost] = useState([]);
  const [reload, setReload] = useState(false);

  //리덕스 유저정보 .uid //파이어스토어
  const { storeInfo } = useSelector(state => state.userLogIn);
  const { uid, nickname } = storeInfo;
  console.log(uid, ' / ', nickname);
  const allUser = [];

  // 데이터 리스트로 불러오기
  useEffect(() => {
    const fetchData = async () => {
      const queryValue = query(collection(db, 'post-item'), orderBy('date', 'desc'));
      const unsubscribe = onSnapshot(queryValue, querySnapshot => {
        const initialPostItem = querySnapshot.docs.map(doc => ({
          postId: doc.id,
          ...doc.data(),
        }));
        setPost(initialPostItem);
      });
      console.log(post);
      return unsubscribe;
    };
    console.log();

    fetchData();
  }, [reload]);

  return (
    <StCardContainer>
      {post.map(item => (
        <StCard key={item.id}>
          <StImg>
            <img src={item.photoURL} alt="" />
            <StHover>
              <StId>{item.id}</StId>
              <StContent>{item.contents}</StContent>
              <StNick>{item.nickName}</StNick>
            </StHover>
          </StImg>
        </StCard>
      ))}
    </StCardContainer>
  );
};

export default PostList;

const StCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  width: 1300px;
  min-width: 800px;
  padding: 50px 0;

  margin: 0 auto;
  flex-direction: column;
  align-content: flex;
  height: 3000px;
  overflow: hidden;
`;

const StCard = styled.div`
  border: none;
  width: calc((100% - 90px) / 4);
  position: relative;

  flex: 0 0 150px;
  flex-basis: 100px;
`;

const StImg = styled.div`
  overflow: hidden;

  img {
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
  }

  &:hover {
    opacity: 1;
  }
`;

const StHover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding: 20px;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const StId = styled.h4`
  font-weight: bold;
  font-size: 1.4rem;
  margin-bottom: 10px;
`;
const StContent = styled.p`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;
const StNick = styled.p`
  font-size: 0.9rem;
`;
