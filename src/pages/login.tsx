import FormInputComponent from "@/components/login/FormInputComponent";
import WelcomeComponent from "@/components/login/WelcomeComponent";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import { ToastContainer } from "react-toastify";

function login() {
  return (
    <>
      <Head>
        <title>Login Page</title>
        <meta name="description" content="This is the login page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center items-center px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40 py-20">
        <div className="bg-white grid grid-cols-1 lg:grid-cols-2 justify-center items-center h-full w-full max-w-4xl rounded-lg shadow-lg">
          <WelcomeComponent />
          <FormInputComponent />
        </div>{" "}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
}

export default login;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {}, // You can pass additional props here if needed
  };
};
