import Breadcrumb from "@/components/Common/Breadcrumb";
import DarkModeSwitcher from "@/components/DashboardHeader/DarkModeSwitcher";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ChartOne from "@/components/charts/chart1";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Overview Page | Overview",
  description: "This is contact page description",
};

const OverviewPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Charts" />
    <ChartOne />
    </DefaultLayout>
  );
};

export default OverviewPage;
