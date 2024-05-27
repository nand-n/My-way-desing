import Breadcrumb from "@/components/Common/Breadcrumb";
import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "prodcuts Page | My Way Desing",
  description: "This is Products page page description",
};

const ProductsPage = () => {
  return (
    <>
      <Breadcrumb pageName="Products" />
      <Features />
      
    </>
  );
};

export default ProductsPage;
