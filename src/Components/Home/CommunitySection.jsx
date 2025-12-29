import { useNavigate } from "react-router-dom";
import {
  Users,
  MessageSquare,
  Star,
  ArrowRight,
  Quote,
  Verified
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export default function CommunitySection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Grid - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Community Forum Card */}
          <Card className="border-2 border-purple-200 hover:shadow-2xl transition-all group cursor-pointer" onClick={() => navigate("/community")}>
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Community Forum</h3>
                    <p className="text-gray-600">Join the conversation</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                Connect with 50,000+ members, ask questions, share experiences, and get expert advice from our active community.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">50K+</p>
                  <p className="text-xs text-gray-600">Members</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">15K+</p>
                  <p className="text-xs text-gray-600">Discussions</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">12K+</p>
                  <p className="text-xs text-gray-600">Solved</p>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-6 rounded-xl group-hover:scale-105 transition-all">
                <MessageSquare className="mr-2 h-5 w-5" />
                Join Community
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* Reviews & Trust Card */}
          <Card className="border-2 border-orange-200 hover:shadow-2xl transition-all group cursor-pointer" onClick={() => navigate("/reviews")}>
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">User Reviews</h3>
                    <p className="text-gray-600">Trusted by thousands</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                See why 250,000+ users trust Nexverce for product recommendations. Real reviews from real people.
              </p>

              {/* Featured Review */}
              <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-5 mb-6">
                <Quote className="h-6 w-6 text-orange-300 mb-2" />
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 italic mb-3">
                  "Nexverce has completely transformed how I research products. Highly recommended!"
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                    SJ
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-900">Sarah J.</span>
                    <Verified className="h-3 w-3 text-blue-500" />
                  </div>
                </div>
              </div>

              {/* Trust Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <p className="text-lg font-bold text-gray-900">4.8/5</p>
                  <p className="text-xs text-gray-600">Rating</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-lg font-bold text-gray-900">98%</p>
                  <p className="text-xs text-gray-600">Positive</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <p className="text-lg font-bold text-gray-900">250K+</p>
                  <p className="text-xs text-gray-600">Users</p>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white font-bold py-6 rounded-xl group-hover:scale-105 transition-all">
                <Star className="mr-2 h-5 w-5" />
                Read Reviews
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
}
