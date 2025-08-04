import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'db.json')

function readData() {
  const fileData = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(fileData)
}

function writeData(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, username, password } = body

    if (!email || !username || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const db = readData()

    const userExists = db.users.find(
      (u: any) => u.email === email || u.username === username
    )

    if (userExists) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 })
    }

    const newUser = {
      id: Date.now(),
      email,
      username,
      password // ⚠️ Insecure, just for dev
    }

    db.users.push(newUser)
    writeData(db)

    return NextResponse.json({ message: 'User registered', user: newUser }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Server error', detail: error.message },
      { status: 500 }
    )
  }
}
