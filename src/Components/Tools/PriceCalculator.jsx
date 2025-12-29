import { useState } from "react";
import { Calculator, DollarSign, TrendingUp, PieChart } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function PriceCalculator() {
  const [calculatorType, setCalculatorType] = useState("roi"); // roi, savings, comparison
  const [inputs, setInputs] = useState({
    initialInvestment: 0,
    monthlyRevenue: 0,
    monthlyExpenses: 0,
    currentPrice: 0,
    discountedPrice: 0,
    productA: 0,
    productB: 0
  });
  const [result, setResult] = useState(null);

  const calculateROI = () => {
    const { initialInvestment, monthlyRevenue, monthlyExpenses } = inputs;
    const monthlyProfit = monthlyRevenue - monthlyExpenses;
    const annualProfit = monthlyProfit * 12;
    const roi = ((annualProfit - initialInvestment) / initialInvestment) * 100;
    const breakEvenMonths = initialInvestment / monthlyProfit;

    setResult({
      type: "ROI",
      data: {
        roi: roi.toFixed(2),
        monthlyProfit: monthlyProfit.toFixed(2),
        annualProfit: annualProfit.toFixed(2),
        breakEvenMonths: breakEvenMonths.toFixed(1)
      }
    });
  };

  const calculateSavings = () => {
    const { currentPrice, discountedPrice } = inputs;
    const savings = currentPrice - discountedPrice;
    const savingsPercent = (savings / currentPrice) * 100;

    setResult({
      type: "Savings",
      data: {
        savings: savings.toFixed(2),
        savingsPercent: savingsPercent.toFixed(2),
        finalPrice: discountedPrice.toFixed(2)
      }
    });
  };

  const calculateComparison = () => {
    const { productA, productB } = inputs;
    const difference = Math.abs(productA - productB);
    const percentDiff = ((difference / Math.max(productA, productB)) * 100).toFixed(2);
    const cheaper = productA < productB ? "Product A" : "Product B";

    setResult({
      type: "Comparison",
      data: {
        difference: difference.toFixed(2),
        percentDiff,
        cheaper,
        productA: productA.toFixed(2),
        productB: productB.toFixed(2)
      }
    });
  };

  const handleCalculate = () => {
    if (calculatorType === "roi") calculateROI();
    else if (calculatorType === "savings") calculateSavings();
    else if (calculatorType === "comparison") calculateComparison();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-full">
              <Calculator className="h-12 w-12 text-white" />
            </div>
          </div>
          <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-blue-600 text-white border-0 px-6 py-2 text-base">
            Smart Calculators
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Financial <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Calculators</span>
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto">
            Calculate ROI, savings, and compare prices to make smarter purchasing decisions
          </p>
        </div>
      </section>

      {/* Calculator Selection */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => { setCalculatorType("roi"); setResult(null); }}
            className={`p-6 border-2 rounded-xl transition-all ${
              calculatorType === "roi"
                ? "border-primary bg-gradient-to-r from-purple-50 to-blue-50"
                : "border-gray-200 hover:border-primary"
            }`}
          >
            <TrendingUp className={`h-8 w-8 mx-auto mb-3 ${calculatorType === "roi" ? "text-primary" : "text-gray-400"}`} />
            <h3 className="font-bold text-lg">ROI Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Return on Investment</p>
          </button>

          <button
            onClick={() => { setCalculatorType("savings"); setResult(null); }}
            className={`p-6 border-2 rounded-xl transition-all ${
              calculatorType === "savings"
                ? "border-primary bg-gradient-to-r from-purple-50 to-blue-50"
                : "border-gray-200 hover:border-primary"
            }`}
          >
            <DollarSign className={`h-8 w-8 mx-auto mb-3 ${calculatorType === "savings" ? "text-primary" : "text-gray-400"}`} />
            <h3 className="font-bold text-lg">Savings Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate Discounts</p>
          </button>

          <button
            onClick={() => { setCalculatorType("comparison"); setResult(null); }}
            className={`p-6 border-2 rounded-xl transition-all ${
              calculatorType === "comparison"
                ? "border-primary bg-gradient-to-r from-purple-50 to-blue-50"
                : "border-gray-200 hover:border-primary"
            }`}
          >
            <PieChart className={`h-8 w-8 mx-auto mb-3 ${calculatorType === "comparison" ? "text-primary" : "text-gray-400"}`} />
            <h3 className="font-bold text-lg">Price Comparison</h3>
            <p className="text-sm text-gray-600 mt-1">Compare Products</p>
          </button>
        </div>

        {/* Input Form */}
        <Card className="border-2 border-purple-100 shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">
              {calculatorType === "roi" && "ROI Calculator"}
              {calculatorType === "savings" && "Savings Calculator"}
              {calculatorType === "comparison" && "Price Comparison"}
            </CardTitle>
            <CardDescription>
              {calculatorType === "roi" && "Calculate your return on investment"}
              {calculatorType === "savings" && "See how much you'll save"}
              {calculatorType === "comparison" && "Compare two product prices"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {calculatorType === "roi" && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Initial Investment ($)</label>
                    <input
                      type="number"
                      value={inputs.initialInvestment}
                      onChange={(e) => setInputs({ ...inputs, initialInvestment: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                      placeholder="1000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Monthly Revenue ($)</label>
                    <input
                      type="number"
                      value={inputs.monthlyRevenue}
                      onChange={(e) => setInputs({ ...inputs, monthlyRevenue: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                      placeholder="500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Monthly Expenses ($)</label>
                    <input
                      type="number"
                      value={inputs.monthlyExpenses}
                      onChange={(e) => setInputs({ ...inputs, monthlyExpenses: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                      placeholder="200"
                    />
                  </div>
                </>
              )}

              {calculatorType === "savings" && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Original Price ($)</label>
                    <input
                      type="number"
                      value={inputs.currentPrice}
                      onChange={(e) => setInputs({ ...inputs, currentPrice: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                      placeholder="100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Discounted Price ($)</label>
                    <input
                      type="number"
                      value={inputs.discountedPrice}
                      onChange={(e) => setInputs({ ...inputs, discountedPrice: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                      placeholder="75"
                    />
                  </div>
                </>
              )}

              {calculatorType === "comparison" && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Product A Price ($)</label>
                    <input
                      type="number"
                      value={inputs.productA}
                      onChange={(e) => setInputs({ ...inputs, productA: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                      placeholder="99"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Product B Price ($)</label>
                    <input
                      type="number"
                      value={inputs.productB}
                      onChange={(e) => setInputs({ ...inputs, productB: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                      placeholder="149"
                    />
                  </div>
                </>
              )}

              <Button
                onClick={handleCalculate}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-lg py-6"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calculate
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <Card className="border-2 border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-green-800">Results</CardTitle>
            </CardHeader>
            <CardContent>
              {result.type === "ROI" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Return on Investment</p>
                    <p className="text-4xl font-bold text-primary">{result.data.roi}%</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Monthly Profit</p>
                    <p className="text-4xl font-bold text-green-600">${result.data.monthlyProfit}</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Annual Profit</p>
                    <p className="text-4xl font-bold text-green-600">${result.data.annualProfit}</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Break Even Time</p>
                    <p className="text-4xl font-bold text-blue-600">{result.data.breakEvenMonths} months</p>
                  </div>
                </div>
              )}

              {result.type === "Savings" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">You Save</p>
                    <p className="text-4xl font-bold text-green-600">${result.data.savings}</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Discount</p>
                    <p className="text-4xl font-bold text-orange-600">{result.data.savingsPercent}%</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Final Price</p>
                    <p className="text-4xl font-bold text-primary">${result.data.finalPrice}</p>
                  </div>
                </div>
              )}

              {result.type === "Comparison" && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl text-center">
                    <p className="text-lg text-gray-600 mb-2">{result.data.cheaper} is cheaper by</p>
                    <p className="text-5xl font-bold text-green-600 mb-2">${result.data.difference}</p>
                    <p className="text-2xl text-gray-700">({result.data.percentDiff}% difference)</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-xl text-center">
                      <p className="text-sm text-gray-600 mb-1">Product A</p>
                      <p className="text-3xl font-bold text-primary">${result.data.productA}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl text-center">
                      <p className="text-sm text-gray-600 mb-1">Product B</p>
                      <p className="text-3xl font-bold text-primary">${result.data.productB}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
