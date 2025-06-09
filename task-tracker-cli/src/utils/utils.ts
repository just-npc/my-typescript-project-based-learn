export interface TaskType {
  id: number;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export function generateId() {
  return Number(new Date());
}
