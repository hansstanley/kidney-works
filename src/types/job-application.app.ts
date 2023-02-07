export default interface AppJobApplication {
  jobId: number;
  status: AppJobStatus;
}

export type AppJobStatus =
  | 'open'
  | 'applied'
  | 'reviewed'
  | 'rejected'
  | 'accepted';
