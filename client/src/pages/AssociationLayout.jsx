import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/AssociationHeader";
import WelcomeBar from "../components/common/WelcomeBar";

const AssociationLayout = () => {
  return (
    <div className="flex flex-col h-[10px]">
      <Header />
      <WelcomeBar />
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
