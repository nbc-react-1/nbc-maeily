import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { db } from '../firebase';
import { collection, query, getDocs, updateDoc, doc, setDoc, where } from 'firebase/firestore';

import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';

const Like = ({ item }) => {
const navigate = useNavigate();
const [like, setLike] = useState(null);
const [isLoading, setLoading] = useState(false);
const { storeInfo } = useSelector(state => state.userLogIn);

// 좋아요 데이터 리스트로 불러오기
useEffect(() => {
const fetchData = async () => {
const likesValue = query(collection(db, 'likes'), where('postId', '==', item.postId), where('uid', '==', storeInfo.uid));
const likeQuerySnapshot = await getDocs(likesValue);
const { docs } = likeQuerySnapshot;
if (docs.length === 0) return;
setLike(docs[0].data());
};
fetchData();
}, []);

// 좋아요 버튼 클릭 시 이벤트
const postLike = async () => {
if (isLoading) {
console.log('isLoading');
return;
}
// 로그인이 되었는지 우선적으로 체킹 후 비로그인이면 로그인 페이지로 유도
if (!storeInfo.uid){ 
alert('좋아요 기능은 로그인을 해야 가능합니다!');
const confirm = window.confirm('로그인 하시겠습니까?');
if (confirm) navigate('/login');
return; 
}
setLoading(true);
// 로그인 상태면 좋아요 데이터 update 및 set
const UUID = uuid();
const postRef = doc(db, 'post-item', item.postId);
const collectionRef = doc(collection(db, 'likes'), UUID);
if (like === null) {
const newLike = {
id: UUID,
uid: storeInfo.uid,
postId: item.postId,
likeOrNot: true,
};
await setDoc(collectionRef, newLike);
await updateDoc(postRef, { ...item, likeCount: item.likeCount + 1 });
setLike(newLike);
setLoading(false);
return;
}
const { id, likeOrNot } = like;
const searchRef = doc(collection(db, 'likes'), id);
await updateDoc(postRef, { ...item, likeCount: item.likeCount + (likeOrNot ? -1 : 1) });
await updateDoc(searchRef, { likeOrNot: !likeOrNot });
setLike({ ...like, likeOrNot: !likeOrNot });
setLoading(false);

};
return (
// 삼항연산자를 통해 좋아요collection의 필드값인 likeOrNot이 true이면 빨간하트 false이면 빈하트 적용
<HeartDiv onClick={() => postLike()} style={{ cursor: 'pointer' }}>
{like && like.likeOrNot ? (
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
);
};

export default Like;

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
