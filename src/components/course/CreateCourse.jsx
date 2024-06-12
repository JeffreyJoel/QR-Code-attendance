import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { useState } from "react";
import CreateCourseForm from "./CreateCourseForm";

export default function CreateCourse({ onSubmit }) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (id, duration) => {
    onSubmit(id, duration);
    closeModal();
  };

  function closeModal() {
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={`mr-2 rounded-xl border bg-white px-4 py-2 font-sans text-sm font-semibold  text-gray-900 no-underline focus:outline-none`}
        >
          Create Course
        </button>
      </DialogTrigger>
      <CreateCourseForm onSubmit={handleSubmit} />
    </Dialog>
  );
}
