import {
  Avatar,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { ABOUT } from "../../constants/PageURL";
import styled from "styled-components";

const pageWidth = "100%";

const EventDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const no = searchParams.get("no");
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const search = searchParams.get("search");
  const search_mode = searchParams.get("search_mode");

  const [data, setData] = useState(null);
  const [beforeData, setBeforeData] = useState(null);
  const [afterData, setAfterData] = useState(null);

  useEffect(() => console.log("re-rendering...", no, page, search));
  useEffect(() => {
    console.log(no, beforeData, data, afterData);
    if (no && (!data || data.no !== parseInt(no))) {
      const index = dummy.findIndex((data) => data.no === parseInt(no));
      setData(dummy.at(index));
      setAfterData(index > 0 ? dummy.at(index - 1) : null);
      setBeforeData(index < dummy.length ? dummy.at(index + 1) : null);
    }
  }, [no, data, beforeData, afterData]);

  const deleteData = () => {
    // db연결 후 삭제 구현
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <Box width={pageWidth}>
        <Table width={pageWidth}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  borderBottom: "unset",
                  fontSize: "2rem",
                  fontWeight: 600,
                }}
              >
                [이벤트] {data && data.subject}
              </TableCell>
            </TableRow>
            <TableRow sx={{ display: "flex" }}>
              <TableCell
                sx={{
                  p: 0,
                  ml: 2,
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid #bfbfbf",
                }}
              >
                <Avatar alt="profile" src={member.img} />
              </TableCell>
              <TableCell
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  fontSize: "1rem",
                }}
              >
                {member.nickname}
              </TableCell>
              <TableCell
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <VisibilityIcon
                  color="disabled"
                  sx={{
                    fontSize: "small",
                    alignSelf: "center",
                  }}
                />
                &nbsp;
                {data && data.count}
              </TableCell>
              <TableCell
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {data && data.postDate}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Box
                  sx={{
                    borderBottom: "unset",
                    fontSize: "1rem",
                    mb: "200px",
                  }}
                >
                  {data && data.contents}
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box display={"flex"}>
                  {beforeData ? (
                    <StyledLink
                      to={ABOUT.EVENT_DETAIL({
                        no: beforeData.no,
                        page: page,
                        limit: limit,
                        search: search,
                        search_mode: search_mode,
                      })}
                    >
                      &#9664; &nbsp;
                      <div className="subject">{beforeData.subject}</div>
                    </StyledLink>
                  ) : (
                    <Box fontWeight={600}>이전글이 없습니다.</Box>
                  )}
                </Box>
                <Box display={"flex"}>
                  {afterData ? (
                    <StyledLink
                      to={ABOUT.EVENT_DETAIL({
                        no: afterData.no,
                        page: page,
                        limit: limit,
                        search: search,
                        search_mode: search_mode,
                      })}
                    >
                      <div className="subject">{afterData.subject}</div>
                      &nbsp; &#9654;
                    </StyledLink>
                  ) : (
                    <Box fontWeight={600}>다음글이 없습니다.</Box>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Button
            variant="contained"
            sx={{ mt: 2, width: "100px" }}
            color="bfbfbf"
            onClick={() =>
              navigate(
                ABOUT.EVENT({
                  page: page,
                  limit: limit,
                  search: search,
                  search_mode: search_mode,
                })
              )
            }
          >
            목록
          </Button>
          <Box display={"flex"} mt={2}>
            <Button
              variant="contained"
              sx={{ ml: 2, width: "100px" }}
              onClick={() => navigate(ABOUT.EVENT_WRITE)}
            >
              수정
            </Button>
            <Button
              variant="contained"
              sx={{ ml: 2, width: "100px" }}
              color="ff8282"
              onClick={deleteData}
            >
              삭제
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  color: black;
  font-weight: 600;

  :hover {
    .subject {
      text-decoration: underline;
      text-underline-offset: 2px;
    }
  }
`;

const dummy = [
  {
    no: 6,
    memberNo: 1,
    category: "event",
    subject: "펫밀리 사용 후기를 남겨주세요!",
    contents: "여러분의 의견이 더 나은 펫밀리를 만듭니다!",
    count: 31,
    postDate: "2023-05-05",
    imgThumbnail: "/images/petmilylogo.png",
  },
  {
    no: 5,
    memberNo: 1,
    category: "event",
    subject: "봉사 후기 이벤트",
    contents:
      "펫밀리 봉사하기를 통해 봉사를 실천하신 회원분들 대상으로 봉사후기 게시글을 남기면 하나의 계정당 2000p를 드립니다!",
    count: 33,
    postDate: "2023-04-29",
    imgThumbnail: "/images/petmilylogo.png",
  },
  {
    no: 4,
    memberNo: 1,
    category: "event",
    subject: "펫밀리 SHOP 런칭 이벤트",
    contents: "펫밀리 SHOP을 오픈했습니다!! 후기를 작성하시면 1000p를 드립니다",
    count: 34,
    postDate: "2023-04-23",
    imgThumbnail: "/images/petmilylogo.png",
  },
  {
    no: 3,
    memberNo: 1,
    category: "event",
    subject: "SHOP 오픈",
    contents: "펫밀리 shop에서 필요하신 반려용품을 구매할 수 있습니다!",
    count: 36,
    postDate: "2023-04-16",
    imgThumbnail: "/images/petmilylogo.png",
  },
  {
    no: 2,
    memberNo: 1,
    category: "event",
    subject: "커뮤니티 오픈",
    contents:
      "실종 동물 게시판, 목격 제보 게시판, 자유게시판, 매매장터 게시판으로 구성되었습니다. 많은 이용 바랍니다!",
    count: 37,
    postDate: "2023-04-15",
    imgThumbnail: "/images/petmilylogo.png",
  },
  {
    no: 1,
    memberNo: 1,
    category: "event",
    subject: "사이트 런칭 이벤트",
    contents: "펫밀리 사이트를 런칭하였습니다!",
    count: 40,
    postDate: "2023-04-02",
    imgThumbnail: "/images/petmilylogo.png",
  },
];

const member = {
  num: 1,
  id: "Admin",
  pw: "1234",
  nickname: "관리자",
  email: "asdf@naver.com",
  name: "관리자",
  gender: "남자",
  birth: "2023-01-01",
  tel: "010-1234-5678",
  addr: "서울특별시 강남구 선릉로 428",
  img: "/images/emptyProfile.png",
  role: "admin",
};

export default EventDetail;