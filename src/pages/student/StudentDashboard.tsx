import { useState } from 'react';
import { 
  BookOpen, 
  Mic, 
  ClipboardCheck, 
  TrendingUp, 
  Flame, 
  Clock,
  ChevronRight,
  Play
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { mockStudentProgress, mockLessons } from '@/data/mockData';
import { Link } from 'react-router-dom';

export default function StudentDashboard() {
  const progress = mockStudentProgress;
  const [recentLessons] = useState(mockLessons.slice(0, 3));

  const getSkillColor = (skill: string) => {
    const colors: Record<string, string> = {
      speaking: 'bg-blue-500',
      listening: 'bg-green-500',
      reading: 'bg-purple-500',
      writing: 'bg-orange-500',
      grammar: 'bg-pink-500',
    };
    return colors[skill] || 'bg-gray-500';
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lesson':
        return <BookOpen className="h-4 w-4" />;
      case 'quiz':
        return <ClipboardCheck className="h-4 w-4" />;
      case 'speaking':
        return <Mic className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Student!</h1>
          <p className="text-muted-foreground">Here's your learning progress today</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 px-4 py-2 bg-orange-100 rounded-full">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="font-semibold text-orange-700">{progress.streakDays} day streak</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Lessons Completed</p>
                <p className="text-3xl font-bold">{progress.totalLessonsCompleted}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Quizzes Taken</p>
                <p className="text-3xl font-bold">{progress.totalQuizzesTaken}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <ClipboardCheck className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Quiz Score</p>
                <p className="text-3xl font-bold">{progress.averageQuizScore}%</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Speaking Sessions</p>
                <p className="text-3xl font-bold">{progress.speakingSessionsCompleted}</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Mic className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Skill Progress */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Skill Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(progress.skillProgress).map(([skill, data]) => {
                const percentage = Math.round((data.completed / data.total) * 100);
                return (
                  <div key={skill} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className={`h-3 w-3 rounded-full ${getSkillColor(skill)}`} />
                        <span className="capitalize font-medium">{skill}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {data.completed}/{data.total} ({percentage}%)
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {progress.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Continue Learning</CardTitle>
          <Link to="/student/lessons">
            <Button variant="ghost" size="sm">
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {recentLessons.map((lesson) => (
              <div key={lesson.id} className="group relative bg-muted rounded-lg overflow-hidden">
                <img 
                  src={lesson.thumbnail} 
                  alt={lesson.title}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <Badge className="mb-2" variant="secondary">
                    {lesson.category}
                  </Badge>
                  <h4 className="text-white font-medium text-sm mb-1">{lesson.title}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-xs">{lesson.duration} min</span>
                    <Link to={`/student/lessons/${lesson.id}`}>
                      <Button size="sm" className="h-8 w-8 p-0">
                        <Play className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between h-48 gap-2">
            {progress.weeklyActivity.map((day) => {
              const maxTotal = 6;
              return (
                <div key={day.day} className="flex-1 flex flex-col items-center space-y-2">
                  <div className="w-full flex flex-col justify-end space-y-1" style={{ height: '160px' }}>
                    {day.speaking > 0 && (
                      <div 
                        className="w-full bg-orange-400 rounded-t"
                        style={{ height: `${(day.speaking / maxTotal) * 100}%` }}
                        title={`Speaking: ${day.speaking}`}
                      />
                    )}
                    {day.quizzes > 0 && (
                      <div 
                        className="w-full bg-green-400 rounded-t"
                        style={{ height: `${(day.quizzes / maxTotal) * 100}%` }}
                        title={`Quizzes: ${day.quizzes}`}
                      />
                    )}
                    {day.lessons > 0 && (
                      <div 
                        className="w-full bg-blue-400 rounded-t"
                        style={{ height: `${(day.lessons / maxTotal) * 100}%` }}
                        title={`Lessons: ${day.lessons}`}
                      />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{day.day}</span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-blue-400 rounded" />
              <span className="text-xs text-muted-foreground">Lessons</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-green-400 rounded" />
              <span className="text-xs text-muted-foreground">Quizzes</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-orange-400 rounded" />
              <span className="text-xs text-muted-foreground">Speaking</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
