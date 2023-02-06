export default interface AppJob {
  id: number;
  title: string;
  company: string;
  description: string;
  requirements?: string;
  specialRequirements?: string;
}
