import React, { useEffect, useState } from "react";
import { AddMateriType, MateriType } from "../../../../../types/materiType";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import { Button, Input } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import CSS untuk styling Quill editor

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface ModalEditMateriProps {
  token: string;
  materi: MateriType | null;
  onClose: () => void;
  onSubmit: SubmitHandler<AddMateriType>;
}

interface FormValues {
  title: string;
  content: string;
  videoUrl: string;
  id: number;
}

function ModalEditMateri({
  token,
  materi,
  onClose,
  onSubmit,
}: ModalEditMateriProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MateriType>();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (materi) {
      setValue("id", materi.id);
      setValue("title", materi.title);
      setContent(materi.content);
      setValue("videoUrl", materi.videoUrl);
    }
  }, [materi, setValue]);

  const handleFormSubmit = async (data: FormValues) => {
    const result = await onSubmit({ ...data, content });
    if (result !== undefined) {
      onClose();
    }
  };
  return (
    <div className="flex justify-center p-4 ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="w-full flex flex-col justify-center items-center">
          <Image
            src="/img/home/AssetEdit.png"
            alt="Logo"
            width={180}
            height={48}
            priority
            className="flex justify-center"
          />
        </div>
        <p className="text-lg font-bold text-black mb-4 text-center">
          Edit Materi
        </p>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-4"
        >
          {/* <Input type="hidden" {...register("id")} /> */}
          <Input
            crossOrigin={undefined}
            label="Title"
            {...register("title", { required: "Title is required" })}
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
            <Button color="red" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" color="blue">
              Simpan
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

export default ModalEditMateri;
