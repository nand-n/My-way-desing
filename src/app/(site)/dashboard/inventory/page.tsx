import Breadcrumb from "@/components/Common/Breadcrumb";
import TableOne from "@/components/Tables/Table";
import { Metadata } from "next";
import { Tabs, Tab } from "@/components/Tabs";
import { Button } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import InventoryOverview from "@/components/Inventory/InventoryOverview";
import StockItems from "@/components/Inventory/Stock";
import NeededItems from "@/components/Inventory/NeededItems";
import AssignItems from "@/components/Inventory/AssignItems";

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
            <InventoryOverview />
          </Tab>
          <Tab title="Stock">
            <StockItems />
          </Tab>
          <Tab title="Needed Items">
            <NeededItems /> 
          </Tab>
          <Tab title="Assign Items">
            <AssignItems />
          </Tab>
        </Tabs>
      </DefaultLayout>
    </div>
  );
};

export default OverviewPage;
