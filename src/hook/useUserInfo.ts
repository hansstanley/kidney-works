import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { db } from "../utils/firebase";

export default function useUserInfo() {
    const [name, setName] = useState("Not set");
    const [avatar, setAvatar] = useState("");
    const { user } = useAuth();
     // @ts-ignore
    const docRef = doc(db, "users", user.uid);

    useEffect(() => {
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            setName(snapshot.data()?.name);
            setAvatar(snapshot.data()?.avatar);
        });
    return () => {
      unsubscribe();
    };
  }, [docRef]);

  return { name, avatar };
}