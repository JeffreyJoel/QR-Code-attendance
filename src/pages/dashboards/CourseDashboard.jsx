import Class from "@/components/course/Class";
import Overview from "@/components/course/Overview";
import DashboardTabNavigation from "@/components/shared/DashboardNav";
import { useCourses } from "@/context/CourseContext";
import { useState } from "react";
import { useParams } from "react-router-dom";

const CourseDashboard = () => {
  const { id } = useParams();
  const [tab, setTab] = useState(0);
  const { courses } = useCourses();
  const foundCourse = courses.find((course) => course?.id === id);
  //   console.log(id);

  return (
    <div>
      <h1 className="text-3xl font-semibold w-full fixed top-0 py-6 z-40">
        {foundCourse?.Course} Dashboard
      </h1>
      <div className="mt-12 relative">
        <DashboardTabNavigation
          tabs={[
            { id: 0, label: "Overview" },
            { id: 1, label: "Class" },
          ]}
          selectedTab={tab}
          setTab={setTab}
        />

        <div className="p-4 px-0 sm:mx-auto">
          {tab == 0 ? <Overview /> : ""}
          {tab == 1 ? <Class /> : ""}
        </div>
      </div>
    </div>
  );
};

export default CourseDashboard;
