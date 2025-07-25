"use client";

import { useState, useEffect } from "react";
import { Link, Events } from "react-scroll";
import {
  FaHome,
  FaUser,
  FaTools,
  FaCode,
  FaPhone,
  FaFile,
  FaChalkboardTeacher,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import styles from "./styles/Sidebar.module.css";

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Register scroll event listeners from react-scroll
    Events.scrollEvent.register("begin", () => {});
    Events.scrollEvent.register("end", () => {});

    // Close sidebar when clicking outside on small screens
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("sidebar");
      const toggleButton = document.getElementById("sidebar-toggle");
      if (
        sidebar &&
        !sidebar.contains(event.target) &&
        toggleButton &&
        !toggleButton.contains(event.target) &&
        window.innerWidth <= 600 &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    // Add event listener for window resize
    const handleResize = () => {
      if (window.innerWidth > 600) {
        setIsOpen(true); // Always show sidebar on larger screens
      } else if (!isOpen) {
        setIsOpen(false); // Keep sidebar closed on small screens if it was closed
      }
    };

    // Initialize sidebar state based on screen size
    handleResize();

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  const handleSetActive = (to) => {
    setActiveSection(to);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    // Close sidebar after clicking a link on mobile
    if (window.innerWidth <= 600) {
      setIsOpen(false);
    }
  };

  const navLinks = [
    { to: "home", icon: <FaHome />, label: "Home" },
    { to: "about", icon: <FaUser />, label: "About" },
    { to: "skills", icon: <FaTools />, label: "Skills" },
    { to: "education", icon: <FaFile />, label: "Education" },
    { to: "experience", icon: <FaChalkboardTeacher />, label: "Experience" },
    { to: "projects", icon: <FaCode />, label: "Projects" },
    { to: "contact", icon: <FaPhone />, label: "Contact" },
  ];

  return (
    <>
      <button
        id="sidebar-toggle"
        className={styles.toggleButton}
        onClick={toggleSidebar}
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <nav
        id="sidebar"
        className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
      >
        <ul>
          {navLinks.map(({ to, icon, label }) => (
            <li key={to}>
              <Link
                to={to}
                smooth={true}
                duration={500}
                spy={true}
                isDynamic={true}
                onSetActive={handleSetActive}
                className={activeSection === to ? styles.active : ""}
                title={label}
                onClick={handleLinkClick}
              >
                {icon} <span>{label}</span>
              </Link>
            </li>
          ))}
          <li>
            <a
              href="https://yourdomain.com/your-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              title="Resume"
              className={styles.resumeLink}
              onClick={handleLinkClick}
            >
              <FaFile /> <span>Resume</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
