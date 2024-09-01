import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Budgeting from './components/Budgeting'
import Tax from './components/Tax'
import Goals from './components/Goals'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/budgeting" element={<Budgeting />}></Route>
            <Route path="/tax-calculator" element={<Tax />}></Route>
            <Route path="/financial-goals" element={<Goals />}></Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
