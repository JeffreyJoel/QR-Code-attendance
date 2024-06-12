import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { useState } from "react";
import EditStudentForm from "./EditStudentForm";
import { Pen } from "lucide-react";

export default function EditStudent(id) {
  const [open, setOpen] = useState(false);

  function closeModal() {
    setOpen(false);
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Pen />
        </DialogTrigger>
        <EditStudentForm onSubmit={closeModal} id={id}/>
      </Dialog>
    </div>
  );
}
