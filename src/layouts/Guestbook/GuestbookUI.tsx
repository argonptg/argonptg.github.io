import { useState } from "react";
import GuestbookInputs from "./GuestbookInputs";
import "./GuestbookUI.scss";
import GuestbookMessages from "./GuestbookMessages";

/**
 * TODO LIST
 * 1. Create a ui for the guestbook (text field for the message, username field and submit button, possibly even a captcha)
 * 2. Load data from turso
 * 3. Show data
 */
function formatDate(date = new Date()) {
  const pad = (n: number) => String(n).padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  const offsetMinutes = -date.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? '+' : '-';
  const offsetH = Math.floor(Math.abs(offsetMinutes) / 60);
  const offsetM = Math.abs(offsetMinutes) % 60;
  const tz = offsetM === 0
    ? `TZ:${sign}${offsetH}`
    : `TZ:${sign}${offsetH}:${pad(offsetM)}`;

  return `${year}-${month}-${day} ${hours}:${minutes} ${tz}`;
}

interface Message {
    username: string,
    message: string,
    website: string,
    date: string
}

export default function GuestbookUI() {
    const [inputs, setInputs] = useState({
        username: "",
        message: "",
        website: "",
    });

    const [messages, setMessages] = useState<Message[]>([]);

    function handleInput(key: string, value: string) {        
        setInputs((prevInput) => {
            return {
                ...prevInput,
                [key]: value
            }
        });
    }

    async function handleSubmit() {
        const date = formatDate();

        fetch(`/api/guestbook-post`, {
            method: "POST",
            body: JSON.stringify({
                username: inputs.username,
                message: inputs.message,
                website: inputs.website,
                date: date
            })
        }).then(async (data) => {
            const json = await data.json()
            
            const dataFormatted = {
                ...inputs,
                id: -1,
                date: date
            }

            setMessages((otherMessages) => {
                return [
                    dataFormatted,
                    ...otherMessages,
                ]
            })
        })
    
    }

    return (
        <>
            <GuestbookInputs onChange={handleInput} onSubmit={handleSubmit}/>
            <GuestbookMessages messages={messages} setMessages={setMessages}/>
        </>
    )
}