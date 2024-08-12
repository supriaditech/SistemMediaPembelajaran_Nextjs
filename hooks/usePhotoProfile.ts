import { useState } from "react";
import Api from "../service/Api";
import { toast } from "react-toastify";
import { useSession, signOut, getSession } from "next-auth/react";

const usePhotoProfile = (token: any) => {
  const [modalPhotoProfile, setPhotoProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session, update } = useSession();

  const uploadPhoto = async (guruId: number, photo: File) => {
    const formData = new FormData();
    formData.append("userId", guruId.toString());
    formData.append("photo", photo);

    // Inspect FormData entries
    // Array.from(formData.entries()).forEach(([key, value]) => {
    //   console.log(`${key}:`, value);
    // });

    setLoading(true);
    try {
      const api = new Api();
      api.url = "/guru/create";
      api.auth = true;
      api.token = token;
      api.type = "form"; // Set type to "form" for multipart/form-data
      api.body = formData;

      const response = await api.call();
      if (response.meta.statusCode === 200) {
        toast.success("Photo berhasil diunggah!", { autoClose: 3000 });
        setPhotoProfile(false); // Close the modal only on success

        // Update session manually
        await update();
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
