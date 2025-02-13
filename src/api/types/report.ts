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

export interface EmotionalDistribution {
  anger: number;
  anxiety: number;
  joy: number;
  sadness: number;
  satisfaction: number;
}

export interface GetReportResponse {
  records: Record[];
  feedback: Feedback;
  weeklyProgress: number;
  goals: Goal[];
  peerGoals: PeerGoal[];
}

export interface GetReportDetailResponse {
  average_monthly_progress: number;
  average_weekly_progress: number;
  monthly_emotions: EmotionalDistribution;
  monthly_goal_count: number;
  total_monthly_progress: number;
  total_weekly_progress: number;
  weekly_emotions: EmotionalDistribution;
  weekly_goal_count: number;
}

export interface GetReportParams {
  userId: number;
  date: string;
}

export interface GetReportDetailParams {
  userId: number;
  date: string;
}
