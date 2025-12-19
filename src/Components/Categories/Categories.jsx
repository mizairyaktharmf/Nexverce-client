import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Grid3x3 } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

// ✅ Local category images chedck
import education from "../../../src/assets/education.png";
import finance from "../../../src/assets/finance.png";
import fitness from "../../../src/assets/fitness.png";
import gaming from "../../../src/assets/gaming.png";
import marketing from "../../../src/assets/marketing.png";
import technology from "../../../src/assets/technology.png";

// ✅ Category data (matches exactly what's saved in MongoDB from admin panel)
const categoriesData = [
  {
    title: "Education & E-Learning",
    value: "Education",
    description:
      "Find top courses, learning platforms, and tools to boost your knowledge.",
    image: education,
    slug: "education",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Finance & Investment",
    value: "Finance",
    description:
      "Discover apps, tools, and platforms to manage money and invest wisely.",
    image: finance,
    slug: "finance",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    title: "Technology & Gadgets",
    value: "Technology",
    description:
      "Explore the latest tech products and software for personal & professional use.",
    image: technology,
    slug: "technology",
    gradient: "from-purple-500 to-indigo-500"
  },
  {
    title: "Health & Fitness",
    value: "Health",
    description:
      "Get access to wellness apps, fitness tools, and health resources.",
    image: fitness,
    slug: "health",
    gradient: "from-red-500 to-pink-500"
  },
  {
    title: "Marketing & Business",
    value: "Marketing",
    description:
      "Find digital marketing tools, SaaS, and productivity software to grow your business.",
    image: marketing,
    slug: "marketing",
    gradient: "from-orange-500 to-amber-500"
  },
  {
    title: "Entertainment & Gaming",
    value: "Lifestyle",
    description:
      "Discover streaming services, gaming platforms, and entertainment tools.",
    image: gaming,
    slug: "lifestyle",
    gradient: "from-violet-500 to-purple-500"
  },
];

function Categories() {
  const navigate = useNavigate();

  const handleCategoryClick = (slug) => {
    navigate(`/category/${slug}`);
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
            Browse Categories
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Our Categories
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Browse the main categories of tools and resources available at <strong className="text-primary">Nexverce</strong>.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoriesData.map((category, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group border-2 border-gray-100 hover:border-primary bg-white hover:-translate-y-2"
              onClick={() => handleCategoryClick(category.slug)}
            >
              <div className="relative h-44 overflow-hidden">
                {/* Gradient Overlay on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10`}></div>

                <img
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  src={category.image}
                  alt={category.title}
                  loading="lazy"
                />

                {/* Premium Badge */}
                <Badge variant="premium" className="absolute top-4 right-4 shadow-lg">
                  {category.value}
                </Badge>

                {/* Hover Overlay with Icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <Button variant="secondary" size="sm" className="shadow-lg">
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
          ))}
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
