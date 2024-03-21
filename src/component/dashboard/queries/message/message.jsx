import { useEffect, useState } from "react"
import "./message.css"

function Message({ message }) 
{
    const [ messageClass, setMessageClass ] = useState("")

    useEffect(() => {
        const author = message.Author;

        if(author.includes("@") && author.includes("."))
        {
            setMessageClass("query-sender-msg")
        }else{
            setMessageClass("query-owner-msg")
        }
    })

    return (
        <div className="query-msg-cont">
            <div className={`query-msg ${messageClass}`}>
                {message.Content}
            </div>
        </div>
    )
}

export default Message