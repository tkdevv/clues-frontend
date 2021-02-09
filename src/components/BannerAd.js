import React from "react";

const BannerAd = ({ ad }) => {
  return (
    <div className="bna-wrapper">
      <div className="bna-container">
        <a href={ad.link} target="_blank">
          <div className="bna-indicator">AD</div>
          <h3 className="bna-btyb-text">Brought to you by</h3>
          <div className="head-container">
            <img src={ad.image} alt={ad.title + "-ad"} className="bna-image" />
            <h1 className="bna-heading">{ad.title}</h1>
          </div>
          <h3 className="bna-description">{ad.description}</h3>
          <button className="bna-cta-btn">{ad.cta}</button>
        </a>
      </div>
    </div>
  );
};

export default BannerAd;
