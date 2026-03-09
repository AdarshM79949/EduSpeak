import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  TrendingUp,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockStudents, mockQuizzes } from '@/data/mockData';
import { toast } from 'sonner';

export default function Gradebook() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState('all');

  const filteredStudents = mockStudents.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = () => {
    toast.success('Grades exported to CSV');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gradebook</h1>
          <p className="text-muted-foreground">View and manage student grades</p>
        </div>
        <Button variant="outline" onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export Grades
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedQuiz} onValueChange={setSelectedQuiz}>
              <SelectTrigger className="w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by quiz" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Quizzes</SelectItem>
                {mockQuizzes.map((quiz) => (
                  <SelectItem key={quiz.id} value={quiz.id}>{quiz.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Grades Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Overall Average</TableHead>
                {mockQuizzes.map((quiz) => (
                  <TableHead key={quiz.id}>{quiz.title}</TableHead>
                ))}
                <TableHead>Lessons</TableHead>
                <TableHead>Speaking</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className={`font-bold ${
                        student.progress.averageQuizScore >= 80 ? 'text-green-600' :
                        student.progress.averageQuizScore >= 60 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {student.progress.averageQuizScore}%
                      </span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </TableCell>
                  {mockQuizzes.map((quiz) => {
                    const score = Math.floor(Math.random() * 40) + 60; // Simulated scores
                    return (
                      <TableCell key={quiz.id}>
                        <Badge variant={score >= 70 ? 'default' : 'destructive'}>
                          {score}%
                        </Badge>
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <span className="text-sm">{student.progress.totalLessonsCompleted}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{student.progress.speakingSessionsCompleted} sessions</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Class Statistics */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">78%</p>
              <p className="text-muted-foreground mt-1">Class Average</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-green-500">24</p>
              <p className="text-muted-foreground mt-1">Students Passing</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-orange-500">5</p>
              <p className="text-muted-foreground mt-1">Need Attention</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Grades */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="h-5 w-5" />
            <h3 className="font-semibold">Pending Grades</h3>
          </div>
          <div className="space-y-3">
            {[
              { student: 'John Student', assignment: 'Speaking Exercise #3', submitted: '2 hours ago' },
              { student: 'Emma Wilson', assignment: 'Essay: My Hometown', submitted: '1 day ago' },
              { student: 'Michael Brown', assignment: 'Grammar Quiz Retake', submitted: '2 days ago' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="font-medium text-orange-600">{item.student.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium">{item.student}</p>
                    <p className="text-sm text-muted-foreground">{item.assignment}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">{item.submitted}</span>
                  <Button size="sm">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Grade
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
