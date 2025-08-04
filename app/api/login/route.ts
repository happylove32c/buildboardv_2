import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// Location of your mock database
const DB_PATH = path.join(process.cwd(), "db.json")

// Helper to read user data
function readUsers() {
  const file = fs.readFileSync(DB_PATH, "utf-8")
  const data = JSON.parse(file)
  return data.users || []
}

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()

    if (!username || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const users = readUsers()
    const user = users.find(
      (u: any) => u.username === username && u.password === password
    )

    if (!user) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
    }

    return NextResponse.json({
      message: "Login successful",
      user: { id: user.id, username: user.username },
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    )
  }
}
