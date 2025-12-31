import { CheckCircle, Scale, Tag, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";

function WhyChoose() {
  const features = [
    {
      icon: CheckCircle,
      title: "Problem-First Approach",
      desc: "We start with YOUR problem, not products. Get educated first, then see solutions that actually fit your situation.",
      gradient: "from-green-400 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      icon: Scale,
      title: "Honest Guidance",
      desc: "We tell you who it's for AND who it's NOT for. No hype, no pressure — just clarity so you can decide with confidence.",
      gradient: "from-blue-400 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50"
    },
    {
      icon: Tag,
      title: "Solution Intelligence",
      desc: "Get personalized recommendations based on your needs, not just what pays us the most. Your trust is our priority.",
      gradient: "from-purple-400 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50"
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="premium" className="mb-4">
            <Sparkles className="h-3 w-3 mr-1" />
            The Nexverce Difference
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            We're Not Sellers. We're <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Guides</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Confused about choices? Nexverce brings clarity, not commissions. We help you solve problems, not just buy products.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                className="shadow-xl hover:shadow-2xl transition-all duration-500 group border-2 border-gray-100 hover:border-primary bg-white hover:-translate-y-2"
              >
                <CardContent className="p-8 text-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${item.bgGradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                  <div className="mt-6 h-1 w-16 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Testimonial + CTA Section */}
        <div className="max-w-3xl mx-auto">
          {/* Honest Message */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-purple-100 mb-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-gray-700 italic leading-relaxed mb-3">
                  "We're tired of platforms that only care about commissions. Nexverce was built to actually help you — to guide you from confusion to clarity to the right solution. No hype, no pressure, just honest guidance."
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                    N
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Nexverce Team</p>
                    <p className="text-xs text-gray-500">Building something better</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="inline-block p-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-2 border-primary/20 shadow-lg">
              <p className="text-gray-700 mb-4 font-medium">Ready to find YOUR solution?</p>
              <Link to="/product-finder">
                <Button variant="premium" size="lg" className="group shadow-lg hover:shadow-xl">
                  Take the Solution Quiz
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default WhyChoose;
