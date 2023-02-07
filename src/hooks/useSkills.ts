import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "./useAuth";

export default function UseSkills() {
    const { user } = useAuth();
    const [skills, setSkillsState] = useState<String[]>([]);

    useEffect(() => {
        async function getSkills() {
            const skillsRef = doc(db, "skills", user?.uid || '');
            const skillSnap = await getDoc(skillsRef);

            if (skillSnap.exists()) {
                setSkillsState(skillSnap.data().skills);
            }  else {
                setSkillsState([]);
            }
        }
        getSkills();
    },[user?.uid])

    return {skills, setSkillsState}
}