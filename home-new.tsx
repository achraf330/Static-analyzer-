import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  FileText, 
  Clock3, 
  ChevronRight, 
  ChevronDown, 
  BarChart4, 
  Sparkles, 
  TrendingUp 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const clientReviews = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Retail Investor",
    comment: "The analysis was eye-opening. I never realized how unbalanced my portfolio was until I got my report. Their recommendations helped me diversify properly.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "DeFi Enthusiast",
    comment: "Extremely detailed analysis that goes beyond basic metrics. Their insights on DeFi protocols were particularly valuable and helped me optimize my strategy.",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    role: "Long-term Holder",
    comment: "Worth every penny. The tax optimization strategies alone saved me thousands. I've renewed my subscription for quarterly portfolio reviews.",
    rating: 4,
  },
  {
    id: 4,
    name: "Emma Wilson",
    role: "Active Trader",
    comment: "As someone who trades frequently, I was skeptical about getting an analysis. The actionable entry/exit points they provided have improved my success rate significantly.",
    rating: 5,
  },
];

export default function Home() {
  const [, navigate] = useLocation();
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  
  // Auto-rotate reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => 
        prevIndex === clientReviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Animation refs for scroll animations
  const featureRef = useRef(null);
  const [featureInView, setFeatureInView] = useState(false);
  
  const howItWorksRef = useRef(null);
  const [howItWorksInView, setHowItWorksInView] = useState(false);
  
  const reviewsRef = useRef(null);
  const [reviewsInView, setReviewsInView] = useState(false);
  
  // Simple scroll observer for animation triggers
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target === featureRef.current) {
            if (entry.isIntersecting) setFeatureInView(true);
          } else if (entry.target === howItWorksRef.current) {
            if (entry.isIntersecting) setHowItWorksInView(true);
          } else if (entry.target === reviewsRef.current) {
            if (entry.isIntersecting) setReviewsInView(true);
          }
        });
      },
      { threshold: 0.3, root: null }
    );
    
    if (featureRef.current) observer.observe(featureRef.current);
    if (howItWorksRef.current) observer.observe(howItWorksRef.current);
    if (reviewsRef.current) observer.observe(reviewsRef.current);
    
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute -top-20 -left-20 w-40 h-40 bg-primary/10 dark:bg-primary/5 rounded-full blur-2xl"
              />
              
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary-600 dark:text-primary-400 font-medium text-sm"
              >
                Professional Crypto Analysis
              </motion.span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                Transform Your Crypto 
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-violet-600 dark:from-primary-400 dark:to-violet-400"
                > Portfolio</motion.span>
              </h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg"
              >
                Get expert analysis of your crypto holdings with personalized recommendations tailored to your investment goals and risk profile.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Button 
                  size="lg" 
                  onClick={() => navigate("/submit")}
                  className="px-8 rounded-full shadow-lg shadow-primary/30 dark:shadow-primary/10"
                >
                  Get Your Analysis <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate("/sample")}
                  className="px-8 rounded-full border-gray-300 dark:border-gray-600"
                >
                  View Sample Report
                </Button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-6 flex flex-wrap gap-6"
              >
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="text-green-500 h-5 w-5" />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Bank-Level Security</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="text-green-500 h-5 w-5" />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Data Privacy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock3 className="text-green-500 h-5 w-5" />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">24 Hour Delivery</span>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-500/10 dark:to-purple-500/10 rounded-3xl blur-2xl transform rotate-6"></div>
              
              <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-gray-900 px-6 py-4 flex justify-between items-center">
                  <h3 className="text-white font-semibold">Portfolio Analysis</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Portfolio Allocation</h3>
                    <div className="h-6 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "45%" }}
                        transition={{ delay: 1.0, duration: 1 }}
                        className="h-full bg-blue-500"
                      ></motion.div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-gray-500 dark:text-gray-400">Bitcoin (45%)</span>
                      <span className="text-blue-500 font-medium">$70,000</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="h-6 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "30%" }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="h-full bg-purple-500"
                      ></motion.div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-gray-500 dark:text-gray-400">Ethereum (30%)</span>
                      <span className="text-purple-500 font-medium">$45,000</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="h-6 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "15%" }}
                        transition={{ delay: 1.4, duration: 1 }}
                        className="h-full bg-green-500"
                      ></motion.div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-gray-500 dark:text-gray-400">Solana (15%)</span>
                      <span className="text-green-500 font-medium">$25,000</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="h-6 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "10%" }}
                        transition={{ delay: 1.6, duration: 1 }}
                        className="h-full bg-amber-500"
                      ></motion.div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-gray-500 dark:text-gray-400">Others (10%)</span>
                      <span className="text-amber-500 font-medium">$10,000</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-gray-700 rounded-lg">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.8, duration: 0.8 }}
                      className="flex items-start"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Key Recommendation</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                          Consider rebalancing your BTC position to capture emerging opportunities in Layer 1 alternatives like Solana.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Background design elements */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/30 to-purple-500/30 dark:from-primary/10 dark:to-purple-500/10 blur-3xl rounded-full"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-blue-500/30 to-teal-500/30 dark:from-blue-500/10 dark:to-teal-500/10 blur-3xl rounded-full"
        />
      </section>

      {/* Features Section */}
      <section ref={featureRef} className="py-16 md:py-24 px-4 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Comprehensive Crypto Intelligence</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg">
              Our expert team analyzes your portfolio and market conditions to deliver actionable insights tailored to your investment goals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={featureInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-8"
            >
              <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-6">
                <BarChart4 className="w-7 h-7 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Portfolio Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Get a detailed breakdown of your portfolio performance, risk metrics, diversification score, and correlation analysis.
              </p>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  Risk-adjusted performance metrics
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  Diversification optimization
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  Historical volatility assessment
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={featureInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-8"
            >
              <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Market Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our experts analyze market trends, sentiment, and on-chain data to predict potential movements and opportunities.
              </p>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  Technical and fundamental analysis
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  On-chain metrics interpretation
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  Regulatory impact assessment
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={featureInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-8"
            >
              <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Strategic Recommendations
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Receive tailored recommendations on asset allocation, entry/exit points, and risk management strategies.
              </p>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  Personalized rebalancing guidance
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  Tax-optimized strategies
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  Risk-adjusted growth opportunities
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section ref={howItWorksRef} className="py-16 md:py-24 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg">
              A simple three-step process to get your personalized crypto portfolio analysis
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 md:gap-14">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={howItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">1</div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 h-full">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Submit Your Portfolio</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Fill out our secure form with your crypto holdings, investment goals, risk tolerance, and timeframe. No private keys or passwords required.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-8 transform -translate-y-1/2">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 15H22M22 15L16 9M22 15L16 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 dark:text-gray-600" />
                </svg>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={howItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative"
            >
              <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">2</div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 h-full">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Complete Payment</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Send 10 USDT via TRC20 to our secure wallet address. Paste your transaction hash to confirm payment.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-8 transform -translate-y-1/2">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 15H22M22 15L16 9M22 15L16 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 dark:text-gray-600" />
                </svg>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={howItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="relative"
            >
              <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">3</div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 h-full">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Receive Your Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Within 24 hours, you'll receive a comprehensive PDF report with detailed analysis and actionable recommendations via email.
                </p>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-16 flex justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/submit")}
              className="px-8 rounded-full shadow-lg shadow-primary/20"
            >
              Get Started Now <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section ref={reviewsRef} className="py-16 md:py-24 px-4 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">What Our Clients Say</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg">
              Trusted by crypto investors of all experience levels
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={reviewsInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg p-8 md:p-10 relative"
            >
              <div className="absolute -top-5 left-10 text-6xl text-primary-300 dark:text-primary-800">"</div>
              
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentReviewIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="min-h-[160px] flex flex-col justify-center"
                  >
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 italic mb-6">
                      {clientReviews[currentReviewIndex].comment}
                    </p>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xl font-bold text-primary">
                        {clientReviews[currentReviewIndex].name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{clientReviews[currentReviewIndex].name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{clientReviews[currentReviewIndex].role}</p>
                      </div>
                      <div className="ml-auto flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-5 h-5 ${i < clientReviews[currentReviewIndex].rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <div className="mt-8 flex justify-center space-x-2">
                {clientReviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReviewIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentReviewIndex === index ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
          
          <div className="mt-16 flex justify-center">
            <Button 
              size="lg"
              onClick={() => navigate("/sample")} 
              variant="outline"
              className="px-8 rounded-full"
            >
              View Sample Analysis <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-primary-600 to-violet-600 dark:from-primary-900 dark:to-violet-900 text-white transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Optimize Your Crypto Portfolio?</h2>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10">
              Get professional insights tailored to your investment goals and risk profile. 
              Maximize returns and minimize risks with our expert analysis.
            </p>
            
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate("/submit")}
              className="px-10 py-6 rounded-full text-primary-600 bg-white hover:bg-gray-100 shadow-xl"
            >
              <span className="text-lg">Get Your Personalized Analysis</span>
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}