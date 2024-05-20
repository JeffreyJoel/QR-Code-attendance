/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowBigLeftDash, Cog, School } from "lucide-react";
import { useState } from "react";
import AdminAuth from "../auth/AdminAuth";
import LecturerAuth from "../auth/LecturerAuth";

export function Roles() {
  
  const [activeTab, setActiveTab] = useState(0);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Get Started</Button>
      </DialogTrigger>
      <DialogContent className="rounded-4xl">
        <DialogHeader>
          <DialogTitle>Select a role</DialogTitle>
        </DialogHeader>
        {activeTab == 0 ? (
          <div className="flex flex-col sm:flex-row py-4 cursor-pointer">
            <div
              className="p-12 px-4 py-3 w-full lg:w-1/2   my-2  sm:m-4 border-solid border-2 border-grey-500 rounded-2xl"
              onClick={() => {
                setActiveTab(1);
              }}
            >
              <h3 className="text-sm font-medium p-2 px-0">Role</h3>
              <School />
              <p className="font-bold text-2xl mt-2">Lecturer</p>
              {/* <p className="text-xs">{subContent}</p> */}
            </div>
            <div className="p-12 px-4 py-3 w-full lg:w-1/2 my-2  sm:m-4 border-solid border-2 border-grey-500 rounded-2xl cursor-pointer"   onClick={() => {
                setActiveTab(2);
              }}>
              <h3 className="text-sm font-medium p-2 px-0">Role</h3>
              <Cog />
              <p className="font-bold text-2xl mt-2">Admin</p>
              {/* <p className="text-xs">{subContent}</p> */}
            </div>
          </div>
        ) : (
          ""
        )}
        {activeTab == 1 ? <LecturerAuth /> : ""}
        {activeTab == 2 ? <AdminAuth /> : ""}
        
        <DialogFooter className="block">
         {activeTab !== 0 ?  <ArrowBigLeftDash onClick={()=>{setActiveTab(0)}} />: ""}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
