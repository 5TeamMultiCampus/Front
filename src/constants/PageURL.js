/**메인페이지 URL */
export const MAIN = "/";

/**계정 관련 URL 리스트 */
export const ACCOUNT = {
  /**로그인 페이지 URL
   * @return "/login" */
  LOGIN: "/login",

  /**회원가입 페이지 URL
   * @return "/join" */
  JOIN: "/join",

  /**비밀번호 찾기 페이지 URL
   * @return "/findpw" */
  FIND_PW: "/findpw",

  /**비밀번호 변경 페이지 URL
   * @return "/changepw" */
  CHANGE_PW: "/changepw",
};

/** MYPAGE: 마이페이지 관련 URL 리스트 */
export const MYPAGE = {
  /**마이페이지 정보 페이지 URL
   * @return "/mypage"
   */
  INFO: "/mypage",

  /**회원 정보 수정 페이지 URL
   * @return "/mypage/modifyinfo"
   */
  MODIFY_INFO: "/mypage/modifyinfo",

  /**구매 내역 페이지 URL
   * @return "/mypage/orderlist"
   */
  ORDERLIST: "/mypage/orderlist",

  /** 활동내역 상세페이지 URL
   ** 사용법: MYPAGE.ORDER_DETAIL(id)
   * @return "/mypage/order/:id" (id 없음)
   * @return "/mypage/order/" + id (id 존재)
   **/
  ORDER_DETAIL: (id) => {
    if (id === undefined) return "/mypage/order/:id";
    else return "/mypage/order/" + id;
  },

  /**입양 후기 페이지 URL
   * @return "/mypage/adoptreview"
   */
  ADOPT_REVIEW: "/mypage/adoptreview",

  /**입양 내역 페이지 URL
   * @return "/mypage/adopt"
   */
  ADOPTLIST: "/mypage/adoptlist",

  /**
   ** 내가 쓴 글 페이지 URL
   ** 사용법: MYPAGE.BOARD(id)
   * @return "/mypage/board/:id" (id 없음)
   * @return "/mypage/board/" + id (id 존재)
   **/
  BOARD: (id) => {
    if (id === undefined) return "/mypage/board/:id";
    else return "/mypage/board/" + id;
  },

  /**1:1 문의 페이지 URL
   * @return "/mypage/qna"
   */
  QNA: "/mypage/qna",

  /**1:1 문의 세부 페이지 URL
   * 사용법: MYPAGE.QNA(id)
   * @return "/mypage/board/:id" (id 없음)
   * @return "/mypage/board/" + id (id 존재)
   */
  QNA_DETAIL: (id) => {
    if (id === undefined) return "/mypage/qna/:id";
    else return "/mypage/qna/" + id;
  },

  /**1:1 문의 작성 페이지 URL
   * @return "/mypage/qna/write"
   */
  QNA_WRITE: "/mypage/qna/write",
};

/** ABOUT: 소개 관련 URL 리스트*/
export const ABOUT = {
  /**프로젝트 소개 페이지 URL
   * @return "/about" */
  ABOUT: "/about",

  /**입양 절차 안내 페이지 URL
   * @return "/about/adoptprocess" */
  ADOPT_PROCESS: "/about/adoptprocess",

  /**공지사항 페이지 URL
   * @return "/about/notice" */
  NOTICE: "/about/notice",

  /**
   ** 공지사항 상세 페이지 URL
   ** 사용법: ABOUT.NOTICE_DETAIL(id)
   * @return "/about/notice/:id" (id 없음)
   * @return "/about/notice/" + id (id 존재)
   **/
  NOTICE_DETAIL: (id) => {
    if (id === undefined) return "/about/notice/:id";
    else return "/about/notice/" + id;
  },

  /**공지사항 작성 페이지 URL
   * @return "/about/notice/write"
   */
  NOTICE_WRITE: "/about/notice/write",

  /**활동내역 페이지 URL
   ** 사용법: ABOUT.ACTIVITY(page, limit, search)
   ** parameter 우선순위: page > limit = search
   * @return "/about/activity/list" (parameter 없음)
   * @return "/about/notice/list?page=" + page (page만 존재)
   * @return "/about/activity/list?page=" + page + "&search=" + search (page, search 존재)
   * @return "/about/activity/list?page=" + page + "&limit=" + limit (page, limit 존재)
   * @return "/about/activity/list?page=" + page + "&limit=" + limit + "&search=" + search + page (모두 존재)
   **/
  ACTIVITY: (page, limit, search) => {
    if (page === undefined) return "/about/activity/list";
    else if (limit === undefined) {
      if (search === undefined) return "/about/activity/list?page=" + page;
      else return "/about/activity/list?page=" + page + "&search=" + search;
    } else if (search === undefined)
      return "/about/activity/list?page=" + page + "&limit=" + limit;
    else
      return (
        "/about/activity/list?page=" +
        page +
        "&limit=" +
        limit +
        "&search=" +
        search
      );
  },

  /**
   ** 활동내역 상세페이지 URL
   ** 사용법: ABOUT.ACTIVITY_DETAIL(id)
   * @return "/activity/:id" (id 없음)
   * @return "/activity/" + id (id 존재)
   **/
  ACTIVITY_DETAIL: (id) => {
    if (id === undefined) return "/about/activity/detail/:id";
    else return "/about/activity/detail/" + id;
  },

  /**활동내역 작성페이지 URL
   * @return "/notice/write"
   */
  ACTIVITY_WRITE: "/about/activity/write",

  /**FAQ페이지 URL
   * @return "/faq"
   */
  FAQ: "/about/faq", // FAQ
};

/** ADOPT: 입양 관련 URL 리스트*/
export const ADOPT = {
  /**입양 후기 게시판 URL
   * @return "/adopt/review"
   */
  REVIEW: "/adopt/review",

  /**입양 후기 상세 페이지 URL
   * 사용법: ADOPT.REVIEW_DETAIL(id)
   * @return "/adopt/review/:id" (id 없음)
   * @return "/adopt/review/" + id (id 존재)
   **/
  REVIEW_DETAIL: (id) => {
    if (id === undefined) return "/adopt/review/:id";
    else return "/adopt/review/" + id;
  },

  /**입양 후기 작성 페이지 URL
   * @return "/adopt/review/write"
   */
  REVIEW_WRITE: "/adopt/review/write",

  /**입양 신청 페이지 URL
   * @return "/adopt/application"
   */
  APPLICATION: "/adopt/application",

  /**입양 체크리스트 페이지 URL
   * @return "/adopt/checklist"
   */
  CHECKLIST: "/adopt/checklist",

  /**동물병원 위치 페이지 URL
   * @return "/location/hospital"
   */
  HOSPITAL_LOCATION: "/location/hospital",

  /**보호소 위치 페이지 URL
   * @return "/location/shelter"
   */
  SHELTER_LOCATION: "/location/shelter",

  /**유기동물 리스트 페이지 URL
   * @return "/adopt/animal"
   */
  ANIMAL_LIST: "/adopt/animal",

  /**유기동물 리스트 상세 페이지 URL
   ** 사용법: ADOPT.ANIMAL_LIST_DETAIL(id)
   * @return "/adopt/animal/:id" (id 없음)
   * @return "/adopt/animal/" + id (id 존재)
   **/
  ANIMAL_LIST_DETAIL: (id) => {
    if (id === undefined) return "/adopt/animal/:id";
    else return "/adopt/animal/" + id;
  },
};

/** SHOP: SHOP관련 URL 리스트*/
export const SHOP = {
  /**상품리스트 페이지 URL
   * @return "/product"
   */
  PRODUCT: "/shop/product",

  /**상품 상세 페이지 URL
   ** 사용법: SHOP.PRODUCT_DETAIL(id)
   * @return "/product/:productId" (id 없음)
   * @return "/product/" + productId (id 존재)
   */
  PRODUCT_DETAIL: (id) => {
    if (id === undefined) return "/shop/product/:id";
    else return "/shop/product/" + id;
  },

  /**카트 페이지 URL
   * @return "/cart"
   */
  CART: "/shop/cart",

  /**주문 페이지 URL
   * @return "/order"
   */
  ORDER: "/shop/order",

  /**주문 완료 페이지 URL
   * @return "/order/complete"
   */
  ORDER_COMPLETE: "/shop/order/complete",
};

/** SUPPORT: 후원 관련 URL 리스트*/
export const SUPPORT = {
  /**기부 페이지 URL
   * @return "/donate"
   */
  DONATE: "/donate",

  /**기부 신청 페이지 URL
   * @return "/donate/apply"
   */
  APPLY: "/donate/apply",

  /**봉사 게시판 페이지 URL
   * @return "/donate/volunteer/notice"
   */
  VOLUNTEER_NOTICE: "/donate/volunteer/notice",

  /**봉사 게시판 글작성 페이지 URL
   * @return "/donate/volunteer/notice/write"
   */
  VOLUNTEER_NOTICE_WRITE: "/donate/volunteer/notice/write",

  /**봉사 게시판 상세 페이지 URL
   ** 사용법: SUPPORT.VOLUNTEER_NOTICE_DETAIL(id)
   * @return "/donate/volunteer/notice/:id" (id 없음)
   * @return "/donate/volunteer/notice/" + id (id 존재)
   */
  VOLUNTEER_NOTICE_DETAIL: (id) => {
    if (id === undefined) return "/donate/volunteer/notice/:id";
    else return "/donate/volunteer/notice/" + id;
  },

  /**봉사 게시판 수정 페이지 URL
   ** 사용법: SUPPORT.VOLUNTEER_NOTICE_MODIFY(id)
   * @return "/donate/volunteer/notice/modify:id" (id 없음)
   * @return "/donate/volunteer/notice/modify/" + id (id 존재)
   */
  VOLUNTEER_NOTICE_MODIFY: (id) => {
    if (id === undefined) return "/donate/volunteer/notice/modify/:id";
    else return "/donate/volunteer/notice/modify/" + id;
  },

  /**봉사 후기 게시판 페이지 URL
   * @return "/donate/volunteer/review"
   */
  VOLUNTEER_REVIEW: "/donate/volunteer/review",

  /**봉사 후기 게시판 상세 페이지 URL
   * @return "/donate/volunteer/review/write"
   */
  VOLUNTEER_REVIEW_WRITE: "/donate/volunteer/review/write",

  /**봉사 후기 게시판 작성 페이지 URL
   **사용법: SUPPORT.VOLUNTEER_REVIEW_DETAIL(id)
   * @return "/donate/volunteer/review/:id" (id 없음)
   * @return "/donate/volunteer/review" +id (id 존재)
   */
  VOLUNTEER_REVIEW_DETAIL: (id) => {
    if (id === undefined) return "/donate/volunteer/review/:id";
    else return "/donate/volunteer/review/" + id;
  },

  /**봉사 후기 게시판 수정 페이지 URL
   ** 사용법: SUPPORT.VOLUNTEER_REVIEW_MODIFY(id)
   * @return "/donate/volunteer/review/modify:id" (id 없음)
   * @return "/donate/volunteer/review/modify/" + id (id 존재)
   */
  VOLUNTEER_REVIEW_MODIFY: (id) => {
    if (id === undefined) return "/donate/volunteer/review/modify/:id";
    else return "/donate/volunteer/review/modify/" + id;
  },
};

/** COMMUNITY: 커뮤니티 관련 URL 리스트*/
export const COMMUNITY = {
  /**목격 제보 게시판 페이지 URL
   * @return "/board/find"
   */
  FIND: "/board/find",

  /**목격 제보 게시판 상세 페이지 URL
   **사용법: COMMUNITY.FIND_DETAIL(id)
   * @return "/board/find/:id"
   * @return "/board/find/:id"
   */
  FIND_DETAIL: (id) => {
    if (id === undefined) return "/board/find/:id";
    else return "/board/find/" + id;
  },

  /**목격 제보 게시판 작성 페이지 URL
   * @return "/board/find/write"
   */
  FIND_WRITE: "/board/find/write",

  /**자유게시판 페이지 URL
   * @return "/board/free"
   */
  FREE: "/board/free",

  /**자유게시판 상세 페이지 URL
   **사용법: COMMUNITY.FREE_DETAIL(id)
   * @return "/board/free/:id" (id 없음)
   * @return "/board/free/ + id (id 존재)
   */
  FREE_DETAIL: (id) => {
    if (id === undefined) return "/board/free/:id";
    else return "/board/free/" + id;
  },

  /**자유게시판 작성 페이지 URL
   * @return "/board/free/write"
   */
  FREE_WRITE: "/board/free/write",

  /**매매장터 페이지 URL
   * @return "/board/flea"
   */
  FLEA: "/board/flea",

  /**매매장터 상세 페이지 URL
   **사용법: COMMUNITY.FLEA_DETAIL(id)
   * @return "/board/flea/:id" (id 없음)
   * @return "/board/flea/" + id (id 존재)
   */
  FLEA_DETAIL: (id) => {
    if (id === undefined) return "/board/flea/:id";
    else return "/board/flea/" + id;
  },

  /**매매장터 작성 페이지 URL
   * @return "/board/flea/write"
   */
  FLEA_WRITE: "/board/flea/write",

  /**실종 동물 게시판 페이지 URL
   * @return "/board/missing"
   */
  MISSING: "/board/missing",

  /**실종 동물 게시판 페이지 URL
   **사용법: COMMUNITY.MISSING_DETAIL(id)
   * @return "board/missing/:id" (id 없음)
   * @return "board/missing" + id (id 존재)
   */
  MISSING_DETAIL: (id) => {
    if (id === undefined) return "/board/missing/:id";
    else return "/board/missing/" + id;
  },

  /**실종 동물 게시판 페이지 URL
   * @return "/board/missing/:id"
   */
  MISSING_WRITE: "/board/missing/write",
};

/** ADMIN: 관리자 관련 URL 리스트*/
export const ADMIN = {
  /**회원 관리 페이지 URL
   * @return "/admin/member"
   */
  MEMBER: "/admin/member",

  /**입양 관리 페이지 URL
   * @return "/admin/adopt"
   */
  ADOPT: "/admin/adopt",

  /**사용자 대쉬보드 페이지 URL
   * @return "/admin/dashboard"
   */
  DASHBOARD: "/admin/dashboard",

  /**1:1 문의 관리 페이지 URL
   * @return "/admin/qna"
   */
  QNA: "/admin/qna",

  /**상품 관리 페이지 URL
   * @return "/admin/product"
   */
  PRODUCT: "/admin/product",

  /**상품 입력 페이지 URL
   * @return "/admin/product/write"
   */
  PRODUCT_WRITE: "/admin/product/write",

  /**주문 관리 페이지 URL
   * @return "/admin/order"
   */
  ORDER: "/admin/order",

  /**게시글 관리 페이지 URL
   * @return "/admin/board"
   */
  BOARD: "/admin/board",
};
