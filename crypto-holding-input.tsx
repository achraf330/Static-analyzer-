import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { cryptoOptions, formatCurrency, generateUniqueId } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export type CryptoHolding = {
  id: string;
  coin: string;
  quantity: number;
  avgBuyPrice: number;
};

type CryptoHoldingInputProps = {
  holdings: CryptoHolding[];
  onChange: (holdings: CryptoHolding[]) => void;
};

export function CryptoHoldingInput({ holdings, onChange }: CryptoHoldingInputProps) {
  // Initialize with at least one empty holding if none provided
  useEffect(() => {
    if (holdings.length === 0) {
      onChange([
        {
          id: generateUniqueId(),
          coin: "",
          quantity: 0,
          avgBuyPrice: 0,
        },
      ]);
    }
  }, []);

  const addHolding = () => {
    const newHolding = {
      id: generateUniqueId(),
      coin: "",
      quantity: 0,
      avgBuyPrice: 0,
    };
    onChange([...holdings, newHolding]);
  };

  const removeHolding = (id: string) => {
    onChange(holdings.filter((holding) => holding.id !== id));
  };

  const updateHolding = (id: string, field: keyof CryptoHolding, value: string | number) => {
    onChange(
      holdings.map((holding) =>
        holding.id === id ? { ...holding, [field]: value } : holding
      )
    );
  };

  const calculateValue = (quantity: number, price: number) => {
    return quantity * price;
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-medium">Your Crypto Holdings</h3>
          <span className="ml-auto text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-2 py-1 rounded font-medium">
            Add all your holdings
          </span>
        </div>

        <AnimatePresence>
          {holdings.map((holding, index) => (
            <motion.div
              key={holding.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="holding-entry bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-4"
            >
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 sm:col-span-3">
                  <Label htmlFor={`coin-${holding.id}`} className="text-xs text-gray-500 dark:text-gray-400">
                    Coin/Token
                  </Label>
                  <Select
                    value={holding.coin}
                    onValueChange={(value) => updateHolding(holding.id, "coin", value)}
                  >
                    <SelectTrigger id={`coin-${holding.id}`} className="w-full h-10">
                      <SelectValue placeholder="Select coin" />
                    </SelectTrigger>
                    <SelectContent>
                      {cryptoOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-12 sm:col-span-3">
                  <Label htmlFor={`quantity-${holding.id}`} className="text-xs text-gray-500 dark:text-gray-400">
                    Quantity
                  </Label>
                  <Input
                    id={`quantity-${holding.id}`}
                    type="number"
                    step="any"
                    placeholder="0.00"
                    value={holding.quantity || ""}
                    onChange={(e) => updateHolding(holding.id, "quantity", parseFloat(e.target.value) || 0)}
                    className="h-10"
                  />
                </div>

                <div className="col-span-12 sm:col-span-3">
                  <Label htmlFor={`price-${holding.id}`} className="text-xs text-gray-500 dark:text-gray-400">
                    Avg Buy Price ($)
                  </Label>
                  <Input
                    id={`price-${holding.id}`}
                    type="number"
                    step="any"
                    placeholder="0.00"
                    value={holding.avgBuyPrice || ""}
                    onChange={(e) => updateHolding(holding.id, "avgBuyPrice", parseFloat(e.target.value) || 0)}
                    className="h-10"
                  />
                </div>

                <div className="col-span-10 sm:col-span-2 flex items-end">
                  <div className="text-sm font-medium py-2">
                    Value:{" "}
                    <span className="text-primary-600 dark:text-primary-400">
                      {formatCurrency(calculateValue(holding.quantity, holding.avgBuyPrice))}
                    </span>
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1 flex items-end justify-end">
                  {holdings.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeHolding(holding.id)}
                      className="h-10 w-10 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove holding</span>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <Button
          type="button"
          variant="outline"
          onClick={addHolding}
          className="w-full py-2 border border-dashed mt-2"
        >
          + Add Another Coin
        </Button>
      </div>
    </div>
  );
}
