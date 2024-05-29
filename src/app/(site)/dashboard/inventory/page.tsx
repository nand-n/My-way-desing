import Breadcrumb from "@/components/Common/Breadcrumb";
import TableOne from "@/components/Tables/Table";
import { Metadata } from "next";
import { Tabs, Tab } from "@/components/Tabs";
import { Button } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

export const metadata: Metadata = {
  title: "Inventory Page | Overview",
  description: "This is Inventory page description",
};

const OverviewPage = () => {
  return (
    <div className=" text-black dark:text-white bg-white dark:bg-dark min-h-screen">
      <DefaultLayout>
          <Breadcrumb pageName="Inventory" isDashboard />
        <Tabs>
          <Tab title="Overview">
            <TableOne />
          </Tab>
          <Tab title="Stock">
            <></>
          </Tab>
          <Tab title="Needed Items">
            <></>
          </Tab>
          <Tab title="Assign Items">
            <></>
          </Tab>
        </Tabs>
      </DefaultLayout>
    </div>
  );
};

export default OverviewPage;
