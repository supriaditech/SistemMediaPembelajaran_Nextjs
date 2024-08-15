import useSWR, { SWRResponse } from "swr";
import {
  AddMateriType,
  ApiResponseMateri,
  MateriType,
} from "../types/materiType";
import { error } from "@material-tailwind/react/types/components/input";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import Api from "../service/Api";
import { toast } from "react-toastify";

export const fetcherMateri = async (
  url: string,
  token: string,
  body?: any
): Promise<any> => {
  console.log(url);
  const api = new Api();
  api.url = url;
  api.auth = true;
  api.token = token;
  api.body = body;
  const data = await api.call();
  console.log("===========", data);
  return data;
};

const useMateri = (token: string) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [selectedMateri, setSelectedMateri] = useState<MateriType | null>(null);
  const [idMateri, setIdMateri] = useState<number | null>(null);

  const { data, error, mutate }: SWRResponse<ApiResponseMateri, Error> = useSWR<
    ApiResponseMateri,
    Error
  >(
    ["/materi/get-all", token],
    fetcherMateri.bind(null, "/materi/get-all", token)
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  console.log(data);
  const onSubmit: SubmitHandler<AddMateriType> = async (data) => {
    setIsLoading(true);
    try {
      const api = new Api();
      api.url = "/materi/create";
      api.auth = true;
      api.token = token;
      api.body = data;

      const response = await api.call();
      if (response.meta.statusCode === 200) {
        toast.success("Materi berhasil ditambahkan!", { autoClose: 3000 });
        setOpenModal(false); // Close the modal only on success
        mutate(); // Refresh data
        return { success: true };
      } else {
        throw new Error(response.message || "Gagal menambahkan Materi");
      }
    } catch (error: any) {
      toast.error("Terjadi kesalahan saat menambahkan Materi.", {
        autoClose: 3000,
      });
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const onEditSubmit: SubmitHandler<AddMateriType> = async (data) => {
    setIsLoading(true);
    try {
      const api = new Api();
      api.url = `/materi/update`;
      api.auth = true;
      api.token = token;
      api.body = { ...data }; // pastikan ID disertakan

      const response = await api.call();
      if (response.meta.statusCode === 200) {
        toast.success("Materi berhasil diupdate!", { autoClose: 3000 });
        setOpenModalEdit(false); // Close the modal only on success
        mutate(); // Refresh data
        return { success: true };
      } else {
        throw new Error(response.message || "Gagal mengupdate Materi");
      }
    } catch (error: any) {
      toast.error("Terjadi kesalahan saat mengupdate Materi.", {
        autoClose: 3000,
      });
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  //   delete
  const deleteMateri = async (id: number) => {
    setIsLoading(false);
    try {
      const api = new Api();
      api.url = "/materi/delete";
      api.auth = true;
      api.token = token;
      api.body = { id: id };
      const response = await api.call();
      if (response.meta.statusCode === 200) {
        toast.success("Materi berhasil dihapus!", { autoClose: 3000 });
        setOpenModalDelete(false); // Close the modal only on success
        mutate(); // Refresh data
        return { success: true };
      } else {
        throw new Error(response.message || "Gagal menghapus data Materi");
      }
    } catch (error: any) {
      toast.error("Terjadi kesalahan saat menghapus data Materi.", {
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
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    handlePageChange,
    onSubmit,
    loading,
    setIsLoading,
    openModalEdit,
    setOpenModalEdit,
    selectedMateri,
    setSelectedMateri,
    idMateri,
    setIdMateri,
    openModalDelete,
    setOpenModalDelete,
    onEditSubmit,
    deleteMateri,
  };
};

export { useMateri };
