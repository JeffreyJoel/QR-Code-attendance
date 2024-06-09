import Class from "@/components/course/Class";
import Overview from "@/components/course/Overview";
import DashboardTabNavigation from "@/components/shared/DashboardNav";
import { useCourses } from "@/context/CourseContext";
import { ArrowBigLeftDash } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CourseDashboard = () => {
  const { id } = useParams();
  const [tab, setTab] = useState(0);
  const { courses } = useCourses();
  const navigate = useNavigate()
  const foundCourse = courses.find((course) => course?.id === id);
  //   console.log(id);
  console.log(foundCourse);

  return (
    <div>
      <div className="flex items-center w-full fixed top-0 pt-6 pb-5 z-40 bg-background">
        <ArrowBigLeftDash className="mr-3 cursor-pointer" onClick={()=>{
          navigate(-1);
        }}/>
        <h1 className="text-3xl font-semibold ">
          {foundCourse?.Course} Dashboard
        </h1>
      </div>
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
