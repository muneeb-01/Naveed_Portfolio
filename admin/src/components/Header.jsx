// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBell } from 'react-icons/fa'; // Search and Bell icons from FontAwesome
import { BiMenu } from 'react-icons/bi'; // Menu icon from Boxicons
import { BsFillPersonFill } from 'react-icons/bs'; // Profile icon from Bootstrap icons
import {useAppStore} from "../Store/index"

const Header = () => {
  const { toggleSidebar,toggleDarkMode } = useAppStore();
  return (
    <nav className='w-full'>
      {window.innerWidth > 800 && 
      <BiMenu onClick={toggleSidebar} id='switch' className="bx bx-menu" />
      }
      <Link to="#" className="nav-link">Categories</Link>
      <form action="#">
        <div className="form-input">
          <input type="search" placeholder="Search..." />
          <button type="submit" className="search-btn">
            <FaSearch />
          </button>
        </div>
      </form>
      <input onChange={toggleDarkMode} type="checkbox" id="switch-mode" hidden />
      <label htmlFor="switch-mode"  className="switch-mode"></label>
      <Link to="#" className="notification">
        <FaBell />
        <span className="num">8</span>
      </Link>
      <Link to="#" className="profile">
        <BsFillPersonFill />
      </Link>
    </nav>
  );
};

export default Header;
