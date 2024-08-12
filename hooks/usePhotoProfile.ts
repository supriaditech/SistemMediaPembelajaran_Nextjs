import { useState } from "react";
import Api from "../service/Api";
import { toast } from "react-toastify";

const usePhotoProfile = (token: string) => {
  const [modalPhotoProfile, setPhotoProfile] = useState(false);
  const [loading, setLoading] = useState(false);

  const uploadPhoto = async (guruId: number, photo: File) => {
    const formData = new FormData();
    formData.append("guruId", guruId.toString());
    formData.append("photo", photo);

    setLoading(true);
    try {
      const api = new Api();
      api.url = "/guru/create"; // Endpoint API
      api.auth = true;
      api.token = token;
      api.type = "form"; // Set type to "form" for multipart/form-data
      api.body = formData;

      const response = await api.call();
      if (response.meta.statusCode === 200) {
        toast.success("Photo berhasil diunggah!", { autoClose: 3000 });
        setPhotoProfile(false); // Close the modal only on success
        return { success: true };
      } else {
        throw new Error(response.meta.message || "Gagal mengunggah photo");
      }
    } catch (error: any) {
      toast.error("Terjadi kesalahan saat mengunggah photo.", {
        autoClose: 3000,
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    modalPhotoProfile,
    setPhotoProfile,
    uploadPhoto,
    loading,
  };
};

export { usePhotoProfile };
