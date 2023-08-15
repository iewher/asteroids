import React from "react";
import "../../scss/header/header.scss";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="header">
      <h1>ARMAGEDDON 2023</h1>
      <p>
        ООО “Команда им. Б. Уиллиса”.
        <br /> Взрываем астероиды с 1998 года.
      </p>
    </div>
  );
};

export default Header;
