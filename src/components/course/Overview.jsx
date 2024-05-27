import OverviewCard from "../shared/OverviewCard";
import { useStudents } from "@/context/StudentContext";
import CreateClass from "./CreateClass";
import { PropTypes } from "prop-types";
import { useCourses } from "@/context/CourseContext";
import { useParams } from "react-router-dom";
import useClassData from "@/hooks/useClassData";
import ClassOverview from "./ClassOverview";

export default function Overview() {
  const { id } = useParams();
  const { courses } = useCourses();
  const foundCourse = courses.find((course) => course?.id === id);
  const {students} = useStudents()
  const {classData} = useClassData(foundCourse?.id)

  return (
    <div className="mt-16">
      <div className="flex flex-col gap-6 lg:flex-row  mb-0">
        <OverviewCard
          title="Students"
          mainContent={students.length}
          // subContent="+20.1% from last month"
        />
        <OverviewCard
          title="Classes"
          mainContent={classData?.length}
          // subContent="+180.1% from last month"
        />
      </div>

      <div className="p-4 px-0 w-full">

      </div>

      <div className="mt-0 mb-0">
        <ClassOverview classData={classData} />
      </div>
    </div>
  );
}

Overview.propTypes = {
  classData: PropTypes.object,
};
