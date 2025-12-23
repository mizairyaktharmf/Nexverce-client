// src/Components/Newsletter/NewsletterThankYou.jsx
import { CheckCircle2, Mail, Home, ArrowRight, Sparkles, Gift, Bell, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

export default function NewsletterThankYou() {
  const benefits = [
    {
      icon: Gift,
      title: "Exclusive Deals",
      description: "Get early access to sales and special promotions",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: Bell,
      title: "Latest Updates",
      description: "Be first to know about new products and features",
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      icon: Star,
      title: "Premium Content",
      description: "Access subscriber-only guides and resources",
      gradient: "from-orange-400 to-amber-500"
    }
  ];

  return (
    <section className="min-h-screen py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-2xl mb-6 animate-bounce-slow">
            <CheckCircle2 className="h-14 w-14 text-white" />
          </div>

          <Badge variant="premium" className="mb-4 shadow-lg">
            <Sparkles className="h-4 w-4 mr-2" />
            Successfully Subscribed
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Thank You for{" "}
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Subscribing!
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            You're now part of the nexverce community. Get ready to receive exclusive content, deals, and updates straight to your inbox.
          </p>
        </div>

        {/* Check Email Card */}
        <Card className="mb-12 shadow-2xl border-2 border-purple-200 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Check Your Inbox!</h2>
            <p className="text-gray-600 leading-relaxed">
              We've sent a confirmation email to your inbox. Click the link inside to confirm your subscription and start receiving our amazing content.
            </p>
          </CardContent>
        </Card>

        {/* What's Next */}
        <Card className="mb-12 shadow-xl border-2 border-gray-100 bg-white">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="h-6 w-6 text-purple-500" />
                <h2 className="text-3xl font-bold text-gray-900">What's Next?</h2>
                <Sparkles className="h-6 w-6 text-purple-500" />
              </div>
              <p className="text-gray-600">Here's what you can expect as a subscriber</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative p-6 text-center">
                      <div className={`w-16 h-16 bg-gradient-to-br ${benefit.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button
              variant="premium"
              size="lg"
              className="w-full sm:w-auto shadow-xl hover:shadow-2xl group"
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </Link>

          <Link to="/blogs">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-2 border-purple-300 hover:bg-purple-50 group"
            >
              Browse Our Blog
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Social Proof */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 mb-4">Join 10,000+ subscribers who trust nexverce</p>
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-sm text-gray-600 font-semibold">4.9/5 rating from our community</span>
          </div>
        </div>

      </div>
    </section>
  );
}
