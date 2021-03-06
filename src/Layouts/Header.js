import "./Header.css";
import { Link } from "react-router-dom";
import useAuth from "../Auth/useAuth";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import SlidebarData from "./SlidebarData";
import { BiMenu, BiChevronsLeft, BiLogOut } from 'react-icons/bi';
import Logo from "../img/MEDTIME.svg";
import ButtonLink from "../Components/ButtonLink";
import { useLocation } from "react-router-dom";

const Header = () => {

  const { pathname } = useLocation();
  const auth = useAuth();
  const history = useHistory();

  const [slidebar, setSlidebar] = useState(false);

  const showSidebar = () => {
    setSlidebar(!slidebar);
  }

  const handleLogOut = () => {
    auth.logout();
    history.push("/");

  }

  const getActive = (path) => {
    if(pathname === path) return true;
    return false;
  }

  return (
    <header>
      <div className="navbar">
        <Link to="#" className="menu-btn">
          <BiMenu size="2.5em" color="#2980b9" onClick={showSidebar} />
        </Link>
        {!auth.isLogged() && <ButtonLink to={"/login"} border={"#5DADE2"} color={"transparent"} title="Iniciar sesión" />}
        <Link to={auth.isLogged() ? "/dashboard" : "/"}>
          <div className="Logo">
            <img src={Logo} className="logo-foto" alt="Medtime" />
          </div>
        </Link>
      </div>
      <nav className={slidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <BiChevronsLeft size="2.5em" color="#2980b9" onClick={showSidebar} />
            </Link>
          </li>
          {SlidebarData().map((item, index) => {
            return (
              <li key={index} className="nav-text" onClick={showSidebar}>
                <Link to={item.path} className={`menu-bars ${getActive(item.path) && "nav-active"}`}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>)
          })

          }
          {auth.isLogged() && (
            <li className="nav-text" onClick={() => {
              handleLogOut();
              showSidebar()
            }}>
              <Link to="#" className="menu-bars">
                <BiLogOut color="#2980b9" size="1.5em" />
                <span>LogOut</span>
              </Link>
            </li>)
          }
        </ul>
      </nav>
    </header>
  )
}

export default Header
