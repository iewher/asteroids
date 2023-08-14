import React from "react";
import "./scss/app.scss";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Main from "./components/main/main.tsx";

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
