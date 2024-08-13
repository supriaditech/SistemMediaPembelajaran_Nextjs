import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import CSS untuk styling Quill editor
import { useMateri } from "../../../../../hooks/useMateri";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface FormValues {
  title: string;
  content: string;
  videoUrl: string;
}

interface MateriProps {
  token: string;
  onClose: () => void;
}

function ModalAddMateri({ token, onClose }: MateriProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>();
  const { onSubmit, loading } = useMateri(token);

  const [content, setContent] = useState("");

  const handleFormSubmit = async (data: FormValues) => {
    const result = await onSubmit({ ...data, content });
    if (result !== undefined) {
      onClose();
    }
  };

  return (
    <div className="flex justify-center p-4 w-full ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full  max-h-[80vh] overflow-y-auto">
        <div className="w-full flex flex-col justify-center items-center">
          <Image
            src="/img/home/addUser.png"
            alt="Logo"
            width={180}
            height={48}
            priority
            className="flex justify-center"
          />
        </div>
        <p className="text-lg text-center font-bold text-black mb-4">
          Tambah Materi
        </p>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-4"
        >
          <Input
            crossOrigin={undefined}
            label="Judul materi"
            {...register("title", { required: "Judul materi is required" })}
            className="mb-4"
          />

          <ReactQuill
            value={content}
            onChange={setContent}
            className="mb-4"
            placeholder="Deskripsi Materi"
          />

          <Input
            crossOrigin={undefined}
            label="Link Video"
            {...register("videoUrl", {
              required: "Link Video is required",
            })}
            className="mb-4"
          />

          <div className="flex justify-end gap-2 mt-4">
            <Button color="red" onClick={onClose} disabled={loading}>
              Batal
            </Button>
            <Button type="submit" color="blue" disabled={loading}>
              {loading ? "Menambahkan..." : "Simpan"}
            </Button>
          </div>
        </form>
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
    </div>
  );
}

export default ModalAddMateri;
