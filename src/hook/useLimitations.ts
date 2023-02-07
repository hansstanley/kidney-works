import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "./useAuth";

export default function UseLimitations() {
    const { user } = useAuth();
    const [limitations, setLimitationState] = useState<String[]>([]);

    useEffect(() => {
        async function getLimitations() {
            //@ts-ignore
            const limitationRef = doc(db, "limitations", user?.uid);
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