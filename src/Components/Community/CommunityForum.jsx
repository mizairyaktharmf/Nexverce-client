import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageSquare,
  ThumbsUp,
  MessageCircle,
  Clock,
  TrendingUp,
  Users,
  Award,
  Search,
  Filter,
  Plus,
  Eye,
  CheckCircle2,
  Star
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function CommunityForum() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All Topics", icon: MessageSquare, count: 1250 },
    { id: "tech", name: "Technology", icon: TrendingUp, count: 340 },
    { id: "health", name: "Health & Fitness", icon: Award, count: 220 },
    { id: "finance", name: "Finance", icon: Star, count: 180 },
    { id: "education", name: "Education", icon: CheckCircle2, count: 150 },
  ];

  const discussions = [
    {
      id: 1,
      title: "What's the best laptop for programming under $1000?",
      author: "TechEnthusiast92",
      category: "Technology",
      replies: 45,
      views: 1230,
      likes: 89,
      timeAgo: "2 hours ago",
      tags: ["laptops", "programming", "budget"],
      isSolved: false,
      isHot: true
    },
    {
      id: 2,
      title: "Comparison: Apple Watch vs Samsung Galaxy Watch - Which is better?",
      author: "FitnessGuru",
      category: "Health & Fitness",
      replies: 67,
      views: 2340,
      likes: 156,
      timeAgo: "5 hours ago",
      tags: ["smartwatch", "fitness", "comparison"],
      isSolved: true,
      isHot: true
    },
    {
      id: 3,
      title: "Best investment apps for beginners in 2025?",
      author: "MoneyMaster",
      category: "Finance",
      replies: 34,
      views: 890,
      likes: 72,
      timeAgo: "1 day ago",
      tags: ["investment", "apps", "beginners"],
      isSolved: false,
      isHot: false
    },
    {
      id: 4,
      title: "Online courses vs Traditional degrees - What's your experience?",
      author: "StudentLife",
      category: "Education",
      replies: 123,
      views: 4560,
      likes: 234,
      timeAgo: "3 days ago",
      tags: ["education", "online-learning", "career"],
      isSolved: false,
      isHot: true
    },
    {
      id: 5,
      title: "Gaming headset recommendations for under $150?",
      author: "GamerPro",
      category: "Technology",
      replies: 28,
      views: 670,
      likes: 43,
      timeAgo: "1 week ago",
      tags: ["gaming", "headset", "audio"],
      isSolved: true,
      isHot: false
    }
  ];

  const topContributors = [
    { name: "TechExpert101", posts: 342, reputation: 4580, avatar: "TE" },
    { name: "HealthGuru", posts: 289, reputation: 3920, avatar: "HG" },
    { name: "FinanceWiz", posts: 256, reputation: 3450, avatar: "FW" },
    { name: "EduMaster", posts: 198, reputation: 2890, avatar: "EM" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-full">
                <Users className="h-12 w-12 text-white" />
              </div>
            </div>
            <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-blue-600 text-white border-0 px-6 py-2 text-base">
              Community Forum
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Join the <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Conversation</span>
            </h1>
            <p className="text-lg text-purple-100 max-w-2xl mx-auto mb-8">
              Ask questions, share experiences, and learn from a community of 50,000+ members
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <Users className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                <p className="text-3xl font-bold text-white">50K+</p>
                <p className="text-purple-200 text-sm">Members</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <MessageSquare className="h-8 w-8 text-blue-300 mx-auto mb-2" />
                <p className="text-3xl font-bold text-white">15K+</p>
                <p className="text-blue-200 text-sm">Discussions</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <CheckCircle2 className="h-8 w-8 text-green-300 mx-auto mb-2" />
                <p className="text-3xl font-bold text-white">12K+</p>
                <p className="text-green-200 text-sm">Solved</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <TrendingUp className="h-8 w-8 text-orange-300 mx-auto mb-2" />
                <p className="text-3xl font-bold text-white">500+</p>
                <p className="text-orange-200 text-sm">Daily Active</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <Card className="border-2 border-purple-100 sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-primary" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((cat) => {
                    const IconComponent = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                          selectedCategory === cat.id
                            ? "bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-primary"
                            : "hover:bg-gray-50 border-2 border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className={`h-5 w-5 ${selectedCategory === cat.id ? "text-primary" : "text-gray-400"}`} />
                          <span className={`font-medium ${selectedCategory === cat.id ? "text-primary" : "text-gray-700"}`}>
                            {cat.name}
                          </span>
                        </div>
                        <Badge variant="secondary">{cat.count}</Badge>
                      </button>
                    );
                  })}
                </div>

                {/* Top Contributors */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-orange-500" />
                    Top Contributors
                  </h3>
                  <div className="space-y-3">
                    {topContributors.map((user, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-all">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                          {user.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.reputation} rep</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Discussions */}
          <div className="lg:col-span-3">
            {/* Search and Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-6">
                <Plus className="mr-2 h-5 w-5" />
                New Discussion
              </Button>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="latest" className="mb-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="latest">Latest</TabsTrigger>
                <TabsTrigger value="hot">Hot</TabsTrigger>
                <TabsTrigger value="solved">Solved</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Discussion List */}
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <Card key={discussion.id} className="border-2 border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Stats Column */}
                      <div className="hidden sm:flex flex-col items-center gap-4 text-center min-w-[80px]">
                        <div>
                          <div className="text-2xl font-bold text-primary">{discussion.replies}</div>
                          <div className="text-xs text-gray-500">Replies</div>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <ThumbsUp className="h-4 w-4" />
                            <span className="font-semibold">{discussion.likes}</span>
                          </div>
                        </div>
                      </div>

                      {/* Content Column */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 mb-2">
                          <h3 className="text-lg font-bold text-gray-900 hover:text-primary transition-colors flex-1">
                            {discussion.title}
                          </h3>
                          {discussion.isSolved && (
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Solved
                            </Badge>
                          )}
                          {discussion.isHot && (
                            <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                              🔥 Hot
                            </Badge>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {discussion.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {discussion.timeAgo}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {discussion.views} views
                          </span>
                          <Badge variant="outline" className="text-xs">{discussion.category}</Badge>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {discussion.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-8">
                Load More Discussions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-16 mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageSquare className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Join the Discussion?
          </h2>
          <p className="text-purple-100 text-lg mb-8">
            Create an account and start connecting with thousands of members today
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-purple-600 hover:bg-purple-50 border-2 border-white font-bold px-8 py-6 text-lg">
              Sign Up Free
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-6 text-lg">
              Browse as Guest
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
