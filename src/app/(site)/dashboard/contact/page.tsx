import Breadcrumb from "@/components/Common/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import TableOne from "@/components/Tables/Table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Contact Page Page | Overview",
  description: "This is contact page description",
};

const OverviewPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="List of Contacts" isDashboard/>
      <TableOne />
    </DefaultLayout>
  );
};

export default OverviewPage;
