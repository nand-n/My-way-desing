import Breadcrumb from "@/components/Common/Breadcrumb";
import TableOne from "@/components/Tables/Table";
import { Metadata } from "next";
import { Tabs, Tab } from "@/components/Tabs";
import { Button } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

export const metadata: Metadata = {
  title: "Date Page | Overview",
  description: "This is Date page description",
};

const DatePage = () => {
  return (
    <div className=" text-black dark:text-white bg-white dark:bg-dark min-h-screen">
      <DefaultLayout>
          <Breadcrumb pageName="Date" isDashboard />
      </DefaultLayout>
    </div>
  );
};

export default DatePage;
