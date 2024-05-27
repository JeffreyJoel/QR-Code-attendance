import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { useState } from "react";
import CreateClassForm from "./CreateClassForm";

export default function CreateClass({ onSubmit }) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (id, duration) => {
    onSubmit(id, duration);
    closeModal()
  };

  function closeModal(){
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={`rounded-lg border bg-white px-4 py-2 font-sans text-sm font-semibold w-[400px] block mx-auto  text-gray-900 no-underline focus:outline-none`}
        >
          Create Class
        </button>
      </DialogTrigger>
      <CreateClassForm onSubmit={handleSubmit} />
    </Dialog>
  );
}
