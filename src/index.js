import "./index.css";
import "./fonts/Roboto-Regular.ttf";
import "./fonts/LibreBaskerville-Regular.ttf";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Tree from "./components/Tree";
import TitleBar from "./components/TitleBar";

//this is all insanely basic react stuff, so I'm not gonna go through it
export default function App() {
  return (
    <div>
      <TitleBar />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Layout />}
          >
            <Route
              index
              element={<Home />}
            />
            <Route
              path="/tree"
              element={<Tree />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
