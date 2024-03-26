import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { addMessageToQueryId, getMessagesByQueryId } from "../../../services/message"
import { getQueryById } from "../../../services/query"
import Message from "../../dashboard/queries/message/message"

function ContactPage()
{
    const location = useLocation()
    const navigator = useNavigate()
    const queryId = location.pathname.split("/")[3]
    const storeName = location.pathname.split("/")[1]

    const [ messages, setMessages ] = useState([])
    const [ query, setQuery ] = useState({})
    const [ response, setResponse] = useState('');
    const [ successfulUpload, setSuccessfulUpload] = useState(false);

    const loadMessage = async () => 
    {
        // Get the query
        const queryResponse = await getQueryById(queryId)
        
        const queryResponseStatus = queryResponse.status
        // Make sure the query exist
        if(queryResponseStatus === 404)
        {
            navigator("/404")
        
        // Make sure query was successfully retrieved
        }else if(queryResponseStatus === 500){
            navigator("/500")
        }else{

            // Get the messages for the query
            const messagesResponse = await getMessagesByQueryId(queryId)

            // Store messages in variable
            const retrievedMessages = messagesResponse.data

            setMessages(retrievedMessages)
            setQuery(queryResponse.data)
        }
    }

    const handleInputChange = (event) => {
        setResponse(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const ownerResponse = document.getElementById("owner-response").value
        
        const response = await addMessageToQueryId(queryId, ownerResponse)
        const responseStatus = response.status;

        if(responseStatus === 200)
        {
            alert("Created Message")
            setSuccessfulUpload(!successfulUpload)
        }else{
            alert("Failed to create Message")
        }
    }

    useEffect(() => {
        console.log("fd")
        loadMessage()
    }, [successfulUpload])

    return(
        <div className="store-query-messenger-container">
            <div className="db-query-messenger-header">
                Messages with {storeName}
            </div>
            <div className="query-messages-cont">
                {messages.map((message) => {
                    return <Message message={message}/>
                })}
            </div>
            <form className="db-query-respond-cont" onSubmit={handleSubmit}>
                <input id="owner-response"className="db-query-response-input" placeholder="Enter your response..." onChange={handleInputChange}/>
                <input className="db-query-response-btn" type="submit" value="Reply" disabled={!response.trim()}/>
            </form>
        </div>
    )
}

export default ContactPage