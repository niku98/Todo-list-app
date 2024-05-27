export enum TaskStatus {
  Pending = "pending",
  InProgress = "in-progress",
  Completed = "completed",
}

export interface ITask {
  id?: string;
  title: string;
  status: TaskStatus;
  description: string;
}
