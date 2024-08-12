import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import { usePhotoProfile } from "../../../../../hooks/usePhotoProfile";

interface AddPhotoProfileProps {
  token: string;
  guruId: any;
}

const AddPhotoProfile: React.FC<AddPhotoProfileProps> = ({ token, guruId }) => {
  const { uploadPhoto, loading } = usePhotoProfile(token);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Generate preview URL for the selected file
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      await uploadPhoto(guruId, selectedFile);
    } else {
      toast.error("Pilih foto terlebih dahulu.", { autoClose: 3000 });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h2 className="text-2xl font-bold mb-5 text-center">
        Make an awesome profile picture from{" "}
        <span className="text-blue-500">any</span> photo
      </h2>

      <div className="relative w-32 h-32 mb-4">
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
      </div>

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
