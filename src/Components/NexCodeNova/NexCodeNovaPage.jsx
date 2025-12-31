import {
  Code,
  Rocket,
  Users,
  Zap,
  CheckCircle2,
  ArrowRight,
  Shield,
  Sparkles,
  Target,
  Layers,
  Smartphone,
  Globe,
  Database,
  Cloud,
  Lightbulb,
  Heart,
  ExternalLink
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function NexCodeNovaPage() {
  const services = [
    {
      icon: Code,
      title: "Premium Quality",
      desc: "Top-notch code standards with clean, maintainable architecture",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Rocket,
      title: "Fast Delivery",
      desc: "Lightning-fast turnaround without compromising quality",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Expert Developers",
      desc: "Seasoned professionals with years of experience",
      gradient: "from-fuchsia-500 to-purple-500"
    },
    {
      icon: Zap,
      title: "Cutting-Edge Tech",
      desc: "Latest technologies and modern development practices",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const solutions = [
    {
      icon: Globe,
      title: "Web Applications",
      description: "Full-stack web solutions with React, Node.js, and modern frameworks",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Database,
      title: "Backend Systems",
      description: "Scalable APIs, databases, and server infrastructure",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description: "Cloud deployment, hosting, and infrastructure management",
      color: "from-orange-500 to-amber-500"
    }
  ];

  const fairamEcosystem = [
    {
      platform: "Nexverce",
      tagline: "Your Solution Platform",
      description: "Confused about which tech solution fits your needs? Nexverce guides you from problem to clarity.",
      color: "from-purple-600 to-blue-600",
      icon: Target,
      link: "/"
    },
    {
      platform: "NexCode Nova",
      tagline: "Your Development Partner",
      description: "Found your solution? NexCode Nova brings it to life with professional development expertise.",
      color: "from-fuchsia-600 to-purple-600",
      icon: Code,
      link: "https://nexcodenova.com"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 lg:pt-24 lg:pb-16 bg-gradient-to-br from-slate-900 via-purple-900 to-fuchsia-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-fuchsia-500 rounded-full blur-2xl opacity-60 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-600 p-5 rounded-full shadow-2xl">
                  <Code className="h-12 w-12 text-white" strokeWidth={2} />
                </div>
              </div>
            </div>

            {/* Badge */}
            <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white border-0 px-6 py-2 text-base shadow-lg">
              <Sparkles className="h-4 w-4 mr-2" />
              Premium Development Partner
            </Badge>

            {/* Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
              Solve{" "}
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                YOUR Tech Needs
              </span>
              {" "}with NexCode Nova
            </h1>

            {/* Subheading */}
            <p className="text-base md:text-lg lg:text-xl text-purple-100 max-w-4xl mx-auto mb-8 leading-relaxed">
              Need a custom website? Mobile app? SaaS platform? We don't just build code — we solve YOUR specific tech challenges with professional development solutions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:from-purple-600 hover:to-fuchsia-700 text-white font-bold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                onClick={() => window.open('https://nexcodenova.com', '_blank')}
              >
                Explore NexCode Nova
                <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white font-bold text-lg px-8 py-6 bg-transparent"
                onClick={() => document.getElementById('fairam-ecosystem').scrollIntoView({ behavior: 'smooth' })}
              >
                How We're Connected
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Trusted Badge */}
            <p className="text-purple-200 text-sm">
              Trusted by businesses worldwide
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-fuchsia-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="premium" className="mb-4">
              <Lightbulb className="h-4 w-4 mr-2" />
              What We Do
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              We Build <span className="bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">Mini Solutions</span> for YOUR Needs
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              From simple landing pages to complex enterprise systems — we provide tailored development solutions that fit YOUR specific requirements
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all duration-300 group text-center">
                  <CardHeader>
                    <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                      <IconComponent className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-purple-600 transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {service.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solutions We Build Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="premium" className="mb-4">
              <Layers className="h-4 w-4 mr-2" />
              Solutions We Build
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Custom Development for <span className="bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">Every Tech Need</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Whatever your tech challenge, we have the expertise to build the perfect solution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {solutions.map((solution, index) => {
              const IconComponent = solution.icon;
              return (
                <Card key={index} className="border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all duration-300 group">
                  <CardHeader className="flex flex-row items-start gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${solution.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors">
                        {solution.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {solution.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fairam Ecosystem Section */}
      <section id="fairam-ecosystem" className="py-20 bg-gradient-to-br from-purple-50 to-fuchsia-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="premium" className="mb-4">
              <Heart className="h-4 w-4 mr-2" />
              The Fairam Family
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How <span className="bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">Nexverce</span> & <span className="bg-gradient-to-r from-fuchsia-600 to-purple-600 bg-clip-text text-transparent">NexCode Nova</span> Work Together
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Two platforms, one mission: Solving YOUR problems from discovery to delivery
            </p>
          </div>

          {/* Ecosystem Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {fairamEcosystem.map((platform, index) => {
              const IconComponent = platform.icon;
              return (
                <Card key={index} className="border-2 border-purple-200 hover:border-purple-400 hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${platform.color}`}></div>
                  <CardHeader className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${platform.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{platform.platform}</h3>
                        <p className={`text-sm font-semibold bg-gradient-to-r ${platform.color} bg-clip-text text-transparent`}>
                          {platform.tagline}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg mb-6">
                      {platform.description}
                    </p>
                    <Button
                      className={`w-full bg-gradient-to-r ${platform.color} hover:opacity-90 text-white font-bold py-6 shadow-lg`}
                      onClick={() => {
                        if (platform.link.startsWith('http')) {
                          window.open(platform.link, '_blank');
                        } else {
                          window.location.href = platform.link;
                        }
                      }}
                    >
                      Visit {platform.platform}
                      {platform.link.startsWith('http') ? (
                        <ExternalLink className="ml-2 h-5 w-5" />
                      ) : (
                        <ArrowRight className="ml-2 h-5 w-5" />
                      )}
                    </Button>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          {/* Flow Explanation */}
          <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-fuchsia-900 rounded-3xl p-12 shadow-2xl text-white text-center">
            <h3 className="text-3xl font-bold mb-8">The Complete Solution Journey</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 max-w-5xl mx-auto">
              {/* Step 1 */}
              <div className="flex-1">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 h-full">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    1
                  </div>
                  <h4 className="font-bold text-lg mb-2">Discover on Nexverce</h4>
                  <p className="text-purple-200 text-sm">
                    Research solutions, compare options, understand what you need
                  </p>
                </div>
              </div>

              <ArrowRight className="hidden md:block h-8 w-8 text-purple-400 flex-shrink-0" />
              <ArrowRight className="md:hidden h-8 w-8 text-purple-400 flex-shrink-0 rotate-90" />

              {/* Step 2 */}
              <div className="flex-1">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 h-full">
                  <div className="w-12 h-12 bg-gradient-to-r from-fuchsia-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    2
                  </div>
                  <h4 className="font-bold text-lg mb-2">Build with NexCode Nova</h4>
                  <p className="text-purple-200 text-sm">
                    Professional development brings your solution to life
                  </p>
                </div>
              </div>

              <ArrowRight className="hidden md:block h-8 w-8 text-purple-400 flex-shrink-0" />
              <ArrowRight className="md:hidden h-8 w-8 text-purple-400 flex-shrink-0 rotate-90" />

              {/* Step 3 */}
              <div className="flex-1">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 h-full">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    3
                  </div>
                  <h4 className="font-bold text-lg mb-2">Launch & Succeed</h4>
                  <p className="text-purple-200 text-sm">
                    Your custom solution is live and solving real problems
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-fuchsia-900 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10"></div>
            <div className="relative z-10">
              <Code className="h-12 w-12 text-purple-400 mx-auto mb-6" strokeWidth={2} />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-lg text-purple-100 mb-8">
                Partner with NexCode Nova for professional web development, mobile apps, and custom software solutions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-purple-50 font-bold px-8 py-6 shadow-xl"
                  onClick={() => window.open('https://nexcodenova.com', '_blank')}
                >
                  Explore NexCode Nova
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-6"
                  onClick={() => window.location.href = '/'}
                >
                  Back to Nexverce
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
