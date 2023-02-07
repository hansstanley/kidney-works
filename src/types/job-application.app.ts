export default interface AppJobApplication {
  jobId: string;
  userId: string;
  status: AppJobStatus;
}

export type AppJobStatus =
  | 'open'
  | 'applied'
  | 'reviewed'
  | 'rejected'
  | 'accepted';
