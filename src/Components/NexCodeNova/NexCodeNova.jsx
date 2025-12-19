import { ExternalLink, Sparkles, Code2, Rocket } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'

function NexCodeNova() {
  return (
    <section id="nexcodenova" className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Card className="bg-gradient-to-br from-[#667eea] to-[#764ba2] border-0 shadow-2xl overflow-hidden">
          <div className="relative p-12 md:p-16">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 text-center">
              <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
                <Sparkles className="h-3 w-3 mr-1" />
                Premium Development
              </Badge>

              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Build Dream Projects with <br />
                <span className="inline-flex items-center gap-3 mt-2">
                  <Code2 className="h-10 w-10 md:h-12 md:w-12" />
                  NexCode Nova
                  <Rocket className="h-10 w-10 md:h-12 md:w-12" />
                </span>
              </h2>

              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                Transform your ideas into reality with cutting-edge development solutions
              </p>

              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-[#667eea] hover:bg-gray-100 shadow-xl hover:shadow-2xl group font-bold text-lg px-8 py-6 h-auto"
                onClick={() => window.open("https://www.nexcodenova.com", "_blank")}
              >
                Explore NexCode Nova
                <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>

              {/* Stats or Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
                {[
                  { label: "Premium Quality", icon: Sparkles },
                  { label: "Fast Delivery", icon: Rocket },
                  { label: "Expert Developers", icon: Code2 },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <Icon className="h-6 w-6 text-white mx-auto mb-2" />
                      <p className="text-white font-semibold">{item.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

export default NexCodeNova
