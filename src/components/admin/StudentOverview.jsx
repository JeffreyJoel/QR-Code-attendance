import Table from "./StudentTable";
import CreateStudent from "./CreateStudent";
import { useStudents } from "@/context/StudentContext";

export default function StudentOverview() {
  const {students}  = useStudents();
  return (
    <div className="mt-20 w-full">
      <div className="mb-5 w-full flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Student Overview
          </h3>
          <small className="text-lg font-light text-gray-200">
            The list of all students on the platform.
          </small>
        </div>

        <CreateStudent/>
      </div>
      <Table headers={["Name", "MatNumber", "Department", "Level", "Actions"]} tableData={students}/>
    </div>
  );
}
