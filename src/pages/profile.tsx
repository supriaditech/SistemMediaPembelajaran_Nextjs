import Master from "@/components/global/Master";
import { GetServerSideProps } from "next";
import React from "react";
import { SessionType } from "../../types/sessionType";
import { getSession, useSession } from "next-auth/react";
import { ApiUrl } from "../../config/config";
import Image from "next/image";
import { HiOutlineUser } from "react-icons/hi";

function Profile() {
  const { data: session } = useSession() as { data: SessionType | null };
  let photoProfile;
  let gayaBelajar;
  if (session?.user?.role === "GURU") {
    if (session?.user?.Guru?.photo) {
      photoProfile = ApiUrl + "/" + session?.user.Guru?.photo;
    }
  } else if (session?.user?.role === "MURID") {
    if (session?.user?.Murid?.photo) {
      photoProfile = ApiUrl + "/" + session?.user.Murid?.photo;
    }
    if (session?.user?.Murid?.gayaBelajar) {
      gayaBelajar = session?.user?.Murid?.gayaBelajar;
    }
  }
  console.log(session);
  return (
    <Master title={"Profile Page"}>
      <div className="md:flex p-20 mx-auto gap-8 justify-center items-center md:items-start bg-blue-100 min-h-screen">
        {photoProfile ? (
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="w-40 h-40 md:w-40 md:h-40 overflow-hidden">
              <Image
                src={photoProfile}
                width={160} // Sesuaikan ukuran gambar jika perlu
                height={160}
                alt="Profile Picture"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
                className="rounded-full"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-4">
            <HiOutlineUser className="w-40 h-40" />
          </div>
        )}
        <div className="flex flex-col gap-2 pt-2 md:pt-0">
          <p className="text-center md:text-left text-black font-bold text-2xl">
            {session?.user?.name}
          </p>
          <p className="text-center md:text-left text-black font-bold">
            User Id : {session?.user?.userId}
          </p>
          <p className="text-center md:text-left text-black font-bold">
            Nomor Hp : {session?.user?.phoneNumber}
          </p>
          <p className="text-center md:text-left text-black font-bold">
            Role : {session?.user?.role}
          </p>
          {session?.user?.role === "MURID" && (
            <p className="text-center md:text-left text-black font-bold">
              Gaya Belajar : {session?.user?.Murid?.gayaBelajar}
            </p>
          )}
        </div>
      </div>
    </Master>
  );
}

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session: SessionType | null = (await getSession(
    context
  )) as SessionType | null;

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const token = session?.accessToken;

  return {
    props: { token }, // You can pass additional props here if needed
  };
};
