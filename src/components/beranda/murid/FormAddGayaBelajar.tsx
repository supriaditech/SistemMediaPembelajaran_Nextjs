import React, { useState } from "react";
import {
  Button,
  Radio,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useSubmitGayaBelajar } from "../../../../hooks/useSubmitGayaBelajar";
import { useSession } from "next-auth/react";
import { SessionType } from "../../../../types/sessionType";

function FormAddGayaBelajar() {
  const { data: session } = useSession() as { data: SessionType | null };

  const [jawaban, setJawaban] = useState<
    { pertanyaan: number; jawaban: string }[]
  >([
    { pertanyaan: 1, jawaban: "" },
    { pertanyaan: 2, jawaban: "" },
    { pertanyaan: 3, jawaban: "" },
    { pertanyaan: 4, jawaban: "" },
    { pertanyaan: 5, jawaban: "" },
    { pertanyaan: 6, jawaban: "" },
    { pertanyaan: 7, jawaban: "" },
    { pertanyaan: 8, jawaban: "" },
    { pertanyaan: 9, jawaban: "" },
    { pertanyaan: 10, jawaban: "" },
  ]);

  const { submitGayaBelajar, loading } = useSubmitGayaBelajar();
  const [resultDialogOpen, setResultDialogOpen] = useState(false);
  const [gayaBelajar, setGayaBelajar] = useState<string | null>(null);

  const handleChange = (pertanyaan: number, value: string) => {
    setJawaban((prevJawaban) =>
      prevJawaban.map((item) =>
        item.pertanyaan === pertanyaan ? { ...item, jawaban: value } : item
      )
    );
  };

  const handleSubmit = async () => {
    if (session?.user?.Murid?.id) {
      const result = await submitGayaBelajar(
        session.user.Murid.id,
        jawaban,
        session.accessToken
      );
      if (result) {
        setGayaBelajar(result);
        setResultDialogOpen(true); // Open the dialog with the result
      }
    } else {
      console.error(
        "Murid ID is not available. Please ensure the session is properly loaded."
      );
    }
  };

  const closeDialog = () => {
    setResultDialogOpen(false);
    window.location.reload();
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-6 text-black">
        Menentukan Gaya Belajar Anak
      </h2>
      {jawaban.map((item, index) => (
        <div key={index} className="mb-6">
          <h4 className="text-lg font-medium mb-2 text-black">
            Pertanyaan {item.pertanyaan}:
          </h4>
          <p className="mb-4 text-md font-bold text-black">
            {getPertanyaanText(item.pertanyaan)}
          </p>
          <div className="flex flex-col space-y-2">
            {getOptions(item.pertanyaan).map((option, i) => (
              <Radio
                crossOrigin={undefined}
                key={i}
                id={`${option.value}-${item.pertanyaan}`}
                name={`pertanyaan-${item.pertanyaan}`}
                label={option.label}
                value={option.value}
                checked={item.jawaban === option.value}
                onChange={(e) => handleChange(item.pertanyaan, e.target.value)}
              />
            ))}
          </div>
        </div>
      ))}
      <Button
        color="blue"
        size="sm"
        className="mr-2"
        onClick={handleSubmit}
        disabled={loading || !session?.user?.Murid?.id}
      >
        {loading ? "Loading..." : "Submit Jawaban"}
      </Button>

      <Dialog open={resultDialogOpen} handler={setResultDialogOpen}>
        <DialogHeader>Hasil Gaya Belajar</DialogHeader>
        <DialogBody>
          {gayaBelajar ? (
            <p>
              Gaya belajar anda adalah <strong>{gayaBelajar}</strong>.
            </p>
          ) : (
            <p>Terjadi kesalahan dalam menentukan gaya belajar.</p>
          )}
        </DialogBody>
        <DialogFooter>
          <Button color="blue" onClick={closeDialog}>
            Tutup
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

const getPertanyaanText = (pertanyaan: number) => {
  switch (pertanyaan) {
    case 1:
      return "Saat belajar, saya lebih suka...";
    case 2:
      return "Saya paling mudah mengingat informasi ketika...";
    case 3:
      return "Ketika harus memahami instruksi baru, saya lebih suka...";
    case 4:
      return "Di waktu luang saya lebih suka...";
    case 5:
      return "Ketika memecahkan masalah, saya lebih suka...";
    case 6:
      return "Di kelas, saya paling suka...";
    case 7:
      return "Saya lebih suka belajar dengan...";
    case 8:
      return "Saat mempersiapkan ujian, saya lebih suka...";
    case 9:
      return "Saya paling menikmati pelajaran yang...";
    case 10:
      return "Ketika membaca cerita, saya lebih suka...";
    default:
      return "";
  }
};

const getOptions = (pertanyaan: number) => {
  switch (pertanyaan) {
    case 1:
      return [
        {
          label: "Melihat diagram, grafik, atau gambar. (Visual)",
          value: "Visual",
        },
        {
          label: "Mendengarkan penjelasan atau diskusi. (Auditori)",
          value: "Auditori",
        },
        {
          label: "Menggunakan tangan atau aktivitas fisik. (Kinestetik)",
          value: "Kinestetik",
        },
      ];
    case 2:
      return [
        { label: "Membaca atau melihat catatan. (Visual)", value: "Visual" },
        {
          label: "Mendengarkan penjelasan atau audio. (Auditori)",
          value: "Auditori",
        },
        {
          label: "Mengalami atau melakukan sesuatu langsung. (Kinestetik)",
          value: "Kinestetik",
        },
      ];
    case 3:
      return [
        { label: "Membaca petunjuk tertulis. (Visual)", value: "Visual" },
        {
          label: "Mendengarkan penjelasan seseorang. (Auditori)",
          value: "Auditori",
        },
        {
          label: "Mencoba langsung dan bereksperimen. (Kinestetik)",
          value: "Kinestetik",
        },
      ];
    case 4:
      return [
        { label: "Melihat video atau gambar. (Visual)", value: "Visual" },
        {
          label: "Mendengarkan musik atau podcast. (Auditori)",
          value: "Auditori",
        },
        {
          label: "Berolahraga atau bermain di luar. (Kinestetik)",
          value: "Kinestetik",
        },
      ];
    case 5:
      return [
        {
          label:
            "Membuat sketsa atau diagram untuk memvisualisasikan solusi. (Visual)",
          value: "Visual",
        },
        {
          label: "Membicarakannya dengan orang lain. (Auditori)",
          value: "Auditori",
        },
        {
          label: "Menggunakan benda nyata atau model. (Kinestetik)",
          value: "Kinestetik",
        },
      ];
    case 6:
      return [
        {
          label: "Melihat presentasi atau tayangan slide. (Visual)",
          value: "Visual",
        },
        {
          label: "Mendengarkan ceramah atau diskusi. (Auditori)",
          value: "Auditori",
        },
        {
          label: "Terlibat dalam kegiatan praktek. (Kinestetik)",
          value: "Kinestetik",
        },
      ];
    case 7:
      return [
        { label: "Membaca buku atau artikel. (Visual)", value: "Visual" },
        {
          label: "Mendengarkan rekaman atau diskusi. (Auditori)",
          value: "Auditori",
        },
        {
          label: "Melakukan eksperimen atau praktek langsung. (Kinestetik)",
          value: "Kinestetik",
        },
      ];
    case 8:
      return [
        {
          label: "Membuat mind map atau catatan berwarna. (Visual)",
          value: "Visual",
        },
        {
          label:
            "Mendengarkan rekaman atau bergabung dalam grup belajar. (Auditori)",
          value: "Auditori",
        },
        {
          label:
            "Membuat alat peraga atau melakukan latihan praktek. (Kinestetik)",
          value: "Kinestetik",
        },
      ];
    case 9:
      return [
        {
          label: "Menggunakan banyak gambar, grafik, atau video. (Visual)",
          value: "Visual",
        },
        {
          label: "Melibatkan banyak diskusi dan penjelasan lisan. (Auditori)",
          value: "Auditori",
        },
        {
          label: "Melibatkan banyak kegiatan praktek atau proyek. (Kinestetik)",
          value: "Kinestetik",
        },
      ];
    case 10:
      return [
        {
          label: "Membayangkan adegan dalam pikiran saya. (Visual)",
          value: "Visual",
        },
        {
          label: "Mendengarkan seseorang membacakan cerita. (Auditori)",
          value: "Auditori",
        },
        {
          label: "Memainkan peran dari cerita tersebut. (Kinestetik)",
          value: "Kinestetik",
        },
      ];
    default:
      return [];
  }
};

export default FormAddGayaBelajar;
