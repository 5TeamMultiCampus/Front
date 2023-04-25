import { lazy } from "react";


const Main = lazy(() => import("./Main/Main"));
const Login = lazy(() => import("./Login/Login"));
const MyPage = lazy(() => import ("./Mypage/MyPageInfo")); //마이페이지 들어갔을때 기본적으로 회원정보 표시하기 위함.
const MyPageInfo = lazy(() => import ("./Mypage/MyPageInfo"));
const ModifyInfo = lazy(() => import ("./Mypage/ModifyInfo"));
//아래에 import할 페이지 함수 생성


export {Main, Login, MyPage,MyPageInfo,ModifyInfo};