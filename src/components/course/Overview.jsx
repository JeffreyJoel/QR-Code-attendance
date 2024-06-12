import OverviewCard from "../shared/OverviewCard";
import { useStudents } from "@/context/StudentContext";
// import CreateClass from "./CreateClass";
import { PropTypes } from "prop-types";
import { useCourses } from "@/context/CourseContext";
import { useParams } from "react-router-dom";
import useClassData from "@/hooks/useClassData";
import ClassOverview from "./ClassOverview";
import { transformClassesData } from "@/hooks/useTransformChartData";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Overview() {
  const { id } = useParams();
  const { courses } = useCourses();
  const foundCourse = courses.find((course) => course?.id === id);
  const { students } = useStudents();
  const { classData } = useClassData(foundCourse?.id);
  console.log(classData);
  const transformedData = transformClassesData(classData);

  return (
    <div className="mt-16">
      <div className="flex flex-col gap-6 lg:flex-row  mb-0">
        <OverviewCard
          title="Students"
          mainContent={students.length}
        />
        <OverviewCard
          title="Classes"
          mainContent={classData?.length}
        />
      </div>
      {classData && classData.length > 0 && (
        <div className=" w-full mt-8">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              width={500}
              height={400}
              data={transformedData}
              margin={{
                top: 10,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis/>
              <Tooltip />
              <Area
                type="monotone"
                dataKey="attendance"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
      <div className="mt-0 mb-0">
        <ClassOverview classData={classData} />
      </div>
    </div>
  );
}

Overview.propTypes = {
  classData: PropTypes.object,
};
