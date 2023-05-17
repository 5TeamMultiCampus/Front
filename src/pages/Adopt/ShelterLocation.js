import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CustomButton from "../Login/CustomButton";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import styled from "styled-components";
import Pagination from "@mui/material/Pagination";
import react, { useEffect, useLayoutEffect, useState, useRef } from "react";
const { kakao } = window;
let curLatitude = "";
let curLongitude = "";
const ShelterLocation = () => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");
  const [dragend, setDragend] = useState(false);
  const [usefirst, setUseFirst] = useState(false);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [firstData, setFirstData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const dateString = year + month + day;
  const [item, setItem] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({
    latitude: curLatitude,
    longtitude: curLongitude,
  });

  function getLocation() {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ latitude, longitude });
          curLatitude = position.coords.latitude;
          curLongitude = position.coords.longitude;
          console.log("current" + curLatitude + " " + curLongitude);
          setFirstData("1");
        },
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      alert("GPS를 지원하지 않습니다");
    }
  }
  const mounted = useRef(false);

  useLayoutEffect(() => {
    getLocation();
    fetchData();
  }, []);

  useEffect(() => {
    console.log("current1 " + curLatitude + " " + curLongitude);
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(curLatitude, curLongitude),
      level: 3,
    };
    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    var markers = [];
    const map = new kakao.maps.Map(container, options);
    // 장소 검색 객체를 생성
    map.setZoomable(false); //줌 막기
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch("유기동물", placesSearchCB);

    // 키워드 검색 완료 시 호출되는 콜백함수
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가
        // let bounds = new kakao.maps.LatLngBounds();
        displayPlaces(data);

        // 페이지 번호를 표출합니다
        displayPagination(pagination);
        setItem(data);
        // for (let i = 0; i < data.length; i++) {
        //   displayMarker(data[i]);
        //   bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        // }
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정
        // map.setBounds(bounds);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
    }
    // 검색 결과 목록과 마커를 표출하는 함수입니다
    function displayPlaces(places) {
      var listEl = document.getElementById("placesList"),
        menuEl = document.getElementById("menu_wrap"),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = "";

      // 검색 결과 목록에 추가된 항목들을 제거합니다
      removeAllChildNods(listEl);

      // 지도에 표시되고 있는 마커를 제거합니다
      removeMarker();

      for (var i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
          marker = addMarker(placePosition, i),
          itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function (marker, title) {
          kakao.maps.event.addListener(marker, "mouseover", function () {
            displayInfowindow(marker, title);
          });

          kakao.maps.event.addListener(marker, "mouseout", function () {
            infowindow.close();
          });

          itemEl.onmouseover = function () {
            displayInfowindow(marker, title);
          };

          itemEl.onmouseout = function () {
            infowindow.close();
          };
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
      }

      // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
      listEl.appendChild(fragment);
      menuEl.scrollTop = 0;

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
    }

    // 검색결과 항목을 Element로 반환하는 함수입니다
    function getListItem(index, places) {
      var el = document.createElement("div"),
        itemStr =
          '<h3 style="line-height: 25px;">' +
          (index + 1) +
          ". " +
          places.place_name +
          "</h3>";
      if (places.phone) {
        itemStr +=
          '  <h5 class="tel" style="font-size:medium;"> Tel. ' +
          places.phone +
          "</h5>";
      } else {
        itemStr +=
          '<h5 class="tel" style="font-size:medium;"> Tel. ' +
          "등록된 번호가 없습니다" +
          "</h5>";
      }
      if (places.road_address_name) {
        itemStr +=
          `<h5 style="font-size:medium;">` +
          "지번 주소: " +
          places.address_name +
          "</h5>" +
          '<h5 class="jibun gray" style="font-size:medium;">' +
          "도로명 주소: " +
          places.road_address_name +
          "</h5>";
      } else {
        itemStr +=
          `<h5 style="font-size:medium;">` + places.address_name + "</h5>";
      }

      el.innerHTML = itemStr;
      el.className = "item";
      el.style.cssText = `
      text-align: left;
      width:480px;
      border: 0.5px solid;
      padding: 0 0 0 10px;
      border-right-width: ${
        index % 2 === 0 ? (index === item.length - 1 ? 0 : "0.5px") : "0.5px"
      };
      border-left-width: ${index % 2 === 0 ? "0.5px" : 0};
      border-bottom-width: 0.5px;
      border-top-width: ${index > 1 ? 0 : "0.5px"};
    `;
      return el;
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, idx, title) {
      var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        ),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

      marker.setMap(map); // 지도 위에 마커를 표출합니다
      markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
    function displayPagination(pagination) {
      var paginationEl = document.getElementById("pagination"),
        fragment = document.createDocumentFragment(),
        i;

      // 기존에 추가된 페이지번호를 삭제합니다
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement("a");
        el.href = "#";
        el.style.cssText =
          "display:flex;justify-content:center;align-items:center;margin-right:15px;width:25px;height:25px;";
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = "on";
          el.style.cssText =
            "display:flex;justify-content:center;align-items:center;color:white;margin-right:15px;background-color:#FBD385;width:25px;height:25px;border-radius:50%;";
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }

    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다
    function displayInfowindow(marker, title) {
      var content =
        '<div style="padding:5px;z-index:1;text-align:center;">' +
        title +
        "</div>";

      infowindow.setContent(content);
      infowindow.open(map, marker);
    }

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    function removeAllChildNods(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    }
  }, [place, firstData, dragend, data3]);

  // 시/도 코드 파싱
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://apis.data.go.kr/1543061/abandonmentPublicSrvc/sido?numOfRows=20&pageNo=1&serviceKey=AhrFaZaAefMdQ7n5tWepAOM5tzLw5%2BCiT3stOXtEl3uTyXNtr0xlgtAn6WZppVVYaZdAuyqJvj%2FS65SSV4iapw%3D%3D&_type=json`
      );
      const data2 = response.data.response.body.items.item;
      const location = data2.map((item) => ({
        name: item.orgdownNm,
        code: item.orgCd,
      }));
      setData(location);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };
  // 시/군/구 코드 파싱

  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 auto",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginTop: "30px" }}>
        <img
          alt="hospital"
          style={{ width: "60px", height: "60px", marginRight: "10px" }}
          src="./../images/shelter.png"
        />
        <h1
          sx={{
            color: "black",
            mt: "30px",
            mb: "30px",
            fontSize: "70px",
            fontWeight: "bord",
          }}
        >
          보호소 정보
        </h1>
      </div>
      <div
        id="map"
        style={{
          border: "solid 1px #FBD385",
          width: "1000px",
          height: "500px",
          marginBottom: "15px",
        }}
      ></div>
      <Box
        id="menu_wrap"
        class="bg_white"
        sx={{ marginTop: "15px", marginLeft: "16px", width: "1000px" }}
      >
        <div
          container
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
          id="placesList"
        ></div>

        <Grid
          id="pagination"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "15px",
          }}
        ></Grid>
      </Box>
    </div>
  );
};
export default ShelterLocation;
