import React from 'react';
import styled from 'styled-components';
function List() {
  return (
    <StCardContainer>
      <StCard>
        <StImg
          src="https://search.pstatic.net/common/?src=http%3A%2F%2Fpost.phinf.naver.net%2FMjAyMjEwMDVfMzAg%2FMDAxNjY0OTc5MDEwMzQ0.Sj0ICiv40lcycQjUHVZFatR9umLbsmjFD0k6KDco0mQg.XK-igHa1j9loK072-V4is_z-kLH98CpdAcXDIo9Z5skg.JPEG%2FI6Et3tl8pvEq7pBYb1XtZlooVxuQ.jpg&type=sc960_832"
          alt="dailyLook"
        />
        <StId>@nayoungkeem</StId>
        <StContent>#미니멀룩 #라코스테 #데일리룩</StContent>
      </StCard>
      <StCard>
        <StImg
          src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA3MDhfMTY4%2FMDAxNjU3MjQwNzU5MDg1.Hsk-kggbHzefxRdhWk7kZF45OFRChPGIxfDSLf3rE5sg.7TA-gSn6PYSUf7l79cuW7Zay5s4svj4BZmdZvHgm-6Ug.JPEG.rosebero%2F%25B0%25AD%25B9%25CE%25B0%25E6.jpg&type=sc960_832"
          alt="dailyLook"
        />
        <StId>@iammingki</StId>
        <StContent>#셔츠코디 #여름룩북 #데일리룩</StContent>
      </StCard>
      <StCard>
        <StImg
          src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA3MDNfMTc5%2FMDAxNjU2ODU0OTkwMTI0.0ZiQ0u6AEt6foivWtJLuF3bTTV1qIvB_Gz0s2r1BeQcg.fYE_rjKAd0ySUoRDccy3suPsjIWbVqdtRH-TwcwkkE4g.PNG.ahsy979%2Fimage.png&type=sc960_832"
          alt="dailyLook"
        />
        <StId>@hehehe0</StId>
        <StContent>#이자벨마랑 #에뚜왈라니카예 #원피스코디</StContent>
      </StCard>
      <StCard>
        <StImg
          src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjExMDZfOCAg%2FMDAxNjY3NzMyNTU2ODg2.qTfGaOk-7H_sNzuqfO8zp29XUJjVmfCtOzgRQHkyY3wg.NSYNgq-AuueZt-i4WAh92oIq-6YXhk3Y4Cgm-Lb1wwIg.JPEG.anwlfo%2FIMG_5811.JPG&type=sc960_832"
          alt="dailyLook"
        />
        <StId>@vousmevoyez</StId>
        <StContent>#랄프로렌 #웰링턴백 #여름코디</StContent>
      </StCard>
    </StCardContainer>
  );
}
export default List;
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
  width: 300px;
  height: 500px;
  cursor: pointer;
`;
const StImg = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
`;
const StId = styled.p`
  margin-top: 10px;
  font-weight: bold;
  font-size: 20px;
`;
const StContent = styled.p`
  margin-top: 10px;
  font-weight: bold;
  font-size: 15px;
`;
