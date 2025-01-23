import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

import Home from './pages/home.jsx'
import RecipeViewer from './pages/recipeViewer.jsx'
import RecipeCreator from './pages/recipeCreator.jsx'

function App() {
	return (
    <Router>
      <Header />
      <main className="bodypages" style={{ marginLeft: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe-viewer" element={<RecipeViewer />} />
          <Route path="/recipe-creator" element={<RecipeCreator />} />
        </Routes>
      </main>
    </Router>
	)
}

function Header() {
  const navigator = useNavigate();
  return (
    <header className="headerbar">
      <h1>Eaty</h1>
      <nav className="navbar" style={{ display: "flex", flexDirection: "row", textAlign:"left"}}>
        <button onClick={() => {navigator('/')}} style={{ marginRight: "20px" }}>Home</button>
        <button onClick={() => {navigator('recipe-creator')}} style={{ marginRight: "20px" }}>Recipe Creator</button>
      </nav>
    </header>
  );
}

const root = createRoot(document.body);
root.render(<App />);
