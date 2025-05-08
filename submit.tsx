import { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { SuccessDialog } from "@/components/shared/success-dialog";
import { ShieldCheck } from "lucide-react";
import { investmentGoalsOptions, riskAppetiteOptions, timeframeOptions, TRON_WALLET_ADDRESS } from "@/lib/utils";

// Define the form schema with validation
const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  investmentGoals: z.string({ required_error: "Please select an investment goal" }),
  riskAppetite: z.string({ required_error: "Please select your risk appetite" }),
  timeframe: z.string({ required_error: "Please select your investment timeframe" }),
  holdings: z.array(
    z.object({
      id: z.string(),
      coin: z.string().min(1, "Please specify a coin"),
      quantity: z.number().min(0.000001, "Please enter a valid quantity"),
      avgBuyPrice: z.number().min(0.000001, "Please enter a valid price"),
    })
  ).min(1, "Please add at least one holding"),
  txHash: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Submit() {
  const [, navigate] = useLocation();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [holdings, setHoldings] = useState([
    { id: "default", coin: "", quantity: 0, avgBuyPrice: 0 }
  ]);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      investmentGoals: "",
      riskAppetite: "",
      timeframe: "",
      holdings: holdings,
      txHash: "",
    },
  });

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

  const onSubmit = (data: FormValues) => {
    submitAnalysisRequest.mutate(data);
  };

  const closeSuccessDialog = () => {
    setShowSuccessDialog(false);
    form.reset();
    navigate("/");
  };

  const addHolding = () => {
    const newHoldings = [...holdings, { id: Math.random().toString(), coin: "", quantity: 0, avgBuyPrice: 0 }];
    setHoldings(newHoldings);
    form.setValue("holdings", newHoldings);
  };

  const removeHolding = (id: string) => {
    if (holdings.length <= 1) return; // Always keep at least one holding
    const newHoldings = holdings.filter(h => h.id !== id);
    setHoldings(newHoldings);
    form.setValue("holdings", newHoldings);
  };

  const updateHolding = (id: string, field: "coin" | "quantity" | "avgBuyPrice", value: string | number) => {
    const newHoldings = holdings.map(h => 
      h.id === id ? { ...h, [field]: field === "coin" ? value : Number(value) } : h
    );
    setHoldings(newHoldings);
    form.setValue("holdings", newHoldings);
  };

  return (
    <>
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Submit Your Portfolio For Analysis
            </h2>
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
            </div>
            
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Your Crypto Holdings</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Enter your cryptocurrency holdings below. You can add as many as you need.
                  </p>
                  
                  {holdings.map((holding, index) => (
                    <motion.div
                      key={holding.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 sm:col-span-3">
                          <Label htmlFor={`coin-${holding.id}`}>Coin/Token</Label>
                          <Input
                            id={`coin-${holding.id}`}
                            name={`holdings.${index}.coin`}
                            value={holding.coin}
                            onChange={(e) => updateHolding(holding.id, "coin", e.target.value)}
                            placeholder="BTC, ETH, SOL, etc."
                            className="mt-1"
                          />
                          {form.formState.errors.holdings?.[index]?.coin && (
                            <p className="text-sm text-red-500 mt-1">
                              {form.formState.errors.holdings[index]?.coin?.message}
                            </p>
                          )}
                        </div>
                        
                        <div className="col-span-12 sm:col-span-3">
                          <Label htmlFor={`quantity-${holding.id}`}>Quantity</Label>
                          <Input
                            id={`quantity-${holding.id}`}
                            name={`holdings.${index}.quantity`}
                            type="number"
                            step="any"
                            value={holding.quantity || ""}
                            onChange={(e) => updateHolding(holding.id, "quantity", e.target.value)}
                            placeholder="0.00"
                            className="mt-1"
                          />
                          {form.formState.errors.holdings?.[index]?.quantity && (
                            <p className="text-sm text-red-500 mt-1">
                              {form.formState.errors.holdings[index]?.quantity?.message}
                            </p>
                          )}
                        </div>
                        
                        <div className="col-span-12 sm:col-span-3">
                          <Label htmlFor={`price-${holding.id}`}>Avg Buy Price ($)</Label>
                          <Input
                            id={`price-${holding.id}`}
                            name={`holdings.${index}.avgBuyPrice`}
                            type="number"
                            step="any"
                            value={holding.avgBuyPrice || ""}
                            onChange={(e) => updateHolding(holding.id, "avgBuyPrice", e.target.value)}
                            placeholder="0.00"
                            className="mt-1"
                          />
                          {form.formState.errors.holdings?.[index]?.avgBuyPrice && (
                            <p className="text-sm text-red-500 mt-1">
                              {form.formState.errors.holdings[index]?.avgBuyPrice?.message}
                            </p>
                          )}
                        </div>
                        
                        <div className="col-span-12 sm:col-span-3 flex items-end justify-center">
                          {index > 0 && (
                            <Button 
                              type="button" 
                              variant="destructive" 
                              size="sm"
                              onClick={() => removeHolding(holding.id)}
                              className="mt-1"
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={addHolding}
                    className="w-full"
                  >
                    + Add Another Coin
                  </Button>
                </div>
                
                {/* File Upload Section */}
                <div className="space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium">Portfolio Screenshots (Optional)</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    If you'd like to provide additional context, you can upload screenshots of your exchange or wallet balances.
                  </p>
                  
                  <div className="mt-4">
                    <label 
                      htmlFor="portfolio-screenshots" 
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, or PDF (MAX. 10MB)</p>
                      </div>
                      <input 
                        id="portfolio-screenshots" 
                        type="file" 
                        className="hidden" 
                        accept=".png,.jpg,.jpeg,.pdf" 
                        multiple 
                        onChange={(e) => {
                          // File upload handling logic will go here
                          console.log('Files selected:', e.target.files);
                        }} 
                      />
                    </label>
                  </div>
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    All uploaded files are securely stored and deleted after analysis is complete.
                  </div>
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
                          placeholder="Enter your transaction hash here after payment" 
                          {...field} 
                        />
                      </FormControl>
                      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Please send 10 USDT (TRC20) to <span className="font-mono font-medium text-primary">{TRON_WALLET_ADDRESS}</span> and paste your transaction hash here.
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    className="px-8"
                    disabled={submitAnalysisRequest.isPending}
                  >
                    {submitAnalysisRequest.isPending ? "Submitting..." : "Submit for Analysis"}
                  </Button>
                </div>
              </form>
            </FormProvider>
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