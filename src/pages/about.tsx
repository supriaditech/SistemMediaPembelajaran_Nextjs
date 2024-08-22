import Master from "@/components/global/Master";
import Image from "next/image";
import React from "react";

function About() {
  return (
    <Master title="About us">
      <div>
        <div className="flex flex-col justify-center w-full  items-center px-4 md:px-20 py-10">
          <p className="font-bold text-xl">About Us</p>
          <p className="text-justify text-black text-md mt-4">
            "Education Pathway membantu siswa menemukan gaya belajar mereka
            sejak login pertama. Dikembangkan oleh Julio Aldrin Purba, Afif
            Hamzah, dan Gracia Napare Sihombing dari Universitas Negeri Medan
            dari Program Studi Pendidikan Teknologi Informatika dan Komputer
            serta didukung oleh LPPM Universitas Negeri Medan untuk pengembangan
            website Education Pathway, platform ini menawarkan peran Admin,
            Guru, dan Siswa untuk menciptakan pengalaman belajar yang personal
            dan terstruktur."
          </p>
        </div>
        <div className="bg-gray-200 flex flex-col justify-center w-full gap-4 items-center px-20 py-10">
          <p className="font-bold text-xl">Profile Pengembang </p>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col justify-center items-center">
              <Image
                src={"/img/home/Gambar1.jpg"}
                alt="gambar 1"
                width={200}
                height={200}
                className="rounded-md "
              />
              <p className="text-lg font-bold">Afif Hamzah</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <Image
                src={"/img/home/Gambar4.jpg"}
                alt="gambar 1"
                width={200}
                height={200}
                className="rounded-md "
              />
              <p className="text-lg font-bold">Gracia Napare</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <Image
                src={"/img/home/Gambar2.jpg"}
                alt="gambar 1"
                width={200}
                height={200}
                className="rounded-md "
              />
              <p className="text-lg font-bold">Julio Aldrin Purba</p>
            </div>
          </div>
        </div>
      </div>
    </Master>
  );
}

export default About;
