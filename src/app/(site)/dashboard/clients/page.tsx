import Breadcrumb from "@/components/Common/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Client Page | Play SaaS Starter Kit and Boilerplate for Next.js",
  description: "This is contact page description",
};

const ClinetPage = () => {
  return (
    <>
    <DefaultLayout>
    <Breadcrumb pageName="Clinet Page" />

    </DefaultLayout>


    </>
  );
};

export default ClinetPage;
