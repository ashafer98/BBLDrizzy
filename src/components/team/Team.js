import React from 'react';
import '../../index.css';
import logo from '../../assets/bbld/top_page_logo.png'; // Adjust the path if necessary
import kikil0 from '../../assets/kikil0.png'; // Image for Team Member 1
import sudoakula from '../../assets/sudoakula.png'; // Image for Team Member 2
import { Link } from 'react-router-dom';

function Team() {
  return (
    <div className="main-container">
      <h2>Our Team</h2>
      <div className="team-members">
        <div className="team-member">
          <img src={kikil0} alt="kikil0" className="team-image" />
          <h3>kikil0</h3>
          <p className="role"><b>Role:</b> Marketer</p>
          <p className="description">
            Strategic marketing leader with an MBA in Management and a strong background in Web3 projects, as well as front-end and back-end development. Expertise in both marketing and technology enables them to bridge the gap between creative and technical aspects, delivering results that align with business goals. Passionate about leveraging emerging technologies, dedicated to pushing the boundaries of what's possible in the digital landscape.
          </p>
        </div>
        <div className="team-member">
          <img src={sudoakula} alt="sudoakula" className="team-image" />
          <h3>sudoakula</h3>
          <p className="role"><b>Role:</b> Developer</p>
          <p className="description">
            Web3 and Blockchain Specialist, focusing on Decentralized Finance (DeFi) solutions. Successfully deployed a variety of smart contracts on Ethereum, including NFTs, ERC20, ERC721(A), and DAOs. Certified and Highly Educated, holding a master's degree in cybersecurity, CISSP certification, and TS/SCI clearance. Currently engaged in PhD research on asynchronous consensus protocols for blockchain systems.
          </p>
        </div>
      </div>

      <Link to="/">
        <button className="button">Back</button>
      </Link>
    </div>
  );
}

export default Team;
