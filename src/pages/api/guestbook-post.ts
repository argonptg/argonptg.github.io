export const prerender = false;

import { createClient } from "@libsql/client"
import { DB_URL } from "astro:env/client";
import { AUTH_TOKEN } from "astro:env/server";

export const POST = (async ({request}: any) => {
    const body = await request.json()

    const turso = createClient({
        url: DB_URL,
        authToken: AUTH_TOKEN
    })

    await turso.execute({
        sql: "INSERT INTO data (username, message, website, date) VALUES (:username, :message, :website, :date);",
        args: {
            username: body.username,
            message: body.message,
            website: body.website,
            date: body.date
        }
    })

    turso.close(); // close so no memory leak

    return new Response(JSON.stringify({
        status: 200
    }), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    })
});