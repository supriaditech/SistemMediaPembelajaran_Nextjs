import Master from "@/components/global/Master";
import { useRouter } from "next/router";
import { useSoal } from "../../hooks/useSoal";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { SessionType } from "../../types/sessionType";
import { Button, Dialog } from "@material-tailwind/react";
import ModalAddSoal from "@/components/soal/ModalAddSoal";
import { SoalsResponseType, SoalType } from "../../types/soalType"; // Adjust import if needed
import ModalDeleteSoal from "@/components/soal/ModalDeleteSoal";
import ModalEditSoal from "@/components/soal/ModalEditSoal";

interface soalProps {
  token: string;
}

function Soal({ token }: soalProps) {
  const router = useRouter();
  const { materiId } = router.query;

  const {
    data,
    error,
    openModal,
    setOpenModal,
    openModalDelete,
    setOpenModalDelete,
    idSoal,
    setIdSoal,
    selectedSoal,
    setSelectedSoal,
    openModalEdit,
    setOpenModalEdit,
    onEditSubmit,
  } = useSoal(materiId, token);

  if (error) {
    return <div>Error loading data</div>;
  }

  // Check if data and data.data are defined
  const soalData = (data as SoalsResponseType)?.data ?? [];

  const handleEdit = (soal: SoalType) => {
    setSelectedSoal(soal);
    setOpenModalEdit(true);
  };

  const handleDelete = (id: number) => {
    setIdSoal(id);
    setOpenModalDelete(true);
  };

  return (
    <Master title="Soal Page">
      <div className="px-4 md:px-20 py-10 lg:px-96 w-full flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p className="font-bold text-2xl">List Soal</p>
          <Button
            size="sm"
            className="mr-2 bg-buttonGreen w-60"
            onClick={() => setOpenModal(true)}
          >
            Tambah soal
          </Button>
        </div>
        {soalData.length > 0 ? (
          soalData.map((soal, index: number) => (
            <div key={soal.id} className="mb-4 bg-blue-50 p-8 rounded-md">
              <p className="font-bold">
                {index + 1}. {soal.question}
              </p>
              <ul>
                {soal.options.map((option) => (
                  <li key={option.id}>{option.text}</li>
                ))}
              </ul>
              <p className="font-bold">Kunci Jawaban : {soal.answer}</p>
              <div className="flex justify-start w-full items-center gap-4 mt-2">
                <Button
                  size="sm"
                  className="mr-2 bg-blue-500 w-60"
                  onClick={() => handleEdit(soal)}
                >
                  Edit soal
                </Button>
                <Button
                  size="sm"
                  className="mr-2 bg-red-500 w-60"
                  onClick={() => handleDelete(soal.id)}
                >
                  Hapus soal
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">
            Belum ada soal yang tersedia.
          </p>
        )}
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
          <ModalAddSoal
            token={token}
            onClose={() => setOpenModal(false)}
            materiId={Number(materiId)}
          />
        </Dialog>
        <Dialog
          open={openModalDelete}
          size="lg"
          handler={() => setOpenModalDelete(false)}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
          className="flex-row justify-center item-center"
        >
          <ModalDeleteSoal
            token={token}
            onClose={() => setOpenModalDelete(false)}
            soalId={Number(idSoal)}
            materiId={Number(materiId)}
          />
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
          <ModalEditSoal
            token={token}
            onClose={() => setOpenModalEdit(false)}
            soal={selectedSoal}
            onSubmit={onEditSubmit}
          />
        </Dialog>
      </div>
    </Master>
  );
}

export default Soal;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session: SessionType | null = (await getSession(
    context,
  )) as SessionType | null;

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  if (session.user.role !== "GURU") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const token = session?.accessToken;

  return {
    props: { token }, // You can pass additional props here if needed
  };
};
