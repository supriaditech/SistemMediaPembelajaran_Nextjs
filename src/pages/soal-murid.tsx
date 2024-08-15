import Master from "@/components/global/Master";
import React, { useState } from "react";
import { useSoal } from "../../hooks/useSoal";
import { SoalsResponseType } from "../../types/soalType";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { SessionType } from "../../types/sessionType";
import {
  SubmitJawabanResult,
  useSubmitJawaban,
} from "../../hooks/useSubmitJawaban";

function SoalMurid({ token }: any) {
  const router = useRouter();
  const { materiId } = router.query;
  const { data } = useSoal(materiId, token);
  const soalData = (data as SoalsResponseType)?.data ?? [];

  const { submitJawaban, loading } = useSubmitJawaban(token);

  const [jawabanList, setJawabanList] = useState<any[]>([]);
  const [hasilJawaban, setHasilJawaban] = useState<any[]>([]);
  const [summary, setSummary] = useState<{
    correct: number;
    total: number;
  } | null>(null);

  const handleJawabanChange = (soalId: number, jawaban: string) => {
    setJawabanList((prevJawabanList) => {
      const updatedList = prevJawabanList.filter(
        (item) => item.soalId !== soalId
      );
      return [...updatedList, { soalId, jawaban }];
    });
  };

  const handleSubmit = async () => {
    const jawabanData = {
      materiId: parseInt(materiId as string),
      jawabanList,
    };

    const response: any = await submitJawaban(jawabanData);
    console.log(response);
    if (response.success && response.data) {
      setHasilJawaban(response.data.results);
      setSummary(response.data.summary);
    }
  };

  const handleReset = () => {
    setJawabanList([]);
    setHasilJawaban([]);
    setSummary(null);
  };

  return (
    <Master title="Soal Murid Page">
      <div className="px-4 md:px-20 py-10 lg:px-96 w-full flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p className="font-bold text-2xl">List Soal</p>
        </div>
        {soalData.length > 0 ? (
          soalData.map((soal, index: number) => {
            const jawabanHasil = hasilJawaban.find(
              (hasil) => hasil.jawaban.soalId === soal.id
            );
            return (
              <div key={soal.id} className="mb-4 bg-blue-50 p-8 rounded-md">
                <p className="font-bold">
                  {index + 1}. {soal.question}
                </p>
                <ul className="list-none">
                  {soal.options.map((option) => (
                    <li key={option.id}>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name={`soal-${soal.id}`}
                          value={option.text.charAt(0)}
                          onChange={() =>
                            handleJawabanChange(soal.id, option.text.charAt(0))
                          }
                          className="form-radio h-5 w-5 text-blue-600"
                          disabled={!!hasilJawaban.length}
                        />
                        <span
                          className={`ml-2 ${
                            jawabanHasil &&
                            jawabanHasil.jawaban.jawaban ===
                              option.text.charAt(0)
                              ? jawabanHasil.isCorrect
                                ? "text-green-600"
                                : "text-red-600"
                              : ""
                          }`}
                        >
                          {option.text}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
                {jawabanHasil && (
                  <p
                    className={`mt-2 ${
                      jawabanHasil.isCorrect ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {jawabanHasil.isCorrect
                      ? "Jawaban Anda benar"
                      : "Jawaban Anda salah"}
                  </p>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 mt-4">
            Belum ada soal yang tersedia.
          </p>
        )}
        {!summary && (
          <button
            onClick={handleSubmit}
            disabled={loading || !!hasilJawaban.length}
            className="mt-4 bg-blue-500 text-white p-4 rounded-md hover:bg-blue-600"
          >
            {loading ? "Menyimpan..." : "Submit Jawaban"}
          </button>
        )}
        {summary && (
          <>
            <div className="mt-4">
              <p className="font-bold text-lg">Ringkasan:</p>
              <p>
                Benar: {summary.correct} dari {summary.total}
              </p>
            </div>
            <button
              onClick={handleReset}
              disabled={loading}
              className="mt-4 bg-blue-500 text-white p-4 rounded-md hover:bg-blue-600"
            >
              Jawab Ulang
            </button>
          </>
        )}
      </div>
    </Master>
  );
}

export default SoalMurid;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session: SessionType | null = (await getSession(
    context
  )) as SessionType | null;

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const token = session?.accessToken;

  return {
    props: { token },
  };
};
