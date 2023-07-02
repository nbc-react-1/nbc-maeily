import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import Layout from '../components/Layout';
import moment from 'moment';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

const Detail = () => {
  const { isUserTrue, storeInfo } = useSelector(state => state.userLogIn);
  const location = useLocation();
  const postData = location.state;
  const date = Date.now();
  const nowDate = new Date(date);
  const postDate = new Date(postData.date);
  const milliDate = Math.abs(nowDate - postDate);
  const diffDays = Math.ceil(milliDate / (1000 * 60 * 60 * 24));
  const timeDiff = nowDate - postDate;
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);

  //댓글
  const [comments, setComments] = useState([]); //모든 댓글
  const [cmtContents, setCmtContents] = useState(''); //새로운 댓글
  const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');

  const [filteredComments, setFilteredComments] = useState([]);

  // 불러오기
  useEffect(() => {
    const fetchData = () => {
      const cmtQueryValue = query(collection(db, 'comments'), orderBy('date', 'desc'));
      const unsubscribe = onSnapshot(cmtQueryValue, querySnapshot => {
        const commentAllData = querySnapshot.docs.map(doc => ({
          postId: doc.id,
          ...doc.data(),
        }));

        // Filter comments based on the current post ID
        const filtered = commentAllData.filter(item => item.postId === postData.postId);
        setFilteredComments(filtered);
      });
      return unsubscribe;
    };
    fetchData();
  }, [postData.postId]);

  console.log(comments);
  // 등록
  const addComment = async event => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'comments'), {
        uid: storeInfo.uid,
        cmtContents,
        date: nowTime,
        nickName: storeInfo.nickname,
        profileImg: storeInfo.profileImg,
        postId: postData.postId,
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }

    setCmtContents('');
  };
  return (
    <Layout>
      <Wrap>
        <PostBox>
          <PostHeader>
            <ProfileImg href="/mypage">
              <img src={postData.postProfileImg} alt="프로필 이미지" />
            </ProfileImg>
            <Pbox>
              <PostWeightfont>{postData.nickName}</PostWeightfont>
              <SmallFont>{hours >= 24 ? diffDays + '일전' : hours === 0 ? minutes + '분전' : hours + '시간전'}</SmallFont>
            </Pbox>
          </PostHeader>
          <div>
            <PostImg src={postData.photoURL} alt="" />
            {/* <div>{postData.postId}</div> */}
            <LikeDiv>
              <PostWeightfont>좋아요 {postData.likeCount}개</PostWeightfont>
            </LikeDiv>
            <PostContents>{postData.contents}</PostContents>
          </div>
        </PostBox>
        {/* 댓글 입력 */}
        <CommentSection>
          <CommentForm onSubmit={addComment}>
            {/* <label htmlFor="">작성자</label>
            <input type="text" /> 작성자 불러오기 */}
            <CommentInputLabel htmlFor="">댓글 입력</CommentInputLabel>
            <CommentInput
              value={cmtContents}
              onChange={event => {
                setCmtContents(event.target.value);
              }}
              type="text"
            />
            <StButton type="submit">등록</StButton>
          </CommentForm>
        </CommentSection>
        {/* 댓글 리스트 */}
        {filteredComments.map(item => {
          return (
            <CommentList key={item.uid}>
              {' '}
              {/* uid를 고유한 키 값으로 사용 */}
              <ProfileImg>
                <img src={item.profileImg} alt="" />
              </ProfileImg>
              <CmtContents>
                <div>
                  <EditWrap>
                    <Editer>{item.nickName}</Editer>
                    <EditCon>{item.cmtContents}</EditCon>
                  </EditWrap>
                  <SmallFont>{item.date.toString()}</SmallFont>
                </div>
                <div>하트</div>
              </CmtContents>
            </CommentList>
          );
        })}
      </Wrap>
    </Layout>
  );
};

export default Detail;

const PostContents = styled.div``;
const LikeDiv = styled.div`
  padding: 15px 0 15px 0;
`;
const Wrap = styled.div`
  width: 40%;
  margin: 50px auto;
  @media only screen and (max-width: 890px) {
    width: 100%;
  }
`;
const PostBox = styled.div`
  /* min-width: 400px; */
`;
const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const ProfileImg = styled.div`
  margin: 0 10px 0 0;
  img {
    width: 35px;
    height: 35px;
    // border: 1px solid gray;
    border-radius: 50%;
    background-image: url(${props => props.url});
    background-position: center;
    background-size: cover;
    cursor: pointer;
    overflow: hidden;
    object-fit: cover;
  }
`;
const Pbox = styled.div`
  margin-left: 5px;
`;
const PostWeightfont = styled.p`
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 5px;
`;
const PostImg = styled.img`
  width: 100%;
  overflow: hidden;
  background-image: url(${props => props.src});
  background-position: center;
  background-size: cover;
`;
const SmallFont = styled.p`
  font-size: 12px;
  color: #727272;
`;

// 댓글 입력 폼
const CommentSection = styled.div``;
const CommentForm = styled.form`
  margin: 40px 0;
  min-width: 400px;
`;
const CommentInputLabel = styled.label`
  display: block;
  width: 100%;
  font-size: 0.8rem;
  color: #8a8a8a;

  min-width: 400px;
`;
const CommentInput = styled.input`
  width: 80%;
  border: 0;
  line-height: 1.4;
  padding: 5px 2px;
  border-bottom: solid 1px #efefef;
  margin-right: 20px;
  &:focus {
    outline: 0;
  }
`;
const StButton = styled.button`
  width: calc(20% - 20px);
  padding: 10px 17px;
  border-radius: 5px;
  border: none;
  border: 1px solid black;
  cursor: pointer;
  font-weight: 700;
  font-size: 13px;
  color: black;
  background-color: #fff;
  position: relative;

  &::before {
    content: '';
    width: 0%;
    height: 100%;
    position: absolute;
    border-radius: 4px;
    z-index: -1;
    background-color: black;
    left: 0;
    top: 0;
    transition: 0.3s ease-in-out;
  }
  &:hover {
    color: #fff;
    z-index: 1;
  }
  &:hover::before {
    content: '';
    width: 100%;
    min-width: 100%;
    height: 100%;
    color: white;
    position: absolute;
  }
`;

// 댓글 목록
const CommentList = styled.div`
  display: flex;
  margin: 15px 0;
  min-width: 400px;
`;

const CmtContents = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  > div {
  }
`;
const EditWrap = styled.div`
  width: 100%;
  margin-bottom: 5px;
`;
const Editer = styled.span`
  margin-right: 20px;
  font-weight: bold;
`;
const EditCon = styled.span``;
