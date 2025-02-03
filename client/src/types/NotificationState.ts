export type NotificationType = "success" | "warn" | "error" | "neutral" | null;
export interface NotificationState {
  type: NotificationType;
  message: string | null;
}
