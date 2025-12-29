import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Lightbulb } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export default function BuyingGuideDetail() {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGuide();
  }, [id]);

  const fetchGuide = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/buying-guides/${id}`);
      const data = await response.json();
      setGuide(data);
    } catch (error) {
      console.error("Error fetching guide:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Guide not found</p>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/buying-guides">
            <Button variant="outline" className="mb-6 text-white border-white hover:bg-white/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Guides
            </Button>
          </Link>
          {guide.category && (
            <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white border-0">
              {guide.category}
            </Badge>
          )}
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            {guide.title}
          </h1>
          <p className="text-xl text-purple-100 leading-relaxed">
            {guide.description}
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Image */}
        {guide.image && (
          <img
            src={guide.image}
            alt={guide.title}
            className="w-full h-auto rounded-2xl shadow-xl mb-12"
          />
        )}

        {/* Key Points */}
        {guide.keyPoints && guide.keyPoints.length > 0 && (
          <Card className="mb-12 border-2 border-purple-100 bg-gradient-to-r from-purple-50 to-blue-50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-purple-600" />
                Key Takeaways
              </h2>
              <ul className="space-y-3">
                {guide.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-lg text-gray-800">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          {guide.content && (
            <div dangerouslySetInnerHTML={{ __html: guide.content }} />
          )}
        </div>

        {/* Related Products */}
        {guide.relatedProducts && guide.relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="text-3xl font-bold mb-8">Recommended Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guide.relatedProducts.map((product) => (
                <Link key={product._id} to={`/post/${product._id}`}>
                  <Card className="hover:shadow-xl transition-all border-2 border-gray-100 h-full">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{product.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">${product.price}</span>
                        <Button variant="outline" size="sm">
                          View Product
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
