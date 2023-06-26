import React from 'react';

const Home = () => {
  return (
    <>
      {/* 상단 게시글 등록 버튼  */}
      <div>
        <ul>
          <li>게시글 리스트</li>
          <li>게시글 리스트</li>
          <li>게시글 리스트</li>
          <li>게시글 리스트</li>
          <li>게시글 리스트</li>
        </ul>
      </div>
    </>
  );
};

const CreatePost = () => {
  return (
    <>
      <form action="">
        <label>제목</label>
        <input />
        <label>제목</label>
        <textarea />
      </form>
    </>
  );
};
export default Home;
