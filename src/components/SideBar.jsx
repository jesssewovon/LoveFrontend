import { NavLink, Link } from "react-router";
import { useTheme } from "../ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import { setIsDarkTheme, signinPiketplace, signoutPiketplace } from "../varsSlice";
import { useTranslation } from "react-i18next";
import Loader from "./Loader";
import { useCallback } from "react";

export default function SideBar() {
  const { t } = useTranslation();
  const { isSideBarOpen, setSideBarStatus } = useTheme();
  const dispatch = useDispatch();
  const { isDarkTheme, user, isLoggedIn, isLoading } = useSelector((state) => state.vars);

  const handleLogin = useCallback(() => {
    const scopes = ["username", "payments", "wallet_address", "preferred_language"];
    const onIncompletePaymentFound = (payment) => {
      const txid = payment.transaction.txid;
      const paymentId = payment.identifier;
      console.log("Incomplete payment:", { paymentId, txid });
    };
    dispatch(signinPiketplace({ scopes, onIncompletePaymentFound }));
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    if (!isLoading) {
      dispatch(signoutPiketplace());
    }
  }, [dispatch, isLoading]);

  return (
    <>
      <div
        className={`dark-overlay ${isSideBarOpen ? "active" : ""}`}
        onClick={() => setSideBarStatus(false)}
      />
      <div className={`sidebar ${isSideBarOpen ? "show" : ""}`}>
        <div className="inner-sidebar" style={{ display: "grid", alignItems: "center" }}>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="author-box">
                <div className="dz-media">
                  <img src="/assets/images/user/pic1.jpg" alt="author" />
                </div>
                <div className="dz-info">
                  <h5 className="name">{user?.name || "John Doe"}</h5>
                  <span>{user?.email || "example@gmail.com"}</span>
                </div>
              </Link>

              <ul className="nav navbar-nav">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <span className="dz-icon">
                      <i className="icon feather icon-home"></i>
                    </span>
                    <span>Home</span>
                  </NavLink>
                </li>

                {/* Example SPA links instead of .html */}
                <li>
                  <NavLink to="/" className="nav-link">
                    <span className="dz-icon">
                      <i className="icon feather icon-heart"></i>
                    </span>
                    <span>W3Dating Package</span>
                  </NavLink>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="nav-link btn btn-link w-100 text-start"
                  >
                    <span className="dz-icon">
                      <i className="icon feather icon-log-out"></i>
                    </span>
                    <span>Logout</span>
                    {isLoading && <Loader />}
                  </button>
                </li>
              </ul>
            </>
          ) : (
            <div className="mt-4 mx-2">
              <button
                disabled={isLoading}
                onClick={handleLogin}
                className="btn mb-2 me-2 btn-icon icon-start w-100 btn-primary"
              >
                {t("log_in_first")}
                {isLoading && <Loader />}
              </button>
            </div>
          )}

          <div className="sidebar-bottom">
            <ul className="app-setting">
              <li>
                <div className="mode">
                  <span className="dz-icon">
                    <i className="icon feather icon-moon"></i>
                  </span>
                  <span>Dark Mode</span>
                  <div className="custom-switch">
                    <input
                      type="checkbox"
                      className="switch-input theme-btn"
                      id="toggle-dark-menu"
                      checked={isDarkTheme}
                      onChange={() => dispatch(setIsDarkTheme(!isDarkTheme))}
                    />
                    <label
                      className="custom-switch-label"
                      htmlFor="toggle-dark-menu"
                    />
                  </div>
                </div>
              </li>
            </ul>
            <div className="app-info">
              <h6 className="name">Dating App</h6>
              <span className="ver-info">App Version 1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
