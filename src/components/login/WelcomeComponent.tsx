import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

function WelcomeComponent() {
  return (
    <div className="bg-gradient-to-r from-blue-300 to-cyan-200 h-full rounded-lg flex justify-center items-center">
      <Image
        width={600}
        height={20}
        src={"/img/login/login.png"}
        alt="Iustrator Login"
        priority
      />
    </div>
  );
}

export default WelcomeComponent;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(session);
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
