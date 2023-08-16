import React from "react";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../const";
import SendPage from "./send-page.tsx";

interface SendProps {
  asteroidId: number[];
  active: boolean[];
}

const Send: React.FC<SendProps> = ({ asteroidId, active }) => {
  const navigate = useNavigate();

  console.log(asteroidId);

  const handleGoSendPage = () => {
    navigate(AppRoute.SEND_PAGE, {
      state: { asteroidId: asteroidId, active: active },
    });
  };

  return (
    <div>
      <button onClick={handleGoSendPage}>отправить</button>
    </div>
  );
};

export default Send;
