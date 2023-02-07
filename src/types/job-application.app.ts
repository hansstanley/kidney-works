export default interface AppJobApplication {
  jobId: string;
  status: AppJobStatus;
}

export type AppJobStatus =
  | 'open'
  | 'applied'
  | 'reviewed'
  | 'rejected'
  | 'accepted';
