import type { Activity, CreateActivityInput, WeeklySummary } from './entities'

export type Unsubscribe = () => void

export interface ActivityFilters {
  status?: Activity['status'] | 'all'
  category?: Activity['category'] | 'all'
  period?: 'all' | 'today' | 'upcoming' | 'completed'
  search?: string
}

export interface IActivityRepository {
  create(input: CreateActivityInput): Promise<Activity>

  subscribeByUser(
    uid: string,
    filters: ActivityFilters,
    onData: (activities: Activity[]) => void,
    onError?: (error: Error) => void
  ): Unsubscribe

  subscribeToNextActivity(uid: string, onData: (activity: Activity | null) => void, onError?: (error: Error) => void): Unsubscribe

  subscribeToTodayActivities(uid: string, startOfDay: Date, endOfDay: Date, onData: (activities: Activity[]) => void, onError?: (error: Error) => void): Unsubscribe

  subscribeToInProgressActivities(uid: string, onData: (activities: Activity[]) => void, onError?: (error: Error) => void): Unsubscribe

  subscribeToRecentCompletedActivities(uid: string, onData: (activities: Activity[]) => void, onError?: (error: Error) => void): Unsubscribe

  getWeeklySummary(uid: string): Promise<WeeklySummary>
}
