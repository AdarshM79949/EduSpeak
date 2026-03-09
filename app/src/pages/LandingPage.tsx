import { Link } from 'react-router-dom';
import BlurText from '@/components/react-bits/TextAnimations/BlurText/BlurText';
import ShinyText from '@/components/react-bits/TextAnimations/ShinyText/ShinyText';
import GradientText from '@/components/react-bits/TextAnimations/GradientText/GradientText';
import Waves from '@/components/react-bits/Backgrounds/Waves/Waves';
import DecryptedText from '@/components/react-bits/TextAnimations/DecryptedText/DecryptedText';
import CountUp from '@/components/react-bits/TextAnimations/CountUp/CountUp';
import SpotlightCard from '@/components/react-bits/Components/SpotlightCard/SpotlightCard';
import {
  BookOpen,
  Mic,
  ClipboardCheck,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Users,
  Play,
  Award,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: BookOpen,
    title: 'Interactive Lessons',
    description: 'Access structured English lessons with video, audio, and text content organized by skill level.',
  },
  {
    icon: Mic,
    title: 'Speaking Practice',
    description: 'Practice pronunciation with AI-powered speech recognition and instant feedback.',
  },
  {
    icon: ClipboardCheck,
    title: 'Smart Assessments',
    description: 'Take timed quizzes with multiple question types and receive detailed performance analysis.',
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    description: 'Monitor your learning journey with detailed analytics and achievement streaks.',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Sign Up',
    description: 'Create your account and select your English proficiency level.',
  },
  {
    step: '02',
    title: 'Learn',
    description: 'Access lessons, practice speaking, and take quizzes at your own pace.',
  },
  {
    step: '03',
    title: 'Track Progress',
    description: 'View detailed reports on your improvement and celebrate achievements.',
  },
];

const statsList = [
  { value: 10, suffix: 'K+', label: 'Active Students', duration: 2 },
  { value: 500, suffix: '+', label: 'Video Lessons', duration: 1.5 },
  { value: 50, suffix: '+', label: 'Expert Teachers', duration: 1 },
  { value: 95, suffix: '%', label: 'Success Rate', duration: 1.2 },
];

export default function LandingPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <Waves
            lineColor="rgba(0, 0, 0, 0.1)"
            backgroundColor="transparent"
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
            friction={0.9}
            tension={0.01}
            maxCursorMove={120}
            xGap={12}
            yGap={36}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10 pointer-events-none z-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Award className="h-4 w-4" />
                <GradientText
                  colors={['#10b981', '#3b82f6', '#8b5cf6', '#10b981']}
                  animationSpeed={5}
                  showBorder={false}
                >
                  Trusted by 10,000+ learners worldwide
                </GradientText>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <BlurText
                  text="Master English with AI-Powered Learning"
                  delay={50}
                  animateBy="words"
                  direction="top"
                />
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                <ShinyText
                  text="EduSpeak combines interactive lessons, speech recognition technology, and personalized feedback to help you achieve fluency faster than ever before."
                  disabled={false}
                  speed={3}
                />
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button size="lg" className="group">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline">
                    <Play className="mr-2 h-4 w-4" />
                    Watch Demo
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                  Free to start
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                  No credit card required
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
                  alt="Students learning"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <Mic className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Speaking Score</p>
                        <p className="text-2xl font-bold text-primary">92%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 animate-bounce">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4">
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsList.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="flex justify-center items-center text-4xl font-bold text-primary">
                  <CountUp to={stat.value} duration={stat.duration} className="inline-block" />
                  <span>{stat.suffix}</span>
                </p>
                <p className="text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">
              <DecryptedText
                text="Everything You Need to Master English"
                speed={40}
                animateOn="view"
                revealDirection="center"
              />
            </h2>
            <p className="text-muted-foreground text-lg">
              Our comprehensive platform addresses all aspects of language learning with
              cutting-edge technology and proven teaching methods.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <SpotlightCard key={index} className="group hover:shadow-lg transition-shadow bg-card p-0" spotlightColor="rgba(14, 165, 233, 0.15)">
                <div className="p-6">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    <feature.icon className="h-6 w-6 text-primary group-hover:text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">How EduSpeak Works</h2>
            <p className="text-muted-foreground text-lg">
              Start your English learning journey in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-primary/10 absolute -top-4 -left-2">
                  {item.step}
                </div>
                <div className="relative pt-8">
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-muted-foreground/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=500&fit=crop"
                alt="Online learning"
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">About the Project</h2>
              <p className="text-muted-foreground">
                EduSpeak is developed as part of a systematic literature review on enhancing
                online English teaching, conducted by Computer Science & Engineering students
                at MGM Technological Campus under the guidance of Ramseena.
              </p>
              <p className="text-muted-foreground">
                Our research identified five core challenges in online English education:
                lack of interaction, technical barriers, difficulty teaching language skills,
                limited engagement, and assessment issues. EduSpeak directly addresses each
                of these problems with innovative solutions.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Research-Based</p>
                    <p className="text-sm text-muted-foreground">Built on academic findings</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">AI-Powered</p>
                    <p className="text-sm text-muted-foreground">Speech recognition tech</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Personalized</p>
                    <p className="text-sm text-muted-foreground">Adaptive learning paths</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Collaborative</p>
                    <p className="text-sm text-muted-foreground">Teacher-student interaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your English Journey?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8">
            Join thousands of learners who have transformed their English skills with EduSpeak.
            Sign up today and get your first week free!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="group">
                Create Free Account
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Already have an account?
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">EduSpeak</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Transforming online English education through innovative technology and research-backed methods.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground">Features</a></li>
                <li><a href="#" className="hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground">For Teachers</a></li>
                <li><a href="#" className="hover:text-foreground">For Schools</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Community</a></li>
                <li><a href="#" className="hover:text-foreground">API Docs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Team</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Fathima Fidha VK</li>
                <li>Muhammed Ansil VN</li>
                <li>Nandana</li>
                <li>Muhammed Sahal</li>
              </ul>
              <p className="text-xs text-muted-foreground mt-4">
                MGM Technological Campus<br />
                Department of CSE - KTU<br />
                Guide: Ramseena
              </p>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 EduSpeak. All rights reserved. Built with passion at MGM Technological Campus.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
