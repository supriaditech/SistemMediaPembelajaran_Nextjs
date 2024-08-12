import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { SessionType } from "../../../../types/sessionType";
import { usePhotoProfile } from "../../../../hooks/usePhotoProfile";
import { Dialog } from "@material-tailwind/react";
import AddPhotoProfile from "./Modal/AddPhotoProfile";

function ListMateri() {
  const { data: session } = useSession() as { data: SessionType | null };
  const { modalPhotoProfile, setPhotoProfile } = usePhotoProfile(
    session?.accessToken ?? null
  );


  useEffect(() => {
    // Cek jika session.user.Guru === null
    if (session?.user?.Guru === null) {
      setPhotoProfile(true); // Buka dialog
    }else{
        setPhotoProfile(false);
    }
  }, [session, setPhotoProfile]);

  return (
    <div>
      ListMateri
      <Dialog
        open={modalPhotoProfile}
        handler={() => setPhotoProfile(false)}  // Tutup modal saat handler dipanggil
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="flex-row justify-center item-center"
      >
        <AddPhotoProfile
          token={session?.accessToken ??"" }
          guruId={session?.user?.userId ?? null}
        />
      </Dialog>
    </div>
  );
}

export default ListMateri;
