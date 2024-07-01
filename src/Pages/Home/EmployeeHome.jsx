import React from "react";
import LoadingSpinner from "../../Components/LoadingSpinner";
import NoticeBoard from "../../Components/NoticeBoard";
import RequestList from "../../Components/RequestList";
import Warning from "../../Components/Warning";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";

const EmployeeHome = () => {
  const [role, companyName, companyLogo, isRoleLoading] = useRole();
  const { user } = useAuth();

  if (isRoleLoading) {
    return <LoadingSpinner />;
  }

  if (!companyName) {
    return (
      <div className="my-4 space-y-6">
        <h1 className="text-4xl font-bold text-center text-teal-500 mb-6">
          Welcome Back, {user.displayName}!
        </h1>
        <Warning />
      </div>
    );
  }

  return (
    <div className="my-4 space-y-6">
      <h1 className="text-4xl font-bold text-center text-teal-500 mb-6">
        Welcome Back, {user.displayName}!
      </h1>
      <NoticeBoard />
      <RequestList />
    </div>
  );
};

export default EmployeeHome;
