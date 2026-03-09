import { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Mail, 
  MoreHorizontal,
  TrendingUp,
  BookOpen,
  Award
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockClasses, mockStudents } from '@/data/mockData';
import { toast } from 'sonner';

export default function ClassManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState(mockClasses[0]);

  const filteredStudents = selectedClass?.students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleSendMessage = (studentName: string) => {
    toast.success(`Message dialog opened for ${studentName}`);
  };

  const handleRemoveStudent = (studentName: string) => {
    toast.success(`${studentName} removed from class`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Class Management</h1>
          <p className="text-muted-foreground">Manage your classes and students</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Student to Class</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Input placeholder="Search by name or email..." />
              <div className="space-y-2">
                {mockStudents.slice(0, 3).map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Add</Button>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Class Selector */}
      <div className="flex space-x-2">
        {mockClasses.map((cls) => (
          <Button
            key={cls.id}
            variant={selectedClass?.id === cls.id ? 'default' : 'outline'}
            onClick={() => setSelectedClass(cls)}
          >
            {cls.name}
          </Button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Class Stats */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Class Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Total Students</p>
                  <p className="text-2xl font-bold">{selectedClass?.students.length || 0}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Avg. Completion</p>
                  <p className="text-2xl font-bold">68%</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Award className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Avg. Score</p>
                  <p className="text-2xl font-bold">78%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Student List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Students</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={student.avatar} />
                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right hidden md:block">
                      <div className="flex items-center space-x-1 text-sm">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span>{student.progress.averageQuizScore}% avg</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {student.progress.totalLessonsCompleted} lessons completed
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleSendMessage(student.name)}>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleRemoveStudent(student.name)}
                        >
                          Remove from Class
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="submissions">
            <TabsList>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
            </TabsList>
            <TabsContent value="submissions">
              <div className="space-y-3">
                {[
                  { student: 'John Student', action: 'completed Grammar Quiz', time: '2 hours ago' },
                  { student: 'Emma Wilson', action: 'submitted Speaking Exercise', time: '5 hours ago' },
                  { student: 'Michael Brown', action: 'started new lesson', time: '1 day ago' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">{item.student.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{item.student}</p>
                        <p className="text-sm text-muted-foreground">{item.action}</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.time}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="progress">
              <p className="text-muted-foreground text-center py-8">Progress tracking coming soon</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
