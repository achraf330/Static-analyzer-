import { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { CheckCircle, ShieldCheck, FileText, Clock3 } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FormStep, FormProgress } from "@/components/ui/form-step";
import { CryptoHoldingInput, type CryptoHolding } from "@/components/shared/crypto-holding-input";
import { SuccessDialog } from "@/components/shared/success-dialog";
import { FaqSection } from "@/components/shared/faq-section";
import { investmentGoalsOptions, riskAppetiteOptions, timeframeOptions, TRON_WALLET_ADDRESS } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  investmentGoals: z.string({ required_error: "Please select an investment goal" }),
  riskAppetite: z.string({ required_error: "Please select your risk appetite" }),
  timeframe: z.string({ required_error: "Please select your investment timeframe" }),
  holdings: z.array(
    z.object({
      id: z.string(),
      coin: z.string().min(1, "Please select a coin"),
      quantity: z.number().min(0.000001, "Please enter a valid quantity"),
      avgBuyPrice: z.number().min(0.000001, "Please enter a valid price"),
    })
  ).min(1, "Please add at least one holding"),
  txHash: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Home() {
  const [, navigate] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      investmentGoals: "",
      riskAppetite: "",
      timeframe: "",
      holdings: [{
        id: "default",
        coin: "",
        quantity: 0,
        avgBuyPrice: 0
      }],
      txHash: "",
    },
  });

  const { formState } = form;

  const submitAnalysisRequest = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await apiRequest("POST", "/api/analysis-requests", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/analysis-requests"] });
      setShowSuccessDialog(true);
    }
  });

  const nextStep = async () => {
    if (currentStep === 1) {
      const isValid = await form.trigger(["name", "email", "investmentGoals", "riskAppetite", "timeframe"]);
      if (isValid) setCurrentStep(2);
    } else if (currentStep === 2) {
      const isValid = await form.trigger("holdings");
      if (isValid) setCurrentStep(3);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: FormValues) => {
    submitAnalysisRequest.mutate(data);
  };

  const closeSuccessDialog = () => {
    setShowSuccessDialog(false);
    form.reset();
    setCurrentStep(1);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                Professional <span className="text-primary-600 dark:text-primary-500">Crypto Analytics</span> for Informed Decisions
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Get a comprehensive analysis of your crypto portfolio with personalized recommendations from our expert analysts.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                  <ShieldCheck className="text-green-500 h-5 w-5" />
                  <span className="text-sm font-medium">Bank-Level Security</span>
                </div>
                <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                  <FileText className="text-green-500 h-5 w-5" />
                  <span className="text-sm font-medium">Data Privacy</span>
                </div>
                <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                  <Clock3 className="text-green-500 h-5 w-5" />
                  <span className="text-sm font-medium">24 Hour Delivery</span>
                </div>
              </div>
              <Button 
                size="lg" 
                onClick={() => {
                  const analyzerForm = document.getElementById("analyzer-form");
                  if (analyzerForm) {
                    analyzerForm.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="px-6"
              >
                Get Your Analysis Now
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Crypto analytics dashboard image */}
              <img 
                src="https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Cryptocurrency analytics dashboard" 
                className="rounded-xl shadow-xl" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Comprehensive Crypto Intelligence</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Our expert team analyzes your portfolio and market conditions to deliver actionable insights tailored to your investment goals.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600 dark:text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Portfolio Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300">Get a detailed breakdown of your portfolio performance, risk metrics, and diversification score.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600 dark:text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Market Insights</h3>
              <p className="text-gray-600 dark:text-gray-300">Our experts analyze market trends, sentiment, and on-chain data to predict potential movements.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600 dark:text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Strategic Recommendations</h3>
              <p className="text-gray-600 dark:text-gray-300">Receive tailored recommendations on asset allocation, entry/exit points, and risk management.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Analyzer Form */}
      <section id="analyzer-form" className="py-16 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Get Your Personalized Analysis</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Fill in the details below to receive your comprehensive crypto portfolio analysis. We never ask for passwords or private keys.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Your Information</h3>
                <div className="flex items-center text-green-600 dark:text-green-500">
                  <ShieldCheck className="mr-1 h-4 w-4" />
                  <span className="text-sm font-medium">Secure & Encrypted</span>
                </div>
              </div>
              <FormProgress step={currentStep} totalSteps={3} />
            </div>
            
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormStep isActive={currentStep === 1}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="name">Name (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              id="name" 
                              placeholder="Your name" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="email">Email Address <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input 
                              id="email" 
                              placeholder="you@example.com" 
                              {...field} 
                              required 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="investmentGoals"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="investment-goals">Investment Goals <span className="text-red-500">*</span></FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger id="investment-goals">
                              <SelectValue placeholder="Select your primary goal" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {investmentGoalsOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="riskAppetite"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="risk-appetite">Risk Appetite <span className="text-red-500">*</span></FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger id="risk-appetite">
                                <SelectValue placeholder="Select risk level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {riskAppetiteOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="timeframe"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="timeframe">Investment Timeframe <span className="text-red-500">*</span></FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger id="timeframe">
                                <SelectValue placeholder="Select timeframe" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timeframeOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="button" 
                      onClick={nextStep}
                      className="px-6"
                    >
                      Continue to Portfolio <span className="ml-1">→</span>
                    </Button>
                  </div>
                </FormStep>
                
                <FormStep isActive={currentStep === 2}>
                  <FormField
                    control={form.control}
                    name="holdings"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <CryptoHoldingInput 
                            holdings={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep}
                    >
                      <span className="mr-1">←</span> Previous
                    </Button>
                    <Button 
                      type="button" 
                      onClick={nextStep}
                    >
                      Continue to Payment <span className="ml-1">→</span>
                    </Button>
                  </div>
                </FormStep>
                
                <FormStep isActive={currentStep === 3}>
                  <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Payment Details</h3>
                      <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-500 px-2 py-1 rounded font-medium">Secure Payment</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300">Comprehensive Analysis</span>
                        <span className="font-medium">10 USDT</span>
                      </div>
                      
                      <div className="flex items-center justify-center bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <div className="text-center space-y-2">
                          {/* Wallet address would be an image in a real implementation */}
                          <div className="inline-block p-3 bg-gray-100 dark:bg-gray-900 rounded-lg">
                            <svg viewBox="0 0 100 100" className="w-32 h-32 mx-auto">
                              <rect width="100" height="100" fill="#ffffff" />
                              <text x="50" y="50" dominantBaseline="middle" textAnchor="middle" fontSize="8" fill="#000000">TRC20 Address Placeholder</text>
                            </svg>
                          </div>
                          <div className="text-sm font-medium text-gray-800 dark:text-gray-200">TRC20 USDT Address</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-900 py-1 px-2 rounded">
                            {TRON_WALLET_ADDRESS}
                          </div>
                          <Button 
                            type="button" 
                            variant="link" 
                            className="text-xs text-primary-600 dark:text-primary-500 hover:underline p-0 h-auto"
                            onClick={() => navigator.clipboard.writeText(TRON_WALLET_ADDRESS)}
                          >
                            <svg className="w-3 h-3 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg> 
                            Copy Address
                          </Button>
                        </div>
                      </div>
                      
                      <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-3 text-amber-800 dark:text-amber-500 text-sm">
                        <p className="font-medium">Important:</p>
                        <p>Send only USDT via the TRC20 network. Other networks or coins may result in loss of funds. After payment, your report will be sent to your email within 24 hours.</p>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="txHash"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="tx-hash">Transaction Hash (after payment)</FormLabel>
                            <FormControl>
                              <Input 
                                id="tx-hash" 
                                placeholder="Enter transaction hash/ID" 
                                {...field} 
                              />
                            </FormControl>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">This helps us verify your payment faster</p>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep}
                    >
                      <span className="mr-1">←</span> Previous
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={submitAnalysisRequest.isPending}
                    >
                      {submitAnalysisRequest.isPending ? "Submitting..." : "Submit & Complete"} {!submitAnalysisRequest.isPending && <CheckCircle className="ml-1 h-4 w-4" />}
                    </Button>
                  </div>
                </FormStep>
              </form>
            </FormProvider>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Discover how our crypto analysis has helped investors make informed decisions.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4 text-amber-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">"The analysis provided insightful recommendations that helped me rebalance my portfolio. The risk assessment was spot on, and I've seen a 15% improvement in performance."</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 mr-3">
                  <span>JD</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">James D.</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Long-term Investor</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4 text-amber-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">"I was skeptical at first, but the detailed market analysis was eye-opening. They identified undervalued assets in my portfolio that I hadn't considered. Worth every penny."</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 mr-3">
                  <span>SK</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Sarah K.</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Crypto Enthusiast</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4 text-amber-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">"As a day trader, I needed specific insights about market movements. The technical analysis in the report gave me an edge, especially for altcoin positions. Highly recommend!"</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 mr-3">
                  <span>MT</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Michael T.</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Active Trader</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection />

      {/* Support Section */}
      <section id="support" className="py-16 px-4 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Need Assistance?</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Our support team is available to help with any questions about our crypto analysis service.</p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-primary-600 dark:text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Email Support</h3>
                    <p className="text-gray-600 dark:text-gray-300">support@onpointcrypto.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-primary-600 dark:text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Response Time</h3>
                    <p className="text-gray-600 dark:text-gray-300">Within 24 hours, 7 days a week</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-primary-600 dark:text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Telegram</h3>
                    <p className="text-gray-600 dark:text-gray-300">@ONPOINTCryptoSupport</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Contact</h3>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="contact-name">Name</Label>
                  <Input id="contact-name" placeholder="Your name" />
                </div>
                
                <div>
                  <Label htmlFor="contact-email">Email</Label>
                  <Input id="contact-email" type="email" placeholder="Your email" />
                </div>
                
                <div>
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea id="contact-message" rows={4} placeholder="How can we help?" />
                </div>
                
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <SuccessDialog 
        isOpen={showSuccessDialog} 
        onClose={closeSuccessDialog} 
        email={form.getValues("email")} 
      />
    </>
  );
}
