/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

const DeleteModal = ({onDelete}) => {

  return (
    <div>
      <Dialog>
        <DialogTrigger><Trash2/></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <Button className="bg-red-600 text-white w-1/2 mx-auto" onClick={() => onDelete()}>Delete</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteModal;
