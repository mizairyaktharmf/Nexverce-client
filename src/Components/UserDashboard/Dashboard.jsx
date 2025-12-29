import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Bell, Clock, TrendingDown, User, Mail, Settings } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [savedProducts, setSavedProducts] = useState([]);
  const [priceAlerts, setPriceAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch user data
      const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/user/profile`, {
        credentials: "include"
      });
      const userData = await userResponse.json();
      setUser(userData);

      // Fetch saved products
      const savedResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/user/saved`, {
        credentials: "include"
      });
      const savedData = await savedResponse.json();
      setSavedProducts(savedData);

      // Fetch price alerts
      const alertsResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/user/alerts`, {
        credentials: "include"
      });
      const alertsData = await alertsResponse.json();
      setPriceAlerts(alertsData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50/30">
      {/* Header */}
      <header className="bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-full">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-white">
                Welcome back, {user?.name || "User"}!
              </h1>
              <p className="text-purple-100 mt-1">{user?.email}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-2 border-purple-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Saved Products</CardTitle>
              <Heart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{savedProducts.length}</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Price Alerts</CardTitle>
              <Bell className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{priceAlerts.length}</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Deals</CardTitle>
              <TrendingDown className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">12</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="saved" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Saved Products */}
          <TabsContent value="saved" className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Saved Products</h2>
            {savedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProducts.map((product) => (
                  <Card key={product._id} className="group hover:shadow-xl transition-all">
                    {product.image && (
                      <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
                    )}
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-2">{product.title}</CardTitle>
                      <CardDescription>
                        <span className="text-2xl font-bold text-primary">${product.price}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link to={`/post/${product._id}`}>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                          View Product
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600">No saved products yet</p>
                <Link to="/category/all">
                  <Button className="mt-4">Browse Products</Button>
                </Link>
              </Card>
            )}
          </TabsContent>

          {/* Price Alerts */}
          <TabsContent value="alerts" className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Price Alerts</h2>
            {priceAlerts.length > 0 ? (
              <div className="space-y-4">
                {priceAlerts.map((alert) => (
                  <Card key={alert._id} className="border-2 border-gray-100">
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="flex items-center gap-4">
                        <Bell className="h-8 w-8 text-primary" />
                        <div>
                          <h3 className="font-bold text-lg">{alert.productTitle}</h3>
                          <p className="text-gray-600">Alert when price drops below ${alert.targetPrice}</p>
                          <p className="text-sm text-gray-500 mt-1">Current price: ${alert.currentPrice}</p>
                        </div>
                      </div>
                      <Badge variant={alert.triggered ? "default" : "secondary"}>
                        {alert.triggered ? "Triggered!" : "Active"}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600">No price alerts set</p>
                <p className="text-gray-500 mt-2">Set alerts to get notified when prices drop</p>
              </Card>
            )}
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    defaultValue={user?.name}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                  <span>Email notifications for price drops</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                  <span>Weekly deal digest</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5" />
                  <span>New product recommendations</span>
                </label>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
