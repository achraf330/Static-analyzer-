import { useState } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Info, TrendingUp, TrendingDown, AlertTriangle, ArrowUpRight, ChevronRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useLocation } from "wouter";

// Sample data
const samplePortfolio = [
  { id: 1, name: "Bitcoin", symbol: "BTC", amount: 1, price: 70000, value: 70000, allocation: 46.67, change24h: 2.3, recommendation: "Hold" },
  { id: 2, name: "Solana", symbol: "SOL", amount: 100, price: 100, value: 10000, allocation: 6.67, change24h: 5.7, recommendation: "Buy" },
  { id: 3, name: "Ethereum", symbol: "ETH", amount: 10, price: 3500, value: 35000, allocation: 23.33, change24h: -1.2, recommendation: "Hold" },
  { id: 4, name: "Cardano", symbol: "ADA", amount: 5000, price: 0.5, value: 2500, allocation: 1.67, change24h: 0.9, recommendation: "Sell" },
  { id: 5, name: "BNB", symbol: "BNB", amount: 20, price: 500, value: 10000, allocation: 6.67, change24h: -0.8, recommendation: "Hold" },
  { id: 6, name: "XRP", symbol: "XRP", amount: 10000, price: 0.5, value: 5000, allocation: 3.33, change24h: 3.4, recommendation: "Buy" },
  { id: 7, name: "Polygon", symbol: "MATIC", amount: 5000, price: 0.8, value: 4000, allocation: 2.67, change24h: 7.8, recommendation: "Buy" },
  { id: 8, name: "Chainlink", symbol: "LINK", amount: 500, price: 15, value: 7500, allocation: 5.00, change24h: 4.2, recommendation: "Hold" },
  { id: 9, name: "Dogecoin", symbol: "DOGE", amount: 20000, price: 0.1, value: 2000, allocation: 1.33, change24h: -2.5, recommendation: "Sell" },
  { id: 10, name: "Uniswap", symbol: "UNI", amount: 200, price: 15, value: 3000, allocation: 2.00, change24h: 1.9, recommendation: "Hold" },
];

const totalValue = samplePortfolio.reduce((sum, coin) => sum + coin.value, 0);

// Time-series data for price chart
const bitcoinHistoricalData = [
  { date: "2023-01", price: 16500 },
  { date: "2023-02", price: 21000 },
  { date: "2023-03", price: 19000 },
  { date: "2023-04", price: 28000 },
  { date: "2023-05", price: 27000 },
  { date: "2023-06", price: 30000 },
  { date: "2023-07", price: 29000 },
  { date: "2023-08", price: 26000 },
  { date: "2023-09", price: 27000 },
  { date: "2023-10", price: 34000 },
  { date: "2023-11", price: 37000 },
  { date: "2023-12", price: 42000 },
  { date: "2024-01", price: 45000 },
  { date: "2024-02", price: 52000 },
  { date: "2024-03", price: 68000 },
  { date: "2024-04", price: 70000 },
];

const solanaHistoricalData = [
  { date: "2023-01", price: 12 },
  { date: "2023-02", price: 20 },
  { date: "2023-03", price: 18 },
  { date: "2023-04", price: 22 },
  { date: "2023-05", price: 20 },
  { date: "2023-06", price: 15 },
  { date: "2023-07", price: 25 },
  { date: "2023-08", price: 22 },
  { date: "2023-09", price: 30 },
  { date: "2023-10", price: 32 },
  { date: "2023-11", price: 55 },
  { date: "2023-12", price: 70 },
  { date: "2024-01", price: 85 },
  { date: "2024-02", price: 110 },
  { date: "2024-03", price: 95 },
  { date: "2024-04", price: 100 },
];

// Allocation data for pie chart
const allocationData = samplePortfolio.map(coin => ({
  name: coin.symbol,
  value: coin.allocation
}));

const COLORS = [
  "#3B82F6", "#10B981", "#F97316", "#8B5CF6", 
  "#EC4899", "#F43F5E", "#EF4444", "#F59E0B", 
  "#84CC16", "#06B6D4", "#6366F1"
];

// Risk metrics data
const riskMetrics = [
  { name: "Portfolio Volatility", value: "Medium-High (32.8%)" },
  { name: "Sharpe Ratio", value: "1.4" },
  { name: "Beta", value: "1.3" },
  { name: "Correlation to BTC", value: "0.75" },
  { name: "Maximum Drawdown", value: "24.5%" },
];

// Market insights data
const marketInsights = [
  {
    title: "Bitcoin Halving Impact",
    description: "The recent Bitcoin halving is expected to reduce selling pressure as miner rewards are cut in half. Historically, this has led to price appreciation in the 12-18 months following the event."
  },
  {
    title: "Layer 1 Competition",
    description: "Solana has shown strong momentum in both price and ecosystem growth. Its high throughput capabilities continue to attract developers and users, particularly in DeFi and NFT sectors."
  },
  {
    title: "Regulatory Landscape",
    description: "Recent regulatory clarity in major markets has reduced uncertainty, potentially opening the door for increased institutional adoption, particularly for Bitcoin and Ethereum."
  },
  {
    title: "AI and Blockchain Integration",
    description: "Projects combining AI and blockchain technology are gaining significant traction. Consider allocating a small portion of your portfolio to this emerging sector."
  }
];

// Recommendations
const portfolioRecommendations = [
  {
    title: "Rebalance BTC and ETH Allocations",
    description: "Your Bitcoin allocation (46.67%) is above our recommended range of 30-40% for your risk profile. Consider taking some profits from BTC and increasing your ETH position to a 40/30 BTC/ETH split.",
    importance: "high"
  },
  {
    title: "Increase Solana Exposure",
    description: "Solana has shown strong technical improvements and ecosystem growth. Consider increasing your position by 3-5% of total portfolio value.",
    importance: "medium"
  },
  {
    title: "Reduce Meme Coin Exposure",
    description: "Your Dogecoin position (1.33%) represents unnecessary risk without fundamental value drivers. Consider exiting this position during market strength.",
    importance: "high"
  },
  {
    title: "Add Stablecoin Reserve",
    description: "Your portfolio lacks dry powder for market opportunities. Consider maintaining 5-10% in stablecoins to capitalize on potential market corrections.",
    importance: "medium"
  },
  {
    title: "Implement Dollar-Cost Averaging",
    description: "With current market volatility, implement a DCA strategy for new capital deployment, particularly for your primary holdings (BTC, ETH, SOL).",
    importance: "low"
  }
];

export default function SampleAnalysis() {
  const [selectedCoin, setSelectedCoin] = useState("BTC");
  const [, navigate] = useLocation();
  
  const getCoinData = (symbol: string) => {
    return samplePortfolio.find(coin => coin.symbol === symbol);
  };
  
  const getHistoricalData = (symbol: string) => {
    if (symbol === "BTC") return bitcoinHistoricalData;
    if (symbol === "SOL") return solanaHistoricalData;
    return bitcoinHistoricalData; // Fallback
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-16 px-4 transition-colors duration-300">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Sample Portfolio Analysis
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            This is an example of the professional analysis you'll receive. The sample portfolio includes 1 BTC, 100 SOL, and other cryptocurrencies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">Portfolio Overview</CardTitle>
                <CardDescription>Total value: {formatCurrency(totalValue)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={allocationData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name} ${value}%`}
                      >
                        {allocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4">
                  <h4 className="text-lg font-semibold mb-2">Allocation Summary</h4>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <ul className="space-y-1">
                      <li>- High concentration in Bitcoin (46.67%) and Ethereum (23.33%)</li>
                      <li>- Limited exposure to DeFi tokens (7.33%)</li>
                      <li>- No stablecoin reserve for market opportunities</li>
                      <li>- Missing exposure to emerging sectors (AI, Gaming)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">Risk Assessment</CardTitle>
                <CardDescription>Portfolio volatility and metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskMetrics.map((metric, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">{metric.name}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{metric.value}</span>
                    </div>
                  ))}
                  
                  <Separator className="my-4" />
                  
                  <div className="pt-2">
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                      <h4 className="font-semibold">Risk Overview</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Your portfolio risk level is <span className="font-medium text-amber-600 dark:text-amber-400">higher than recommended</span> for your stated moderate risk appetite. 
                      Consider reducing concentration in volatile assets.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl font-bold">Asset Performance</CardTitle>
                  <CardDescription>Historical price data and projections</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant={selectedCoin === "BTC" ? "default" : "outline"} 
                    onClick={() => setSelectedCoin("BTC")}
                    size="sm"
                  >
                    BTC
                  </Button>
                  <Button 
                    variant={selectedCoin === "SOL" ? "default" : "outline"} 
                    onClick={() => setSelectedCoin("SOL")}
                    size="sm"
                  >
                    SOL
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={getHistoricalData(selectedCoin)}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke="#3B82F6"
                      fillOpacity={1}
                      fill="url(#colorPrice)"
                      name={`${selectedCoin} Price`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                    Performance Summary
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {selectedCoin === "BTC" 
                      ? "Bitcoin has shown strong performance over the past 16 months, with price appreciation of over 300%. Recent halving event is expected to provide continued upward pressure on price due to reduced supply issuance."
                      : "Solana has demonstrated exceptional growth, recovering from the FTX collapse and establishing itself as a major Layer 1 contender. Technical improvements have resolved previous stability issues."
                    }
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Info className="h-4 w-4 mr-1 text-blue-500" />
                    Outlook & Strategy
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {selectedCoin === "BTC" 
                      ? "We recommend maintaining a substantial Bitcoin position but taking partial profits as price approaches $80,000. Consider using a trailing stop-loss strategy to secure gains while allowing for further upside."
                      : "Increase Solana allocation to 8-10% of portfolio. The ecosystem growth and institutional adoption support a bullish long-term view, though short-term volatility is expected."
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">Key Recommendations</CardTitle>
                <CardDescription>Actionable steps to optimize your portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolioRecommendations.map((rec, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Badge variant={rec.importance === 'high' ? "destructive" : rec.importance === 'medium' ? "default" : "outline"}>
                          {rec.importance.charAt(0).toUpperCase() + rec.importance.slice(1)} Priority
                        </Badge>
                        <h4 className="ml-2 font-semibold">{rec.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {rec.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">Market Insights</CardTitle>
                <CardDescription>Current trends affecting your portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketInsights.map((insight, index) => (
                    <div key={index} className="border-l-4 border-primary pl-3 py-1">
                      <h4 className="font-semibold text-sm">{insight.title}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                        {insight.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="mb-8"
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold">Holdings Analysis</CardTitle>
              <CardDescription>Detailed performance and recommendations by asset</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Asset</th>
                      <th className="text-right py-3 px-4">Amount</th>
                      <th className="text-right py-3 px-4">Price</th>
                      <th className="text-right py-3 px-4">Value</th>
                      <th className="text-right py-3 px-4">Allocation</th>
                      <th className="text-right py-3 px-4">24h Change</th>
                      <th className="text-center py-3 px-4">Recommendation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {samplePortfolio.map((coin) => (
                      <tr key={coin.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <td className="py-3 px-4 font-medium">{coin.name} ({coin.symbol})</td>
                        <td className="py-3 px-4 text-right">{coin.amount.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right">{formatCurrency(coin.price)}</td>
                        <td className="py-3 px-4 text-right">{formatCurrency(coin.value)}</td>
                        <td className="py-3 px-4 text-right">{coin.allocation}%</td>
                        <td className="py-3 px-4 text-right">
                          <span className={`${coin.change24h >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center justify-end`}>
                            {coin.change24h >= 0 ? 
                              <TrendingUp className="h-3 w-3 mr-1" /> : 
                              <TrendingDown className="h-3 w-3 mr-1" />
                            }
                            {coin.change24h}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge variant={
                            coin.recommendation === "Buy" ? "default" : 
                            coin.recommendation === "Sell" ? "destructive" : 
                            "outline"
                          }>
                            {coin.recommendation}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mb-8"
        >
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Disclaimer</AlertTitle>
            <AlertDescription>
              This is a sample analysis for demonstration purposes only. Actual cryptocurrency investments involve high risk. 
              Our professional analysis is based on extensive research but does not constitute financial advice. 
              Always conduct your own research before making investment decisions.
            </AlertDescription>
          </Alert>
        </motion.div>
        
        <div className="flex justify-center">
          <Button 
            size="lg" 
            onClick={() => navigate("/submit")}
            className="px-8"
          >
            Get Your Personalized Analysis <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}