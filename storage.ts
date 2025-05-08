import { users, type User, type InsertUser } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { analysisRequests, type AnalysisRequest, type InsertAnalysisRequest } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAnalysisRequest(id: number): Promise<AnalysisRequest | undefined>;
  getAllAnalysisRequests(): Promise<AnalysisRequest[]>;
  createAnalysisRequest(request: any): Promise<AnalysisRequest>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAnalysisRequest(id: number): Promise<AnalysisRequest | undefined> {
    const [request] = await db.select().from(analysisRequests).where(eq(analysisRequests.id, id));
    return request || undefined;
  }

  async getAllAnalysisRequests(): Promise<AnalysisRequest[]> {
    return await db.select().from(analysisRequests);
  }

  async createAnalysisRequest(request: any): Promise<AnalysisRequest> {
    const [newRequest] = await db
      .insert(analysisRequests)
      .values(request)
      .returning();
    return newRequest;
  }
}

export const storage = new DatabaseStorage();
