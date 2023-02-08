import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { db } from "../utils/firebase";

export default function useUserInfo() {
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("https://1fid.com/wp-content/uploads/2022/07/aesthetic-profile-picture-2-1024x1024.jpg");
    const [email, setEmail] = useState("");
    const [eduLevel, setEduLevel] = useState("");
    const [created, setCreated] = useState(false);
    const [fetched, setFetched] = useState(false);
    const { user } = useAuth();  

    useEffect(() => {
      async function getUserData() {
        const docRef = doc(db, "users", user?.uid || '');
        onSnapshot(docRef, (snapshot) => {
          setName(snapshot.data()?.name);
          setAvatar(snapshot.data()?.avatar);
          setEmail(snapshot.data()?.email);
          setEduLevel(snapshot.data()?.eduLevel);
          setFetched(true);
        });
      }
      getUserData();
    },[user?.uid])

  return { name, avatar, email, eduLevel, created, fetched, setName, setEmail, setAvatar, setEduLevel, setCreated };
}