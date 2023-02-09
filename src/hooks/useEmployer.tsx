import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "./useAuth";

// STILL WIP!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export default function UseEmployer() {
    const { user } = useAuth();
    const [isEmployer, setIsEmployer] = useState(false);

    useEffect(() => {
        async function getLimitations() {
            const isEmployerRef = doc(db, "stakeholders", "employers", "users", user?.uid || '');
            const isEmployerSnap = await getDoc(isEmployerRef);

            if (isEmployerSnap.exists()) {
                setIsEmployer(true);
            }  else {
                setIsEmployer(false);
            }
        }
        getLimitations();
    },[user?.uid])

    return {isEmployer, setIsEmployer};
}