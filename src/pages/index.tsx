import Master from "@/components/global/Master";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { SessionType } from "../../types/sessionType";
import { useTambahUser } from "../../hooks/useTambahUser";
import {
  Button,
  Card,
  CardBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import { UserType } from "../../types/userType";
import { formatDate } from "../../utils/dateFormatter";

interface HomeProps {
  title: string;
  session: SessionType;
  token: string;
}

export default function Home({ title, session, token }: HomeProps) {
  const {
    data,
    error,
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
  } = useTambahUser(token);

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleEdit = (user: UserType) => {
    setSelectedUser(user);
    setOpenModalEdit(true);
  };

  const handleDelete = (id: number) => {
    setIdUser(id);
    setOpenModalDelete(true);
    console.log(`Delete User with ID ${id}`);
  };

  // Function to format date

  const TABLE_HEAD = ["No", "User Id", "Name", "Role", "Create At", "Action"];

  return (
    <Master title={title}>
      <Card className="overflow-scroll h-full w-full md:px-10">
        <CardBody>
          <div className="w-full flex justify-between py-6">
            <Typography variant="h5" className="mb-4 text-black">
              Data User
            </Typography>
            <div className="flex gap-8">
              <div className="w-96">
                <Input
                  crossOrigin={undefined}
                  label="Cari Karyawan..."
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
                Tambah Karyawan
              </Button>
            </div>
          </div>
          <table className="w-full min-w-max table-auto text-left rounded-lg">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-300 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70 text-black text-center text-md"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData?.map((user: UserType, index: number) => {
                const isLast = index === data.data.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={user.id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-center"
                      >
                        {index + 1}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-center"
                      >
                        {user.userId}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-center"
                      >
                        {user.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-center"
                      >
                        {user.role}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-center"
                      >
                        {formatDate(user.createdAt)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="grid grid-cols-2 ">
                        <Button
                          color="blue"
                          size="sm"
                          className="mr-2"
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </Button>
                        <Button
                          color="red"
                          size="sm"
                          onClick={() => handleDelete(user?.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
    </Master>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const session: SessionType | null = (await getSession(
    context
  )) as SessionType | null;

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  let title = "Beranda"; // Default title

  if (session.user.role === "ADMIN") {
    title = "Halaman Tambah User";
  } else if (session.user.role === "GURU" || session.user.role === "MURID") {
    title = "Beranda";
  }

  const token = session.accessToken;
  return {
    props: {
      title,
      session,
      token,
    },
  };
};
