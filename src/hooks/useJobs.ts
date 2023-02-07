import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import AppJob from '../types/job.app';

export default function useJobs() {
  const [jobs, setJobsState] = useState<AppJob[]>([]);

  useEffect(() => {
    async function getJobs() {
      const jobsRef = collection(db, 'jobs');
      getDocs(jobsRef).then((snapshot) => {
        let jobsList: AppJob[] = [];
        snapshot.docs.forEach((doc) => {
          const {
            role: title,
            name: company,
            description,
            requirements,
            specialRequirements,
          } = doc.data();
          const appjob: AppJob = {
            id: doc.id,
            title,
            company,
            description,
            requirements,
            specialRequirements,
          };
          jobsList.push(appjob);
        });
        setJobsState(jobsList);
      });
    }
    getJobs();
  }, []);

  const findJob = (jobId: string | undefined) => {
    return jobs.find((j) => j.id === jobId);
  };

  return { jobs, setJobsState, findJob };
}
