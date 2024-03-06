import { useEffect, useState } from "react"
import "./message.css"

function Message({ message }) 
{
    const [ messageClass, setMessageClass ] = useState({})

    useEffect(() => {
        const author = message.Author;

        if(author.includes("@") && author.includes("."))
        {
            setMessageClass("query-sender-msg")
        }
    })

    return (<div className="query-sender-msg">
        <div>
            {message.Content}
        </div>
    </div>)
}

export default Message