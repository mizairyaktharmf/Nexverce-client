import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

function DealOfTheDay({ deals }) {
  const navigate = useNavigate();

  // Always show 8 card slots (6-8 as requested)
  const TOTAL_SLOTS = 8;

  // Get the 8 latest deals, sorted by creation date
  const latestDeals = deals
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, TOTAL_SLOTS);

  // Create array of 8 slots
  const dealSlots = Array.from({ length: TOTAL_SLOTS }, (_, index) => {
    return latestDeals[index] || null;
  });

  return (
    <div className="mb-16">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-2 rounded-lg">
          <Clock className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Deal of the Day
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Limited time offers you don't want to miss
          </p>
        </div>
      </div>

      {/* Grid of Deals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {dealSlots.map((deal, index) => {
          if (deal) {
            // Show actual deal
            return (
              <Card
                key={deal._id}
                className="overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer border-2 border-gray-100 hover:border-red-400/50 bg-white"
                onClick={() => navigate(`/post/${deal._id}`)}
              >
                {/* Image */}
                <div className="relative h-32 overflow-hidden bg-gradient-to-br from-red-100 to-orange-100">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={deal.image || "https://via.placeholder.com/400x200"}
                    alt={deal.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Deal Badge */}
                  <Badge
                    variant="destructive"
                    className="absolute top-2 right-2 text-xs font-semibold bg-red-500 text-white border-0 shadow-lg animate-pulse"
                  >
                    Limited Time
                  </Badge>
                </div>

                {/* Content */}
                <CardHeader className="p-4 space-y-1.5 bg-gradient-to-b from-white to-red-50/30">
                  <CardTitle className="text-base font-bold line-clamp-1 text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                    {deal.title}
                  </CardTitle>
                  <CardDescription className="text-xs line-clamp-2 text-gray-600 leading-relaxed">
                    {deal.description || "Exclusive deal - grab it now!"}
                  </CardDescription>
                </CardHeader>

                {/* CTA */}
                <CardFooter className="p-4 pt-0 bg-gradient-to-b from-red-50/30 to-white">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full h-8 text-xs font-semibold text-red-600 bg-white border-2 border-red-500/20 hover:border-red-500 hover:!bg-gradient-to-r hover:!from-red-500 hover:!to-orange-500 hover:!text-white transition-all duration-300 shadow-sm hover:shadow-lg"
                  >
                    <span className="group-hover/btn:scale-105 transition-transform duration-300">
                      Grab Deal
                    </span>
                  </Button>
                </CardFooter>
              </Card>
            );
          } else {
            // Show empty placeholder
            return (
              <Card
                key={`deal-empty-${index}`}
                className="overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50"
              >
                {/* Empty Image */}
                <div className="relative h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-gray-300" />
                </div>

                {/* Empty Content */}
                <CardHeader className="p-4 space-y-1.5">
                  <CardTitle className="text-base font-bold text-gray-400">
                    Deal Slot {index + 1}
                  </CardTitle>
                  <CardDescription className="text-xs text-gray-400">
                    No deal available yet
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
    </div>
  );
}

export default DealOfTheDay;
