import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import "./queries.css"
import Message from "./message/message"
import { getMessagesByQueryId } from "../../../services/message"

function QueryMessage()
{
    const location = useLocation()
    const [ messages, setMessages ] = useState([])

    const loadMessage = async () => {
        const queryId = location.pathname.split("/")[3]
        const response = await getMessagesByQueryId(queryId)
        setMessages(response.data)
    }

    useEffect(() => {
        loadMessage()
    }, [])

    return (
        <div className="db-query-msg-containter">
            <div>
                {messages.map((message) => {
                    return <Message message={message}/>
                })}
            </div>
            <input className="db-query-response-input" placeholder="Enter your response..."/>
        </div>
    )
}

export default QueryMessage