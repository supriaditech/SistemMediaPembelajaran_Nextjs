import { useState } from "react";
import Api from "../service/Api";
import { toast } from "react-toastify";
import { SubmitHandler } from "react-hook-form";

// Tipe untuk response API submit jawaban
interface SubmitJawabanResponseType {
  meta: {
    statusCode: number;
    message: string;
  };
  data?: {
    results: {
      jawaban: {
        id: number;
        soalId: number;
        muridId: number;
        jawaban: string;
      };
      isCorrect: boolean;
    }[];
    summary: {
      correct: number;
      total: number;
    };
  };
}

export interface SubmitJawabanResult {
  success: boolean;
  data?: SubmitJawabanResponseType["data"];
  error?: string;
}

const useSubmitJawaban = (token: string) => {
  const [loading, setIsLoading] = useState<boolean>(false);

  const submitJawaban: SubmitHandler<any> = async (
    jawabanData
  ): Promise<SubmitJawabanResult> => {
    setIsLoading(true);
    try {
      const api = new Api();
      api.url = "/soal/submit-many";
      api.auth = true;
      api.token = token;
      api.body = jawabanData;

      const response = (await api.call()) as SubmitJawabanResponseType;

      if (response.meta.statusCode === 200) {
        toast.success("Jawaban berhasil disimpan!", { autoClose: 3000 });
        return { success: true, data: response.data };
      } else {
        throw new Error(response.meta.message || "Gagal menyimpan jawaban");
      }
    } catch (error: any) {
      toast.error("Terjadi kesalahan saat menyimpan jawaban.", {
        autoClose: 3000,
      });
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitJawaban,
    loading,
    setIsLoading,
  };
};

export { useSubmitJawaban };
