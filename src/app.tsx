import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { motion, animate, AnimatePresence } from 'motion/react';

import Home from './pages/home'
import RecipeViewer from './pages/recipeViewer'
import RecipeCreator from './pages/recipeCreator'

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
  const tabs = [
    {path: "/", label: "Home"},
    {path: "/recipe-creator", label: "Recipe Creator"},
    {path: "/recipe-viewer", label: "Recipe Viewer"},
  ];
  const navigator = useNavigate();
  return (
    <>
      <header className="headerbar">
        <h1 className="title">Eat<span className='titleHighlight'>y</span></h1>
        <nav className="navbar">
          {tabs.map((item) => (
            <motion.li
              key={item.path}
              initial={false}
              className='navTab'
              onClick={() => navigator(item.path)}
            >
              {item.label}
              {item.path == useLocation().pathname ? (
                <AnimatePresence>
                  <motion.div
                    className='navUnderline'
                    layoutId='navUnderline'
                    id='navUnderline'
                    initial={{
                      //scale: 0.5,
                    }}
                    animate={{
                      scale: 0.5,
                    }}
                  />
                </AnimatePresence>
              ) : null}
            </motion.li>
          ))}
        </nav>
      </header>
    </>
  );
}

const root = createRoot(document.body);
root.render(<App />);
