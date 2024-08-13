import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button, Input } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSoal } from "../../../hooks/useSoal";

interface Option {
  text: string;
}

interface FormValues {
  question: string;
  answer: string;
  options: Option[];
  materiId: number;
}

interface ModalSoalProps {
  token: string;
  onClose: () => void;
  materiId: number;
}

function ModalAddSoal({ token, onClose, materiId }: ModalSoalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    defaultValues: {
      options: [{ text: "a" }, { text: "b" }, { text: "c" }, { text: "d" }],
      materiId,
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "options",
  });

  const { onSubmit, loading, mutate } = useSoal(materiId, token);

  const handleFormSubmit = async (data: FormValues) => {
    // Define the prefix for each option
    const optionPrefixes = ["a", "b", "c", "d"];

    // Manipulate options to include the prefix
    const manipulatedOptions = data.options.map((option, index) => ({
      text: `${optionPrefixes[index]}. ${option.text.trim()}`,
    }));

    // Validate answer
    if (!optionPrefixes.includes(data.answer)) {
      toast.error(
        "Jawaban tidak valid. Pilih salah satu opsi yang tersedia (a, b, c, d)."
      );
      return;
    }

    // Construct the final data with manipulated options
    const finalData = {
      ...data,
      options: manipulatedOptions,
      materiId: Number(data.materiId),
    };

    try {
      const result = await onSubmit(finalData);
      if (result !== undefined) {
        mutate();
        onClose();
      }
    } catch (error) {
      toast.error("Gagal menambahkan soal");
    }
  };

  return (
    <div className="flex justify-center p-4 w-full">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-h-[80vh] overflow-y-auto">
        <p className="text-lg text-center font-bold text-black mb-4">
          Tambah Soal
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
          />
          <div>
            <p className="font-semibold">Jawaban</p>
            <select
              {...register("answer", { required: "Jawaban is required" })}
              className="p-2 border border-gray-300 rounded w-full px-4"
            >
              <option value="">Pilih Jawaban</option>
              {fields.map((field, index) => (
                <option key={field.id} value={field.text[0]}>
                  {field.text}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="font-semibold">Opsi</p>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center mb-2">
                <Input
                  crossOrigin={undefined}
                  label={`Opsi ${index + 1}`}
                  defaultValue={field.text} // Set default value here
                  {...register(`options.${index}.text`, {
                    required: "Opsi is required",
                  })}
                />
              </div>
            ))}
          </div>

          <input type="hidden" {...register("materiId")} value={materiId} />

          <div className="flex justify-end gap-2 mt-4">
            <Button color="red" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" color="blue" disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan"}
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

export default ModalAddSoal;
