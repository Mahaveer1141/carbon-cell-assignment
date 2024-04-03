import { ReactNode } from "react";

interface IProps {
  icon: ReactNode;
  title: String;
  selected?: boolean;
  onClick: () => void;
}

export default function SidebarItem({
  icon,
  title,
  selected,
  onClick,
}: IProps) {
  return (
    <div
      onClick={onClick}
      className={`sidebar-item__container ${selected ? "selected" : ""}`}
    >
      <div className="sidebar-item__icon">{icon}</div>
      <div className="sidebar-item__title">{title}</div>
    </div>
  );
}
