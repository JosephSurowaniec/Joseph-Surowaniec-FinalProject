import { BrowserRouter, Routes, Route } from "react-router-dom";
import Character from "./components/Character";
import Header from "./components/Header";

import MainPage from "./components/Mainpage";
import SigninPage from "./components/SigninPage";
import GlobalStyles from "./GlobalStyles";

const App = () => {
  return (
    <BrowserRouter>
    <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/character" element={<Character />} />
        <Route path="/createAccount" element={<SigninPage />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
