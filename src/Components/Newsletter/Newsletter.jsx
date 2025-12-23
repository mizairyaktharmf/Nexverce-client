import { useState } from "react";
import { Mail, CheckCircle2, Target, Newspaper, Rocket, Lightbulb, Gift, Sparkles, Send } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Link, useNavigate } from "react-router-dom";

export default function Newsletter() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      // TODO: Replace with your actual newsletter API endpoint
      const API_BASE =
        import.meta.env.MODE === "development"
          ? "http://localhost:5000/api/newsletter"
          : "https://nexverce-backend.onrender.com/api/newsletter";

      const res = await fetch(`${API_BASE}/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, source: "website" }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to subscribe");
      }

      // Redirect to thank you page on success
      navigate("/newsletter/thank-you");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    {
      icon: Target,
      text: "Exclusive deals and discounts",
      gradient: "from-orange-400 to-amber-500",
      bgGradient: "from-orange-50 to-amber-50"
    },
    {
      icon: Newspaper,
      text: "Latest blog posts and articles",
      gradient: "from-blue-400 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50"
    },
    {
      icon: Rocket,
      text: "New product launches",
      gradient: "from-purple-400 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50"
    },
    {
      icon: Lightbulb,
      text: "Tips and tutorials",
      gradient: "from-yellow-400 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50"
    },
    {
      icon: Gift,
      text: "Special offers for subscribers only",
      gradient: "from-green-400 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50"
    },
  ];

  return (
    <section className="min-h-screen py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated Blob Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="premium" className="mb-6 shadow-lg hover:shadow-xl transition-shadow">
            <Sparkles className="h-4 w-4 mr-2" />
            Stay Connected
          </Badge>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-2xl flex items-center justify-center shadow-xl">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Subscribe to Our{" "}
              <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
                Newsletter
              </span>
            </h1>
          </div>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest products, exclusive deals, and premium content delivered straight to your inbox.
          </p>
        </div>

        {/* Main Subscription Card */}
        <Card className="mb-16 shadow-2xl border-2 border-primary/30 bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-shadow duration-500">
          <CardHeader className="text-center pb-6 bg-gradient-to-br from-purple-50 to-blue-50 border-b border-gray-200">
            <CardTitle className="text-3xl font-bold mb-2">Join Our Community</CardTitle>
            <CardDescription className="text-base">
              Get exclusive updates and special offers — be the first to know!
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="email"
                    id="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 h-14 text-base border-2 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {message && (
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl text-green-700 shadow-lg animate-fadeIn">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  </div>
                  <p className="font-semibold">{message}</p>
                </div>
              )}

              {error && (
                <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 rounded-xl text-red-700 shadow-lg animate-fadeIn">
                  <p className="font-semibold">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                variant="premium"
                size="lg"
                className="w-full h-14 text-lg shadow-xl hover:shadow-2xl group"
              >
                {loading ? (
                  <>
                    <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe Now
                    <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <Card className="mb-12 shadow-xl border-2 border-gray-100 bg-white">
          <CardHeader className="text-center pb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="h-6 w-6 text-primary" />
              <CardTitle className="text-3xl font-bold">What You'll Get</CardTitle>
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <CardDescription className="text-base">
              Exclusive benefits for our newsletter subscribers
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-xl border-2 border-gray-200 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${benefit.bgGradient} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                    <div className="relative p-6 text-center">
                      <div className={`w-16 h-16 bg-gradient-to-br ${benefit.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <p className="text-gray-800 font-semibold leading-relaxed text-sm">
                        {benefit.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Privacy Note */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-md">
            <span className="text-sm text-gray-600">
              We respect your privacy. Unsubscribe at any time. Read our{" "}
              <Link to="/privacy-policy" className="text-primary hover:underline font-semibold transition-colors">
                Privacy Policy
              </Link>
              .
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
