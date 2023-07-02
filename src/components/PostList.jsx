import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { db } from '../firebase';
import { collection, query, onSnapshot, orderBy, getDocs } from 'firebase/firestore';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import { where } from 'firebase/firestore';
import Like from './Like';

const PostList = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);

  // 데이터 리스트로 불러오기
  useEffect(() => {
    console.log('postList');
    const fetchData = async () => {
      const queryValue = query(collection(db, 'post-item'), orderBy('date', 'desc'));
      const unsubscribe = onSnapshot(queryValue, querySnapshot => {
        const initialPostItem = querySnapshot.docs.map(doc => ({
          postId: doc.id,
          ...doc.data(),
        }));
        setPost(initialPostItem);
      });
      return unsubscribe;
    };
    fetchData();
  }, []);

  const detailPage = async item => {
    const q = query(collection(db, 'users'), where('uid', '==', item.uid));
    const querySnapshot = await getDocs(q);
    let postProfileImg;
    await querySnapshot.forEach(doc => {
      postProfileImg = doc.data().profileImg;
    });
    navigate('/detail', {
      state: {
        uid: item.uid,
        postId: item.postId,
        nickName: item.nickName,
        contents: item.contents,
        photoURL: item.photoURL,
        date: item.date,
        likeCount: item.likeCount,
        postProfileImg: postProfileImg,
      },
    });
  };

  return (
    <Layout>
      <StCardContainer>
        {post.map(item => {
          return (
            <StCard key={item.id}>
              <StImg onClick={() => detailPage(item)}>
                <img src={item.photoURL} alt="" />
                <StHover>
                  <StContent>{item.contents}</StContent>
                  <StNick>{item.nickName}</StNick>
                </StHover>
              </StImg>
              <Like item={item} />
            </StCard>
          );
        })}
      </StCardContainer>
    </Layout>
  );
};

export default PostList;

//list 목록
const StCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  max-width: 1300px;
  min-width: 1000px;

  margin: 0 auto;
  flex-direction: column;
  align-content: flex;
  height: 3000px;
  overflow: hidden;
`;

const StCard = styled.div`
  border: none;
  width: calc((100% - 90px) / 4);
  cursor: pointer;
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
  height: 99%;
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

const StContent = styled.p`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;
const StNick = styled.p`
  font-size: 0.9rem;
`;
