import { useState, useRef } from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import c from "./TabItem.module.css";

export default function TabItem({ tab, handlePin, pinned, fromDropdown = false }) {
  const [showPopup, setShowPopup] = useState(false);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => setShowPopup(true), 400); // затримка 400мс
  };

  const handleMouseLeave = () => {
    clearTimeout(timerRef.current);
    setShowPopup(false);
  };

  const handleTogglePin = () => {
    handlePin(tab.name);
    setShowPopup(false);
  };

    return (
        <div
            className={c.tabWrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <NavLink
  to={tab.href}
  className={({ isActive }) =>
    clsx(
        {
        [c.btn]: !fromDropdown,
        [c.pinned]: pinned,
        [c.active]: isActive,
        [c.dropdownBtn]: fromDropdown,
      }
    )
  }
>
                <span>
                    {tab.icon}
                {/* <svg className={c.svgIcon} width="24" height="24" fill="#343434">
                    <use href={`/assets/symbol.svg#${tab.icon}`} ></use>
                </svg> */}
                </span>
                {tab.name}
            </NavLink>

            {showPopup && (
                <div className={c.popup}>
                    <button onClick={handleTogglePin}>
                        📌 {pinned ? "Unpin Tab" : "Pin Tab"}
                    </button>
                </div>
            )}
        </div>
    );
}
