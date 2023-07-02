import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { db } from '../firebase';
import { collection, query, onSnapshot, orderBy, getDocs, updateDoc, doc, setDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import { where } from 'firebase/firestore';

const PostList = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [reload, setReload] = useState(false);
  const [likeStatus, setLikeStatus] = useState(false);
  const [like, setLike] = useState([]);

  const { storeInfo } = useSelector(state => state.userLogIn);
  const { uid, nickname } = storeInfo;

  // 데이터 리스트로 불러오기
  useEffect(() => {
    const likesAllData = [];
    const fetchData = async () => {
      const likesValue = query(collection(db, 'likes'));
      const likeQuerySnapshot = await getDocs(likesValue);
      likeQuerySnapshot.forEach(doc => {
        const data = {
          id: doc.id,
          ...doc.data(),
        };
        likesAllData.push(data);
      });
      const likesData = storeInfo.uid ? likesAllData.filter(e => storeInfo.uid === e.uid) : [];
      const queryValue = query(collection(db, 'post-item'), orderBy('date', 'desc'));
      const unsubscribe = onSnapshot(queryValue, querySnapshot => {
        const initialPostItem = querySnapshot.docs.map(doc => ({
          postId: doc.id,
          ...doc.data(),
        }));
        setPost(initialPostItem);
        setLike(likesData);
      });
      return unsubscribe;
    };
    fetchData();
  }, [likeStatus]);

  const detailPage = async item => {
    const q = query(collection(db, 'users'), where('uid', '==', item.uid));
    const querySnapshot = await getDocs(q);
    let postProfileImg;
    await querySnapshot.forEach(doc => {
      postProfileImg = doc.data().profileImg;
    });
    console.log('postProfileImg', postProfileImg);
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

  const postLike = async (item, likeOrNot, likeid) => {
    if (!storeInfo.uid) {
      alert('좋아요 기능은 로그인을 해야 가능합니다!');
      const confirm = window.confirm('로그인 하시겠습니까?');
      if (confirm) navigate('/login');
    } else {
      const UUID = uuid();
      const postRef = doc(db, 'post-item', item.postId);
      const collectionRef = doc(collection(db, 'likes'), UUID);
      let searchRef;
      likeid ? (searchRef = doc(collection(db, 'likes'), likeid)) : (searchRef = false);
      if (!likeOrNot) {
        await updateDoc(postRef, { ...item, likeCount: item.likeCount + 1 });
        searchRef
          ? await updateDoc(searchRef, { likeOrNot: !likeOrNot })
          : await setDoc(collectionRef, {
              id: UUID,
              uid: storeInfo.uid,
              postId: item.postId,
              likeOrNot: true,
            });
      } else if (likeOrNot) {
        await updateDoc(postRef, { ...item, likeCount: item.likeCount - 1 });
        await updateDoc(searchRef, { likeOrNot: !likeOrNot });
      }
      setLikeStatus(!likeStatus);
    }
  };

  return (
    <Layout>
      <StCardContainer>
        {post.map(item => {
          const likeOrNot = like.find(e => e.postId === item.postId)?.likeOrNot ?? false;
          const likeid = like.find(e => e.postId === item.postId)?.id ?? false;

          return (
            <StCard key={item.id}>
              <StImg onClick={() => detailPage(item)}>
                <img src={item.photoURL} alt="" />
                <StHover>
                  <StContent>{item.contents}</StContent>
                  <StNick>{item.nickName}</StNick>
                </StHover>
              </StImg>
              <HeartDiv onClick={() => postLike(item, likeOrNot, likeid)} style={{ cursor: 'pointer' }}>
                {likeOrNot ? (
                  <HeartSvg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512" fill="rgb(255, 48, 64)">
                    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                  </HeartSvg>
                ) : (
                  <HeartSvg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512" fill="rgb(224, 224, 224)">
                    <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
                  </HeartSvg>
                )}
                <LikeCountHeart>{item.likeCount}</LikeCountHeart>
              </HeartDiv>
            </StCard>
          );
        })}
      </StCardContainer>
    </Layout>
  );
};

export default PostList;

// 좋아요 icon
const HeartDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
`;
const HeartSvg = styled.svg`
  transition: transform 0.3s, fill 0.3s;
  fill: ${props => props.fill};
  &:hover {
    transform: scale(1.2);
  }
`;

const LikeCountHeart = styled.span`
  font-size: 10px;
`;

//list 목록
const StCardContainer = styled.div`
  width: 1300px;
  display: flex;
  flex-wrap: wrap;
  gap: 1vw;
  margin: 0 auto;
  flex-direction: column;
  align-content: flex-start;
  height: 3000px;
  /* overflow: hidden; */
  transition: all 0.3s;
  @media only screen and (max-width: 1300px) {
    width: 100%;
  }
`;

const StCard = styled.div`
  border: none;
  width: calc((100% - 3vw) / 4);
  cursor: pointer;
  position: relative;
  /* flex: 0 0 150px;
  flex-basis: 100px; */
  @media only screen and (max-width: 1200px) {
    width: calc((100% - 2vw) / 3);
  }
  @media only screen and (max-width: 890px) {
    width: calc((100% - 2vw) / 2);
  }
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
