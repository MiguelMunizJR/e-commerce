import React from "react";
import products from "./style/products.css";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { useNavigate } from "react-router-dom";

const scrollToTop = () => {
  const container = document.querySelector("*");
  container.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const ProductCard = ({ product, setIsEmpty }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product?.id}`);
    scrollToTop();
  };

  // Agregar al carrito de compras
  const handleAddCart = (e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");

    if (token) {
      const URL = "https://ecommerce-api-react.herokuapp.com/api/v1/cart";
      const obj = {
        id: product?.id,
        quantity: 1,
      };

      axios
        .post(URL, obj, getConfig())
        .then((res) => {
          alert("product added to cart");
          setIsEmpty(false);
        })
        .catch();
    } else {
      alert("You need to be logged in to add products to your cart. 😕");
      navigate("/login");
    }
  };

  // console.log(product);

  return (
    <article className="product__card" onClick={handleClick}>
      <div className="product__header">
        <img
          src={`${product.productImgs[0]}`}
          alt=""
          className="product__img"
        />
      </div>
      <h2 className="product__title">{product.title}</h2>
      <div className="product__footer">
        <div className="product__price">
          <p className="product__price-title">Price</p>
          <span className="product__price-value">$ {product.price}</span>
        </div>
        <button className="product__btn" onClick={handleAddCart}>
          <i className="fa-solid fa-cart-shopping"></i>
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
