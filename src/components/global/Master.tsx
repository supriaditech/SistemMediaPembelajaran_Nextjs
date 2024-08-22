import React from "react";
import { Slide, ToastContainer } from "react-toastify";
import Head from "next/head";
import { StickyNavbar } from "./navbar/StickyNavbar";

interface MasterProps {
  children?: React.ReactNode;
  title: string;
}

const Master: React.FC<MasterProps> = ({ children, title }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <div className="min-h-screen flex flex-col">
      <StickyNavbar />
      <main className="flex-grow">{children}</main>
      {/* <Footer showCarRentals={showCarRentals} /> */}
    </div>
    {/* <ToastContainer
        theme="colored"
        transition={Slide}
        position="top-center"
      /> */}
  </>
);

export default Master;
