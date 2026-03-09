import { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Eye,
  BookOpen,
  FileQuestion
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockContentModeration, mockLessons, mockQuizzes } from '@/data/mockData';
import { toast } from 'sonner';

export default function ContentModeration() {
  const [pendingContent, setPendingContent] = useState(mockContentModeration);

  const handleApprove = (id: string) => {
    setPendingContent(pendingContent.filter(c => c.id !== id));
    toast.success('Content approved and published');
  };

  const handleReject = (id: string) => {
    setPendingContent(pendingContent.filter(c => c.id !== id));
    toast.success('Content rejected');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Content Moderation</h1>
        <p className="text-muted-foreground">Review and approve user-submitted content</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-3xl font-bold">{pendingContent.length}</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved Today</p>
                <p className="text-3xl font-bold">12</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rejected Today</p>
                <p className="text-3xl font-bold">2</p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Content */}
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingContent.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <div className="space-y-4">
            {pendingContent.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                        item.type === 'lesson' ? 'bg-blue-100' : 'bg-purple-100'
                      }`}>
                        {item.type === 'lesson' ? (
                          <BookOpen className="h-6 w-6 text-blue-600" />
                        ) : (
                          <FileQuestion className="h-6 w-6 text-purple-600" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{item.title}</h3>
                          <Badge variant="secondary">{item.type}</Badge>
                          <Badge variant="outline">Pending</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Submitted by {item.authorName} on {new Date(item.submittedAt).toLocaleDateString()}
                        </p>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Preview
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Content Preview</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                              <div className="p-4 bg-muted rounded-lg">
                                <h4 className="font-semibold mb-2">{item.title}</h4>
                                <p className="text-muted-foreground">
                                  {item.type === 'lesson' 
                                    ? (item.content as typeof mockLessons[0]).description 
                                    : (item.content as typeof mockQuizzes[0]).description}
                                </p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleReject(item.id)}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleApprove(item.id)}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {pendingContent.length === 0 && (
              <div className="text-center py-12">
                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="text-muted-foreground">All caught up! No pending content to review.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="approved">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-3">
                {mockLessons.slice(0, 3).map((lesson) => (
                  <div key={lesson.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">{lesson.title}</p>
                        <p className="text-sm text-muted-foreground">by {lesson.teacherName}</p>
                      </div>
                    </div>
                    <Badge>Approved</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected">
          <div className="text-center py-12">
            <p className="text-muted-foreground">No rejected content</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
