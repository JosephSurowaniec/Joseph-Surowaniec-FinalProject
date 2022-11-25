import { BrowserRouter, Routes, Route } from "react-router-dom";
import Character from "./components/Character";
import Header from "./components/Header";

import MainPage from "./components/Mainpage";
import GlobalStyles from "./GlobalStyles";

const App = () => {
  return (
    <BrowserRouter>
    <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/character" element={<Character />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
