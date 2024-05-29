import Breadcrumb from "@/components/Common/Breadcrumb";
import TableOne from "@/components/Tables/Table";
import { Metadata } from "next";
import { Tabs, Tab } from "@/components/Tabs";
import { Button } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

export const metadata: Metadata = {
  title: "Finance Page | Overview",
  description: "This is Finance page description",
};

const FinancePage = () => {
  return (
    <div className=" text-black dark:text-white bg-white dark:bg-dark min-h-screen">
      <DefaultLayout>
          <Breadcrumb pageName="Finance" isDashboard />
        <Tabs>
          <Tab title="All Finance ">
            <TableOne />
          </Tab>
          <Tab title="Stock Finance">
            <></>
          </Tab>
          <Tab title="Soldout Finance">
            <></>
          </Tab>
        </Tabs>
      </DefaultLayout>
    </div>
  );
};

export default FinancePage;
