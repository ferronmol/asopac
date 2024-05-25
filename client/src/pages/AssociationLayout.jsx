import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/AssociationHeader";

const AssociationLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AssociationLayout;
