import styled from "styled-components";
import React, { useState, useEffect, useContext } from "react";
import Comment from "../../components/Comment/Comment";
import { useParams, useNavigate } from "react-router-dom";
import { Button, ThemeProvider, Avatar } from "@mui/material";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import DOMPurify from "dompurify";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContexts";
import NotFound from "../NotFound/NotFound";
import Loading from "../../components/Loading/LoadingPage";
import { ADOPT } from "../../constants/PageURL";

const AdoptReviewDetail = () => {
  const [data, setData] = useState([]); // DB 데이터 가져오는 변수
  const [isLoading, setIsLoading] = useState(true); //로딩 상태
  const { id } = useParams(); //게시글 id
  const { userNum } = useContext(AuthContext); // 로그인 상태 체크
  const navigate = useNavigate();

  const profile = {
    profileImg: data.memberImg, // 사용자 프로필 이미지
    profileNickname: data.memberNickName, // 사용자 닉네임
    region: "관악구 신림동",
  };

  /* axios start */
  useEffect(() => {
    //게시글 Detail 호출
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/board/review/${id}`
        ); //게시글 Detail 데이터  호출
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data : ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);
  /* axios end */

  if (isLoading) {
    return <Loading />; // 로딩 중일 때 표시할 컴포넌트
  }

  if (!data) {
    return <NotFound />; //존재하지 않는 번호를 넣었을 때 표시할 컴포넌트
  }

  const formatDate = (dateString) => {
    //날짜 변환함수
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    return `${year}.${month}.${day} ${hour}:${minute}`;
  };

  const handleEdit = () => {
    //수정
    navigate(ADOPT.REVIEW_MODIFY(id));
  };

  const handleDelete = async () => {
    // 삭제
    const result = window.confirm("정말 삭제하시겠습니까?");
    if (result) {
      try {
        await axios.delete(`http://localhost:8080/board/review/${id}`, {
          withCredentials: true,
        });
        alert("게시물이 삭제되었습니다.");
        navigate(ADOPT.REVIEW);
      } catch (error) {
        if (error.response) {
          alert("해당 게시글을 삭제할 권한이 없습니다.");
        } else {
          console.error("Error deleting post: ", error);
        }
      }
    }
  };

  const handleReturn = () => {
    // 돌아가기
    navigate(ADOPT.REVIEW);
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <Section className="result">
        <MainContainer className="result-container">
          <Container>
            <Top>입양 후기 게시판</Top>
            <Head>
              <Horizon />
              <p className="title">{data.reviewSubject}</p>
              <div className="subtitle">
                {/* 유저 프로필사진 & 닉네임 */}
                <section className="article-profile">
                  <h3 className="hide">프로필</h3>
                  <div className="space-between">
                    <div style={{ display: "flex" }}>
                      <div className="article-profile-image">
                        <UserImg alt="프로필 이미지" src={profile.profileImg} />
                      </div>
                      <div className="article-profile-left">
                        <div className="nickname">
                          {profile.profileNickname}
                        </div>
                        {/* <div className="region">{profile.region}</div> */}
                      </div>
                      <p className="date">{formatDate(data.reviewDate)}</p>
                      <p className="cnt">조회수: {data.reviewCount}</p>
                    </div>
                  </div>
                </section>
              </div>
            </Head>
            <Horizon />
            <DetailMiddle
              dangerouslySetInnerHTML={createMarkup(data.reviewContent)}
            />
            <ButtonsContainer>
              {data.memberNum === userNum && (
                <div>
                  <EditButton onClick={handleEdit} variant="contained">
                    수정
                  </EditButton>
                  <ButtonsSpace />
                  <DeleteButton onClick={handleDelete} variant="contained">
                    삭제
                  </DeleteButton>
                  <ButtonsSpace />
                </div>
              )}
              <ReturnButton onClick={handleReturn} variant="contained">
                돌아가기
              </ReturnButton>
            </ButtonsContainer>

            <Comments>
              <Horizon />
              <h2 className="comment">댓글</h2>
              <Comment boardId="missing" boardNum={id} />
            </Comments>
          </Container>
        </MainContainer>
      </Section>
    </ThemeProvider>
  );
};

// const Section = styled.section`
//   background: #f8f9fa;
//   padding: 30px 0 40px 0;
// `;
// const MainContainer = styled.div`
//   width: 60vw;
//   // width: 1150px;
//   max-width: 1150px;
//   min-width: 790px;
//   border-radius: 8px;
//   border-width: 1px;
//   border-style: solid;
//   border-color: rgb(233, 236, 239);
//   border-image: initial;
//   margin: 0px auto 20px;
//   background: rgb(255, 255, 255);
// `;
// const Container = styled.div`
//   margin: 30px;
//   .comment {
//     fullWidth;
//     margin: 0 auto;
//   }
// `;
// const Top = styled.h1`
//   font-size: 2rem;
//   font-weight: bold;
//   text-align: center;
//   margin-bottom: 2rem;
// `;
// const Body = styled.div`
//   margin: auto;
// `;
const Section = styled.section`
  background: #f8f9fa;
  padding: 30px 0 40px 0;
`;

const MainContainer = styled.div`
  width: 60vw;
  // width: 1150px;
  max-width: 1150px;
  min-width: 790px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(233, 236, 239);
  border-image: initial;
  margin: 0px auto 20px;
  background: rgb(255, 255, 255);
`;

const Container = styled.div`
  margin: 30px;
`;

const Top = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
`;

const Head = styled.div`
  .title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .subtitle {
    display: flex;
    flex-wrap: wrap;
    .name {
      width: 20%;
    }
    .date-cnt {
      display: flex;
    }

    .date {
      min-width: 50%;
      max-width: 60%;
      // width: 600px;
      text-align: right;
    }
    .cnt {
      text-align: right;
      float: right;
      min-width: 150px;
    }

    .article-profile {
      width: 100%;
      text-decoration: none;
      display: block;
      margin-top: 25px;
      position: relative;
    }

    .article-profile-image {
      display: inline-block;

      img {
        width: 40px;
        height: 40px;
        object-fit: cover;
        -webkit-border-radius: 50%;
      }
    }

    .article-profile-left {
      display: inline-block;
      margin-left: 8px;
      width: 100%;

      .nickname {
        text-decoration: underline;
        text-underline-position: under;
        font-size: 20px;
        font-weight: 600;
        line-height: 2.7;
        letter-spacing: -0.6px;
        color: #212529;
      }
      .region {
        font-size: 13px;
        line-height: 1.46;
        letter-spacing: -0.6px;
        color: #212529;
      }
    }

    .hide {
      position: absolute;
      left: -9999px;
      top: -9999px;
    }
  }
`;

const Body = styled.div`
  margin: auto;
`;

const Comments = styled.div`
  // margin: 150px auto 20px auto;
  // font-size: 2rem;
  font-weight: 700;
`;

const DetailMiddle = styled.div`
  padding-top: 15px;
  min-height: 300px;
  min-width: 700px;
  img {
    max-width: 100%;
    height: auto;
  }
`;

const ButtonsContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  min-width: 700px;
  display: flex;
  justify-content: flex-end;
`;

const ButtonsSpace = styled.div`
  width: 4px;
  height: auto;
  display: inline-block;
`;

const EditButton = styled(Button)`
  && {
    color: #fff;
    background-color: #fbd385;
    width: auto;
    height: 30px;
    margin-top: 5px;
    margin-bottom: 5px;
    &:hover {
      background-color: #af935d;
    }
  }
`;

const DeleteButton = styled(Button)`
  && {
    color: #fff;
    background-color: #ff8282;
    width: auto;
    height: 30px;
    margin-top: 5px;
    margin-bottom: 5px;
    &:hover {
      background-color: #b25b5b;
    }
  }
`;

const ReturnButton = styled(Button)`
  && {
    color: #fff;
    background-color: #bfbfbf;
    width: auto;
    height: 30px;
    margin-top: 5px;
    margin-bottom: 5px;
    &:hover {
      background-color: #858585;
    }
  }
`;
const Horizon = styled.hr`
  border-width: 1px 0px 0px 0px;
  border-style: solid;
  color: #ccc;
  margin-top: 5px;
  height: 1px;
  // min-width: 1050px;
`;

const UserImg = styled(Avatar)`
  && {
    margin-right: 8px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 5px;
  }
`;

export default AdoptReviewDetail;
