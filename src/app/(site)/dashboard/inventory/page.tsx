import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import { Tabs, Tab } from "@/components/Tabs";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import StockItems from "@/components/Inventory/Stock";
import NeededItems from "@/components/Inventory/NeededItems";

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
          <Tab title="Inventory Stock">
            <StockItems />
          </Tab>
          <Tab title="Needed Items">
            <NeededItems /> 
          </Tab>
        </Tabs>
      </DefaultLayout>
    </div>
  );
};

export default OverviewPage;
