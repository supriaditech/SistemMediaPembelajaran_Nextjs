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
import Image from "next/image";
import { useState } from "react";

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
        item.pertanyaan === pertanyaan ? { ...item, jawaban: value } : item,
      ),
    );
  };

  const handleSubmit = async () => {
    if (session?.user?.Murid?.id) {
      const result = await submitGayaBelajar(
        session.user.Murid.id,
        jawaban,
        session.accessToken,
      );
      if (result) {
        setGayaBelajar(result);
        setResultDialogOpen(true); // Open the dialog with the result
      }
    } else {
      // console.error(
      //   "Murid ID is not available. Please ensure the session is properly loaded.",
      // );
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
        <DialogHeader>Hasil Gaya Belajar Kamu {gayaBelajar}</DialogHeader>
        <DialogBody>
          {gayaBelajar ? (
            <>
              {gayaBelajar === "Visual" && (
                <div className="h-96 overflow-y-auto">
                  <div className="flex justify-center items-center">
                    <Image
                      src={"/img/gayaBelajar/visual.png"}
                      alt="Image gaya belajar Visual"
                      width={200}
                      height={200}
                    />
                  </div>
                  <h2 className="font-bold text-black text-xl">
                    Apa Itu Gaya Belajar Visual?
                  </h2>
                  <p>
                    Gaya belajar visual adalah cara belajar di mana seseorang
                    lebih mudah memahami dan mengingat informasi ketika
                    disajikan dalam bentuk gambar, grafik, peta, diagram, video,
                    dan bentuk-bentuk visual lainnya. Individu dengan gaya
                    belajar ini cenderung berpikir dalam gambar dan lebih
                    menyukai informasi yang disajikan secara visual dibandingkan
                    dengan teks atau audio. Mereka lebih efektif dalam memahami
                    konsep melalui representasi visual dan sering kali memiliki
                    kemampuan yang baik dalam membaca peta, menggambar, atau
                    membayangkan skenario.
                  </p>
                  <br />
                  <h2 className="font-bold text-black text-xl">
                    Teknik Belajar Seperti Apa yang Direkomendasikan?
                  </h2>
                  <p>
                    Bagi individu dengan gaya belajar visual, disarankan untuk
                    memanfaatkan alat-alat bantu visual dalam proses belajar.
                    Berikut adalah beberapa teknik yang dapat digunakan:
                  </p>
                  <ul className="list-disc ml-5">
                    <li>
                      <strong>Menggunakan Mind Maps:</strong> Membuat peta
                      konsep atau mind maps dapat membantu menghubungkan ide-ide
                      dan memudahkan pemahaman.
                    </li>
                    <li>
                      <strong>Membuat Catatan Visual:</strong> Menggunakan
                      warna, gambar, dan simbol dalam catatan untuk menandai
                      informasi penting.
                    </li>
                    <li>
                      <strong>Menggunakan Infografis:</strong> Menggunakan
                      infografis atau grafik untuk menyederhanakan dan meringkas
                      informasi yang kompleks.
                    </li>
                    <li>
                      <strong>Belajar dengan Video:</strong> Menonton video
                      tutorial atau presentasi yang dilengkapi dengan elemen
                      visual.
                    </li>
                    <li>
                      <strong>Membaca Buku Bergambar:</strong> Memilih buku atau
                      materi yang memiliki banyak gambar, diagram, atau
                      ilustrasi untuk memperjelas teks.
                    </li>
                  </ul>
                  <br />
                  <h2 className="font-bold text-black text-xl">
                    Apa yang Harus Dilakukan?
                  </h2>
                  <ul className="list-disc ml-5">
                    <li>
                      <strong>Menggunakan Media Visual:</strong> Gunakan
                      flashcards, diagram, peta, atau grafis untuk mengorganisir
                      dan mengingat informasi.
                    </li>
                    <li>
                      Membuat Koneksi Visual: Hubungkan konsep-konsep dengan
                      gambar atau simbol yang mudah diingat.
                    </li>
                    <li>
                      Berlatih Visualisasi: Ketika belajar atau mengingat
                      sesuatu, bayangkan informasi tersebut dalam bentuk gambar
                      di pikiran Anda.
                    </li>
                    <li>
                      Menciptakan Lingkungan Belajar Visual: Tempatkan poster,
                      peta, atau gambar di area belajar yang bisa memberikan
                      rangsangan visual.
                    </li>
                  </ul>
                  <br />
                  <h2 className="font-bold text-black text-xl">
                    Apa yang Harus Dihindari?
                  </h2>
                  <ul className="list-disc ml-5">
                    <li>
                      Mengandalkan Teks dan Audio Saja: Hindari terlalu banyak
                      bergantung pada catatan yang hanya berisi teks atau materi
                      yang hanya disampaikan secara lisan tanpa bantuan visual.
                    </li>
                    <li>
                      Mengabaikan Pentingnya Warna dan Simbol: Jangan biarkan
                      catatan atau materi belajar Anda menjadi monoton dan tidak
                      menarik secara visual. Penggunaan warna dan simbol dapat
                      memperkuat ingatan.
                    </li>
                    <li>
                      Tidak Menggunakan Alat Bantu Visual: Mengabaikan
                      penggunaan alat bantu visual seperti diagram atau peta
                      dapat membuat proses belajar menjadi kurang efektif.
                    </li>
                  </ul>
                </div>
              )}
              {gayaBelajar === "Auditori" && (
                <div className="h-96 overflow-y-auto">
                  <div className="flex justify-center items-center">
                    <Image
                      src={"/img/gayaBelajar/Auditori.png"}
                      alt="Image gaya belajar Auditori"
                      width={200}
                      height={200}
                    />
                  </div>
                  <h2 className="font-bold text-black text-xl">
                    Apa itu Gaya Belajar Auditori?
                  </h2>
                  <p>
                    Gaya belajar auditori adalah salah satu tipe belajar di mana
                    seseorang lebih mudah memahami, mengingat, dan memproses
                    informasi melalui pendengaran. Individu dengan gaya belajar
                    ini cenderung belajar lebih efektif dengan mendengarkan
                    ceramah, diskusi, rekaman suara, atau bahkan berbicara
                    dengan diri sendiri. Mereka biasanya unggul dalam
                    mendengarkan instruksi dan dapat mengingat dengan baik apa
                    yang telah mereka dengar.
                  </p>
                  <br />
                  <h2 className="font-bold text-black text-xl">
                    Gaya Belajar Seperti Apa yang Direkomendasikan?
                  </h2>
                  <p>
                    Untuk memaksimalkan potensi belajar, individu dengan gaya
                    belajar auditori disarankan untuk:
                  </p>
                  <ul className="list-disc ml-5">
                    <li>
                      <strong>Mengikuti Kuliah dan Diskusi:</strong>{" "}
                      Mendengarkan penjelasan dari guru atau dosen secara
                      langsung adalah metode yang sangat efektif.
                    </li>
                    <li>
                      <strong>Menggunakan Rekaman Audio:</strong> Merekam
                      ceramah atau pelajaran untuk didengarkan kembali dapat
                      membantu dalam memahami materi.
                    </li>
                    <li>
                      <strong>Membaca Keras:</strong> Membaca materi pelajaran
                      dengan suara keras dapat membantu memperkuat ingatan.
                    </li>
                    <li>
                      <strong>Berpartisipasi dalam Diskusi:</strong> Aktif dalam
                      diskusi kelompok akan memberikan kesempatan untuk
                      mendengar perspektif lain dan menjelaskan pemikiran mereka
                      sendiri, yang membantu dalam pemahaman dan retensi
                      informasi.
                    </li>
                    <li>
                      <strong>Menggunakan Mnemonik dan Lagu:</strong>{" "}
                      Menggunakan irama, lagu, atau rima untuk mengingat
                      informasi dapat sangat berguna.
                    </li>
                  </ul>
                  <br />
                  <h2 className="font-bold text-black text-xl">
                    Apa yang Harus Dilakukan?
                  </h2>
                  <ul className="list-disc ml-5">
                    <li>
                      <strong>Mendengarkan Musik Latar:</strong> Beberapa orang
                      dengan gaya belajar auditori merasa lebih fokus dengan
                      musik latar yang lembut, meskipun ini dapat bervariasi
                      tergantung pada preferensi individu.
                    </li>
                    <li>
                      <strong>Belajar dalam Kelompok:</strong> Berbagi dan
                      berdiskusi tentang materi pelajaran dengan orang lain
                      dapat memperkuat pemahaman.
                    </li>
                    <li>
                      <strong>Mendengarkan Podcast atau Audiobook:</strong>{" "}
                      Menggunakan sumber daya audio seperti podcast atau
                      audiobook yang relevan dengan topik yang sedang dipelajari
                      dapat memperluas wawasan.
                    </li>
                  </ul>
                  <br />
                  <h2 className="font-bold text-black text-xl">
                    Apa yang Tidak Harus Dilakukan?
                  </h2>
                  <ul className="list-disc ml-5">
                    <li>
                      <strong>
                        Belajar dalam Lingkungan yang Terlalu Berisik:
                      </strong>{" "}
                      Meski belajar dengan suara mungkin membantu, lingkungan
                      yang terlalu bising dapat mengganggu konsentrasi.
                    </li>
                    <li>
                      <strong>Mengandalkan Hanya pada Visual:</strong>{" "}
                      Menggunakan terlalu banyak alat bantu visual tanpa
                      dukungan audio mungkin tidak efektif bagi gaya belajar
                      ini.
                    </li>
                    <li>
                      <strong>Menghindari Diskusi:</strong> Mengabaikan
                      kesempatan untuk berdiskusi atau mendengarkan penjelasan
                      dapat menghambat proses belajar.
                    </li>
                  </ul>
                  <p>
                    Dengan memahami dan menerapkan strategi yang sesuai,
                    individu dengan gaya belajar auditori dapat belajar lebih
                    efektif dan mencapai hasil yang optimal dalam pembelajaran
                    mereka.
                  </p>
                </div>
              )}
              {gayaBelajar === "Kinestetik" && (
                <div className="h-96 overflow-y-auto">
                  <div className="flex justify-center items-center">
                    <Image
                      src={"/img/gayaBelajar/kinetis.png"}
                      alt="Image gaya belajar Auditori"
                      width={200}
                      height={200}
                    />
                  </div>
                  <h2 className="font-bold text-black text-xl">
                    Apa itu Gaya Belajar Kinetis?
                  </h2>
                  <p>
                    Gaya belajar kinetis, atau juga dikenal sebagai gaya belajar
                    fisik, adalah tipe gaya belajar di mana individu lebih
                    efektif memahami dan mengingat informasi melalui aktivitas
                    fisik dan pengalaman langsung. Orang dengan gaya belajar ini
                    cenderung menggunakan tubuh mereka secara aktif untuk
                    mengeksplorasi dan berinteraksi dengan dunia di sekitar
                    mereka. Mereka lebih mudah menyerap informasi ketika mereka
                    bisa melakukan sesuatu dengan tangan mereka, bergerak, atau
                    merasakan apa yang sedang mereka pelajari.
                  </p>
                  <br />
                  <h2 className="font-bold text-black text-xl">
                    Ciri-Ciri Gaya Belajar Kinetis
                  </h2>
                  <ul className="list-disc ml-5">
                    <li>
                      <strong>Aktif Secara Fisik:</strong> Belajar lebih efektif
                      melalui aktivitas fisik seperti gerakan tubuh, bermain
                      peran, atau menggunakan tangan.
                    </li>
                    <li>
                      <strong>Mengandalkan Sentuhan dan Gerakan:</strong>{" "}
                      Menggunakan tangan atau tubuh untuk membantu proses
                      pembelajaran.
                    </li>
                    <li>
                      <strong>Belajar Melalui Pengalaman Langsung:</strong>{" "}
                      Lebih suka mempelajari konsep melalui praktik langsung
                      atau eksperimen.
                    </li>
                    <li>
                      <strong>Suka Tantangan Fisik:</strong> Menyukai aktivitas
                      yang melibatkan keterampilan motorik seperti olahraga,
                      tarian, atau pekerjaan tangan.
                    </li>
                  </ul>
                  <br />
                  <h2 className="font-bold text-black text-xl">
                    Rekomendasi Metode Belajar untuk Gaya Belajar Kinetis
                  </h2>
                  <ul className="list-disc ml-5">
                    <li>
                      <strong>Belajar Melalui Aktivitas Fisik:</strong> Gunakan
                      pendekatan yang memungkinkan gerakan fisik, seperti
                      belajar sambil berjalan, berolahraga, atau menari.
                    </li>
                    <li>
                      <strong>Praktik Langsung:</strong> Melibatkan eksperimen,
                      proyek praktis, atau simulasi yang memerlukan partisipasi
                      fisik.
                    </li>
                    <li>
                      <strong>Penggunaan Alat Peraga:</strong> Menggunakan alat
                      bantu belajar yang bisa disentuh atau dimanipulasi,
                      seperti model, peralatan, atau alat tangan.
                    </li>
                    <li>
                      <strong>Role-playing:</strong> Melibatkan diri dalam
                      skenario atau bermain peran untuk memahami konsep atau
                      situasi.
                    </li>
                    <li>
                      <strong>Belajar Sambil Berdiri atau Bergerak:</strong>{" "}
                      Hindari belajar terlalu lama dalam posisi duduk. Cobalah
                      belajar sambil berjalan atau melakukan aktivitas yang
                      melibatkan gerakan.
                    </li>
                  </ul>
                  <br />
                  <h2 className="font-bold text-black text-xl">
                    Yang Harus Dilakukan
                  </h2>
                  <ul className="list-disc ml-5">
                    <li>
                      <strong>Gunakan Seluruh Tubuh:</strong> Libatkan tubuh
                      dalam proses belajar, seperti dengan membuat gerakan yang
                      berhubungan dengan materi pelajaran.
                    </li>
                    <li>
                      <strong>Berikan Pengalaman Nyata:</strong> Mencoba
                      langsung atau melakukan percobaan untuk mempelajari konsep
                      baru.
                    </li>
                    <li>
                      <strong>Variasikan Posisi Belajar:</strong> Berganti
                      posisi antara duduk, berdiri, atau berjalan untuk membantu
                      meningkatkan fokus dan pemahaman.
                    </li>
                    <li>
                      <strong>Belajar Sambil Bermain:</strong> Gunakan permainan
                      yang melibatkan fisik untuk belajar, seperti permainan
                      edukatif yang melibatkan gerakan.
                    </li>
                  </ul>
                  <br />
                  <h2 className="font-bold text-black text-xl">
                    Yang Tidak Harus Dilakukan
                  </h2>
                  <ul className="list-disc ml-5">
                    <li>
                      <strong>Mengabaikan Kebutuhan Gerakan:</strong>{" "}
                      Menghabiskan terlalu banyak waktu duduk diam atau terlibat
                      dalam aktivitas pasif seperti hanya membaca atau
                      mendengarkan ceramah.
                    </li>
                    <li>
                      <strong>Belajar Hanya dengan Teori:</strong> Menghindari
                      belajar hanya melalui bacaan atau teori tanpa disertai
                      praktik langsung.
                    </li>
                    <li>
                      <strong>
                        Memaksa Belajar dalam Situasi yang Membatasi Gerakan:
                      </strong>{" "}
                      Belajar dalam kondisi yang membatasi gerakan fisik seperti
                      ruang yang sempit atau dalam posisi yang tidak nyaman.
                    </li>
                    <li>
                      <strong>Menekankan Hafalan Tanpa Praktik:</strong> Hindari
                      metode belajar yang hanya menekankan hafalan tanpa
                      keterlibatan fisik atau praktik nyata.
                    </li>
                  </ul>
                  <p>
                    Dengan memahami gaya belajar kinetis, individu dapat
                    menyesuaikan metode belajar mereka untuk lebih efektif dan
                    menyenangkan, sekaligus memaksimalkan potensi mereka dalam
                    menyerap informasi.
                  </p>
                </div>
              )}
            </>
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
