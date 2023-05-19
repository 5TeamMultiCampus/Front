import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import styled from "styled-components";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContexts";

const HeaderRight = ({ page }) => {
  const { setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  //임시 sessionStorage
  // sessionStorage.setItem('id', 'admin');
  // sessionStorage.setItem('name', '관리자');
  // alert(sessionStorage.getItem('id'));

  const loginId = window.sessionStorage.getItem("id");
  const loginName = window.sessionStorage.getItem("name");

  // 마이페이지 버튼
  const myPageClick = () => {
    return navigate("/mypage"); // 로그인 페이지로 이동.
  };

  // 로그아웃 버튼
  const logoutClick = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      try {
        await axios.get("/logout");
        setLoggedIn(false);
        window.sessionStorage.clear();
        return navigate("/", { replace: true }); // true: 뒤로가기 불가능 메인으로 이동.
      } catch (error) {
        console.error("로그아웃 실패 : ", error);
      }
    } else {
      return false;
    }
  };

  // 회원가입 버튼
  const joinClick = () => {
    return navigate("/join"); // 회원가입 페이지로 이동.
  };

  // 로그인 버튼
  const loginClick = () => {
    return navigate("/login"); // 로그인 페이지로 이동.
  };

  // 로그인 상태일때
  if (loginId != null) {
    return (
      <HeadrRight className="headright">
        <Stack className="stack" spacing={2} direction="row">
          <Button
            onClick={logoutClick}
            variant="outlined"
            size="large"
            sx={{
              m: 1,
              minWidth: "100",
              color: "#FFFFFF",
              background: "#FF8282",
              borderColor: "#FF8282",
              ":hover": { borderColor: "#ED4F4F", background: "#ED4F4F" },
            }}
          >
            로그아웃
          </Button>
          <Button
            onClick={myPageClick}
            variant="outlined"
            size="large"
            sx={{
              m: 1,
              color: "#FFFFFF",
              background: "#FBD385",
              borderColor: "#FBD385",
              ":hover": { borderColor: "#FFBE3F", background: "#FFBE3F" },
            }}
          >
            {" "}
            마이페이지{" "}
          </Button>
        </Stack>
      </HeadrRight>
    );
  }

  // 로그아웃 상태일때
  else {
    return (
      <HeadrRight className="headright">
        <Stack className="stack" spacing={2} direction="row">
          <Button
            onClick={joinClick}
            variant="outlined"
            size="large"
            sx={{
              m: 1,
              color: "#FFFFFF",
              minWidth: "100",
              background: "#BFBFBF",
              borderColor: "#BFBFBF",
              ":hover": { borderColor: "gray", background: "gray" },
            }}
          >
            회원가입
          </Button>
          <Button
            onClick={loginClick}
            variant="outlined"
            size="large"
            sx={{
              m: 1,
              color: "#FFFFFF",
              background: "#FBD385",
              borderColor: "#FBD385",
              ":hover": { borderColor: "#FFBE3F", background: "#FFBE3F" },
            }}
          >
            로그인
          </Button>
        </Stack>
      </HeadrRight>
    );
  }
};

const HeadrRight = styled.div`
  .stack {
    width: 300px;
    padding-top: 15px;
    align-items: center;
    justify-content: center;
    flex-direction: row-reverse;
  }
`;

export default HeaderRight;
