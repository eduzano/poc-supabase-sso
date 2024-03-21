import {createClient} from "/lib/supabase/middleware";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const {supabase, response} = createClient(req);
    await supabase.auth.getSession();
    console.log('asdads')

    if(!req.nextUrl.searchParams.has('code')) {
      const { data, error } = await supabase.auth.signInWithSSO({
        domain: 'lowcoding.xyz',
        options: {
          redirectTo: `http://localhost:3000/auth/callback`
        }
      })
  
      if (!error) 
              return NextResponse.redirect(data.url);      
    }
    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};