/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
import { Outlet, useNavigate } from "react-router-dom";
import { FaAngleDoubleUp } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import "./Layout.css";
import { animateScroll as scroll } from "react-scroll";
import Appbar from "./Appbar";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const [expanded, setExpanded] = useState(false);
  const navRef = useRef();
  const [toggle, setToggle] = useState(false);
  const toggleSideBar = () => {
    setToggle((toggle) => !toggle);
  };

  const containerRef = useRef();
  const handleToggleCloseBtn = () => {
    setToggle(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const button = document.getElementById("button");
      if (window.scrollY > 50) {
        button.classList.add("scrollToTopBtn");
      } else {
        button.classList.remove("scrollToTopBtn");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo(0, 0);
    scroll.scrollToTop({ smooth: true });
  }

  return (
    <main>
      <Appbar toggle={toggle} navRef={navRef} toggleSideBar={toggleSideBar} />
      <div>
        <div
          ref={containerRef}
          onClick={handleToggleCloseBtn}
          className={`${toggle ? `drawer-content` : `activeDrawer`}  `}
        >
          <Outlet />
        </div>

        <Sidebar toggle={toggle} />
      </div>

      <button onClick={scrollToTop} id="button">
        <div className="scrollBtn">
          <FaAngleDoubleUp size={25} />
        </div>
      </button>
    </main>
  );
};

export default DashboardLayout;
