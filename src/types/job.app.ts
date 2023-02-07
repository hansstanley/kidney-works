export default interface AppJob {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements?: string;
  specialRequirements?: string;
}
