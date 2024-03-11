import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";
import "./navbar.css";
const NavBar = () => {
  return (
    <div className="navbar">
      <div className="navnar-title">ראשי</div>
      <div className="navbar-menu">
        <div className="navbar-search">
          <MdSearch />
          <input type="text" placeholder="search..." className="navbar-input" />
        </div>
        <div className="navbar-icons">
          <MdNotifications size={20} />
          <MdOutlineChat size={20} />
          <MdPublic size={20} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
