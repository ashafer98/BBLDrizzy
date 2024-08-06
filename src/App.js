import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/NavBar';
import Footer from './components/footer/Footer';
import About from './components/about/About';
import Buy from './components/buy/Buy';
import Home from './components/home/Home'; // Import the Home component
import MetaMaskLogin from './components/login/MetaMaskLogin'; // Import the MetaMaskLogin component
import Profile from './components/profile/Profile';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const account = localStorage.getItem('account');
    if (account) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <main>
          <Routes>
            <Route path="/" element={<About />} />  {/* Set Home as default route */}
            <Route path="/buy" element={<Buy />} />
            <Route path="/home" element={loggedIn ? <Home /> : <About />} />
            <Route path="/login" element={<MetaMaskLogin setLoggedIn={setLoggedIn} />} />
            <Route path="/profile" element={loggedIn ? <Profile /> : <About /> } /> {/* Update path */}
            {/* Add other routes here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
