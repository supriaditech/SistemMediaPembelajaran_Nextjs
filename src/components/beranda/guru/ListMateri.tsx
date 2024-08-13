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

function ListMateri() {
  const { data: session } = useSession() as { data: SessionType | null };
  const { modalPhotoProfile, setPhotoProfile } = usePhotoProfile(
    session?.accessToken ?? null
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
    if (session?.user?.Guru === null) {
      setPhotoProfile(true);
    } else {
      setPhotoProfile(false);
    }
  }, [session, setPhotoProfile]);

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
      <Card className="overflow-scroll h-full w-full md:px-10">
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
              <Button
                size="sm"
                className="mr-2 bg-buttonGreen w-60"
                onClick={() => setOpenModal(true)}
              >
                Tambah Materi
              </Button>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            {currentData?.map((materi: MateriType, index: number) => {
              const isLast = index === (filteredData?.length ?? 0) - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";
              const videoId = new URLSearchParams(
                new URL(materi.videoUrl).search
              ).get("v");

              return (
                <div key={materi.id} className={classes}>
                  <Link href={`/detail-materi?materi=${materi.id}`}>
                    <div className="md:flex gap-6 bg-blue-50 p-4 rounded-md hover:bg-blue-200">
                      {videoId ? (
                        <iframe
                          className="h-64 rounded-lg"
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
                        <p className="text-lg font-bold text-black text-ellipsis overflow-hidden line-clamp-3 md:text-2xl lg:text-4xl">
                          {materi.title}
                        </p>
                        <div className="text-ellipsis overflow-hidden line-clamp-3">
                          <div
                            dangerouslySetInnerHTML={{ __html: materi.content }}
                          />
                        </div>
                        <div className="grid grid-cols-2 mt-2">
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
                      </div>
                    </div>
                  </Link>
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
        handler={() => setPhotoProfile(false)}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="flex-row justify-center item-center"
      >
        <AddPhotoProfile
          token={session?.accessToken ?? ""}
          guruId={session?.user?.userId ?? null}
        />
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
