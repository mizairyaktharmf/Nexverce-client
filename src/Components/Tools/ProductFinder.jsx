import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  GraduationCap,
  Laptop,
  Gamepad2,
  Heart,
  Home,
  Sprout,
  Zap,
  TrendingUp,
  Target,
  DollarSign,
  Clock,
  Shield,
  Headphones,
  Wrench,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Award,
  Filter,
  Star,
  Brain,
  Rocket,
  Info,
  Play,
  Lightbulb
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

export default function ProductFinder() {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({
    category: '',
    problem: '',
    experience: '',
    budget: '',
    priority: [],
    timeframe: '',
    support: '',
    userType: '',
    integration: ''
  });

  // Question 1: What area do you need help with?
  const categories = [
    {
      id: 'marketing',
      icon: Briefcase,
      label: 'Business & Marketing',
      description: 'Grow business, get customers, marketing tools',
      gradient: 'from-orange-500 to-amber-600'
    },
    {
      id: 'education',
      icon: GraduationCap,
      label: 'Learning & Education',
      description: 'Learn skills, courses, certifications',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'technology',
      icon: Laptop,
      label: 'Technology & Software',
      description: 'Productivity tools, software solutions',
      gradient: 'from-purple-500 to-fuchsia-600'
    },
    {
      id: 'lifestyle',
      icon: Gamepad2,
      label: 'Entertainment & Lifestyle',
      description: 'Streaming, gaming, hobbies',
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      id: 'health',
      icon: Heart,
      label: 'Health & Fitness',
      description: 'Fitness tracking, wellness, nutrition',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 'finance',
      icon: DollarSign,
      label: 'Finance & Money',
      description: 'Financial tools, investing, budgeting',
      gradient: 'from-indigo-500 to-blue-600'
    }
  ];

  // Question 2: What specific problem are you trying to solve?
  const problems = {
    marketing: [
      { id: 'get-customers', label: "I need more customers/leads", icon: Target },
      { id: 'marketing', label: "I want to improve my marketing", icon: TrendingUp },
      { id: 'productivity', label: "I need to work more efficiently", icon: Zap },
      { id: 'sales', label: "I want to increase sales", icon: DollarSign }
    ],
    education: [
      { id: 'new-skill', label: "I want to learn a new skill", icon: Sprout },
      { id: 'career-change', label: "I'm changing careers", icon: Target },
      { id: 'certification', label: "I need a certification", icon: Award },
      { id: 'hobby', label: "I want to learn for fun", icon: Gamepad2 }
    ],
    technology: [
      { id: 'productivity', label: "I need productivity tools", icon: Zap },
      { id: 'automation', label: "I want to automate tasks", icon: Target },
      { id: 'collaboration', label: "I need team collaboration tools", icon: Briefcase },
      { id: 'security', label: "I need security/privacy tools", icon: Shield }
    ],
    lifestyle: [
      { id: 'entertainment', label: "I want better entertainment options", icon: Gamepad2 },
      { id: 'streaming', label: "I need streaming services", icon: Laptop },
      { id: 'gaming', label: "I'm looking for gaming solutions", icon: Gamepad2 },
      { id: 'hobbies', label: "I want to explore new hobbies", icon: Sprout }
    ],
    health: [
      { id: 'fitness', label: "I want to get fit", icon: Heart },
      { id: 'tracking', label: "I need health tracking", icon: Target },
      { id: 'nutrition', label: "I want nutrition guidance", icon: Sprout },
      { id: 'wellness', label: "I want overall wellness", icon: Heart }
    ],
    finance: [
      { id: 'investing', label: "I want to start investing", icon: TrendingUp },
      { id: 'budgeting', label: "I need help budgeting", icon: DollarSign },
      { id: 'crypto', label: "I'm interested in crypto", icon: Zap },
      { id: 'financial-planning', label: "I need financial planning", icon: Target }
    ]
  };

  // Question 3: What's your experience level?
  const experienceLevels = [
    {
      id: 'beginner',
      icon: Sprout,
      label: 'Beginner',
      description: "I'm just starting out, need simple guidance",
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      id: 'intermediate',
      icon: TrendingUp,
      label: 'Intermediate',
      description: "I have some experience, ready to level up",
      gradient: 'from-blue-400 to-cyan-500'
    },
    {
      id: 'advanced',
      icon: Award,
      label: 'Advanced',
      description: "I'm experienced, need premium solutions",
      gradient: 'from-purple-400 to-fuchsia-500'
    }
  ];

  // Question 4: What's your budget?
  const budgets = [
    {
      id: 'free',
      icon: Sparkles,
      label: 'Free or Trial',
      description: "$0 - I want free options or trials",
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      id: 'budget',
      icon: DollarSign,
      label: 'Budget-Friendly',
      description: "$0-$50/month or under $100 one-time",
      gradient: 'from-blue-400 to-cyan-500'
    },
    {
      id: 'mid',
      icon: DollarSign,
      label: 'Mid-Range',
      description: "$50-$200/month or $100-$500 one-time",
      gradient: 'from-purple-400 to-fuchsia-500'
    },
    {
      id: 'premium',
      icon: Award,
      label: 'Premium',
      description: "$200+/month or $500+ one-time",
      gradient: 'from-orange-400 to-amber-500'
    }
  ];

  // Question 5: What matters most to you? (Multi-select)
  const priorities = [
    { id: 'ease-of-use', icon: Sparkles, label: 'Ease of Use' },
    { id: 'best-quality', icon: Award, label: 'Best Quality/Results' },
    { id: 'value', icon: DollarSign, label: 'Best Value for Money' },
    { id: 'fast-setup', icon: Zap, label: 'Quick Setup' },
    { id: 'security', icon: Shield, label: 'Security & Privacy' },
    { id: 'support', icon: Headphones, label: 'Great Support' },
    { id: 'customization', icon: Wrench, label: 'Customization' }
  ];

  // Question 6: How soon do you need this?
  const timeframes = [
    {
      id: 'urgent',
      icon: Zap,
      label: 'Immediately',
      description: 'I need a solution right now',
      gradient: 'from-red-400 to-orange-500'
    },
    {
      id: 'soon',
      icon: Clock,
      label: 'Within a week',
      description: 'I need it soon but can wait a bit',
      gradient: 'from-orange-400 to-amber-500'
    },
    {
      id: 'planning',
      icon: Target,
      label: 'Planning ahead',
      description: 'Just researching for future use',
      gradient: 'from-blue-400 to-cyan-500'
    }
  ];

  // Question 7: How important is customer support?
  const supportLevels = [
    {
      id: 'critical',
      icon: Headphones,
      label: 'Very Important',
      description: 'I need reliable support available',
      gradient: 'from-purple-400 to-fuchsia-500'
    },
    {
      id: 'nice-to-have',
      icon: Shield,
      label: 'Nice to Have',
      description: 'Support would be helpful but not critical',
      gradient: 'from-blue-400 to-cyan-500'
    },
    {
      id: 'not-important',
      icon: Zap,
      label: 'Not Important',
      description: 'I can figure things out myself',
      gradient: 'from-green-400 to-emerald-500'
    }
  ];

  // Question 8: What best describes you?
  const userTypes = [
    {
      id: 'individual',
      icon: Sprout,
      label: 'Individual/Personal',
      description: 'Just for me or my personal use',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      id: 'small-business',
      icon: Briefcase,
      label: 'Small Business',
      description: '1-10 people, small team',
      gradient: 'from-blue-400 to-cyan-500'
    },
    {
      id: 'enterprise',
      icon: Award,
      label: 'Medium/Large Business',
      description: '10+ people, need scalability',
      gradient: 'from-purple-400 to-fuchsia-500'
    }
  ];

  // Question 9: Do you need it to integrate with other tools?
  const integrationNeeds = [
    {
      id: 'essential',
      icon: Wrench,
      label: 'Yes, Essential',
      description: 'Must work with my existing tools',
      gradient: 'from-purple-400 to-fuchsia-500'
    },
    {
      id: 'preferred',
      icon: Sparkles,
      label: 'Preferred',
      description: 'Would be nice but not a dealbreaker',
      gradient: 'from-blue-400 to-cyan-500'
    },
    {
      id: 'not-needed',
      icon: Rocket,
      label: 'Not Needed',
      description: "I'll use it standalone",
      gradient: 'from-green-400 to-emerald-500'
    }
  ];

  const questions = [
    {
      title: "What area do you need help with?",
      subtitle: "Let's understand your category first",
      type: 'single',
      options: categories,
      field: 'category'
    },
    {
      title: "What specific problem are you trying to solve?",
      subtitle: "Tell us more about your challenge",
      type: 'single',
      options: answers.category ? problems[answers.category] : [],
      field: 'problem'
    },
    {
      title: "What's your experience level?",
      subtitle: "This helps us match the right complexity",
      type: 'single',
      options: experienceLevels,
      field: 'experience'
    },
    {
      title: "What's your budget range?",
      subtitle: "We'll find solutions within your budget",
      type: 'single',
      options: budgets,
      field: 'budget'
    },
    {
      title: "What matters most to you?",
      subtitle: "Select 2-3 priorities that matter most",
      type: 'multi',
      options: priorities,
      field: 'priority',
      min: 2,
      max: 3
    },
    {
      title: "How soon do you need this solution?",
      subtitle: "This helps us prioritize recommendations",
      type: 'single',
      options: timeframes,
      field: 'timeframe'
    },
    {
      title: "How important is customer support?",
      subtitle: "We're getting close!",
      type: 'single',
      options: supportLevels,
      field: 'support'
    },
    {
      title: "What best describes you?",
      subtitle: "Help us understand your use case",
      type: 'single',
      options: userTypes,
      field: 'userType'
    },
    {
      title: "Do you need it to integrate with other tools?",
      subtitle: "Final question - almost done!",
      type: 'single',
      options: integrationNeeds,
      field: 'integration'
    }
  ];

  const currentQuestion = questions[currentStep];
  const totalSteps = questions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleAnswer = (optionId, field) => {
    if (currentQuestion.type === 'multi') {
      const currentPriorities = answers[field] || [];
      let newPriorities;

      if (currentPriorities.includes(optionId)) {
        newPriorities = currentPriorities.filter(p => p !== optionId);
      } else {
        if (currentPriorities.length < currentQuestion.max) {
          newPriorities = [...currentPriorities, optionId];
        } else {
          return;
        }
      }

      setAnswers({ ...answers, [field]: newPriorities });
    } else {
      setAnswers({ ...answers, [field]: optionId });

      setTimeout(() => {
        handleNext();
      }, 300);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      fetchRecommendations();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStartQuiz = () => {
    setShowWelcome(false);
  };

  const handleRetake = () => {
    setCurrentStep(0);
    setShowResults(false);
    setShowWelcome(true);
    setAnswers({
      category: '',
      problem: '',
      experience: '',
      budget: '',
      priority: [],
      timeframe: '',
      support: ''
    });
  };

  const canProceed = () => {
    const field = currentQuestion.field;
    if (currentQuestion.type === 'multi') {
      return answers[field] && answers[field].length >= currentQuestion.min;
    }
    return answers[field] !== '';
  };

  // Fetch real recommendations from database
  const fetchRecommendations = async () => {
    setIsProcessing(true);
    setLoading(true);

    try {
      const API_BASE = import.meta.env.MODE === "development"
        ? "http://localhost:5000/api"
        : "https://nexverce-backend.onrender.com/api";

      const response = await fetch(`${API_BASE}/products/quiz-match`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers)
      });

      const data = await response.json();

      if (data.success) {
        setRecommendations(data.posts || []);
      } else {
        console.error('Error fetching recommendations:', data.message);
        setRecommendations([]);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setRecommendations([]);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setIsProcessing(false);
        setShowResults(true);
      }, 2000);
    }
  };

  // Welcome Screen
  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-fuchsia-900 pt-20 pb-32">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-fuchsia-500 rounded-full blur-2xl opacity-60 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-600 p-6 rounded-full">
                  <Brain className="h-16 w-16 text-white" strokeWidth={2} />
                </div>
              </div>
            </div>

            <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white border-0 px-6 py-2 text-base">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered Solution Finder
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Find YOUR Perfect{' '}
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Solution
              </span>
              {' '}in 2 Minutes
            </h1>

            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              Answer 7 quick questions and get personalized product recommendations powered by smart matching technology
            </p>

            <Button
              size="lg"
              onClick={handleStartQuiz}
              className="bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:from-purple-600 hover:to-fuchsia-700 text-white font-bold text-lg px-12 py-6 shadow-2xl hover:shadow-3xl transition-all duration-300 group"
            >
              <Play className="mr-3 h-6 w-6" />
              Start Solution Quiz
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 mb-16">
          <Card className="border-2 border-purple-200 shadow-2xl bg-white">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  How Our Solution Finder Works
                </h2>
                <p className="text-lg text-gray-600">
                  Smart technology that understands YOUR needs and finds perfect matches
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 mb-4">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">1. Answer Questions</h3>
                  <p className="text-gray-600">
                    Tell us about your needs, budget, experience level, and priorities in just 7 simple questions
                  </p>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-600 mb-4">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">2. Smart Matching</h3>
                  <p className="text-gray-600">
                    Our algorithm analyzes your answers and matches them with tagged solutions in our database
                  </p>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 mb-4">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">3. Get Recommendations</h3>
                  <p className="text-gray-600">
                    Receive personalized product recommendations ranked by match score with honest pros & cons
                  </p>
                </div>
              </div>

              {/* Future Vision */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 border-2 border-purple-200">
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-600 flex-shrink-0">
                    <Rocket className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-purple-600" />
                      Coming Soon: AI-Powered Automation
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Nexverce is building advanced AI technology that will automatically analyze millions of products,
                      read reviews, compare features, and provide even smarter recommendations. Our future system will
                      learn from user feedback and continuously improve matching accuracy. Stay tuned for the next generation
                      of product discovery!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Guide */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Quick Guide
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-gray-200 hover:border-purple-300 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-green-100 flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Be Honest About Your Needs</h3>
                    <p className="text-gray-600 text-sm">
                      The more accurate your answers, the better our recommendations will be
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 hover:border-purple-300 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 flex-shrink-0">
                    <Info className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Take Your Time</h3>
                    <p className="text-gray-600 text-sm">
                      No rush! You can go back and change answers anytime during the quiz
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 hover:border-purple-300 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 flex-shrink-0">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Focus on Priorities</h3>
                    <p className="text-gray-600 text-sm">
                      Choose what truly matters to you - we'll find solutions that match YOUR values
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 hover:border-purple-300 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100 flex-shrink-0">
                    <Star className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Review All Matches</h3>
                    <p className="text-gray-600 text-sm">
                      Check multiple recommendations - sometimes the 2nd or 3rd match is perfect for you
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Processing Screen
  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full blur-2xl opacity-40 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-purple-500 to-blue-600 p-8 rounded-full">
              <Brain className="h-16 w-16 text-white animate-spin" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Analyzing YOUR Needs...
          </h2>
          <div className="space-y-2 text-gray-600">
            <p className="animate-pulse">Matching your preferences...</p>
            <p className="animate-pulse animation-delay-500">Calculating compatibility scores...</p>
            <p className="animate-pulse animation-delay-1000">Finding perfect solutions...</p>
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 px-6 py-2">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Analysis Complete!
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              YOUR Perfect{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Solutions
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {recommendations.length > 0
                ? `Based on your answers, we found ${recommendations.length} solutions that match your needs`
                : "No exact matches found, but we have similar recommendations for you"}
            </p>
          </div>

          {/* Your Profile Summary */}
          <Card className="mb-8 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-600" />
                Based on Your Needs:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-semibold text-gray-900 capitalize">{answers.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Experience</p>
                  <p className="font-semibold text-gray-900 capitalize">{answers.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Budget</p>
                  <p className="font-semibold text-gray-900 capitalize">{answers.budget.replace('-', ' ')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Top Priority</p>
                  <p className="font-semibold text-gray-900 capitalize">{answers.priority[0]?.replace('-', ' ')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          {recommendations.length > 0 ? (
            <div className="space-y-6 mb-8">
              {recommendations.map((product, index) => (
                <Card key={product._id} className="border-2 border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Image */}
                      {product.image && (
                        <div className="md:w-48 h-48 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge className={`${index === 0 ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-blue-500 to-cyan-600'} text-white border-0`}>
                                {product.matchScore || 90 - (index * 5)}% Match
                              </Badge>
                              {index === 0 && (
                                <Badge className="bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white border-0">
                                  <Star className="h-3 w-3 mr-1" />
                                  Top Pick
                                </Badge>
                              )}
                              <Badge variant="outline" className="capitalize">
                                {product.category}
                              </Badge>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h3>
                            <p className="text-gray-600 line-clamp-2">{product.excerpt}</p>
                          </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-4">
                          <Button
                            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                            onClick={() => navigate(`/post/${product._id}`)}
                          >
                            View Full Review
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                          {product.affiliateLink && (
                            <Button
                              variant="outline"
                              className="flex-1 border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
                              onClick={() => window.open(product.affiliateLink, '_blank')}
                            >
                              Check It Out
                              <Sparkles className="ml-2 h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Info className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No exact matches found</h3>
              <p className="text-gray-600 mb-6">
                Try retaking the quiz with different answers, or browse our solutions category
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={handleRetake}>
                  Retake Quiz
                </Button>
                <Button onClick={() => navigate('/solutions')}>
                  Browse Solutions
                </Button>
              </div>
            </Card>
          )}

          {/* Bottom Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="outline"
              onClick={handleRetake}
              className="border-2"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Retake Quiz
            </Button>
            <Button
              size="lg"
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              Back to Home
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-6">
          <Badge className="mb-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 px-4 py-2">
            <Sparkles className="h-4 w-4 mr-2" />
            Solution Quiz
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Find YOUR Perfect Solution
          </h1>
          <p className="text-gray-600 text-lg">
            Step {currentStep + 1} of {totalSteps}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="border-2 border-purple-200 shadow-xl mb-6">
          <CardContent className="p-6 md:p-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {currentQuestion.title}
              </h2>
              <p className="text-base md:text-lg text-gray-600">{currentQuestion.subtitle}</p>
            </div>

            {/* Options */}
            <div className={`grid gap-5 ${currentQuestion.type === 'multi' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
              {currentQuestion.options.map((option) => {
                const Icon = option.icon;
                const isSelected = currentQuestion.type === 'multi'
                  ? answers[currentQuestion.field]?.includes(option.id)
                  : answers[currentQuestion.field] === option.id;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(option.id, currentQuestion.field)}
                    className={`
                      relative p-5 rounded-xl border-2 transition-all duration-300 text-left hover:scale-102 transform group
                      ${isSelected
                        ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 shadow-lg ring-2 ring-purple-200'
                        : 'border-gray-200 hover:border-purple-300 hover:shadow-md bg-white'
                      }
                    `}
                  >
                    {isSelected && (
                      <div className="absolute top-3 right-3">
                        <div className="bg-purple-600 rounded-full p-0.5">
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    )}

                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${option.gradient || 'from-purple-500 to-blue-600'} mb-3 shadow-md group-hover:shadow-lg transition-shadow`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    <h3 className="font-bold text-base text-gray-900 mb-1.5">{option.label}</h3>
                    {option.description && (
                      <p className="text-xs text-gray-600 leading-relaxed">{option.description}</p>
                    )}
                  </button>
                );
              })}
            </div>

            {currentQuestion.type === 'multi' && (
              <div className="text-center mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-sm text-gray-700 font-medium">
                  Selected: <span className="text-purple-600 font-bold">{answers[currentQuestion.field]?.length || 0}</span> / {currentQuestion.max}
                  {answers[currentQuestion.field]?.length < currentQuestion.min && (
                    <span className="text-orange-600 ml-2 font-normal">(Select at least {currentQuestion.min})</span>
                  )}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex gap-4 justify-between items-center">
          {currentStep > 0 ? (
            <Button
              variant="outline"
              size="lg"
              onClick={handleBack}
              className="border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          ) : (
            <div></div>
          )}

          {currentQuestion.type === 'multi' && (
            <Button
              size="lg"
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
            >
              {currentStep === totalSteps - 1 ? 'See Results' : 'Next Question'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
