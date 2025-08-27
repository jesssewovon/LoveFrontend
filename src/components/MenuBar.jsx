import { NavLink } from "react-router"; // ⚠️ should be react-router-dom, not react-router

const menuItems = [
  { to: "/", icon: "flaticon-dog-house" },
  { to: "explore", icon: "flaticon-search" },
  { to: "wishlist", icon: "flaticon-heart" },
  { to: "chat-list", icon: "flaticon-chat-1" },
  { to: "profile", icon: "flaticon-user" },
];

export default function SideBar() {
  return (
    <div className="menubar-area footer-fixed">
      <div className="toolbar-inner menubar-nav">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <i className={`flaticon ${item.icon}`} />
          </NavLink>
        ))}
      </div>
    </div>
  );
}
