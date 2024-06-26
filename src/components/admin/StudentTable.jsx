import PropTypes from "prop-types";
import DeleteModal from "../shared/DeleteModal";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../Firebase";
import EditStudent from "./EditStudent";

export default function Table({ tableData, headers }) {
  Table.propTypes = {
    tableData: PropTypes.array,
    headers: PropTypes.array,
  };

  const deleteStudent = async (id) => {

    await deleteDoc(doc(db, "students", id));
    console.log("deleted");
    location.reload();
  };

  return (
    <div className="relative overflow-x-auto rounded">
      {tableData.length < 1 ? (
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
              {headers.map((header, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {tableData.map((data, index) => (
              <tr key={index} className="border-b dark:border-gray-70">
                <td className="cursor-pointer whitespace-nowrap px-6 py-4 font-medium">
                  {data?.fullname}
                </td>
                <td className="cursor-pointer whitespace-nowrap px-6 py-4 font-medium">
                  {data?.matNumber}
                </td>
                <td className="cursor-pointer whitespace-nowrap px-6 py-4 font-medium">
                  {data?.department}
                </td>
                <td className="cursor-pointer whitespace-nowrap px-6 py-4 font-medium">
                  {data?.level}
                </td>
                <td className="cursor-pointer whitespace-nowrap px-6 py-4 font-medium flex">
                  <span className="mr-3">
                    {" "}
                    <DeleteModal onDelete={()=>{
                      deleteStudent(data?.id)
                    }}/>
                  </span>
                  <span className="">
                  <EditStudent id={data?.id}/>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
