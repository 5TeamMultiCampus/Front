import React, { useLayoutEffect } from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import { Grid, Card } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Typography from "@mui/material/Typography";
import Animal from "./Animal";
import axios from "axios";
import styled from "styled-components";
import { ThemeProvider } from "@mui/material";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
const AdoptInfoDetail = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animalIndex, setAnimalIndex] = useState(0);
  const [petChk, setPetChk] = useState([]);
  const [animallength, setAnimalLength] = useState("");
  const [displayData, setDisplayedData] = useState();
  const { uprCd, name, code } = props;
  const [isLoading, setIsLoading] = useState(true);
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);

  const dateString = year + month + day;
  const [isHover, setIsHover] = React.useState(false);
  const handleHover = () => setIsHover(true);
  const handleLeave = () => setIsHover(false);
  const [width, setWidth] = useState("");

  const fetchData = async () => {
    try {
      const [petChkResponse, response] = await Promise.all([
        axios.get(`/pet/list`),
        axios.get(
          `http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?bgnde=20230101&endde=${dateString}&upr_cd=${uprCd}&org_cd=${code}&pageNo=1&numOfRows=100&serviceKey=AhrFaZaAefMdQ7n5tWepAOM5tzLw5%2BCiT3stOXtEl3uTyXNtr0xlgtAn6WZppVVYaZdAuyqJvj%2FS65SSV4iapw%3D%3D&_type=json`
        ),
      ]);

      const petChkData = petChkResponse.data;
      setPetChk(petChkData);

      const data2 = response.data.response.body.items.item;

      const desertionNoList = petChkData.map((pet) => pet.petName);

      const filteredData = data2.filter((item) => {
        return (
          !desertionNoList.includes(item.desertionNo) &&
          item.processState === "보호중"
        );
      });

      setData(filteredData);
      setAnimalLength(filteredData.length);
    } catch (e) {
      setError(e);
    }
  };

  const moveLeft = useCallback(() => {
    setAnimalIndex((prevIndex) => {
      let newIndex = prevIndex - 5;
      if (newIndex < 0) {
        newIndex = data.length - Math.abs(newIndex);
      }
      const slicedData = data.slice(newIndex, newIndex + 5);
      setDisplayedData([...slicedData]);
      return newIndex;
    });
  }, [data]);

  const moveRight = useCallback(() => {
    setAnimalIndex((prevIndex) => {
      let newIndex = prevIndex + 5;
      if (newIndex >= data.length) {
        newIndex = newIndex - data.length;
      }
      const slicedData = data.slice(newIndex, newIndex + 5);
      setDisplayedData([...slicedData]);
      return newIndex;
    });
  }, [data]);

  const AnimalRender = useCallback(() => {
    let result = [];

    for (let i = animalIndex; i < animalIndex + 5; i++) {
      let dataIndex = i;
      if (dataIndex >= data.length) {
        dataIndex = dataIndex % data.length;
        if (dataIndex === animalIndex) {
          break;
        }
      }
      let data1 = data[dataIndex];

      result.push(
        <Grid item xs={2} key={data1.desertionNo}>
          <Animal
            desertionNo={data1.desertionNo}
            filename={data1.filename}
            happenDt={data1.happenDt}
            happenPlace={data1.happenPlace}
            kindCd={data1.kindCd}
            colorCd={data1.colorCd}
            age={data1.age}
            weight={data1.weight}
            noticeNo={data1.noticeNo}
            noticeSdt={data1.noticeSdt}
            noticeEdt={data1.noticeEdt}
            profile={data1.popfile}
            processState={data1.processState}
            sexCd={data1.sexCd}
            neuterYn={data1.neuterYn}
            pecialMark={data1.pecialMark}
            careNm={data1.careNm}
            careTel={data1.careTel}
            careAddr={data1.careAddr}
            orgNm={data1.orgNm}
            chargeNm={data1.chargeNm}
            officetel={data1.officetel}
          />
        </Grid>
      );
    }

    // 5개 안되는경우 빈칸에 이미지 채우기
    const remainingSlots = 5 - result.length;
    for (let i = 0; i < remainingSlots; i++) {
      console.log("d");
      result.push(
        <Grid item xs={2} key={`empty-slot-${i}`}>
          <Card
            xs={10}
            sm={6}
            md={2}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              marginRight: "10px",
              transition: "all 0.3s ease-out",
              transform: isHover ? "scale(1.05)" : "scale(1)",
            }}
          >
            <CardImage src="/images/emptydataicon.png" />
            <div>
              <CardTitle>No data</CardTitle>
            </div>
          </Card>
        </Grid>
      );
    }
    if (result.length === 0) {
      // Handle case where there are no items to render
      result.push(<div key="no-data">No data available.</div>);
    }

    return result;
  }, [data, animalIndex]);

  useEffect(() => {
    fetchData();
    setWidth(`${name.length * 20 + 20}px`);
  }, [uprCd]);

  const textRef = useRef(null);

  return (
    <ThemeProvider theme={CustomTheme}>
      <>
        {data?.length !== 0 && (
          <div style={{ height: "400px", width: "1120px" }}>
            <div
              style={{
                marginLeft: "95px",
                borderBottom: "3px solid #FBD385",
                borderLeft: "3px solid",
                borderBottomColor: "#FBD385",
                borderLeftColor: "#FBD385",
                paddingLeft: "5px",
                marginBottom: "10px",
                display: "inline-block",
                width: width,
              }}
            >
              <Typography
                ref={textRef}
                component="h2"
                variant="h5"
                sx={{
                  fontSize: "1.5em",
                  fontWeight: "bolder",
                  color: "black",
                  width: "fit-content",
                  whiteSpace: "nowrap",
                }}
              >
                {name}
              </Typography>
            </div>
            <Grid
              container
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "15px",
              }}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
            >
              {data.length > 5 && (
                <>
                  {isHover ? (
                    <Grid
                      style={{
                        display: "flex",
                      }}
                      item
                      xs={1}
                    >
                      <IconButton
                        onClick={moveLeft}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <ArrowBackIosIcon
                          style={{
                            width: "30%",
                            height: "100%",
                            color: "black",
                            scale: "2.0",
                            marginLeft: "1.5em",
                          }}
                        />
                      </IconButton>
                    </Grid>
                  ) : null}
                </>
              )}
              {/* {loading ? (
                <div>Loading...</div>
              ) : (
                <>
                  {data.length > 0 ? (
                   
                  ) : (
                    <div>No data available.</div>
                  )}
                </>
              )} */}
              <AnimalRender />
              {data.length > 5 && (
                <>
                  {isHover ? (
                    <Grid item xs={1}>
                      <IconButton
                        onClick={moveRight}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <ArrowForwardIosIcon
                          style={{
                            width: "30%",
                            height: "100%",
                            color: "black",
                            scale: "2.0",
                            marginRight: "1.5em",
                          }}
                        />
                      </IconButton>
                    </Grid>
                  ) : null}
                </>
              )}
            </Grid>
          </div>
        )}
      </>
    </ThemeProvider>
  );
};

export default AdoptInfoDetail;

const CardImage = styled.img`
  width: 176px;
  height: 200px;
`;

const CardTitle = styled.p`
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  margin-bottom: 5px;
  line-height: 1.4em;
  height: 90px;
`;

const CardWritter = styled.p`
  font-size: 14px;
  color: #888;
  float: left;
  margin-left: 10px;
`;

const CardCount = styled.p`
  font-size: 14px;
  color: #888;
  text-align: center;
`;
