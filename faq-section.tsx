import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqItems } from "@/lib/utils";

export function FaqSection() {
  return (
    <section id="faq" className="py-16 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about our crypto analysis service.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border-none"
            >
              <AccordionTrigger className="px-5 py-4 font-medium text-gray-900 dark:text-white hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
