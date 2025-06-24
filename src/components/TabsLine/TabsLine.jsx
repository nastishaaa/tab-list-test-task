import { useState, useRef, useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { tabsArr } from "../../tabs";
import TabItem from "../TabItem/TabItem";
import c from "./TabsLine.module.css";
import { NavLink } from "react-router";

export default function TabsLine() {
    const [tabs, setTabs] = useState(() => {
        const saved = localStorage.getItem("tabsOrder");
        return saved ? JSON.parse(saved) : tabsArr;
    });
    const [hiddenIndexes, setHiddenIndexes] = useState([])
    const [visibleTabs, setVisibleTabs] = useState(null);
    const [width, setWidth] = useState(1200);
    const [draggingIndex, setDraggingIndex] = useState(null);
    const [pinned, setPinned] = useState([]);

    const containerRef = useRef(null);

    const handleDragStart = (index) => {
        setDraggingIndex(index);
    };
    
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (index) => {
        if (draggingIndex === null || draggingIndex === index) return;
    
        const newTabs = [...tabs];
        const draggedItem = newTabs.splice(draggingIndex, 1)[0];
        newTabs.splice(index, 0, draggedItem);
        setTabs(newTabs);
        setDraggingIndex(null);
        localStorage.setItem("tabsOrder", JSON.stringify(newTabs));
    };

    const handlePinTab = (tabName) => {
        setPinned((prevPinnedTabs) => {
            const newPinnedTabs = prevPinnedTabs.includes(tabName)
                ? prevPinnedTabs.filter(item => item !== tabName)
                : [...prevPinnedTabs, tabName];
            return newPinnedTabs;
        });
    };

    useEffect(() => {
        
            const container = containerRef.current;
            if (!container) return;

            const newWidth = document.documentElement.clientWidth;
            setWidth(newWidth)
            const tabWidth = 145; // приблизна ширина одного табу
            const reservedWidth = 100; // іконка + меню
            const visible = Math.floor((width - reservedWidth) / tabWidth);
        const hidden = tabsArr.slice(visible); 
        setHiddenIndexes(hidden);
        setVisibleTabs(visible);
    }, [width]);

    return (
        <div ref={containerRef} className={c.container}>
            <ul className={c.list}>
                <li>
                    <NavLink to='/' ><button className={c.btnFirst} type="button">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_1_308)">
    <path d="M14 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2L0 16H16V2C16 1.46957 15.7893 0.960859 15.4142 0.585786C15.0391 0.210714 14.5304 0 14 0V0ZM14.6667 2V3.33333H10V1.33333H14C14.1768 1.33333 14.3464 1.40357 14.4714 1.5286C14.5964 1.65362 14.6667 1.82319 14.6667 2ZM7.33333 1.33333H8.66667V5.33333H7.33333V1.33333ZM2 1.33333H6V3.33333H1.33333V2C1.33333 1.82319 1.40357 1.65362 1.5286 1.5286C1.65362 1.40357 1.82319 1.33333 2 1.33333ZM1.33333 14.6667V4.66667H6V6.66667H10V4.66667H14.6667V14.6667H1.33333ZM10 12H13.3333V13.3333H10V12Z" fill="#7F858D" />
  </g>
  <defs>
    <clipPath id="clip0_1_308">
      <rect width="16" height="16" fill="white" />
    </clipPath>
  </defs>
</svg>
                    </button></NavLink>
                    
                </li>

                {tabs.slice(0, visibleTabs).map((tab, index) => (
                    <li
                        key={tab.name}
                        className={c.item}
                        onClick={handlePinTab}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(index)}
                        style={{ display: hiddenIndexes.includes(index) ? 'none' : 'block' }}
                    >
                        <TabItem tab={tab} handlePin={handlePinTab} pinned={pinned.includes(tab.name)} />
                    </li>
                ))}

                {tabsArr.slice(visibleTabs).length > 0 && (
                    <Menu>
                        <MenuButton className={c.btnDropList}>
                            <svg width="16" height="16"  viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.5 4.45L4 8.95L5.05 10L8.5 6.55L11.95 10L13 8.95L8.5 4.45Z" fill="white" />
                        </svg>
                        </MenuButton>
                        <MenuItems className={c.dropMenuItems} anchor="bottom">
                            {tabs.slice(visibleTabs).map((tab, index) => (
                                <MenuItem key={tab.href} className={c.dropItem}
                                draggable onDragStart={() => handleDragStart(index)}
                                onDragOver={handleDragOver}
                                onDrop={() => handleDrop(index)}>
                                    <TabItem tab={tab} handlePin={handlePinTab} pinned={pinned.includes(tab.name)} />
                                </MenuItem>
                            ))}
                        </MenuItems>
                    </Menu>
                )}
            </ul>
        </div>
    );
}
