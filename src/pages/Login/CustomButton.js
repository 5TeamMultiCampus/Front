import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const SignInButton = styled(Button)`
  background-color: #fbd385;
  color: white;
  width: 350px;
  height: 35px;
  margin-top: 10px;
  font-weight: bold;
  &:hover {
    background-color: #af935d;
  }
  &:focus {
    background-color: #af935d;
  }
`;
const CustomizedButton = styled(Button)`
  background-color: #fbd385;
  color: white;
  width: 90px;
  height: 30px;
  margin-top: 10px;
  font-weight: bold;
  &:hover {
    background-color: #af935d;
  }
  &:focus {
    background-color: #af935d;
  }
`;
const SubmitButton = styled(Button)`
  background-color: #fbd385;
  color: white;
  width: 90px;
  height: 30px;
  &:hover {
    background-color: #af935d;
  }
  &:focus {
    background-color: #af935d;
  }
`;

const QuestionButton = styled(Button)`
  background-color: #fbd385;
  color: white;
  width: 90px;
  height: 30px;
  margin-top: 10px;
  margin-right: 10px;
  float: right;
  &:hover {
    background-color: #af935d;
  }
  &:focus {
    background-color: #af935d;
  }
`;

const ResetButton = styled(Button)`
  background-color: #bfbfbf;
  color: white;
  width: 90px;
  height: 30px;
  margin-top: 10px;
  float: right;
  &:hover {
    background-color: #858585;
  }
  &:focus {
    background-color: #858585;
  }
`;

const WriteButton = styled(Button)`
  background-color: #fbd385;
  color: white;
  width: 90px;
  height: 30px;
  margin-top: 10px;
  margin-right: 10px;
  float: right;
  &:hover {
    background-color: #af935d;
  }
  &:focus {
    background-color: #af935d;
  }
`;
const AdoptButton = styled(Button)`
  background-color: #fbd385;
  color: white;
  width: 90px;
  height: 30px;
  margin-top: 30px;
  margin-right: 10px;

  &:hover {
    background-color: #af935d;
  }
  &:focus {
    background-color: #af935d;
  }
`;

const CheckButton = styled(Button)`
  background-color: #fbd385;
  color: white;
  width: 400px;
  height: 40px;
  margin-top: 30px;
  margin-right: 10px;

  &:hover {
    background-color: #af935d;
  }
  &:focus {
    background-color: #af935d;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #ff8282;
  color: white;
  width: 90px;
  height: 30px;
  margin-top: 10px;
  margin-right: 10px;
  float: right;

  &:hover {
    background-color: #b25b5b;
  }
  &:focus {
    background-color: #b25b5b;
  }
`;

const WriteButton1 = styled(Button)`
  background-color: #fbd385;
  color: white;
  width: 90px;
  height: 30px;
  margin-top: 20px;
  margin-right: 10px;
  float: right;
  margin-left: auto;
  &:hover {
    background-color: #af935d;
  }
  &:focus {
    background-color: #af935d;
  }
`;

const failButton = styled(Button)`
  background-color: #fbd385;
  color: white;
  width: 90px;
  height: 30px;
  margin-top: 10px;
  margin-right: 10px;
  float: right;
  &:hover {
    background-color: #af935d;
  }
  &:focus {
    background-color: #af935d;
  }
`;

export default function CustomButton(props) {
  const { value, label } = props;

  return (
    <div>
      {value === "로그인폼" ? (
        <SignInButton
          value={value}
          variant="contained"
          onClick={props.onClick}
          disabled={props.disabled}
          fullWidth
          href={props.href}
        >
          {props.label}
        </SignInButton>
      ) : value === "버튼" ? (
        <CustomizedButton
          value={value}
          variant="contained"
          onClick={props.onClick}
          fullWidth
        >
          {props.label}
        </CustomizedButton>
      ) : value === "문의하기" ? (
        <QuestionButton value={value} variant="contained" fullWidth>
          {props.label}
        </QuestionButton>
      ) : value === "목록으로" ? (
        <QuestionButton
          value={value}
          variant="contained"
          fullWidth
          onClick={props.onClick}
        >
          {props.label}
        </QuestionButton>
      ) : value === "작성취소" ? (
        <ResetButton
          value={value}
          variant="contained"
          onClick={props.onClick}
          fullWidth
        >
          {props.label}
        </ResetButton>
      ) : value === "병원검색" ? (
        <SubmitButton
          value={value}
          variant="contained"
          onClick={props.onClick}
          fullWidth
        >
          {props.label}
        </SubmitButton>
      ) : value === "글쓰기" ? (
        <WriteButton
          value={value}
          variant="contained"
          onClick={props.onClick}
          fullWidth
        >
          {props.label}
        </WriteButton>
      ) : value === "입양신청" ? (
        <AdoptButton
          value={value}
          variant="contained"
          onClick={props.onClick}
          fullWidth
        >
          {props.label}
        </AdoptButton>
      ) : value === "체크리스트" ? (
        <CheckButton
          value={value}
          variant="contained"
          onClick={props.onClick}
          fullWidth
        >
          {props.label}
        </CheckButton>
      ) : value === "삭제" ? (
        <DeleteButton
          value={value}
          variant="contained"
          onClick={props.onClick}
          fullWidth
        >
          {props.label}
        </DeleteButton>
      ) : value === "글쓰기1" ? (
        <WriteButton1
          value={value}
          variant="contained"
          onClick={props.onClick}
          fullWidth
        >
          {props.label}
        </WriteButton1>
      ) : (
        ""
      )}
    </div>
  );
}
