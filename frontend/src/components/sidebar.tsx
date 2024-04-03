import "@/styles/sidebar.scss";
import { IoHomeOutline } from "react-icons/io5";
import { LuBuilding } from "react-icons/lu";
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { MdOutlineHistory } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import SidebarItem from "./sidebar-item";
import { useState } from "react";

interface IProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: IProps) {
  const [selected, setSelected] = useState<number>(0);

  const sidebarItems = [
    { icon: <IoHomeOutline />, title: "Home" },
    { icon: <LuBuilding />, title: "Organization" },
    { icon: <HiMiniArrowsUpDown />, title: "Trade" },
    { icon: <MdOutlineHistory />, title: "History" },
  ];

  return (
    <div className={`sidebar__container ${isOpen ? "" : "hide"}`}>
      <div className="sidebar__header">
        <div className="sidebar__header-text">Carbon Cell</div>
        <div onClick={onClose} className="sidebar__header-icon">
          <IoCloseSharp />
        </div>
      </div>
      <div className="sidebar__body">
        {sidebarItems.map((sidebarItem, index) => (
          <SidebarItem
            key={index}
            onClick={() => setSelected(index)}
            selected={index === selected}
            icon={sidebarItem.icon}
            title={sidebarItem.title}
          />
        ))}
      </div>
    </div>
  );
}
