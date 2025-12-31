import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Users,
  Sparkles,
  Construction,
  MessageSquare,
  Zap,
  Flame,
  BookOpen,
  Scale,
  Calculator,
  Star
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export default function ComingSoon() {
  const { feature } = useParams();
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    // Simulate current visitors (in production, this would come from backend)
    setVisitorCount(Math.floor(Math.random() * 50) + 150);
  }, []);

  // Feature configuration
  const features = {
    deals: {
      icon: Flame,
      title: "Hot Deals",
      description: "Exclusive deals and discounts on products you love",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50"
    },
    "buying-guides": {
      icon: BookOpen,
      title: "Buying Guides",
      description: "Expert guides to help you make informed purchase decisions",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50"
    },
    compare: {
      icon: Scale,
      title: "Compare Products",
      description: "Side-by-side comparisons to find the perfect match",
      color: "from-purple-500 to-indigo-500",
      bgColor: "from-purple-50 to-indigo-50"
    },
    calculator: {
      icon: Calculator,
      title: "Calculator",
      description: "Smart calculators for budgeting and decision making",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50"
    },
    community: {
      icon: MessageSquare,
      title: "Community Forum",
      description: "Connect, ask questions, and share experiences",
      color: "from-purple-500 to-blue-500",
      bgColor: "from-purple-50 to-blue-50"
    },
    reviews: {
      icon: Star,
      title: "User Reviews",
      description: "Honest reviews from real users like you",
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50"
    }
  };

  const currentFeature = features[feature] || features.community;
  const FeatureIcon = currentFeature.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${currentFeature.color} rounded-full blur-2xl opacity-60 animate-pulse`}></div>
                <div className={`relative bg-gradient-to-r ${currentFeature.color} p-6 rounded-full shadow-2xl`}>
                  <FeatureIcon className="h-16 w-16 text-white" strokeWidth={2} />
                </div>
              </div>
            </div>

            {/* Badge */}
            <Badge className={`mb-6 bg-gradient-to-r ${currentFeature.color} text-white border-0 px-6 py-3 text-base shadow-lg`}>
              {currentFeature.title}
            </Badge>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              {currentFeature.title}{" "}
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Coming Soon
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto mb-12 leading-relaxed">
              {currentFeature.description}
            </p>

            {/* Current Visitors - Real Counter */}
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-lg">
              <Users className="h-6 w-6 text-purple-300" />
              <div className="text-left">
                <p className="text-sm text-purple-200 font-medium">Visitors Right Now</p>
                <p className="text-2xl font-bold text-white">{visitorCount}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work in Progress Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Construction Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full blur-xl opacity-40 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-orange-500 to-amber-500 p-6 rounded-full shadow-xl">
                <Construction className="h-16 w-16 text-white" strokeWidth={2} />
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <Badge className="mb-6 bg-gradient-to-r from-orange-500 to-amber-600 text-white border-0 px-6 py-3 text-base shadow-lg">
            <Sparkles className="h-4 w-4 mr-2" />
            Under Construction
          </Badge>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            We're Building{" "}
            <span className={`bg-gradient-to-r ${currentFeature.color} bg-clip-text text-transparent`}>
              {currentFeature.title}
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            We're actively developing this feature to provide you with the best experience.
            Stay tuned for updates!
          </p>

          {/* What We're Building */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="border-2 border-purple-100 hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${currentFeature.color} flex items-center justify-center mx-auto mb-4`}>
                  <FeatureIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">User-Focused</h3>
                <p className="text-gray-600 text-sm">Built with YOUR needs in mind</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-100 hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Modern Design</h3>
                <p className="text-gray-600 text-sm">Beautiful and intuitive interface</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-100 hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Fast & Reliable</h3>
                <p className="text-gray-600 text-sm">Quick responses, zero lag</p>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className={`bg-gradient-to-r ${currentFeature.bgColor} rounded-2xl p-8 border-2 border-purple-100`}>
            <p className="text-gray-700 mb-6 text-lg font-medium">
              In the meantime, join our Telegram community to stay updated!
            </p>
            <Button
              onClick={() => window.open("https://t.me/nexverce", "_blank")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-xl"
            >
              <Users className="mr-2 h-5 w-5" />
              Join Telegram Community
            </Button>
          </div>
        </div>
      </section>

      {/* Progress Info */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Construction className="h-12 w-12 text-white mx-auto mb-6" />
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Development in Progress
          </h3>
          <p className="text-purple-100 text-lg max-w-2xl mx-auto leading-relaxed">
            Our team is working hard to bring you this feature. We're building it with care to ensure
            it meets YOUR needs and exceeds YOUR expectations. Check back soon!
          </p>
        </div>
      </section>
    </div>
  );
}
