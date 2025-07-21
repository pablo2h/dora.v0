import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

/**
 * GET /api/live-status
 * Returns the current live status of the festival
 */
export async function GET() {
  try {
    const sql = neon(process.env.NEON_DATABASE_URL!);
    
    // Check if live_status table exists, create if not
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
    
    // Get current live status
    const result = await sql`
      SELECT is_live, activated_at, deactivated_at 
      FROM live_status 
      ORDER BY updated_at DESC 
      LIMIT 1
    `;
    
    // If no record exists, create default (not live)
    if (result.length === 0) {
      await sql`
        INSERT INTO live_status (is_live) 
        VALUES (FALSE)
      `;
      
      return NextResponse.json({
        isLive: false,
        activatedAt: null,
        deactivatedAt: null,
        message: 'Festival status initialized'
      });
    }
    
    const status = result[0];
    
    return NextResponse.json({
      isLive: status.is_live,
      activatedAt: status.activated_at,
      deactivatedAt: status.deactivated_at,
      message: status.is_live ? 'Festival is live!' : 'Festival is not live'
    });
    
  } catch (error) {
    console.error('Error getting live status:', error);
    return NextResponse.json(
      { 
        error: 'Failed to get live status',
        isLive: false // Default to not live on error
      }, 
      { status: 500 }
    );
  }
}

/**
 * POST /api/live-status
 * Updates the live status of the festival
 * Body: { isLive: boolean }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { isLive } = body;
    
    if (typeof isLive !== 'boolean') {
      return NextResponse.json(
        { error: 'isLive must be a boolean value' },
        { status: 400 }
      );
    }
    
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
    
    // Update or insert live status
    const timestamp = new Date().toISOString();
    
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
    
    // Log the status change
    console.log(`Festival live status changed to: ${isLive} at ${timestamp}`);
    
    return NextResponse.json({
      success: true,
      isLive,
      timestamp,
      message: isLive 
        ? 'Festival is now live!' 
        : 'Festival live mode deactivated'
    });
    
  } catch (error) {
    console.error('Error updating live status:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update live status',
        success: false
      }, 
      { status: 500 }
    );
  }
}