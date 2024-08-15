import useSWR, { SWRResponse } from "swr";
import { AddSoalType, SoalsResponseType, SoalType } from "../types/soalType";
import { fetcher } from "../utils/fatcher";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import Api from "../service/Api";
import { toast } from "react-toastify";

const useSoal = (materiId: any, token: string) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [selectedSoal, setSelectedSoal] = useState<SoalType | null>(null);
  const [idSoal, setIdSoal] = useState<number | null>(null);

  const body = { materiId: Number(materiId) };
  const { data, error, mutate }: SWRResponse<SoalsResponseType, Error> = useSWR(
    ["/soal/materi", token, materiId],
    fetcher.bind(null, "/soal/materi", token, body)
  );

  const onSubmit: SubmitHandler<AddSoalType> = async (data) => {
    setIsLoading(true);
    try {
      const api = new Api();
      api.url = "/soal/create";
      api.auth = true;
      api.token = token;
      api.body = data;

      const response = await api.call();
      if (response.meta.statusCode === 200) {
        toast.success("Soal berhasil ditambahkan!", { autoClose: 1000 });
        setOpenModal(false); // Close the modal only on success
        mutate(); // Refresh data
        window.location.reload();
        return { success: true };
      } else {
        throw new Error(response.message || "Gagal menambahkan soal");
      }
    } catch (error: any) {
      toast.error("Terjadi kesalahan saat menambahkan soal.", {
        autoClose: 3000,
      });
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMateri = async (id: number) => {
    setIsLoading(false);
    try {
      const api = new Api();
      api.url = "/soal/delete";
      api.auth = true;
      api.token = token;
      api.body = { soalId: id };
      const response = await api.call();
      if (response.meta.statusCode === 200) {
        toast.success("Soal berhasil dihapus!", { autoClose: 3000 });
        setOpenModalDelete(false); // Close the modal only on success
        mutate(); // Refresh data
        window.location.reload();
        return { success: true };
      } else {
        throw new Error(response.message || "Gagal menghapus data Soal");
      }
    } catch (error: any) {
      toast.error("Terjadi kesalahan saat menghapus data Soal.", {
        autoClose: 3000,
      });
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const onEditSubmit: SubmitHandler<any> = async (data) => {
    setIsLoading(true);
    try {
      const api = new Api();
      api.url = `/soal/update`;
      api.auth = true;
      api.token = token;
      api.body = { ...data }; // pastikan ID disertakan

      const response = await api.call();
      if (response.meta.statusCode === 200) {
        toast.success("Soal berhasil diupdate!", { autoClose: 3000 });
        setOpenModalEdit(false); // Close the modal only on success
        window.location.reload();
        mutate(); // Refresh data
        return { success: true };
      } else {
        throw new Error(response.message || "Gagal mengupdate Soal");
      }
    } catch (error: any) {
      toast.error("Terjadi kesalahan saat mengupdate Soal.", {
        autoClose: 3000,
      });
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    error,
    mutate,
    openModal,
    setOpenModal,
    onSubmit,
    loading,
    openModalDelete,
    setOpenModalDelete,
    idSoal,
    setIdSoal,
    selectedSoal,
    setSelectedSoal,
    openModalEdit,
    setOpenModalEdit,
    deleteMateri,
    onEditSubmit,
  };
};

export { useSoal };
