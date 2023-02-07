import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import AppJob from '../types/job.app';

export default function UseJobs() {
    const [jobs, setJobsState] = useState<AppJob[]>([])

    useEffect(() => {
        async function getJobs() {
            const jobsRef = collection(db, "jobs");
            getDocs(jobsRef).then((snapshot) => {
                let jobsList: AppJob[] = []
                let jobId = 1
                snapshot.docs.forEach((doc) => {
                    const appjob: AppJob = {
                        id:jobId,
                        title:doc.data().role,
                        company:doc.data().name,
                        description:doc.data().description,
                        requirements:doc.data().requirements,
                    }
                    jobsList.push(appjob)
                    jobId++
                })
                setJobsState(jobsList)
            })
        }
        getJobs();
    },[jobs])
    
    return {jobs, setJobsState}
}