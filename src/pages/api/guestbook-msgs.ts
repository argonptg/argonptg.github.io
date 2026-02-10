export const prerender = false;

import { createClient } from "@libsql/client";
import { DB_URL } from "astro:env/client";
import { AUTH_TOKEN } from "astro:env/server";

export const GET = async () => {
    const turso = createClient({
        url: DB_URL,
        authToken: AUTH_TOKEN
    })

    const data = await turso.execute("SELECT * FROM data ORDER BY id DESC");

    return new Response(JSON.stringify(data.rows));
}
