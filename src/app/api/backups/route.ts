export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const BASE_DIR = path.join(process.cwd(), 'backups', 'data')

function ensureDir() {
  if (!fs.existsSync(BASE_DIR)) {
    fs.mkdirSync(BASE_DIR, { recursive: true })
  }
}

export async function GET() {
  try {
    ensureDir()
    const files = fs.readdirSync(BASE_DIR)
    return NextResponse.json({ files })
  } catch (e) {
    return NextResponse.json({ error: 'backup_list_failed' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    ensureDir()
    const filename = `backup-${Date.now()}.json`
    fs.writeFileSync(path.join(BASE_DIR, filename), JSON.stringify(body, null, 2))
    return NextResponse.json({ ok: true, filename })
  } catch (e) {
    return NextResponse.json({ error: 'backup_write_failed' }, { status: 500 })
  }
}

