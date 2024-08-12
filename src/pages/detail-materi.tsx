import Master from "@/components/global/Master";
import React from "react";
import { GetServerSideProps } from "next";
import Api from "../../service/Api";
import { SessionType } from "../../types/sessionType";
import { getSession } from "next-auth/react";
import { MateriType } from "../../types/materiType";

function DetailMateri({ materiData }: any) {
  if (!materiData) {
    return (
      <Master title="Detail materi">
        <div className="w-screen h-screen flex justify-center items-center">
          Materi tidak ditemukan
        </div>
      </Master>
    );
  }

  return (
    <Master title="Detail materi">
      <div className="px-20 py-10">
        <h1 className="text-4xl font-bold mb-4">{materiData.title}</h1>
        <div className="relative pb-[56.25%] h-0">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${new URLSearchParams(
              new URL(materiData.videoUrl).search
            ).get("v")}`}
            allowFullScreen
          />
        </div>

        <div
          className="mt-4 text-justify"
          dangerouslySetInnerHTML={{ __html: materiData.content }}
        />
      </div>
    </Master>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { materi } = context.query;
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

  const api = new Api();
  api.url = `/materi/get-id-materi`;
  api.auth = true;
  api.token = session.accessToken;
  api.body = { id: parseInt(materi as string, 10) };

  try {
    const response = await api.call();

    if (response?.meta?.statusCode === 200) {
      // Gunakan optional chaining untuk menghindari error
      return {
        props: {
          materiData: response.data,
        },
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default DetailMateri;
