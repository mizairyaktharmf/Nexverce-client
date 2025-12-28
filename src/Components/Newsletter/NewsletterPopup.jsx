import { useState, useEffect } from "react";
import { X, Mail, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem("newsletter_popup_seen");

    if (!hasSeenPopup) {
      // Show popup after 3 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Mark popup as seen for this browser session
    localStorage.setItem("newsletter_popup_seen", "true");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiUrl}/newsletter/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, source: "website" }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setEmail("");

        // Mark popup as seen
        localStorage.setItem("newsletter_popup_seen", "true");

        // Close popup after 2 seconds
        setTimeout(() => {
          setIsOpen(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <Card className="relative max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full blur-3xl -mr-32 -mt-32"></div>

        <div className="relative p-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-full blur-xl opacity-50"></div>
              <div className="relative bg-gradient-to-r from-primary to-purple-600 p-4 rounded-full">
                <Mail className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          {/* Content */}
          {!isSuccess ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-full mb-4">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Exclusive Deals & Updates
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Join Our Newsletter
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Get the latest product reviews, exclusive deals, and expert recommendations delivered to your inbox
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 h-12 border-2 border-gray-200 focus:border-primary"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Subscribing...</span>
                    </div>
                  ) : (
                    "Subscribe Now"
                  )}
                </Button>
              </form>

              {/* Footer */}
              <div className="mt-6 text-center">
                <button
                  onClick={handleClose}
                  className="text-sm text-gray-500 hover:text-gray-700 underline underline-offset-4"
                >
                  No thanks, continue to website
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>Free to subscribe</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span>Unsubscribe anytime</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Success State
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                You're All Set!
              </h3>
              <p className="text-gray-600">
                Check your inbox for a confirmation email
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
