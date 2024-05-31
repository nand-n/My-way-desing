import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import DateSettings from "@/components/DateSettings/DateSettings";

export const metadata: Metadata = {
  title: "Date Page | Overview",
  description: "This is Date page description",
};

const DatePage = () => {
  return (
    <div className=" text-black dark:text-white bg-white dark:bg-dark min-h-screen">
      <DefaultLayout>
          <Breadcrumb pageName="Date Settings" isDashboard />
          <DateSettings />
      </DefaultLayout>
    </div>
  );
};

export default DatePage;
