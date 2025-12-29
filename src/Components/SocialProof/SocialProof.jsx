import { useState } from "react";
import {
  Star,
  ThumbsUp,
  Users,
  TrendingUp,
  Award,
  CheckCircle2,
  Quote,
  MapPin,
  Calendar,
  Verified,
  Heart,
  Share2
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function SocialProof() {
  const [selectedRating, setSelectedRating] = useState("all");

  const stats = [
    { icon: Users, label: "Happy Users", value: "250K+", color: "from-blue-500 to-cyan-500" },
    { icon: Star, label: "Average Rating", value: "4.8/5", color: "from-yellow-500 to-orange-500" },
    { icon: ThumbsUp, label: "Positive Reviews", value: "98%", color: "from-green-500 to-emerald-500" },
    { icon: Award, label: "Awards Won", value: "15+", color: "from-purple-500 to-pink-500" }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Product Manager",
      location: "San Francisco, CA",
      avatar: "SJ",
      rating: 5,
      date: "2 days ago",
      verified: true,
      title: "Best product discovery platform I've used!",
      content: "Nexverce has completely transformed how I research products. The comparison tools are incredibly detailed, and I've saved hundreds of dollars using their deal alerts. The community is super helpful too!",
      helpful: 234,
      category: "Technology"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Engineer",
      location: "Austin, TX",
      avatar: "MC",
      rating: 5,
      date: "1 week ago",
      verified: true,
      title: "Incredible buying guides and expert reviews",
      content: "I was skeptical at first, but the depth of their buying guides is impressive. The Product Finder Quiz actually helped me find the perfect laptop for my needs. Worth every minute spent on the platform.",
      helpful: 189,
      category: "Technology"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Fitness Instructor",
      location: "Miami, FL",
      avatar: "ER",
      rating: 5,
      date: "2 weeks ago",
      verified: true,
      title: "Saved me so much time and money",
      content: "The health and fitness category has everything I need. From smartwatch comparisons to nutrition app reviews, it's all there. The AI recommendations are surprisingly accurate!",
      helpful: 167,
      category: "Health"
    },
    {
      id: 4,
      name: "David Park",
      role: "Small Business Owner",
      location: "Seattle, WA",
      avatar: "DP",
      rating: 4,
      date: "3 weeks ago",
      verified: true,
      title: "Great for business purchases",
      content: "I use Nexverce for all my business tool purchases. The comparison feature helps me make informed decisions, and the community forum has answered so many of my questions. Highly recommended!",
      helpful: 143,
      category: "Finance"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Teacher",
      location: "Boston, MA",
      avatar: "LT",
      rating: 5,
      date: "1 month ago",
      verified: true,
      title: "Educational resources are top-notch",
      content: "As an educator, I appreciate how thorough the reviews are. The buying guides helped me choose the best educational software for my classroom. The deals section is a bonus!",
      helpful: 128,
      category: "Education"
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Marketing Director",
      location: "Chicago, IL",
      avatar: "JW",
      rating: 5,
      date: "1 month ago",
      verified: true,
      title: "Perfect for marketing tool research",
      content: "Finding the right marketing tools used to take weeks. Now with Nexverce, I can compare features, pricing, and real user reviews all in one place. Game changer for my workflow!",
      helpful: 112,
      category: "Marketing"
    }
  ];

  const achievements = [
    {
      title: "Best Product Review Platform 2025",
      organization: "Tech Awards",
      icon: Award,
      color: "text-yellow-500"
    },
    {
      title: "Top 10 Shopping Resources",
      organization: "Consumer Reports",
      icon: Star,
      color: "text-orange-500"
    },
    {
      title: "Most Trusted Review Site",
      organization: "Trust Pilot Excellence",
      icon: Verified,
      color: "text-blue-500"
    },
    {
      title: "Community Choice Award",
      organization: "User's Choice 2025",
      icon: Users,
      color: "text-purple-500"
    }
  ];

  const trustMetrics = [
    { label: "Verified Reviews", value: "15,000+", icon: CheckCircle2 },
    { label: "Expert Contributors", value: "200+", icon: Award },
    { label: "Products Reviewed", value: "5,000+", icon: Star },
    { label: "Community Members", value: "250K+", icon: Users }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-full">
                <Heart className="h-12 w-12 text-white" />
              </div>
            </div>
            <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-blue-600 text-white border-0 px-6 py-2 text-base">
              Trusted by Thousands
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              See What Our <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Community Says</span>
            </h1>
            <p className="text-lg text-purple-100 max-w-2xl mx-auto mb-8">
              Join 250,000+ satisfied users who trust Nexverce for product recommendations
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-12">
              {stats.map((stat, idx) => {
                const IconComponent = stat.icon;
                return (
                  <div key={idx} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-sm text-purple-200">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trustMetrics.map((metric, idx) => {
              const IconComponent = metric.icon;
              return (
                <div key={idx} className="text-center">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</p>
                  <p className="text-sm text-gray-600">{metric.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Real Stories from <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Real Users</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear directly from our community about their experiences
            </p>
          </div>

          {/* Filter Tabs */}
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="all">All Reviews</TabsTrigger>
              <TabsTrigger value="5star">5 Stars</TabsTrigger>
              <TabsTrigger value="verified">Verified</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-2 border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                          {testimonial.verified && (
                            <Verified className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{testimonial.date}</span>
                  </div>

                  {/* Content */}
                  <Quote className="h-6 w-6 text-purple-300 mb-2" />
                  <h5 className="font-bold text-gray-900 mb-2">{testimonial.title}</h5>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {testimonial.content}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{testimonial.location}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary transition-colors">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{testimonial.helpful}</span>
                      </button>
                      <button className="text-gray-400 hover:text-primary transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <Badge variant="secondary" className="mt-3">
                    {testimonial.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-8">
              Load More Reviews
            </Button>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Award-Winning <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Platform</span>
            </h2>
            <p className="text-lg text-gray-600">
              Recognized by industry leaders and trusted organizations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, idx) => {
              const IconComponent = achievement.icon;
              return (
                <Card key={idx} className="border-2 border-purple-100 hover:shadow-xl transition-all text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-50 to-blue-50 flex items-center justify-center mx-auto mb-4">
                      <IconComponent className={`h-8 w-8 ${achievement.color}`} />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.organization}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Star className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Our Satisfied Community
          </h2>
          <p className="text-purple-100 text-lg mb-8">
            Start making smarter purchasing decisions today
          </p>
          <Button className="bg-white text-purple-600 hover:bg-purple-50 border-2 border-white font-bold px-8 py-6 text-lg">
            Get Started Free
          </Button>
        </div>
      </section>
    </div>
  );
}
