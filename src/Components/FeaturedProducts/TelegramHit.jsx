import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

function TelegramHit() {
  const [products, setProducts] = useState([]);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl = import.meta.env.MODE === "development"
          ? "http://localhost:5000/api"
          : "https://nexverce-backend.onrender.com/api";

        const [postsResponse, blogsResponse] = await Promise.all([
          fetch(`${baseUrl}/posts`),
          fetch(`${baseUrl}/blogs`)
        ]);

        if (postsResponse.ok && blogsResponse.ok) {
          const postsData = await postsResponse.json();
          const blogsData = await blogsResponse.json();
          const allContent = [...postsData, ...blogsData];
          const published = allContent.filter((p) => p.status === "published");
          setProducts(published);
        }
      } catch (err) {
        console.error("Error fetching telegram posts:", err);
      }
    };

    fetchProducts();
  }, []);

  // Filter telegram posts
  const telegramPosts = products.filter((p) =>
    p.tag?.toLowerCase() === "telegram" ||
    p.tags?.[0]?.toLowerCase() === "telegram"
  );

  // Always show 6 card slots
  const TOTAL_SLOTS = 6;

  // Get the 6 latest telegram posts, sorted by creation date
  const latestTelegramPosts = telegramPosts
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, TOTAL_SLOTS);

  // Create array of 6 slots
  const telegramSlots = Array.from({ length: TOTAL_SLOTS }, (_, index) => {
    return latestTelegramPosts[index] || null;
  });

  const handleExplore = (post) => {
    if (post.telegramLink) {
      // Open telegram link in new tab
      window.open(post.telegramLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50/30 to-cyan-50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="mb-0">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 mb-6 shadow-lg">
          <Send className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Exclusive Telegram Picks
          </span>
        </h3>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
          Join our Telegram community for handpicked products from trusted platforms
        </p>
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-3 bg-white rounded-full shadow-md border border-blue-100">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">N</span>
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-gray-900">Noon UAE</p>
              <p className="text-xs text-gray-500">Middle East's Best</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-5 py-3 bg-white rounded-full shadow-md border border-cyan-100">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-gray-900">Amazon Global</p>
              <p className="text-xs text-gray-500">Worldwide Trusted</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Telegram Posts */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {telegramSlots.map((post, index) => {
          if (post) {
            // Show actual telegram post
            return (
              <Card
                key={post._id}
                className="overflow-hidden hover:shadow-2xl hover:scale-[1.03] transition-all duration-500 group cursor-pointer border-2 border-blue-100 hover:border-blue-400 bg-white"
                onClick={() => handleExplore(post)}
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={post.image || "https://via.placeholder.com/400x200"}
                    alt={post.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Telegram Badge */}
                  <Badge
                    className="absolute top-2 right-2 text-xs font-semibold bg-blue-500 text-white border-0 shadow-lg"
                  >
                    <Send className="h-3 w-3 mr-1" />
                    Telegram
                  </Badge>

                  {/* Additional Tag if exists */}
                  {((post.tag || post.tags?.[0]) && (post.tag !== "Telegram" && post.tags?.[0] !== "Telegram")) && (
                    <Badge
                      variant="secondary"
                      className="absolute top-2 left-2 text-xs font-semibold bg-cyan-500 text-white border-0 shadow-lg"
                    >
                      {post.tag || post.tags?.[0]}
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <CardHeader className="p-4 space-y-1.5 bg-gradient-to-b from-white to-blue-50/30">
                  <CardTitle className="text-base font-bold line-clamp-1 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-xs line-clamp-2 text-gray-600 leading-relaxed">
                    {post.description || "Exclusive content from our Telegram community"}
                  </CardDescription>
                </CardHeader>

                {/* CTA */}
                <CardFooter className="p-4 pt-0 bg-gradient-to-b from-blue-50/30 to-white">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full h-8 text-xs font-semibold text-blue-600 bg-white border-2 border-blue-500/20 hover:border-blue-500 hover:!bg-gradient-to-r hover:!from-blue-500 hover:!to-cyan-500 hover:!text-white transition-all duration-300 shadow-sm hover:shadow-lg"
                  >
                    <Send className="h-3 w-3 mr-1" />
                    <span className="group-hover/btn:scale-105 transition-transform duration-300">
                      View on Telegram
                    </span>
                  </Button>
                </CardFooter>
              </Card>
            );
          } else {
            // Show empty placeholder with telegram icon
            return (
              <Card
                key={`telegram-empty-${index}`}
                className="overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50"
              >
                {/* Empty Image with Telegram Icon */}
                <div className="relative h-32 bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <Send className="h-8 w-8 text-blue-300" />
                  </div>
                </div>

                {/* Empty Content */}
                <CardHeader className="p-4 space-y-1.5">
                  <CardTitle className="text-base font-bold text-gray-400">
                    Telegram Slot {index + 1}
                  </CardTitle>
                  <CardDescription className="text-xs text-gray-400">
                    No post available yet
                  </CardDescription>
                </CardHeader>

                {/* Disabled CTA */}
                <CardFooter className="p-4 pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="w-full h-8 text-xs font-semibold text-gray-400 border-2 border-gray-200"
                  >
                    Coming Soon
                  </Button>
                </CardFooter>
              </Card>
            );
          }
        })}
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16">
        <div className="inline-block p-8 bg-white rounded-2xl shadow-xl border-2 border-blue-100">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <Send className="h-6 w-6 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900">Join Our Telegram</h4>
          </div>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Get exclusive access to the best products from Noon UAE and Amazon, handpicked by our team. Never miss a great deal!
          </p>
          <button
            onClick={() => window.open('https://t.me/nexverce', '_blank', 'noopener,noreferrer')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            Join Telegram Channel
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/20 text-xs">→</span>
          </button>
        </div>
      </div>

    </div>
      </div>
    </section>
  );
}

export default TelegramHit;
