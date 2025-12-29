import { useState } from "react";
import { Search, Plus, X, Check, ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function ComparisonTool() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setSearching(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/search?q=${query}&limit=5`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setSearching(false);
    }
  };

  const addProduct = (product) => {
    if (selectedProducts.length < 4 && !selectedProducts.find(p => p._id === product._id)) {
      setSelectedProducts([...selectedProducts, product]);
      setSearchTerm("");
      setSearchResults([]);
    }
  };

  const removeProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(p => p._id !== productId));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-blue-600 text-white border-0 px-6 py-2 text-base">
            Product Comparison
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Compare Products <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Side by Side</span>
          </h1>
          <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
            Add up to 4 products to compare features, prices, and specifications
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products to compare..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                handleSearch(e.target.value);
              }}
              className="w-full px-6 py-4 pl-14 text-lg border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <Card className="mt-4 border-2 border-gray-200 shadow-lg">
              <CardContent className="p-4">
                {searchResults.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                    onClick={() => addProduct(product)}
                  >
                    <div className="flex items-center gap-3">
                      {product.image && (
                        <img src={product.image} alt={product.title} className="w-12 h-12 object-cover rounded" />
                      )}
                      <div>
                        <p className="font-semibold">{product.title}</p>
                        <p className="text-sm text-gray-600">${product.price}</p>
                      </div>
                    </div>
                    <Plus className="h-5 w-5 text-primary" />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Selected Products Slots */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[0, 1, 2, 3].map((index) => (
            <div key={index}>
              {selectedProducts[index] ? (
                <Card className="border-2 border-primary relative">
                  <button
                    onClick={() => removeProduct(selectedProducts[index]._id)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <CardContent className="p-4">
                    {selectedProducts[index].image && (
                      <img
                        src={selectedProducts[index].image}
                        alt={selectedProducts[index].title}
                        className="w-full h-32 object-cover rounded mb-3"
                      />
                    )}
                    <h3 className="font-bold mb-2 line-clamp-2">{selectedProducts[index].title}</h3>
                    <p className="text-2xl font-bold text-primary">${selectedProducts[index].price}</p>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-2 border-dashed border-gray-300 h-full flex items-center justify-center min-h-[200px]">
                  <CardContent className="text-center">
                    <Plus className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Add Product {index + 1}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        {selectedProducts.length >= 2 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  <th className="p-4 text-left font-bold border-r border-white/20">Feature</th>
                  {selectedProducts.map((product) => (
                    <th key={product._id} className="p-4 text-center font-bold border-r border-white/20 last:border-r-0">
                      {product.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold bg-gray-50">Price</td>
                  {selectedProducts.map((product) => (
                    <td key={product._id} className="p-4 text-center">
                      <span className="text-2xl font-bold text-primary">${product.price}</span>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold bg-gray-50">Category</td>
                  {selectedProducts.map((product) => (
                    <td key={product._id} className="p-4 text-center">{product.category || "N/A"}</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold bg-gray-50">Description</td>
                  {selectedProducts.map((product) => (
                    <td key={product._id} className="p-4 text-sm">{product.excerpt || product.description || "N/A"}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold bg-gray-50">Action</td>
                  {selectedProducts.map((product) => (
                    <td key={product._id} className="p-4 text-center">
                      <a href={`/post/${product._id}`} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
