import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "./useAuth";
import AppResume from "../types/resume.app";

export default function UseResume() {
    const { user } = useAuth();
    const [resume, setResumeState] = useState<AppResume[]>([]);

    useEffect(() => {
        async function getResume() {
            const resumeRef = doc(db, "resumes", user?.uid || '');
            const resumeSnap = await getDoc(resumeRef);
            if (resumeSnap.exists()) {
                setResumeState(resumeSnap.data().resumes);
            }  else {
                setResumeState([]);
            }
        }
        getResume();
    },[user?.uid])

    return {resume, setResumeState}
}