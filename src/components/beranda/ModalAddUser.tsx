import { Button, Input, Option, Select } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTambahUser } from "../../../hooks/useTambahUser";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useState } from "react";

interface ModalAddUserProps {
  token: string;
  onClose: () => void;
}

interface FormValues {
  userId: string;
  password: string;
  name: string;
  phoneNumber: string;
  role: "ADMIN" | "GURU" | "MURID";
}

function ModalAddUser({ token, onClose }: ModalAddUserProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>();
  const { onSubmit, loading } = useTambahUser(token);
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = async (data: FormValues) => {
    const result = await onSubmit(data);
    if (result !== undefined) {
      onClose();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRoleChange = (value: "ADMIN" | "GURU" | "MURID") => {
    setValue("role", value);
  };

  return (
    <div className="flex justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md ">
        <div className="w-full flex flex-col justify-center items-center">
          <Image
            src="/img/home/addUser.png"
            alt="Logo"
            width={180}
            height={48}
            priority
            className="flex justify-center"
          />
        </div>
        <p className="text-lg text-center font-bold text-black mb-4">
          Tambah User
        </p>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-4"
        >
          <Input
            crossOrigin={undefined}
            label="User ID"
            {...register("userId", { required: "User ID is required" })}
            className="mb-4"
          />
          <div className="relative">
            <Input
              crossOrigin={undefined}
              label="Password"
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              className="mb-4"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <MdVisibilityOff className="text-gray-500" />
              ) : (
                <MdVisibility className="text-gray-500" />
              )}
            </button>
          </div>
          <Input
            crossOrigin={undefined}
            label="Name"
            {...register("name", { required: "Name is required" })}
            className="mb-4"
          />
          <Input
            crossOrigin={undefined}
            label="Phone Number"
            {...register("phoneNumber", {
              required: "Phone Number is required",
            })}
            className="mb-4"
          />
          <div className="w-full">
            <Select
              label="Select Role"
              {...register("role", { required: "Role is required" })}
              onChange={(e) =>
                handleRoleChange(e as unknown as "ADMIN" | "GURU" | "MURID")
              }
            >
              <Option value="ADMIN">Admin</Option>
              <Option value="GURU">Guru</Option>
              <Option value="MURID">Murid</Option>
            </Select>
            {errors.role && (
              <span className="text-red-500 text-sm">
                {errors.role?.message}
              </span>
            )}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button color="red" onClick={onClose} disabled={loading}>
              Batal
            </Button>
            <Button type="submit" color="blue" disabled={loading}>
              {loading ? "Menambahkan..." : "Simpan"}
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

export default ModalAddUser;
