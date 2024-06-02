import { useCourses } from "@/context/CourseContext";
import ClassTable from "./ClassTable";
import PropTypes from "prop-types";
import useClassData from "@/hooks/useClassData";
import { useParams } from "react-router-dom";

export default function ClassOverview() {
  const { id } = useParams();

  const { courses } = useCourses();
  const foundCourse = courses.find((course) => course?.id === id);
  const { classData } = useClassData(foundCourse?.id);
  // console.log(courses);

  return (
    <div className="mt-20">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Overview
          </h3>
          <small className="text-lg font-light text-gray-200">
            List of students and their attendance for each week
          </small>
        </div>

        {/* <CreateERC20 /> */}
      </div>
      <ClassTable tableData={classData} />
    </div>
  );
}
ClassOverview.propTypes = {
  classData: PropTypes.array.isRequired,
};
