import useSWR, { SWRResponse } from "swr";
import { fetcher } from "../utils/fatcher";
import { useMemo, useState } from "react";
import { ApiUserType, UserType } from "../types/userType";

const useTambahUser = (token: string) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [idUser, setIdUser] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, mutate }: SWRResponse<ApiUserType, Error> = useSWR<
    ApiUserType,
    Error
  >(["/user/all", token], fetcher.bind(null, "/user/all", token));

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
  };
};

export { useTambahUser };
