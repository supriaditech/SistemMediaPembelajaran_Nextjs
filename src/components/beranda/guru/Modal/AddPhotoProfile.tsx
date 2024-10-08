import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import { usePhotoProfile } from "../../../../../hooks/usePhotoProfile";
import { useSession } from "next-auth/react";
import { SessionType } from "../../../../../types/sessionType";
import { ApiUrl } from "../../../../../config/config";
import FormAddGayaBelajar from "../../murid/FormAddGayaBelajar";

interface AddPhotoProfileProps {
  token: string;
  userId: any;
  userType: string;
  id: number | undefined;
  onClose: () => void;
}

const AddPhotoProfile: React.FC<AddPhotoProfileProps> = ({
  token,
  userId,
  userType,
  id,
  onClose,
}) => {
  const { uploadPhoto, loading } = usePhotoProfile(token, userType);
  const { data: session } = useSession() as { data: SessionType | null };
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    session?.user?.Murid?.photo
      ? ApiUrl + "/" + session.user.Murid.photo
      : null,
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Generate preview URL for the selected file
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const result = await uploadPhoto(userId, id ?? 0, selectedFile);
      if (result.success) {
        onClose(); // Close the modal only on success
      }
    } else {
      toast.error("Pilih foto terlebih dahulu.", { autoClose: 3000 });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 ">
      <h2 className="text-2xl font-bold mb-5 text-center text-black">
        Lengkapi Profile Anda
      </h2>

      <div className="relative w-32 h-32 mb-4 ">
        <div className="relative rounded-full w-full h-full overflow-hidden bg-gray-500">
          {previewUrl && (
            <Image
              src={previewUrl}
              alt="Preview"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          )}
        </div>
        {userType == "GURU" && (
          <div className=" w-full flex flex-col justify-start items-center">
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              className="hidden"
            />
            <label htmlFor="file-upload">
              <p
                className="absolute bottom-2 right-5 transform translate-y-1/2 translate-x-1/2 rounded-full bg-green-500 w-10 h-10 text-white text-2xl flex items-center justify-center"
                style={{ zIndex: 10 }}
              >
                +
              </p>
            </label>
            <p className="mt-4 text-gray-600 w-40 text-center">
              Upload your photo
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <Button
                color="green"
                onClick={handleUpload}
                disabled={loading || !selectedFile}
              >
                {loading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </div>
        )}
        {userType == "MURID" && session?.user?.Murid?.gayaBelajar !== null ? (
          <>
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              className="hidden"
            />
            <label htmlFor="file-upload">
              <p
                className="absolute bottom-2 right-5 transform translate-y-1/2 translate-x-1/2 rounded-full bg-green-500 w-10 h-10 text-white text-2xl flex items-center justify-center"
                style={{ zIndex: 10 }}
              >
                +
              </p>
            </label>
          </>
        ) : (
          <div />
        )}
      </div>

      {userType === "MURID" && session?.user?.Murid?.gayaBelajar !== null ? (
        <>
          <p className="mt-4 text-gray-600">Upload your photo</p>
          <div className="mt-4 flex justify-end space-x-2">
            <Button
              color="green"
              onClick={handleUpload}
              disabled={loading || !selectedFile}
            >
              {loading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </>
      ) : (
        <>{userType === "MURID" && <FormAddGayaBelajar />}</>
      )}
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
  );
};

export default AddPhotoProfile;
