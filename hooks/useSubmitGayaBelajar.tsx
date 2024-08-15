import { useState } from 'react';
import Api from '../service/Api';
import { toast } from 'react-toastify';

export const useSubmitGayaBelajar = () => {
  const [loading, setLoading] = useState(false);

  const submitGayaBelajar = async (muridId: number | undefined, jawaban: { pertanyaan: number; jawaban: string }[], token: string) => {
    setLoading(true);
    try {
      const api = new Api();
      api.url = '/murid/submit-tes-gaya-belajar';
      api.auth = true;
      api.token = token;
      api.body = {
        muridId,
        jawaban,
      };

      const response = await api.call();
      console.log(response);
      if (response.meta.statusCode === 200) {
        toast.success('Jawaban tes gaya belajar berhasil disubmit!', { autoClose: 3000 });
        return response.data.gayaBelajar; // Return the learning style result
      } else {
        throw new Error(response.meta.message || 'Gagal submit jawaban tes');
      }
    } catch (error: any) {
      toast.error('Terjadi kesalahan saat submit jawaban tes.', {
        autoClose: 3000,
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    submitGayaBelajar,
    loading,
  };
};
