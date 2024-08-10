import useSWR, { SWRResponse } from "swr";
import { fetcher } from "../utils/fatcher";
import { useMemo, useState } from "react";
import { AddUserType, ApiUserType, UserType } from "../types/userType";
import { SubmitHandler, useForm } from "react-hook-form";
import Api from "../service/Api";
import { toast } from "react-toastify";

const useTambahUser = (token: string) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [idUser, setIdUser] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setIsLoading] = useState<boolean>(false);

  const { data, error, mutate }: SWRResponse<ApiUserType, Error> = useSWR<
    ApiUserType,
    Error
  >(["/user/all", token], fetcher.bind(null, "/user/all", token));

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserType>({
    defaultValues: {
      userId: "",
      password: "",
      name: "",
      phoneNumber: "",
      role: "",
    },
  });
  const filteredData = useMemo(() => {
    return data?.data?.filter(
      (user: UserType) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.userId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, data]);

  //   paginasi
  const itemsPerPage = 10;
  const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  //   tambah User
  const onSubmit: SubmitHandler<AddUserType> = async (data) => {
    setIsLoading(true);
    try {
      const api = new Api();
      api.url = "/auth/register";
      api.auth = true;
      api.token = token;
      api.body = data;

      const response = await api.call();
      if (response.meta.statusCode === 200) {
        toast.success("Karyawan berhasil ditambahkan!", { autoClose: 3000 });
        setOpenModal(false); // Close the modal only on success
        mutate(); // Refresh data
        return { success: true };
      } else {
        throw new Error(response.message || "Gagal menambahkan karyawan");
      }
    } catch (error: any) {
      toast.error("Terjadi kesalahan saat menambahkan karyawan.", {
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
    selectedUser,
    setSelectedUser,
    openModalEdit,
    setOpenModalEdit,
    idUser,
    setIdUser,
    openModalDelete,
    setOpenModalDelete,
    openModal,
    setOpenModal,
    searchQuery,
    setSearchQuery,
    filteredData,
    totalPages,
    currentData,
    handlePageChange,
    currentPage,
    register,
    handleSubmit,
    onSubmit,
    errors,
    loading,
  };
};

export { useTambahUser };
