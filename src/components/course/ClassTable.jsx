import { useStudents } from "@/context/StudentContext";
import PropTypes from "prop-types";

export default function ClassTable({ tableData }) {
  ClassTable.propTypes = {
    tableData: PropTypes.array,
    headers: PropTypes.array,
  };

  const { students } = useStudents();

  return (
    <div className="relative overflow-x-auto rounded">
      {tableData?.length < 1 ? (
        <div className="mt-6 w-full overflow-hidden">
          <p className="text-center text-red-700">
            You have not created any students
          </p>
          <div className="mx-auto h-10 w-10"></div>
        </div>
      ) : (
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-900 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Student
              </th>
              {tableData?.map((classItem, index) => (
                <th scope="col" className="px-6 py-3 mx-auto" key={index}>
                  Week {index + 1}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {students?.map((data, index) => (
              <tr key={index} className="border-b dark:border-gray-70">
                <td className="cursor-pointer whitespace-nowrap px-6 py-4 font-medium">
                  {index + 1}
                </td>
                <td className="cursor-pointer whitespace-nowrap px-6 py-4 font-medium">
                  {data?.fullname}
                </td>
                {tableData?.map((classData) => (
                  <>
                    <td className="cursor-pointer whitespace-nowrap px-6 py-4 font-medium">
                      {classData.students[index].attended ? "Present" : "Absent"}
                    </td>
                  </>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
