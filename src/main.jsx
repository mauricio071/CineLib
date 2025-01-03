import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/index.jsx";
import Favorites from "./pages/Favorites/index.jsx";
import Search from "./pages/Search/index.jsx";
import FavoritesProvider from "./components/contexts/Favorites.jsx";
import Details from "./pages/Details/index.jsx";
import Genre from "./pages/Genre/index.jsx";
import PageNotFound from "./pages/PageNotFound/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<Details />} />
            <Route path="/genre" element={<Genre />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </FavoritesProvider>
    </BrowserRouter>
  </StrictMode>
);
