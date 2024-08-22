import { useSession } from "next-auth/react";
import React, { useEffect, useMemo } from "react";
import { SessionType } from "../../../../types/sessionType";
import { usePhotoProfile } from "../../../../hooks/usePhotoProfile";
import {
  Button,
  Card,
  CardBody,
  Dialog,
  Input,
  Typography,
} from "@material-tailwind/react";
import AddPhotoProfile from "./Modal/AddPhotoProfile";
import { MateriType } from "../../../../types/materiType";
import ModalAddMateri from "./Modal/ModalAddMateri";
import ModalEditMateri from "./Modal/ModalEditMateri";
import ModalDeleteMateri from "./Modal/ModalDeleteMateri";
import Link from "next/link";
import { useMateri } from "../../../../hooks/useMateri";

interface listMateriPros {
  userType: String;
}

function ListMateri({ userType }: listMateriPros) {
  const { data: session } = useSession() as { data: SessionType | null };
  const { modalPhotoProfile, setPhotoProfile } = usePhotoProfile(
    session?.accessToken ?? null,
    userType
  );
  const token = session?.accessToken || "";
  const {
    data, // Assumed to be of type ApiResponseMateri
    error,
    mutate,
    openModal,
    setOpenModal,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    handlePageChange,
    openModalEdit,
    setOpenModalEdit,
    selectedMateri,
    setSelectedMateri,
    idMateri,
    setIdMateri,
    openModalDelete,
    setOpenModalDelete,
    onEditSubmit,
  } = useMateri(token);

  useEffect(() => {
    if (session) {
      if (userType === "GURU" && session.user?.Guru === null) {
        // If userType is 'GURU' and there's no Guru profile
        setPhotoProfile(true);
      } else if (userType === "MURID") {
        // Check for Murid profile and gayaBelajar
        if (!session.user?.Murid || session.user?.Murid.gayaBelajar === null) {
          setPhotoProfile(true);
        } else {
          setPhotoProfile(false);
        }
      } else {
        // Ensure modal doesn't open for other user types
        setPhotoProfile(false);
      }
    }
  }, [session, userType, setPhotoProfile]);

  // Filter data
  const filteredData = useMemo(() => {
    return data?.data?.filter(
      (materi: MateriType) =>
        materi.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        materi.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, data]);

  // Paginasi
  const itemsPerPage = 10;
  const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData?.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const handleEdit = (materi: MateriType) => {
    setSelectedMateri(materi);
    setOpenModalEdit(true);
  };

  const handleDelete = (id: number) => {
    setIdMateri(id);
    setOpenModalDelete(true);
  };

  return (
    <div>
      <Card className="overflow-y-auto h-full w-full md:px-10 bg-red">
        <CardBody>
          <div className="w-full lg:flex justify-between py-6">
            <Typography variant="h5" className="mb-4 text-black">
              Daftar Materi
            </Typography>
            <div className="flex gap-8">
              <div className="w-96">
                <Input
                  crossOrigin={undefined}
                  label="Cari materi pelajaran..."
                  className="w-76"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {userType === "GURU" && (
                <Button
                  size="sm"
                  className="mr-2 bg-buttonGreen w-60"
                  onClick={() => setOpenModal(true)}
                >
                  Tambah Materi
                </Button>
              )}
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4 ">
            {currentData?.map((materi: MateriType, index: number) => {
              const isLast = index === (filteredData?.length ?? 0) - 1;
              const classes = isLast
                ? "p-4 w-full bg-red-500"
                : "p-4 border-b border-blue-gray-50 w-full";
              const videoId = new URLSearchParams(
                new URL(materi.videoUrl).search
              ).get("v");

              return (
                <div
                  key={materi.id}
                  className="md:p-4 border-b border-blue-gray-50 w-full max-w-full overflow-hidden"
                >
                  <div className="md:grid grid-cols-2 gap-6 bg-blue-50 p-4 rounded-md hover:bg-blue-200 w-full">
                    {videoId ? (
                      <iframe
                        className="w-full md:h-64 rounded-lg"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        allowFullScreen
                        title={materi.title}
                      />
                    ) : (
                      <div className="h-64 rounded-lg bg-gray-200 flex items-center justify-center">
                        <p className="text-gray-600">Video tidak tersedia</p>
                      </div>
                    )}
                    <div className="w-full">
                      <p className="text-lg font-bold text-black text-ellipsis overflow-hidden line-clamp-3 md:text-2xl">
                        {materi.title}
                      </p>
                      <div className="text-ellipsis overflow-hidden line-clamp-3">
                        <div
                          dangerouslySetInnerHTML={{ __html: materi.content }}
                        />
                      </div>
                      {userType === "GURU" && (
                        <>
                          <div className="grid grid-cols-2 my-2">
                            <Button
                              color="blue"
                              size="sm"
                              className="mr-2"
                              onClick={() => handleEdit(materi)}
                            >
                              Edit
                            </Button>
                            <Button
                              color="red"
                              size="sm"
                              onClick={() => handleDelete(materi.id)}
                            >
                              Delete
                            </Button>
                          </div>
                          <div className="w-full">
                            <Link
                              href={`/detail-materi?materi=${materi.id}`}
                              className="bg-black  py-2 rounded-md w-full text-white block text-center hover:bg-gray-800"
                            >
                              Detail Materi
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center mt-4">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="mr-2"
            >
              Previous
            </Button>
            <span className="self-center">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="ml-2"
            >
              Next
            </Button>
          </div>
        </CardBody>
      </Card>
      <Dialog
        open={modalPhotoProfile}
        handler={() => {
          // Ensure the modal cannot be closed by clicking outside unless conditions are met for GURU and MURID
          if (
            (userType === "MURID" &&
              session?.user?.Murid &&
              session?.user?.Murid.gayaBelajar !== null) ||
            (userType === "GURU" && session?.user?.Guru !== null)
          ) {
            setPhotoProfile(false);
          }
        }}
        dismiss={{
          enabled: false, // Disable the ability to close the modal by clicking outside
        }}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="flex-row justify-center item-center"
      >
        <div
          className={`w-full p-4 bg-white rounded-lg shadow-lg overflow-y-auto max-h-screen ${
            userType === "GURU" ? "h-96" : ""
          }`}
        >
          <AddPhotoProfile
            token={session?.accessToken ?? ""}
            userId={session?.user?.userId ?? null}
            userType={userType}
            id={session?.user.id}
            onClose={() => {
              // Ensure the modal cannot be closed unless conditions are met for GURU and MURID
              if (
                (userType === "MURID" &&
                  session?.user?.Murid &&
                  session?.user?.Murid.gayaBelajar !== null) ||
                (userType === "GURU" && session?.user?.Guru !== null)
              ) {
                setPhotoProfile(false);
              }
            }}
          />
        </div>
      </Dialog>

      <Dialog
        open={openModal}
        size="lg"
        handler={() => setOpenModal(false)}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="flex-row justify-center item-center"
      >
        <ModalAddMateri token={token} onClose={() => setOpenModal(false)} />
      </Dialog>
      <Dialog
        open={openModalEdit}
        size="lg"
        handler={() => setOpenModalEdit(false)}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="flex-row justify-center item-center"
      >
        <ModalEditMateri
          token={token}
          onClose={() => setOpenModalEdit(false)}
          materi={selectedMateri}
          onSubmit={onEditSubmit}
        />
      </Dialog>
      <Dialog
        open={openModalDelete}
        handler={() => setOpenModalDelete(false)}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="flex-row justify-center item-center"
      >
        <ModalDeleteMateri
          token={token}
          onClose={() => setOpenModalDelete(false)}
          materiId={idMateri}
        />
      </Dialog>
    </div>
  );
}

export default ListMateri;
