import { useNavigate } from "react-router-dom";
import { Target, Scale, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function HomeToolsSection() {
  const navigate = useNavigate();

  const tools = [
    {
      icon: Target,
      title: "Product Finder Quiz",
      description: "Answer 4 quick questions and get personalized product recommendations based on your needs, budget, and experience level.",
      color: "from-purple-500 to-blue-500",
      bgColor: "from-purple-50 to-blue-50",
      path: "/product-finder",
      features: ["4-step interactive quiz", "AI-powered recommendations", "Personalized match scores"]
    },
    {
      icon: Scale,
      title: "Product Comparison",
      description: "Compare up to 4 products side-by-side with detailed feature breakdowns, pricing, and specifications to make the best choice.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      path: "/compare",
      features: ["Compare up to 4 products", "Side-by-side analysis", "Feature comparison tables"]
    },
    {
      icon: BookOpen,
      title: "Buying Guides",
      description: "Expert-written guides covering how to choose the perfect product in every category with detailed comparisons and insights.",
      color: "from-cyan-500 to-teal-500",
      bgColor: "from-cyan-50 to-teal-50",
      path: "/buying-guides",
      features: ["Expert reviews", "In-depth research", "Category-specific guides"]
    },
    {
      icon: Sparkles,
      title: "Hot Deals",
      description: "Discover exclusive deals and limited-time offers with up to 70% off on top products across all categories.",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50",
      path: "/deals",
      features: ["Up to 70% off", "Expiring soon alerts", "Best deals curated"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-full">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Smart Tools to Help You <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Choose Better</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Use our intelligent tools to find exactly what you need, compare options, and make informed decisions
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-200 overflow-hidden flex flex-col h-full">
                <div className={`h-2 bg-gradient-to-r ${tool.color}`}></div>

                <CardHeader className="relative flex-grow">
                  <div className={`absolute -top-6 right-6 w-16 h-16 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold pt-6 group-hover:text-primary transition-colors">
                    {tool.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed pt-2">
                    {tool.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="mt-auto">
                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {tool.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${tool.color}`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    onClick={() => navigate(tool.path)}
                    className={`w-full bg-gradient-to-r ${tool.color} hover:opacity-90 text-white font-bold text-base py-6 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl`}
                  >
                    Try It Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 md:p-12 shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Need More Help Finding Products?
            </h3>
            <p className="text-purple-100 text-lg mb-6 max-w-2xl mx-auto">
              Explore more powerful tools to enhance your shopping experience
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => navigate("/calculator")}
                variant="outline"
                className="bg-white text-purple-600 hover:bg-purple-50 border-2 border-white font-bold"
              >
                🧮 Price Calculator
              </Button>
              <Button
                onClick={() => navigate("/dashboard")}
                variant="outline"
                className="bg-white text-purple-600 hover:bg-purple-50 border-2 border-white font-bold"
              >
                👤 My Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
