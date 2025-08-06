import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

/**
 * POST /api/set-live-status
 * Activates or deactivates the live status of the festival
 * This endpoint is designed to be called by Vercel Cron Jobs
 * 
 * Body: { 
 *   action: 'activate' | 'deactivate',
 *   secret?: string // Optional secret for security
 * }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, secret } = body;
    
    // Optional security check with environment variable
    if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    if (!action || !['activate', 'deactivate'].includes(action)) {
      return NextResponse.json(
        { error: 'Action must be "activate" or "deactivate"' },
        { status: 400 }
      );
    }
    
    const isLive = action === 'activate';
    const sql = neon(process.env.NEON_DATABASE_URL!);
    
    // Ensure table exists
    await sql`
      CREATE TABLE IF NOT EXISTS live_status (
        id SERIAL PRIMARY KEY,
        is_live BOOLEAN NOT NULL DEFAULT FALSE,
        activated_at TIMESTAMP,
        deactivated_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    const timestamp = new Date().toISOString();
    
    // Insert new status record
    await sql`
      INSERT INTO live_status (
        is_live, 
        activated_at, 
        deactivated_at,
        updated_at
      ) VALUES (
        ${isLive},
        ${isLive ? timestamp : null},
        ${!isLive ? timestamp : null},
        ${timestamp}
      )
    `;
    
    // Log the status change for monitoring
    const logMessage = `Festival ${action}d at ${timestamp}`;
    console.log(logMessage);
    
    // Optional: Send notification or webhook here
    // await sendNotification(logMessage);
    
    return NextResponse.json({
      success: true,
      action,
      isLive,
      timestamp,
      message: isLive 
        ? 'Festival has been activated and is now live!' 
        : 'Festival live mode has been deactivated'
    });
    
  } catch (error) {
    console.error('Error setting live status:', error);
    return NextResponse.json(
      { 
        error: 'Failed to set live status',
        success: false,
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}

/**
 * GET /api/set-live-status
 * Returns information about this endpoint for testing
 */
export async function GET() {
  return NextResponse.json({
    endpoint: '/api/set-live-status',
    method: 'POST',
    description: 'Activates or deactivates festival live status',
    usage: {
      body: {
        action: 'activate | deactivate',
        secret: 'optional security token'
      }
    },
    examples: {
      activate: {
        action: 'activate',
        secret: 'your-secret-token'
      },
      deactivate: {
        action: 'deactivate',
        secret: 'your-secret-token'
      }
    },
    cronJobExample: {
      url: 'https://your-domain.com/api/set-live-status',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'activate',
        secret: process.env.CRON_SECRET || 'your-secret-token'
      })
    }
  });
}