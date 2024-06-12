import Table from "./StudentTable";
import CreateCourse from "../course/CreateCourse";
import { useCourses } from "@/context/CourseContext";
import CourseTable from "./CourseTable";

export default function CoursesOverview() {
  const {courses}  = useCourses();
  console.log(courses);
  return (
    <div className="mt-20 w-full">
      <div className="mb-5 w-full flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Courses Overview
          </h3>
          <small className="text-lg font-light text-gray-200">
            The list of all courses on the platform.
          </small>
        </div>

        <CreateCourse/>
      </div>
      <CourseTable headers={["Id", "Course", "Email", "Password", "Action"]} tableData={courses}/>
    </div>
  );
}
