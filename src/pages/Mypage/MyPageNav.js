import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BROWSER_PATH } from "../../constants/path";

const ProfileSrc = "/images/emptyProfile.png";
const MyPageNav = () => {
  return (
    <MyPageNavStyle className="MyPageNav">
      <img className="ProfileImg" src={ProfileSrc} alt="profile" />
      <NavList
        title={"My Page"}
        navList={[
          { linkName: "회원 정보", link: BROWSER_PATH.MYPAGE },
          { linkName: "구매 내역", link: BROWSER_PATH.MYPAGEORDER }, // 페이지 없음
        ]}
      />
      <NavList
        title={"입양 관리"}
        navList={[
          { linkName: "입양 후기", links: BROWSER_PATH.MYPAGE }, // 링크없어서 마이페이지로 연결, 페이지 없음
          { linkName: "입양 내역", link: BROWSER_PATH.MYPAGE }, // 링크없어서 마이페이지로 연결, 페이지 없음
        ]}
      />
      <NavList
        title={"쓴 글 목록"}
        navList={[
          { linkName: "실종 동물 게시판", link: BROWSER_PATH.MYPAGE }, // 링크없어서 마이페이지로 연결, 페이지 없음
          { linkName: "목격 제보 게시판", link: BROWSER_PATH.MYPAGE }, // 링크없어서 마이페이지로 연결, 페이지 없음
          { linkName: "자유게시판", link: BROWSER_PATH.MYPAGE }, // 링크없어서 마이페이지로 연결, 페이지 없음
          { linkName: "봉사 후기", link: BROWSER_PATH.MYPAGE }, // 링크없어서 마이페이지로 연결, 페이지 없음
          { linkName: "매매 장터", link: BROWSER_PATH.MYPAGE }, // 링크없어서 마이페이지로 연결, 페이지 없음
        ]}
      />
    </MyPageNavStyle>
  );
};

const NavList = ({ title, navList, isSelected }) => {
  const [selected, setSelected] = useState(1);
  const [height, setHeight] = useState(0);
  const ulRef = useRef(null);
  const HandleMouseOver = () => {
    const ulHeight = ulRef.current.scrollHeight;
    setHeight(ulHeight);
    setSelected(1);
  };

  return (
    <NavListStyle
      onMouseOver={HandleMouseOver}
      onMouseOut={() => setSelected(0)}
      isSelected={selected}
      height={height}
    >
      <div className="NavTitle">{title}</div>
      <ul ref={ulRef}>
        {navList.map((links, index) => {
          return (
            <li key={index}>
              <Link to={links.link}>{links.linkName}</Link>
            </li>
          );
        })}
      </ul>
    </NavListStyle>
  );
};

const MyPageNavStyle = styled.div`
  width: 160px;
  text-align: center;
  margin: 40px;

  .NavTitle {
    margin-top: 20px;
  }
`;

const NavListStyle = styled.div`
  width: 160px;
  .NavTitle {
    width: 160px;
    height: 40px;
    background: rgba(251, 211, 133, 0.58);
    border: 1px solid #fbd385;
    font-weight: 400;
    font-size: 18px;
    line-height: 36px;
    z-index: 0;
    cursor: default;
  }

  ul {
    margin: 0px;
    padding: 0px;
    list-style-type: none;
    overflow: hidden;
    height: ${(props) => (props.isSelected === 1 ? props.height + "px" : 0)};
    transition: height 0.5s ease-in-out;
    z-index: -1;
  }

  li {
    height: 40px;
    border-bottom: 1px solid #fbd385;
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  li > a {
    color: black;
    text-decoration: none;
    font-weight: 400;
    font-size: 18px;
  }
`;

export default MyPageNav;