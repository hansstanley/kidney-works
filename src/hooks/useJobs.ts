import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import AppJob from '../types/job.app';
import AppJobApplication from '../types/job-application.app';

export default function useJobs() {
  const [jobs, setJobsState] = useState<AppJob[]>([]);
  const [jobApps, setJobApps] = useState<AppJobApplication[]>([]);

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

  useEffect(() => {
    async function getJobApps() {
      const ref = collection(db, 'job_applications');
      getDocs(ref).then((snapshot) => {
        setJobApps(
          snapshot.docs.map((doc) => {
            const { jobId, userId, status } = doc.data();
            return { jobId, userId, status };
          }),
        );
      });
    }
    getJobApps();
  }, []);

  const findJob = (jobId: string | undefined) => {
    return jobs.find((j) => j.id === jobId);
  };

  const findJobApplications = (userId: string | undefined) => {
    return jobApps.filter((app) => app.userId === userId);
  };

  const findAppliedJobs = (userId: string | undefined) => {
    const jobIds = jobApps
      .filter((app) => app.userId === userId)
      .map((app) => app.jobId);
    return jobs.filter((job) => jobIds.includes(job.id));
  };

  const isJobApplied = (userId: string | undefined) => (jobId: string) => {
    const userApplications = jobApps.filter((app) => app.userId === userId);
    return userApplications.map((app) => app.jobId).includes(jobId);
  };

  return {
    jobs,
    jobApps,
    setJobsState,
    findJob,
    findJobApplications,
    findAppliedJobs,
    isJobApplied,
  };
}
