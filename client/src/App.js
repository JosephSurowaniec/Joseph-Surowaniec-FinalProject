import { BrowserRouter, Routes, Route } from "react-router-dom";
import Character from "./components/Character";
import CharacterProfile from "./components/CharacterProfile";
import EditCharacter from "./components/EditCharacter";
import Footer from "./components/Footer";
import Header from "./components/Header";

import MainPage from "./components/Mainpage";
import ProfilePage from "./components/ProfilePage";
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
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/character/:characterId" element={<CharacterProfile />} />
        <Route path="/character/edit/:characterId" element={<EditCharacter />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
