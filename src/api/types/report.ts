export interface Feedback {
  date: string;
  emotion: string;
  feedback: string;
  summary: string;
  user_id: number;
}

export interface EmotionalDistribution {
  anger: number;
  anxiety: number;
  joy: number;
  sadness: number;
  satisfaction: number;
}

export interface GetReportResponse {
  userId: number;
  feedbacks: Feedback[];
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
