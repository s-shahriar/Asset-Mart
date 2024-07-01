import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

const NavBar = () => {
  const { logOut, user, loading } = useAuth();
  const [photo, setPhoto] = useState(null);
  const [role, companyName, companyLogo, isRoleLoading] = user
    ? useRole()
    : [null, null, null, false];

  const handleLogout = async () => {
    await logOut().then(() => {
      toast.success("Logout Successful", {
        position: "top-center",
      });
    });
  };

  useEffect(() => {
    if (user && user.photoURL) {
      setPhoto(user.photoURL);
    } else {
      setPhoto(
        "https://i.ibb.co/hfZnRhv/images-q-tbn-ANd9-Gc-RIpx-Yi1tsp-Yp-BDWAt4qe-VB37-ZEomz-Av-MXG0-Q-s.png"
      );
    }
  }, [loading, user]);

  return (
    <div className="navbar bg-primary">
      <div className="navbar-start">
        {/* mobile menu */}

        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden bg-teal-500 hover:bg-teal-600 px-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[55] p-2 shadow bg-white rounded-box w-52 space-y-1"
          >
            {!user && (
              <>
                <li>
                  <NavLink
                    to="/join-employee"
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-4 bg-teal-500 text-white rounded-lg"
                        : "block py-2 px-4 hover:bg-teal-500 hover:text-white rounded-lg"
                    }
                  >
                    Join as Employee
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/join-hr"
                    className="block py-2 px-4 hover:bg-teal-500 hover:text-white"
                  >
                    Join as HR Manager
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className="block py-2 px-4 hover:bg-teal-500 hover:text-white"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}

            {user && !isRoleLoading && role === "employee" && companyName && (
              <>
                <li>
                  <NavLink
                    to="/my-assets"
                    className="block py-2 px-4 hover:bg-teal-500 hover:text-white"
                  >
                    My Assets
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/my-team"
                    className="block py-2 px-4 hover:bg-teal-500 hover:text-white"
                  >
                    My Team
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/request-asset"
                    className="block py-2 px-4 hover:bg-teal-500 hover:text-white"
                  >
                    Request for an Asset
                  </NavLink>
                </li>
              </>
            )}

            {user && !isRoleLoading && role === "employee" && (
              <li>
                <NavLink
                  to="/profile"
                  className="block py-2 px-4 hover:bg-teal-500 hover:text-white"
                >
                  Profile
                </NavLink>
              </li>
            )}

            {user && !isRoleLoading && role === "hr" && (
              <>
                <li>
                  <NavLink
                    to="/"
                    className="block py-2 px-4 hover:bg-teal-500 hover:text-white"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/asset-list"
                    className="block py-2 px-4 hover:bg-teal-500 hover:text-white"
                  >
                    Asset List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/add-asset"
                    className="block py-2 px-4 hover:bg-teal-500 hover:text-white"
                  >
                    Add an Asset
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/all-requests"
                    className="flex py-2 px-4 hover:bg-teal-500 hover:text-white"
                  >
                    All Requests
                  </NavLink>
                </li>
                <li>
                  <details>
                    <summary className="flex py-2 px-4 hover:bg-teal-500 hover:text-white">
                      Employees
                    </summary>
                    <ul className="p-2">
                      <li>
                        <NavLink
                          to="/employee-list"
                          className="flex py-2 px-4 hover:bg-teal-500 hover:text-white"
                        >
                          My Employee List
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/add-employee"
                          className="flex py-2 px-4 hover:bg-teal-500 hover:text-white"
                        >
                          Add an Employee
                        </NavLink>
                      </li>
                    </ul>
                  </details>
                </li>
                <li>
                  <NavLink
                    to="/profile"
                    className="block py-2 px-4 hover:bg-teal-500 hover:text-white"
                  >
                    Profile
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* mobile menu ends */}

        {/* Company Logo Portion Starts */}

        <NavLink
          to="/"
          className="text-base font-bold text-white dark:text-white uppercase ml-4"
        >
          {!user ||
          (role === "employee" && (!companyName || companyName === "")) ||
          (role === "hr" && (!companyLogo || companyLogo === "")) ? (
            "Asset Mart"
          ) : (
            <img src={companyLogo} alt="Company Logo" className="h-8" />
          )}
        </NavLink>
      </div>

      {/* Company Logo Portion Ends */}

      {/* center position */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu-horizontal px-1 text-white uppercase font-bold space-x-6">
          {!user && (
            <>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 px-4 bg-teal-500 text-white rounded-lg"
                      : "block py-2 px-4 hover:bg-teal-500 hover:text-white rounded-lg"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/join-employee"
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 px-4 bg-teal-500 text-white rounded-lg"
                      : "block py-2 px-4 hover:bg-teal-500 hover:text-white rounded-lg"
                  }
                >
                  Join as Employee
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/join-hr"
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 px-4 bg-teal-500 text-white rounded-lg"
                      : "block py-2 px-4 hover:bg-teal-500 hover:text-white rounded-lg"
                  }
                >
                  Join as HR Manager
                </NavLink>
              </li>
            </>
          )}

          {user && !isRoleLoading && role === "employee" && companyName && (
            <>
              <li>
                <NavLink
                  to="/my-assets"
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 px-4 bg-teal-500 text-white rounded-lg"
                      : "block py-2 px-4 hover:bg-teal-500 hover:text-white rounded-lg"
                  }
                >
                  My Assets
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/my-team"
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 px-4 bg-teal-500 text-white rounded-lg"
                      : "block py-2 px-4 hover:bg-teal-500 hover:text-white rounded-lg"
                  }
                >
                  My Team
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/request-asset"
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 px-4 bg-teal-500 text-white rounded-lg"
                      : "block py-2 px-4 hover:bg-teal-500 hover:text-white rounded-lg"
                  }
                >
                  Request for an Asset
                </NavLink>
              </li>
            </>
          )}

          {user && !isRoleLoading && role === "employee" && (
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-4 bg-teal-500 text-white rounded-lg"
                    : "block py-2 px-4 hover:bg-teal-500 hover:text-white rounded-lg"
                }
              >
                Profile
              </NavLink>
            </li>
          )}

          {user && !isRoleLoading && role === "hr" && (
            <>
              <ul className="menu menu-horizontal px-1 space-x-4">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-4 bg-teal-500 text-white rounded-lg"
                        : "block py-2 px-4 hover:bg-teal-500 hover:text-white rounded-lg"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <details>
                    <summary className="flex py-2 px-4 hover:bg-teal-500 hover:text-white rounded-lg">
                      Asset Management
                    </summary>
                    <ul className="p-2 space-y-1">
                      <li>
                        <NavLink
                          to="/asset-list"
                          className={({ isActive }) =>
                            isActive
                              ? "block py-2 px-4 bg-teal-500 text-white rounded-lg"
                              : "block py-2 px-4 hover:bg-teal-500 hover:text-white rounded-lg text-black"
                          }
                        >
                          Asset List
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/add-asset"
                          className={({ isActive }) =>
                            isActive
                              ? "block py-2 px-4 bg-teal-500 text-white rounded-lg"
                              : "block py-2 px-4 hover:bg-teal-500 hover:text-white rounded-lg text-black"
                          }
                        >
                          Add an Asset
                        </NavLink>
                      </li>
                    </ul>
                  </details>
                </li>
                <li>
                  <NavLink
                    to="/all-requests"
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-4 bg-teal-500 text-white rounded-lg"
                        : "block py-2 px-4 hover:bg-teal-500 hover:text-white rounded-lg"
                    }
                  >
                    All Requests
                  </NavLink>
                </li>
                <li>
                  <details>
                    <summary className="flex py-2 px-4 hover:bg-teal-500 hover:text-white rounded-lg">
                      Employees
                    </summary>
                    <ul className="p-2 space-y-1">
                      <li>
                        <NavLink
                          to="/employee-list"
                          className={({ isActive }) =>
                            isActive
                              ? "block py-2 px-4 bg-teal-500 text-white rounded-lg"
                              : "block py-2 px-4 hover:bg-teal-500 hover:text-white rounded-lg text-black"
                          }
                        >
                          My Employee List
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/add-employee"
                          className={({ isActive }) =>
                            isActive
                              ? "block py-2 px-4 bg-teal-500 text-white rounded-lg"
                              : "block py-2 px-4 hover:bg-teal-500 hover:text-white rounded-lg text-black"
                          }
                        >
                          Add an Employee
                        </NavLink>
                      </li>
                    </ul>
                  </details>
                </li>
                <li>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-4 bg-teal-500 text-white rounded-lg"
                        : "block py-2 px-4 hover:bg-teal-500 hover:text-white rounded-lg"
                    }
                  >
                    Profile
                  </NavLink>
                </li>
              </ul>
            </>
          )}
        </ul>
      </div>

      {/* center position ends */}

      {/* end position */}

      <div className="navbar-end space-x-1 md:space-x-4 lg:space-x-4">
        {user ? (
          <>
            <button
              onClick={handleLogout}
              className="text-white btn bg-teal-500 border-0 hover:bg-teal-600 hover:border-0"
            >
              Logout
            </button>
            <Tooltip id="my-tooltip" className="z-50" />
            <div className="avatar online">
              <div
                className="w-12 rounded-full z-55"
                data-tooltip-id="my-tooltip"
                data-tooltip-content={user.displayName || "Unnamed"}
                data-tooltip-place="bottom-end"
              >
                {photo && <img src={photo} alt="User Avatar" />}
              </div>
            </div>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className="text-white btn bg-teal-500 border-0 hover:bg-teal-600 hover:border-0"
            >
              Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
