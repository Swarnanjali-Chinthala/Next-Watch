import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from '../../context/ThemeContext'
import { IoHome } from "react-icons/io5";
import { SlGameController } from "react-icons/sl";
import { RiSaveFill } from "react-icons/ri";
import { FaFire } from "react-icons/fa";

import "./index.css";

export default function Sidebar({ isSidebarVisible, closeSidebar }) {
  const { isDarkTheme } = useTheme();

  return (
    <aside
      className={`sidebar ${isDarkTheme ? 'dark' : 'light'} ${
        isSidebarVisible ? 'open' : 'closed'
      }`}
    >
      <nav className="sidebar__nav">
        <NavLink to="/" className="sidebar__link" onClick={closeSidebar}>
          <IoHome className="sidebar__icon" />
          <span>Home</span>
        </NavLink>

        <NavLink to="/trending" className="sidebar__link" onClick={closeSidebar}>
          <FaFire className="sidebar__icon" />
          <span>Trending</span>
        </NavLink>

        <NavLink to="/gaming" className="sidebar__link" onClick={closeSidebar}>
          <SlGameController className="sidebar__icon" />
          <span>Gaming</span>
        </NavLink>

        <NavLink to="/saved-videos" className="sidebar__link" onClick={closeSidebar}>
          <RiSaveFill className="sidebar__icon" />
          <span>Saved Videos</span>
        </NavLink>
      </nav>

      {/* Stick to bottom */}
      <div className="sidebar__contact">
        <p className="sidebar__contact-title">CONTACT US</p>
        <div className="sidebar__socials">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
          />
        </div>
      </div>
    </aside>
  );
}
