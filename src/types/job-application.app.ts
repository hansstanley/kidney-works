export default interface AppJobApplication {
  jobId: string;
  userId: string;
  status: AppJobStatus;
  userName: string;
  addNote:string;
}

export type AppJobStatus =
  | 'open'
  | 'applied'
  | 'reviewed'
  | 'rejected'
  | 'accepted';
