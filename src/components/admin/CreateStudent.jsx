import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { useState } from "react";
import CreateStudentForm from "./CreateStudentForm";

export default function CreateStudent() {
  const [open, setOpen] = useState(false);

  function closeModal(){
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={`mr-2 rounded-xl border bg-white px-4 py-2 font-sans text-sm font-semibold  text-gray-900 no-underline focus:outline-none`}
        >
          Create Student
        </button>
      </DialogTrigger>
      <CreateStudentForm onSubmit={closeModal}/>
    </Dialog>
  );
}
