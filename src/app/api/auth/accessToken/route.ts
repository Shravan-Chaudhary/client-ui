import { cookies } from "next/headers";
import { AUTH_TOKENS } from "@/lib/cookies";

export async function GET() {
    return Response.json({ token: cookies().get(AUTH_TOKENS.ACCESS_TOKEN)?.value });
}
