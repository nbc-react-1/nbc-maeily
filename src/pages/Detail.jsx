import React from 'react';
import { useSelector } from 'react-redux';
import Navigation from '../components/Navigation';
import { styled } from 'styled-components';

function Detail() {
  //   const userPage = useSelector(state => state.userLogIn);
  //   const params = useParams();
  return (
    <div>
      ㅎㅎ 디테일페이지 이동 완료
      <img src="" alt="" />
      <div>
        <span>게시글 작성자 닉네임</span>
        <span>Date</span>
        <div>contents</div>
        <div>좋아요 </div>
      </div>
      <InputForm>
        <form action="">
          <label htmlFor=""> 작성자</label>
          <input type="text" />
          <label htmlFor="">댓글내용</label>
          <input type="text" />
          <button>등록</button>
        </form>
      </InputForm>
      <CommentList>
        <div>
          <span>작성자</span>
          <div>
            <span>수정</span>
            <span>삭제</span>
          </div>
        </div>
        <div>댓글 내용</div>
      </CommentList>
    </div>
  );
}

export default Detail;

const InputForm = styled.div`
  width: 100%;
  background-color: #dedede;
`;
const CommentList = styled.div`
  width: 100%;
  background-color: #ddd;
`;
