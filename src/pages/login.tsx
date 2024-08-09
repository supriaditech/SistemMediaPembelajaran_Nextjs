import FormInputComponent from "@/components/login/FormInputComponent";
import WelcomeComponent from "@/components/login/WelcomeComponent";
import Head from "next/head";
import React from "react";

function login() {
  return (
    <>
      <Head>
        <title>Login Page</title>
        <meta name="description" content="This is the login page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="h-screen bg-customColor flex justify-center items-center px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40 py-20">
        <div className="bg-white grid grid-cols-1 md:grid-cols-2 justify-center items-center h-full w-full max-w-4xl rounded-lg shadow-lg">
          <WelcomeComponent />
          <FormInputComponent />
        </div>
      </div>
    </>
  );
}

export default login;
