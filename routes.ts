import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { analysisRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create a new analysis request
  app.post("/api/analysis-requests", async (req, res) => {
    try {
      // Validate the request body against the schema
      const validatedData = analysisRequestSchema.parse(req.body);
      
      // Store the analysis request
      const newRequest = await storage.createAnalysisRequest(validatedData);
      
      // Return the created request
      res.status(201).json({ 
        message: "Analysis request created successfully", 
        requestId: newRequest.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ 
        message: "Failed to create analysis request" 
      });
    }
  });

  // Get all analysis requests
  app.get("/api/analysis-requests", async (req, res) => {
    try {
      const requests = await storage.getAllAnalysisRequests();
      res.status(200).json(requests);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to fetch analysis requests" 
      });
    }
  });

  // Get a specific analysis request by ID
  app.get("/api/analysis-requests/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid request ID" });
      }
      
      const request = await storage.getAnalysisRequest(id);
      if (!request) {
        return res.status(404).json({ message: "Analysis request not found" });
      }
      
      res.status(200).json(request);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to fetch analysis request" 
      });
    }
  });

  // Submit contact form message
  app.post("/api/contact", async (req, res) => {
    try {
      // Basic validation
      const { name, email, message } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ message: "Name, email, and message are required" });
      }

      // In a real app, you'd store the message or send it via email
      // For now, we'll just acknowledge receipt
      res.status(200).json({ message: "Contact form submitted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
