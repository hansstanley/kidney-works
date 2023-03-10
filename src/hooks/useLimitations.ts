import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "./useAuth";

export default function UseLimitations() {
    const { user } = useAuth();
    const [limitations, setLimitationState] = useState<string[]>([]);

    useEffect(() => {
        async function getLimitations() {
            const limitationRef = doc(db, "limitations", user?.uid || '');
            const limitationSnap = await getDoc(limitationRef);

            if (limitationSnap.exists()) {
                setLimitationState(limitationSnap.data().limitations);
            }  else {
                setLimitationState([]);
            }
        }
        getLimitations();
    },[user?.uid])

    return {limitations, setLimitationState}
}