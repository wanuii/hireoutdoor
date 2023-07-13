import React from 'react';
import { Link } from 'react-router-dom';
import './productSellerCard.scss';
function ProductSellerCard(props) {
  const { productSeller } = props
  return (
    <>
      <div className="product-body">
        <div className="pd-flex">
          <div className="pd-body-l">
            <img
              src={`http://localhost:8000/img/${productSeller.profilePictureSrc}`}
              alt=""
            />
          </div>
          <div className="pd-body-m">
            <div>
              <p>{productSeller.nickname}</p>
              <p>租家評價</p>
              <p>4.5/5分</p>
            </div>
            <div className="pd-body-btn">
              <button>
                聊聊<i className="bi bi-chat-fill"> </i>
              </button>
              <Link target='_blank' to={`/productSeller/${productSeller.account}`}>
                出租商品一覽
                <i className="bi bi-house-fill" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductSellerCard;
