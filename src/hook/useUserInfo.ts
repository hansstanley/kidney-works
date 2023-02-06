import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { db } from "../utils/firebase";

export default function useUserInfo() {
    const [name, setName] = useState("your-name");
    const [avatar, setAvatar] = useState("https://1fid.com/wp-content/uploads/2022/07/aesthetic-profile-picture-2-1024x1024.jpg");
    const [email, setEmail] = useState("example@abc.com");
    const { user } = useAuth();  

    useEffect(() => {
      async function getUserData() {
        // @ts-ignore
        const docRef = doc(db, "users", user?.uid);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          setName(docSnap.data().name);
          setAvatar(docSnap.data().avatar);
          setEmail(docSnap.data().email);
        }
      }
      getUserData();
    },[user])

  return { name, avatar, email };
}