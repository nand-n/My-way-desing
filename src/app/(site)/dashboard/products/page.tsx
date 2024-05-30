import Breadcrumb from "@/components/Common/Breadcrumb";
import TableOne from "@/components/Tables/Table";
import { Metadata } from "next";
import { Tabs, Tab } from "@/components/Tabs";
import { Button } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import AllProducts from "@/components/Products/AllProducts";

export const metadata: Metadata = {
  title: "Products Page | Overview",
  description: "This is Products page description",
};

const ProductsPage = () => {
  return (
    <div className=" text-black dark:text-white bg-white dark:bg-dark min-h-screen">
      <DefaultLayout>
          <Breadcrumb pageName="Products" isDashboard />
        <Tabs>
          <Tab title="All Products ">
            <>
            <AllProducts />
            </>
          </Tab>
          <Tab title="Stock Products">
            <></>
          </Tab>
          <Tab title="Soldout Products">
            <></>
          </Tab>
        </Tabs>
      </DefaultLayout>
    </div>
  );
};

export default ProductsPage;
