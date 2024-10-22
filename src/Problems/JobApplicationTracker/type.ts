type Status =
  | "Applied"
  | "Interview Scheduled"
  | "Technical Round"
  | "HR Round"
  | "Offered"
  | "Rejected";

type JobApplication = {
  id: string;
  companyName: string;
  status: Status;
  position: string;
  notes?: string;
};

export { JobApplication, Status };
