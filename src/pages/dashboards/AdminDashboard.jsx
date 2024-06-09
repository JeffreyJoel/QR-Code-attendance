import Overview from "@/components/admin/Overview";
import StudentOverview from "@/components/admin/StudentOverview";
import DashboardTabNavigation from "@/components/shared/DashboardNav";
import { ArrowBigLeftDash } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  return (
    <div>
      {/* <h1 className="text-3xl font-semibold w-full fixed top-0 py-6 z-40">Admin Dashboard</h1> */}
      <div className="flex items-center w-full fixed top-0 pt-6 pb-5 z-40 bg-background">
        <ArrowBigLeftDash
          className="mr-3 cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        />
        <h1 className="text-3xl font-semibold ">Admin Dashboard</h1>
      </div>
      <div className="mt-12 relative w-full">
        <DashboardTabNavigation
          tabs={[
            { id: 0, label: "Overview" },
            { id: 1, label: "Students" },
            // { id: 2, label: "Courses" },
          ]}
          selectedTab={tab}
          setTab={setTab}
        />

        <div className="p-4 px-0 sm:mx-auto">
          {tab == 0 ? <Overview /> : ""}
          {/* {tab == 2 ? <COverview /> : ""} */}
          {tab == 1 ? <StudentOverview /> : ""}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
