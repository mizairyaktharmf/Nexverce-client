import { useState } from "react";
import { Mail, CheckCircle2, Target, Newspaper, Rocket, Lightbulb, Gift } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Link } from "react-router-dom";

export default function Newsletter() {
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
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to subscribe");
      }

      setMessage("Successfully subscribed to our newsletter!");
      setEmail("");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    { icon: Target, text: "Exclusive deals and discounts" },
    { icon: Newspaper, text: "Latest blog posts and articles" },
    { icon: Rocket, text: "New product launches" },
    { icon: Lightbulb, text: "Tips and tutorials" },
    { icon: Gift, text: "Special offers for subscribers only" },
  ];

  return (
    <section className="min-h-screen py-16 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mail className="h-10 w-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Subscribe to Our Newsletter</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest products, deals, and exclusive content delivered straight to your inbox.
          </p>
        </div>

        {/* Subscription Form */}
        <Card className="mb-12 shadow-xl border-2 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Join Our Community</CardTitle>
            <CardDescription>Get exclusive updates and special offers</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              {message && (
                <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                  <CheckCircle2 className="h-5 w-5" />
                  <p>{message}</p>
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  <p>{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                variant="premium"
                size="lg"
                className="w-full"
              >
                {loading ? "Subscribing..." : "Subscribe Now"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">What You'll Get</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-gray-200">
                    <Icon className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{benefit.text}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Privacy Note */}
        <div className="text-center text-sm text-gray-600">
          <p>
            We respect your privacy. Unsubscribe at any time. Read our{" "}
            <Link to="/privacy-policy" className="text-primary hover:underline font-medium">
              Privacy Policy
            </Link>
            .
          </p>
        </div>

      </div>
    </section>
  );
}
