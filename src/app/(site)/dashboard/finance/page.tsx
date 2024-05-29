import Breadcrumb from "@/components/Common/Breadcrumb";
import Finance from "@/components/Finance/FinanceComponent";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Finance Page | Play SaaS Starter Kit and Boilerplate for Next.js",
  description: "This is Finance page description",
};

const FinancePage = () => {
  return (
    <>
    <DefaultLayout>
    <Breadcrumb pageName="Finance Page" isDashboard />
      <Finance />
    </DefaultLayout>


    </>
  );
};

export default FinancePage;
