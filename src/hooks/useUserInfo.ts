import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { db } from "../utils/firebase";

export default function useUserInfo() {
  const { user } = useAuth();  
  const [name, setName] = useState(user?.displayName ?? "");
  const [avatar, setAvatar] = useState("https://1fid.com/wp-content/uploads/2022/07/aesthetic-profile-picture-2-1024x1024.jpg");
  const [email, setEmail] = useState(user?.email ?? "");
  const [eduLevel, setEduLevel] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [created, setCreated] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    async function getUserData() {
      const docRef = doc(db, "users", user?.uid || '');
      onSnapshot(docRef, (snapshot) => {
        setName(snapshot.data()?.name);
        setAvatar(snapshot.data()?.avatar);
        setEmail(snapshot.data()?.email);
        setEduLevel(snapshot.data()?.eduLevel);
        setCreated(snapshot.data()?.created);
        setFetched(true);
      });
    }
    getUserData();
  },[user?.uid])

  return { name, avatar, email, eduLevel, created, fetched, companyName, companyDescription, 
    setName, setEmail, setAvatar, setEduLevel, setCreated, setCompanyName, setCompanyDescription};
}