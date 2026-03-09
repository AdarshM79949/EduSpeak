import { 
  Users, 
  BookOpen, 
  FileQuestion, 
  TrendingUp,
  Activity,
  Shield,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockAnalytics } from '@/data/mockData';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const analytics = mockAnalytics;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform overview and management</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-3xl font-bold">{analytics.totalUsers}</p>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+12%</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active This Week</p>
                <p className="text-3xl font-bold">{analytics.activeStudentsThisWeek}</p>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+8%</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Activity className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Lessons</p>
                <p className="text-3xl font-bold">{analytics.totalLessons}</p>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <span>+3 new this week</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Quizzes Taken</p>
                <p className="text-3xl font-bold">{analytics.quizzesTaken}</p>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+24%</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                <FileQuestion className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Daily Active Users */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Daily Active Users</CardTitle>
            <Link to="/admin/analytics">
              <Button variant="ghost" size="sm">View Details</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-48 gap-2">
              {analytics.dailyActiveUsers.map((day) => (
                <div key={day.date} className="flex-1 flex flex-col items-center space-y-2">
                  <div 
                    className="w-full bg-primary rounded-t transition-all hover:bg-primary/80"
                    style={{ height: `${(day.count / 70) * 160}px` }}
                  />
                  <span className="text-xs text-muted-foreground">{day.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link to="/admin/users">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Users
                </Button>
              </Link>
              <Link to="/admin/content">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Moderate Content
                </Button>
              </Link>
              <Link to="/admin/analytics">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </Link>
              <Link to="/admin/settings">
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="h-4 w-4 mr-2" />
                  System Settings
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Signups */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Signups</CardTitle>
          <Link to="/admin/users">
            <Button variant="ghost" size="sm">View All Users</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.recentSignups.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-medium">{user.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant={user.role === 'student' ? 'default' : user.role === 'teacher' ? 'secondary' : 'destructive'}>
                    {user.role}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {new Date(user.signedUpAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Popular Lessons */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Lessons</CardTitle>
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
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
