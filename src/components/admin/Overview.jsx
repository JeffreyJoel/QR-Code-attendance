import OverviewCard from "../shared/OverviewCard";
import CourseOverview from "./CourseOverview";
import StudentOverview from "./StudentOverview";

export default function Overview() {
  return (
    <div className="mt-16">
      <div className="flex flex-col gap-6 lg:flex-row  mb-0">
        <OverviewCard
          title="Students"
          mainContent={0}
          // subContent="+20.1% from last month"
        />
        <OverviewCard
          title="Courses"
          mainContent={0}
          // subContent="+180.1% from last month"
        />
        {/* <OverviewCard
          title="Withdrawals"
          mainContent={0}
          // subContent="+19% from last month"
        /> */}
      </div>
      <div className="flex flex-col md:flex-row m-2 mt-0 mb-0">
        <CourseOverview />
      </div>
      <div className="flex flex-col md:flex-row m-2 mt-0 mb-0">
        <StudentOverview />
      </div>
    </div>
  );
}
