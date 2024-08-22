import React, { useEffect } from "react";
import { AddSoalType, SoalType } from "../../../types/soalType";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";

interface ModalEditSoalProps {
  token: string;
  soal: SoalType | null;
  onClose: () => void;
  onSubmit: SubmitHandler<AddSoalType>;
}

interface Option {
  text: string;
}

interface FormValues {
  question: string;
  answer: string;
  options: Option[];
  materiId: number;
  id: number;
}

function ModalEditSoal({ token, soal, onClose, onSubmit }: ModalEditSoalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (soal) {
      setValue("id", soal.id);
      setValue("question", soal.question);
      setValue("answer", soal.answer);
      setValue("materiId", soal.materiId);
      setValue("options", soal.options || []);
    }
  }, [soal, setValue]);

  const handleFormSubmit: SubmitHandler<FormValues> = async (data) => {
    const formattedData = {
      id: data.id,
      question: data.question,
      answer: data.answer,
      options: data.options.map((option) => ({ text: option.text })),
      materiId: data.materiId,
    };

    const result = await onSubmit(formattedData as any);
    if (result !== undefined) {
      onClose();
    }
  };

  const answerOptions = ["a", "b", "c", "d"];

  return (
    <div className="flex justify-center p-4 w-full">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-h-[80vh] overflow-y-auto">
        <p className="text-lg text-center font-bold text-black mb-4">
          Edit Soal
        </p>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-4"
        >
          <Input
            crossOrigin={undefined}
            label="Pertanyaan"
            {...register("question", { required: "Pertanyaan is required" })}
            className="mb-4"
            defaultValue={soal?.question || ""}
          />
          <div>
            <p className="font-semibold">Jawaban</p>
            <select
              {...register("answer", { required: "Jawaban is required" })}
              className="p-2 border border-gray-300 rounded w-full px-4"
              defaultValue={soal?.answer || ""}
            >
              <option value="">Pilih Jawaban</option>
              {answerOptions.map((option) => (
                <option key={option} value={option}>
                  {option}.{" "}
                  {soal?.options
                    .find((o) => o.text.startsWith(option))
                    ?.text.split(option)[1] || ""}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="font-semibold">Opsi</p>
            {answerOptions.map((prefix, index) => (
              <div key={index} className="flex gap-2 items-center mb-2">
                <Input
                  crossOrigin={undefined}
                  label={`Opsi ${index + 1}`}
                  defaultValue={
                    soal?.options
                      .find((o) => o.text.startsWith(prefix))
                      ?.text.split(prefix)[1] || ""
                  }
                  {...register(`options.${index}.text`, {
                    required: "Opsi is required",
                  })}
                />
              </div>
            ))}
          </div>
          <input
            type="hidden"
            {...register("materiId")}
            value={soal?.materiId || ""}
          />
          <input type="hidden" {...register("id")} value={soal?.id || ""} />

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

export default ModalEditSoal;
