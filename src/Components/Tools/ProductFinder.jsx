import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronRight, ChevronLeft, CheckCircle2, Target } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function ProductFinder() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const questions = [
    {
      id: "category",
      question: "What type of product are you looking for?",
      options: [
        { value: "technology", label: "Technology & Gadgets", icon: "💻" },
        { value: "health", label: "Health & Wellness", icon: "💪" },
        { value: "finance", label: "Finance & Business", icon: "💰" },
        { value: "education", label: "Education & Learning", icon: "📚" },
        { value: "marketing", label: "Marketing & Tools", icon: "📊" },
        { value: "lifestyle", label: "Lifestyle & Home", icon: "🏠" }
      ]
    },
    {
      id: "budget",
      question: "What's your budget range?",
      options: [
        { value: "0-50", label: "Under $50", icon: "💵" },
        { value: "50-100", label: "$50 - $100", icon: "💵💵" },
        { value: "100-300", label: "$100 - $300", icon: "💵💵💵" },
        { value: "300-500", label: "$300 - $500", icon: "💰" },
        { value: "500+", label: "Above $500", icon: "💰💰" }
      ]
    },
    {
      id: "experience",
      question: "What's your experience level?",
      options: [
        { value: "beginner", label: "Beginner", icon: "🌱" },
        { value: "intermediate", label: "Intermediate", icon: "🌿" },
        { value: "advanced", label: "Advanced", icon: "🌳" },
        { value: "expert", label: "Expert/Professional", icon: "🏆" }
      ]
    },
    {
      id: "priority",
      question: "What matters most to you?",
      options: [
        { value: "price", label: "Best Price", icon: "💰" },
        { value: "quality", label: "Top Quality", icon: "⭐" },
        { value: "features", label: "Most Features", icon: "🎯" },
        { value: "ease", label: "Ease of Use", icon: "✨" },
        { value: "support", label: "Customer Support", icon: "🤝" }
      ]
    }
  ];

  const handleAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      findRecommendations({ ...answers, [questionId]: value });
    }
  };

  const findRecommendations = async (userAnswers) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userAnswers)
      });
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error("Error finding recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  const restart = () => {
    setStep(1);
    setAnswers({});
    setRecommendations([]);
  };

  const currentQuestion = questions[step - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-full">
              <Target className="h-12 w-12 text-white" />
            </div>
          </div>
          <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-blue-600 text-white border-0 px-6 py-2 text-base">
            Product Finder Quiz
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Find Your <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Perfect Product</span>
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto">
            Answer a few quick questions and we'll recommend the best products for your needs
          </p>
        </div>
      </section>

      {/* Quiz Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {recommendations.length === 0 ? (
          <Card className="border-2 border-purple-100 shadow-xl">
            <CardHeader>
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Question {step} of {questions.length}
                  </span>
                  <span className="text-sm font-medium text-primary">
                    {Math.round((step / questions.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(step / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              <CardTitle className="text-3xl font-bold text-center mb-2">
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(currentQuestion.id, option.value)}
                    className="p-6 border-2 border-gray-200 rounded-xl hover:border-primary hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{option.icon}</span>
                      <div className="flex-grow">
                        <p className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {option.label}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => setStep(Math.max(1, step - 1))}
                  disabled={step === 1}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button variant="outline" onClick={restart}>
                  Start Over
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div>
            {/* Results */}
            <div className="text-center mb-12">
              <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Perfect Matches Found!</h2>
              <p className="text-gray-600">Based on your preferences, here are our top recommendations</p>
              <Button onClick={restart} variant="outline" className="mt-4">
                Start New Search
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.map((product, index) => (
                <Card key={product._id} className="group hover:shadow-2xl transition-all border-2 border-gray-100">
                  {index === 0 && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold">
                      Best Match
                    </Badge>
                  )}
                  {product.image && (
                    <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {product.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-bold text-primary">${product.price}</span>
                      <Badge variant="secondary">Match: {product.matchScore}%</Badge>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      onClick={() => navigate(`/post/${product._id}`)}
                    >
                      View Product
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
