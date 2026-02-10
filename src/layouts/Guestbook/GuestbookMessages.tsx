import { useEffect, useState } from "react"

export default function GuestbookMessages({setMessages, messages}: any) {
    useEffect(() => {
        fetch("/api/guestbook-msgs").then(async (data) => {
            const json = await data.json();
            setMessages(json);
        });
    }, []);

    return (
        <>
            {messages.map((message: any) => (
                <div className="message" key={message.id}>
                    <div className="header">
                        {message.website !== "" ? 
                            <a href={message.website.startsWith("http") ? message.website : `https://${message.website}`} className="username">
                                <u>{message.username}</u> <img src="/external.svg" alt={message.website} />
                            </a> : 
                            <span className="username">{message.username}</span>
                        }
                        <span className="time">{message.date}</span>
                    </div>
                    <p>
                        {message.message}
                    </p>
                </div>
            ))}
        </>
    )
}