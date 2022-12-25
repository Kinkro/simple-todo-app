export interface Task {
  id: number;
  note: string;
  time: string;
  isComplete: boolean;
  isDeleted: boolean;
}

export interface IsActive {
  buttonText: string;
  isActive: boolean;
}
