import { logoutUser } from "../../../../server/controllers/authController";

export async function POST() {
  return await logoutUser();
}