import { Roles } from "@/components/landing/Roles";
import school from "../assets/school-girl.png";
export default function Home() {
  return (
    <section className="w-full py-6 md:py-12 lg:py-16">
      <div className="flex flex-col lg:flex-row gap-5 justify-between  px-4">
        <div className="flex flex-col gap-2 items-center justify-center ">
          <div className="space-y-2">
            <div className="inline-block rounded-lg w-fit mx-auto bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              Introducing
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
              Student Attendance System
            </h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Streamline attendance tracking and improve student engagement with
              our modern platform.
            </p>
          </div>
          <div className="mt-10 w-full lg:flex justify-start">
           <Roles/>
          </div>
        </div>
        <div>
          <img src={school} alt="" />
        </div>
      </div>
    </section>
  );
}
