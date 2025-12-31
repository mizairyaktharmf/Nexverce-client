import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Grid3x3,
  GraduationCap,
  DollarSign,
  Laptop,
  Heart,
  TrendingUp,
  Gamepad2
} from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

// ✅ Solution Domains data with Lucide React icons
const categoriesData = [
  {
    title: "Learning Solutions",
    value: "Education",
    description:
      "Find the right courses, platforms, and tools that match YOUR learning goals and style.",
    icon: GraduationCap,
    slug: "education",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Money Solutions",
    value: "Finance",
    description:
      "Build YOUR financial future with investing, budgeting, and income tools that fit your situation.",
    icon: DollarSign,
    slug: "finance",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    title: "Productivity Solutions",
    value: "Technology",
    description:
      "Optimize YOUR workflow with tech and software solutions designed for your needs.",
    icon: Laptop,
    slug: "technology",
    gradient: "from-purple-500 to-indigo-500"
  },
  {
    title: "Health Solutions",
    value: "Health",
    description:
      "Find wellness, fitness, and health solutions that work for YOUR body and lifestyle.",
    icon: Heart,
    slug: "health",
    gradient: "from-red-500 to-pink-500"
  },
  {
    title: "Business Solutions",
    value: "Marketing",
    description:
      "Scale YOUR business with marketing, automation, and growth tools that match your goals.",
    icon: TrendingUp,
    slug: "marketing",
    gradient: "from-orange-500 to-amber-500"
  },
  {
    title: "Lifestyle Solutions",
    value: "Lifestyle",
    description:
      "Enhance YOUR quality of life with entertainment, hobbies, and personal development solutions.",
    icon: Gamepad2,
    slug: "lifestyle",
    gradient: "from-violet-500 to-purple-500"
  },
];

function Categories() {
  const navigate = useNavigate();

  const handleCategoryClick = (slug) => {
    // All categories now have dedicated landing pages
    navigate(`/${slug}`);
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="premium" className="mb-4">
            <Grid3x3 className="h-3 w-3 mr-1" />
            Solution Domains
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">YOUR Solution</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Whatever your challenge, we have a solution path designed for <strong className="text-primary">YOU</strong>.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoriesData.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group border-2 border-gray-100 hover:border-primary bg-white hover:-translate-y-2"
                onClick={() => handleCategoryClick(category.slug)}
              >
                {/* Icon Section with Gradient Background */}
                <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${category.gradient} flex items-center justify-center`}>
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>

                  {/* Icon */}
                  <div className="relative z-10 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <IconComponent className="h-24 w-24 text-white drop-shadow-2xl" strokeWidth={1.5} />
                  </div>

                  {/* Category Badge */}
                  <Badge className="absolute top-4 right-4 shadow-lg bg-white text-gray-900 font-semibold border-0">
                    {category.value}
                  </Badge>

                  {/* Hover Overlay with Button */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <Button variant="secondary" size="sm" className="shadow-lg bg-white/95 backdrop-blur-sm hover:bg-white">
                      View All
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <CardHeader className="p-6">
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors flex items-center justify-between mb-2">
                    {category.title}
                    <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-2 transition-transform" />
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed text-gray-600">
                    {category.description}
                  </CardDescription>

                  {/* Decorative Bottom Border */}
                  <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full transition-all duration-500"></div>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-purple-50 to-blue-50 rounded-full border border-primary/20">
            <Sparkles className="h-5 w-5 text-primary" />
            <p className="text-gray-700 font-medium">Can't find what you're looking for?</p>
            <Button variant="link" className="text-primary font-semibold p-0 h-auto" onClick={() => navigate('/contact')}>
              Contact Us <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Categories;
