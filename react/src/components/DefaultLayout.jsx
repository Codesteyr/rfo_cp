import React, { useState, useEffect } from "react";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const DefaultLayout = () => {
  const {
    user,
    token,
    setUser,
    setToken,
    setProducts,
    setIsLoading,
    notification,
  } = useStateContext();

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axiosClient.get(`/shugoproduct`);
        setProducts(productResponse.data.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setProducts, setIsLoading]);

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
      closeSidebar(); // Закрываем сайдбар после выхода
    });
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div id="defaultLayout">
      <div className={`content ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <header>
          <div className="content_header">
            <div className="logoAion"></div>
            <div className="headerInfo">
              <div>
                <NavLink
                  to="/dashboard"
                  className="nav-link"
                  activeClassName="activeLink"
                >
                  <h2>ГЛАВНАЯ</h2>
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="/download"
                  className="nav-link"
                  activeClassName="activeLink"
                >
                  <h2>СКАЧАТЬ</h2>
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="/donate"
                  className="nav-link"
                  activeClassName="activeLink"
                >
                  <h2>ДОНАТ</h2>
                </NavLink>
              </div>
              <div>
                <a href="##">
                  <h2>САЙТ</h2>
                </a>
              </div>
            </div>
          </div>

          <div>
            <div className="playerInfo">
              {/* <div className="information--player">
                <div className="username">
                  <p>{user.name}</p>
                </div>
                <div className="balance">
                  <p>{user.coin} WP</p>
                </div>
              </div> */}

              <div className="exit">
                <button
                  onClick={onLogout}
                  className="btn-logout"
                  href="#"
                ></button>
              </div>
            </div>
          </div>
        </header>
        <main>
          <Outlet />
        </main>

        {notification && <div className="notification">{notification}</div>}
      </div>
    </div>
  );
};

export default DefaultLayout;
