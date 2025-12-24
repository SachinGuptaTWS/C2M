import { Pool, PoolClient, QueryResult } from '@neondatabase/serverless';

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

export default {
  query: (text: string, params?: any[]): Promise<QueryResult<any>> => pool.query(text, params),
  getClient: (): Promise<PoolClient> => pool.connect(),
  // Add other database methods as needed
};
