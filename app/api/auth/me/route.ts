import { NextRequest } from "next/server";
import { getCurrentUser } from "../../../../server/controllers/authController";

export async function GET(request: NextRequest) {
  return await getCurrentUser(request);
}