export interface Record {
  date: string;
  emotion: string;
}

export interface Feedback {
  title: string;
  subtitle: string;
  detail: string;
}

export interface Goal {
  goal: string;
  ratio: number;
}

export interface PeerGoal {
  title: string;
  owner: string;
}

export interface GetReportResponse {
  records: Record[];
  feedback: Feedback;
  weeklyProgress: number;
  goals: Goal[];
  peerGoals: PeerGoal[];
}

export interface GetReportParams {
  userId: number;
  date: string;
}
