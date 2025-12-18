import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 py-20 md:py-32 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-200 mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-gray-700">Your Trusted Affiliate Hub</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Discover. Compare. <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
              Buy Smarter
            </span>
            <br className="hidden sm:block" /> with Nexverce.
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
            Your all-in-one affiliate hub to explore trusted tools. Find everything valuable in one place, compare the best offers, and shop smarter with Nexverce.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/blogs">
              <Button variant="premium" size="lg" className="group">
                Explore Blogs
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/about-us">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection