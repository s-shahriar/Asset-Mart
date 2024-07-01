import React from "react";
import { Helmet } from "react-helmet";
import LoadingSpinner from "../../Components/LoadingSpinner";
import useRole from "../../Hooks/useRole";
import EmployeeHome from "./EmployeeHome";
import GuestHome from "./GuestHome";
import HRHome from "./HRHome";


const Home = () => {
  const [role, companyName, companyLogo, isRoleLoading] = useRole()

  if (isRoleLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Helmet>
        <title>Home - AssetMart</title>
      </Helmet>
      {(role === 'guest' || role === undefined) && <GuestHome />}
      {role === 'employee' && <EmployeeHome />}
      {role === 'hr' && <HRHome />}
    </div>
  );
};

export default Home;
