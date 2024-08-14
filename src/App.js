import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/NavBar';
import Footer from './components/footer/Footer';
import About from './components/about/About';
import Buy from './components/buy/Buy';
import OG_NFT from './components/og_nft/OG_NFT';
import Staking from './components/staking/Staking';
import Roadmap from './components/roadmap/Roadmap';
import MetaMaskLogin from './components/login/MetaMaskLogin'; // Import the MetaMaskLogin component
import Profile from './components/profile/Profile';
import Team from './components/team/Team';

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
            <Route path="/team" element={<Team />} />
            <Route path="/og_nft" element={<OG_NFT />} />
            <Route path="/staking" element={<Staking />} />
            <Route path="/roadmap" element={<Roadmap />} />
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
