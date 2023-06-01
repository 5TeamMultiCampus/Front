import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useParams, useNavigate } from "react-router-dom";
import { SHOP } from "../../constants/PageURL";
import axios from "axios";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/shop/product/${id}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data : ", error);
      }
    };
    fetchPost();
  }, [id]);

  useEffect(() => {
    console.log(isModalOpen);
  }, [isModalOpen]);

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const handleBuy = () => {};

  const handleCart = () => {
    setIsModalOpen(true);
    console.log(quantity);
    axios.post("/shop/product/addCart", {
      productName: products.productName,
      productCost: products.productCost,
      imgThumbnail: products.imgThumbnail,
      quantity: quantity,
    });
  };

  const handleContinueShopping = () => {
    setIsModalOpen(false);
  };

  const handleGoToCart = () => {
    setIsModalOpen(false);
    window.location.href = SHOP.CART;
  };

  return (
    <ThemeProvider theme={theme}>
      <ProductWrapper>
        <ProductContainer>
          <ProductImage src="/images/product.png" />
          <ProductInfo>
            <ProductTitle>{products.productName}</ProductTitle>
            <ProductPrice>
              {products.productCost
                ? `${products.productCost
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`
                : ""}
            </ProductPrice>
            <ProductQuantity>
              <label htmlFor="quantity">구매수량</label>
              <QuantitySelect
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
              >
                {[...Array(100).keys()].map((n) => (
                  <option key={n} value={n + 1}>
                    {n + 1}
                  </option>
                ))}
              </QuantitySelect>
            </ProductQuantity>
            <ButtonsWrapper>
              <Link to={SHOP.ORDER} style={{ textDecoration: "none" }}>
                <BuyButton onClick={handleBuy}>구매하기</BuyButton>
              </Link>
              <CartButton onClick={handleCart}>장바구니</CartButton>
            </ButtonsWrapper>
          </ProductInfo>
        </ProductContainer>
      </ProductWrapper>
      <Line />
      <ProductDescription>제품 상세 정보</ProductDescription>
      <Line />
      <ProductDetailImage src="/images/productdetail.png" />

      {isModalOpen && (
        <Modal>
          <ModalContent>
            <ModalMessage>장바구니에 추가되었습니다</ModalMessage>
            <ModalButtonsWrapper>
              <ContinueShoppingButton onClick={handleContinueShopping}>
                계속 쇼핑하기
              </ContinueShoppingButton>
              <GoToCartButton onClick={handleGoToCart}>
                장바구니 이동
              </GoToCartButton>
            </ModalButtonsWrapper>
          </ModalContent>
        </Modal>
      )}
    </ThemeProvider>
  );
};

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
`;

const ModalMessage = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

const ModalButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ContinueShoppingButton = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #ccc;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
`;

const GoToCartButton = styled.button`
  padding: 10px 20px;
  background-color: #fbd385;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
`;

const theme = createTheme({
  palette: {
    type: "mainColor",
    primary: {
      main: "#FBD385",
    },
  },
});

const ProductWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const ProductContainer = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid #ccc;
  width: 1350px;
`;

const ProductImage = styled.img`
  width: 550px;
  height: 600px;
  margin-right: 7rem;
  padding-top: 25px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8rem;
`;

const ProductTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ProductPrice = styled.p`
  font-size: 2rem;
  margin-bottom: 20rem;
`;

const ProductQuantity = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: flex-end;
  label {
    margin-right: 1rem;
    font-size: 1.2rem;
  }
`;

const QuantitySelect = styled.select`
  font-size: 1.2rem;
  padding: 0.1rem 0.5rem;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem 6rem;
  font-size: 1.5rem;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  margin-bottom: 1rem;
`;

const CartButton = styled(Button)`
  background-color: #fbd385;
  color: #fff;
`;

const BuyButton = styled(Button)`
  background-color: #fbd385;
  color: #fff;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const Line = styled.hr`
  border: 1px solid rgba(224, 224, 224, 1);
  width: 100%;
  max-width: 1350px;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const ProductDescription = styled.div`
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
`;

const ProductDetailImage = styled.img`
  display: block;
  margin: auto;
`;

export default ProductDetail;
