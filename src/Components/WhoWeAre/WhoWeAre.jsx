import { Heart, Users, Code, Search, PenTool, Shield, Clock, Award } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

export default function WhoWeAre() {
  const team = [
    {
      icon: Code,
      role: "Developers",
      description: "Expert developers building seamless experiences and robust platforms",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Search,
      role: "Product Researchers",
      description: "Dedicated researchers finding and verifying the best products across all categories",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: PenTool,
      role: "Content Writers",
      description: "Skilled writers creating valuable, engaging content for our community",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Shield,
      role: "Quality Team",
      description: "Ensuring every product meets our high standards of quality and reliability",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-200/30 to-purple-200/30 rounded-full blur-3xl -ml-40 -mb-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-primary to-purple-600 text-white border-0 px-4 py-1.5 shadow-lg">
            <Users className="h-3.5 w-3.5 mr-1.5" />
            Our Team
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meet The{" "}
            <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
              Nexvercians
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            We are proud members of the <span className="font-bold text-gray-900">Fairam Family</span>, a team of passionate professionals dedicated to bringing you the best products and services
          </p>

          {/* Mission Statement */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full border-2 border-primary/20 shadow-lg">
            <Heart className="h-5 w-5 text-red-500 animate-pulse" />
            <span className="text-base font-semibold text-gray-700">Building trust through quality and transparency</span>
            <Heart className="h-5 w-5 text-red-500 animate-pulse" />
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {team.map((member, index) => {
            const Icon = member.icon;
            return (
              <Card
                key={index}
                className="border-2 border-gray-100 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:scale-105 group bg-white"
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    {member.role}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Company Info */}
        <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-2xl p-8 md:p-12 text-white shadow-2xl">
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Part of the Fairam Family
            </h3>
            <p className="text-lg md:text-xl leading-relaxed mb-8 text-white/90">
              Nexverce operates under the umbrella of <span className="font-bold">Fairam</span>, bringing together talented developers, researchers, and content writers. Our mission is to provide you with the most reliable, carefully curated product recommendations across all categories.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Shield className="h-8 w-8 mx-auto mb-3 text-white" />
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-sm font-medium text-white/90">Verified Products</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Clock className="h-8 w-8 mx-auto mb-3 text-white" />
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-sm font-medium text-white/90">Team Support</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Award className="h-8 w-8 mx-auto mb-3 text-white" />
                <div className="text-3xl font-bold mb-2">Trust</div>
                <div className="text-sm font-medium text-white/90">Our Foundation</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
