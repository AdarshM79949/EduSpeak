import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  FileQuestion,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockAnalytics } from '@/data/mockData';

export default function Analytics() {
  const analytics = mockAnalytics;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Detailed platform statistics and insights</p>
        </div>
        <Select defaultValue="7d">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 Hours</SelectItem>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
            <SelectItem value="90d">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{analytics.totalUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <Activity className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">{analytics.activeStudentsThisWeek}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lessons</p>
                <p className="text-2xl font-bold">{analytics.totalLessons}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                <FileQuestion className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Quizzes Taken</p>
                <p className="text-2xl font-bold">{analytics.quizzesTaken}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Daily Active Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Daily Active Users</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-64 gap-2">
              {analytics.dailyActiveUsers.map((day) => (
                <div key={day.date} className="flex-1 flex flex-col items-center space-y-2">
                  <div className="relative w-full flex items-end justify-center" style={{ height: '200px' }}>
                    <div 
                      className="w-full max-w-[40px] bg-primary rounded-t transition-all hover:bg-primary/80"
                      style={{ height: `${(day.count / 70) * 100}%` }}
                    />
                    <div className="absolute -top-6 text-xs font-medium opacity-0 hover:opacity-100 transition-opacity">
                      {day.count}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{day.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Completion Rates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5" />
              <span>Completion Rates</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Lesson Completion Rate</span>
                  <span className="text-sm font-bold">{analytics.lessonCompletionRate}%</span>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${analytics.lessonCompletionRate}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Quiz Pass Rate</span>
                  <span className="text-sm font-bold">{analytics.quizPassRate}%</span>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full transition-all"
                    style={{ width: `${analytics.quizPassRate}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Speaking Practice Completion</span>
                  <span className="text-sm font-bold">62%</span>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange-500 rounded-full transition-all"
                    style={{ width: '62%' }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Most Popular Lessons</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.popularLessons.map((lesson, index) => (
              <div key={lesson.lessonId} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-muted-foreground w-8">#{index + 1}</span>
                  <div>
                    <p className="font-medium">{lesson.title}</p>
                    <p className="text-sm text-muted-foreground">{lesson.viewCount} views</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-32 bg-muted-foreground/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(lesson.viewCount / 250) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {Math.round((lesson.viewCount / 250) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Growth */}
      <Card>
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-3xl font-bold text-primary">+24</p>
              <p className="text-sm text-muted-foreground">New this week</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-3xl font-bold text-green-500">+156</p>
              <p className="text-sm text-muted-foreground">New this month</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-3xl font-bold text-blue-500">+892</p>
              <p className="text-sm text-muted-foreground">New this year</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-3xl font-bold text-purple-500">12%</p>
              <p className="text-sm text-muted-foreground">Growth rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
