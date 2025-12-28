import { CheckCircle, Search, Award, MessageSquare, Globe, RefreshCw, Grid3x3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

export default function OurServices() {
  const services = [
    {
      icon: Search,
      title: "Product Curation",
      description: "We carefully research and select the best products from each category across multiple platforms to bring you verified, high-quality options.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Award,
      title: "Quality Verification",
      description: "Every product undergoes rigorous quality checks and verification processes to ensure we only recommend the best deals and services to our users.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Globe,
      title: "LinkedIn Community",
      description: "Stay connected with us on LinkedIn for professional insights, industry updates, and exclusive content curated for our professional community.",
      color: "from-blue-600 to-blue-700"
    },
    {
      icon: MessageSquare,
      title: "Telegram Channel",
      description: "Join our Telegram community for instant updates, exclusive deals, and direct access to our team. Get notified first about the latest offers.",
      color: "from-cyan-500 to-blue-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl -ml-48 -mt-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -mr-48 -mb-48"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-primary to-purple-600 text-white border-0 px-4 py-1.5 shadow-lg">
            <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
            Our Services
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How We Serve{" "}
            <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
              You Best
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how we curate, verify, and deliver the best products and services across all categories and platforms
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="border-2 border-gray-100 hover:border-primary/30 transition-all duration-300 hover:shadow-xl group bg-white"
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${service.color} flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Platform Reach */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 md:p-12 border border-gray-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Multi-Platform Product Selection
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We search across all major platforms to find the best products in each category, ensuring you get comprehensive, unbiased recommendations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Categories", value: "9+", Icon: Grid3x3, color: "text-blue-500" },
              { label: "Verified Products", value: "500+", Icon: CheckCircle, color: "text-green-500" },
              { label: "Platform Sources", value: "20+", Icon: Globe, color: "text-purple-500" },
              { label: "Daily Updates", value: "50+", Icon: RefreshCw, color: "text-orange-500" }
            ].map((stat, index) => {
              const StatIcon = stat.Icon;
              return (
                <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <StatIcon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
