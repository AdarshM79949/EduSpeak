import { 
  TrendingUp, 
  BookOpen, 
  Mic, 
  ClipboardCheck, 
  Award,
  Calendar,
  Target,
  Flame
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { mockStudentProgress, mockQuizResults } from '@/data/mockData';

export default function ProgressReport() {
  const progress = mockStudentProgress;

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

  const getSkillIcon = (skill: string) => {
    switch (skill) {
      case 'speaking':
        return <Mic className="h-4 w-4" />;
      case 'listening':
        return <BookOpen className="h-4 w-4" />;
      case 'reading':
        return <BookOpen className="h-4 w-4" />;
      case 'writing':
        return <BookOpen className="h-4 w-4" />;
      case 'grammar':
        return <ClipboardCheck className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Progress Report</h1>
        <p className="text-muted-foreground">Track your learning journey and achievements</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{progress.totalLessonsCompleted}</p>
                <p className="text-xs text-muted-foreground">Lessons</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <ClipboardCheck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{progress.totalQuizzesTaken}</p>
                <p className="text-xs text-muted-foreground">Quizzes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Mic className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{progress.speakingSessionsCompleted}</p>
                <p className="text-xs text-muted-foreground">Speaking</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                <Flame className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{progress.streakDays}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Skill Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Skill Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(progress.skillProgress).map(([skill, data]) => {
                const percentage = Math.round((data.completed / data.total) * 100);
                return (
                  <div key={skill} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className={`h-8 w-8 rounded-lg ${getSkillColor(skill)} bg-opacity-20 flex items-center justify-center`}>
                          {getSkillIcon(skill)}
                        </div>
                        <span className="capitalize font-medium">{skill}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {data.completed}/{data.total}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Progress value={percentage} className="flex-1 h-2" />
                      <span className="text-sm font-medium w-10">{percentage}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'First Steps', desc: 'Complete 1 lesson', earned: true, icon: '🎯' },
                { name: 'Quiz Master', desc: 'Score 90%+ on a quiz', earned: true, icon: '🏆' },
                { name: 'Speaking Pro', desc: '10 speaking sessions', earned: true, icon: '🎤' },
                { name: 'Week Warrior', desc: '7-day streak', earned: progress.streakDays >= 7, icon: '🔥' },
                { name: 'Grammar Guru', desc: 'Complete all grammar', earned: false, icon: '📚' },
                { name: 'Speed Demon', desc: 'Finish quiz in <5 min', earned: false, icon: '⚡' },
              ].map((achievement, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg border ${
                    achievement.earned 
                      ? 'bg-primary/5 border-primary/30' 
                      : 'bg-muted/50 border-muted opacity-60'
                  }`}
                >
                  <div className="text-2xl mb-1">{achievement.icon}</div>
                  <p className="font-medium text-sm">{achievement.name}</p>
                  <p className="text-xs text-muted-foreground">{achievement.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Weekly Activity</span>
          </CardTitle>
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
                      />
                    )}
                    {day.quizzes > 0 && (
                      <div 
                        className="w-full bg-green-400 rounded-t"
                        style={{ height: `${(day.quizzes / maxTotal) * 100}%` }}
                      />
                    )}
                    {day.lessons > 0 && (
                      <div 
                        className="w-full bg-blue-400 rounded-t"
                        style={{ height: `${(day.lessons / maxTotal) * 100}%` }}
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

      {/* Quiz History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Quiz History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockQuizResults.map((result) => (
              <div key={result.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                    result.percentage >= 80 ? 'bg-green-100 text-green-600' :
                    result.percentage >= 60 ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    <span className="text-lg font-bold">{result.percentage}%</span>
                  </div>
                  <div>
                    <p className="font-medium">{result.quizTitle}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(result.completedAt).toLocaleDateString()} • {Math.floor(result.timeTaken / 60)}m {result.timeTaken % 60}s
                    </p>
                  </div>
                </div>
                <Badge variant={result.percentage >= 80 ? 'default' : result.percentage >= 60 ? 'secondary' : 'destructive'}>
                  {result.score}/{result.totalPoints} pts
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
