import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Volume2, 
  Maximize, 
  CheckCircle2, 
  Bookmark,
  ChevronLeft,
  ChevronRight,
  FileText,
  Headphones,
  Video,
  PenLine
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { mockLessons } from '@/data/mockData';
import { toast } from 'sonner';

export default function LessonPlayer() {
  const { id } = useParams<{ id: string }>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress] = useState(0);
  const [notes, setNotes] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const lesson = mockLessons.find(l => l.id === id) || mockLessons[0];

  const handleComplete = () => {
    setIsCompleted(true);
    toast.success('Lesson completed! Great job!');
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'audio':
        return <Headphones className="h-5 w-5" />;
      case 'pdf':
        return <FileText className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link to="/student/lessons">
          <Button variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Lessons
          </Button>
        </Link>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleBookmark}
          >
            <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-primary' : ''}`} />
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </Button>
          <Button 
            variant={isCompleted ? 'default' : 'outline'} 
            size="sm"
            onClick={handleComplete}
            disabled={isCompleted}
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            {isCompleted ? 'Completed' : 'Mark Complete'}
          </Button>
        </div>
      </div>

      {/* Lesson Header */}
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <Badge variant="secondary">{lesson.category}</Badge>
          <Badge variant="outline">{lesson.difficulty}</Badge>
        </div>
        <h1 className="text-3xl font-bold">{lesson.title}</h1>
        <p className="text-muted-foreground mt-1">{lesson.description}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Media Player */}
          <Card>
            <CardContent className="p-0">
              {lesson.type === 'video' ? (
                <div className="aspect-video bg-black rounded-t-lg relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="h-8 w-8 text-white" />
                      ) : (
                        <Play className="h-8 w-8 text-white ml-1" />
                      )}
                    </button>
                  </div>
                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <Progress value={progress} className="h-1 mb-2" />
                    <div className="flex items-center justify-between text-white text-sm">
                      <div className="flex items-center space-x-4">
                        <button onClick={() => setIsPlaying(!isPlaying)}>
                          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </button>
                        <span>0:00 / {lesson.duration}:00</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Volume2 className="h-5 w-5" />
                        <Maximize className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : lesson.type === 'audio' ? (
                <div className="p-8 bg-gradient-to-br from-primary/10 to-primary/5">
                  <div className="flex items-center justify-center mb-6">
                    <div className="h-32 w-32 bg-primary/20 rounded-full flex items-center justify-center">
                      <Headphones className="h-16 w-16 text-primary" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <Button variant="outline" size="icon">
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button size="lg" className="rounded-full h-14 w-14" onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                    </Button>
                    <Button variant="outline" size="icon">
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                  <Progress value={progress} className="mt-6" />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>0:00</span>
                    <span>{lesson.duration}:00</span>
                  </div>
                </div>
              ) : (
                <div className="p-8 min-h-[400px] bg-muted">
                  <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm">
                    <div className="flex items-center justify-center mb-6">
                      <FileText className="h-16 w-16 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-4">Lesson Content</h3>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-muted-foreground leading-relaxed">
                        This is a sample lesson content. In a real implementation, this would contain 
                        the actual lesson material, including explanations, examples, and exercises 
                        for students to practice their English skills.
                      </p>
                      <p className="text-muted-foreground leading-relaxed mt-4">
                        The content is designed to help you improve your {lesson.category} skills 
                        at the {lesson.difficulty} level. Take your time to read through the material 
                        and complete any exercises provided.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Lesson Navigation */}
          <div className="flex justify-between">
            <Button variant="outline">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous Lesson
            </Button>
            <Button variant="outline">
              Next Lesson
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Tabs defaultValue="notes">
            <TabsList className="w-full">
              <TabsTrigger value="notes" className="flex-1">
                <PenLine className="h-4 w-4 mr-2" />
                Notes
              </TabsTrigger>
              <TabsTrigger value="vocabulary" className="flex-1">
                <FileText className="h-4 w-4 mr-2" />
                Vocab
              </TabsTrigger>
            </TabsList>
            <TabsContent value="notes">
              <Card>
                <CardContent className="p-4">
                  <Textarea
                    placeholder="Take notes while learning..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[200px] resize-none"
                  />
                  <Button className="w-full mt-4" variant="outline">
                    Save Notes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="vocabulary">
              <Card>
                <CardContent className="p-4">
                  {lesson.vocabulary && lesson.vocabulary.length > 0 ? (
                    <div className="space-y-4">
                      {lesson.vocabulary.map((item, index) => (
                        <div key={index} className="border-b pb-3 last:border-0">
                          <p className="font-semibold">{item.word}</p>
                          <p className="text-sm text-muted-foreground">{item.definition}</p>
                          <p className="text-sm italic mt-1">&quot;{item.example}&quot;</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No vocabulary for this lesson</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Lesson Info */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-4">Lesson Info</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="flex items-center">
                    {getTypeIcon(lesson.type)}
                    <span className="ml-2 capitalize">{lesson.type}</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span>{lesson.duration} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Instructor</span>
                  <span>{lesson.teacherName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="capitalize">{lesson.category}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
