import React, { useEffect } from "react";
import { UserType } from "../../../types/userType";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";
import Image from "next/image";

interface ModalEditUserProps {
  token: string;
  user: UserType | null;
  onClose: () => void;
  onSubmit: SubmitHandler<UserType>;
}

function ModalEditUser({ token, user, onClose, onSubmit }: ModalEditUserProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserType>();

  useEffect(() => {
    if (user) {
      setValue("id", user.id);
      setValue("name", user.name);
      setValue("phoneNumber", user.phoneNumber);
      setValue("role", user.role);
    }
  }, [user, setValue]);

  const handleRoleChange = (value: "ADMIN" | "GURU" | "MURID") => {
    setValue("role", value);
  };

  return (
    <div className="flex justify-center p-4 ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="w-full flex flex-col justify-center items-center">
          <Image
            src="/img/home/AssetEdit.png"
            alt="Logo"
            width={180}
            height={48}
            priority
            className="flex justify-center"
          />
        </div>
        <p className="text-lg font-bold text-black mb-4 text-center">
          Edit User
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* <Input type="hidden" {...register("id")} /> */}
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
            <Button color="red" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" color="blue">
              Simpan
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

export default ModalEditUser;
