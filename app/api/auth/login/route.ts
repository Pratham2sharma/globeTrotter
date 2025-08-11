import { NextRequest } from "next/server";
import { loginUser } from "../../../../server/controllers/authController";

export async function POST(request: NextRequest) {
  return await loginUser(request);
}