import Class from "@/components/course/Class";
import Overview from "@/components/course/Overview";
import DashboardTabNavigation from "@/components/shared/DashboardNav";
import { useState } from "react";
// import { useParams } from "react-router-dom";

const CourseDashboard = () => {
//   const { id } = useParams();
  const [tab, setTab] = useState(0);

//   console.log(id);

  return (
    <div>
      <h1 className="text-3xl font-semibold">Course Dashboard</h1>
      <div className="mt-4 relative">
        <DashboardTabNavigation
          tabs={[
            { id: 0, label: "Overview" },
            { id: 1, label: "Class" },
          ]}
          selectedTab={tab}
          setTab={setTab}
        />

        <div className="p-4 px-0 sm:mx-auto">
          {tab == 0 ? <Overview/> : ""}
          {tab == 1 ? <Class /> : ""}
        </div>
      </div>
    </div>
  );
};

export default CourseDashboard;
