import React from "react";
import "../../scss/footer/footer.scss";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="footer">
      <p>© Все права и планета защищены</p>
    </div>
  );
};

export default Footer;
