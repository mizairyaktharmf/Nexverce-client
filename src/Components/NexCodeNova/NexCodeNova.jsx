import { ExternalLink, Sparkles, Code2, Rocket, Zap, Award, Users } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'

function NexCodeNova() {
  return (
    <section id="nexcodenova" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <Badge className="mb-4 bg-gradient-to-r from-primary to-purple-600 text-white border-0 px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Premium Development Partner
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Build Dream Projects with NexCode Nova
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Transform your ideas into reality with cutting-edge development solutions
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                label: "Premium Quality",
                icon: Award,
                description: "Top-notch code standards",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                label: "Fast Delivery",
                icon: Rocket,
                description: "Lightning-fast turnaround",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                label: "Expert Developers",
                icon: Users,
                description: "Seasoned professionals",
                gradient: "from-primary to-purple-600"
              },
              {
                label: "Cutting-Edge Tech",
                icon: Zap,
                description: "Latest technologies",
                gradient: "from-orange-500 to-red-500"
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-primary/30 hover:scale-105"
                >
                  <CardContent className="p-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.label}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Right Side - CTA Card */}
          <Card className="relative overflow-hidden border-2 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full blur-3xl opacity-50"></div>

            <CardContent className="relative z-10 p-8 md:p-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 mb-6 shadow-lg">
                <Code2 className="h-8 w-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Ready to Build Something Amazing?
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Partner with NexCode Nova for professional web development, mobile apps, and custom software solutions.
              </p>

              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary text-white shadow-lg hover:shadow-xl group font-semibold px-8 h-12 transition-all duration-300"
                onClick={() => window.open("https://www.nexcodenova.com", "_blank")}
              >
                Explore NexCode Nova
                <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </Button>

              <p className="text-xs text-gray-500 mt-4">
                Trusted by businesses worldwide
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default NexCodeNova
