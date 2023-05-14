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
    background-color: #facc73;
  }
  &:focus {
    background-color: #facc73;
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
    background-color: #facc73;
  }
  &:focus {
    background-color: #facc73;
  }
`;
const SubmitButton = styled(Button)`
  background-color: #fbd385;
  color: white;
  width: 90px;
  height: 30px;
  &:hover {
    background-color: #facc73;
  }
  &:focus {
    background-color: #facc73;
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
    background-color: #facc73;
  }
  &:focus {
    background-color: #facc73;
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
    background-color: #b2b0b0;
  }
  &:focus {
    background-color: #b2b0b0;
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
    background-color: #facc73;
  }
  &:focus {
    background-color: #facc73;
  }
`;
const AdoptButton = styled(Button)`
  background-color: #fbd385;
  color: white;
  width: 90px;
  height: 30px;
  margin-top: 30px;
  margin-right: 10px;
  font-weight: bold;

  &:hover {
    background-color: #facc73;
  }
  &:focus {
    background-color: #facc73;
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
      ) : (
        ""
      )}
    </div>
  );
}
