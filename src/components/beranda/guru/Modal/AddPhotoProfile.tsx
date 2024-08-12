import React, { useState } from "react";
import { Dialog, Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { usePhotoProfile } from "../../../../../hooks/usePhotoProfile";

function AddPhotoProfile({ token, guruId }) {
  const { modalPhotoProfile, setPhotoProfile, uploadPhoto, loading } =
    usePhotoProfile(token);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
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
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-5 text-center">
        Make an awesome profile picture from{" "}
        <span className="text-blue-500">any</span> photo
      </h2>
      <div className="flex flex-col items-center">
        <Button
          className="rounded-full bg-green-500 p-6 text-white text-2xl"
          onClick={() => setPhotoProfile(true)}
        >
          +
        </Button>
        <p className="mt-4 text-gray-600">Upload your photo</p>
      </div>

      <Dialog open={modalPhotoProfile} handler={setPhotoProfile}>
        <div className="p-4">
          <h3 className="text-lg font-bold">Upload Photo Profile</h3>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-4 p-2 border border-gray-300 rounded"
          />
          <div className="mt-4 flex justify-end space-x-2">
            <Button color="red" onClick={() => setPhotoProfile(false)}>
              Cancel
            </Button>
            <Button
              color="green"
              onClick={handleUpload}
              disabled={loading || !selectedFile}
            >
              {loading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default AddPhotoProfile;
