import { ArrowRight, Sparkles, Search, Shield, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 md:py-20 lg:py-24 overflow-hidden">
      {/* Animated Blob Decorations */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">

          {/* Premium Badge */}
          <Badge variant="premium" className="mb-6 shadow-lg hover:shadow-xl transition-shadow">
            <Sparkles className="h-4 w-4 mr-2" />
            Your Trusted Affiliate Hub
          </Badge>

          {/* Main Heading with Enhanced Gradient */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight px-4">
            Discover. Compare.{" "}
            <span className="relative inline-block mt-2">
              <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
                Buy Smarter
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full opacity-60"></div>
            </span>
            {" "}with{" "}
            <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
              Nexverce
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 md:mb-10 leading-relaxed max-w-3xl mx-auto px-4">
            Your all-in-one affiliate hub to explore trusted tools. Find everything valuable in one place, compare the best offers, and shop smarter with Nexverce.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 md:mb-12 px-4">
            <Link to="/blogs" className="w-full sm:w-auto">
              <Button variant="premium" size="lg" className="w-full sm:w-auto group shadow-xl hover:shadow-2xl">
                Explore Blogs
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/about-us" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 hover:border-primary hover:text-primary">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-2xl mx-auto px-4">
            {[
              { icon: Search, text: "Easy Discovery" },
              { icon: Shield, text: "Verified Partners" },
              { icon: Zap, text: "Best Deals" },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-gray-200 hover:border-primary/50 transition-all hover:scale-105"
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">{feature.text}</span>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection