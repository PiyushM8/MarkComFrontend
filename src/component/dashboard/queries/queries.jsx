import { Route, Routes } from "react-router-dom";
import "./queries.css";
import { useEffect, useState } from "react";
import QueryItem from "./queryItem";
import { getQueriesByUser } from "../../../services/query";
import QueryMessage from "./queryMessage";

function Queries() {

    const [ queries, setQueries ] = useState([])

    const loadQueries = async () => {
        const response = await getQueriesByUser()
        console.log(response.data)
        setQueries(response.data)
        const userDetails = window.sessionStorage.getItem("UserDetails")
        const user = JSON.parse(userDetails)
        let showElements;

        if(user.AccountType === "Customer")
        {
            showElements = document.getElementsByClassName("query-sender-hidden")
        }else{
            showElements = document.getElementsByClassName("query-store-hidden")
        }
        for(let i = 0; i < showElements.length;i++)
        {
            const element = showElements[i]
            element.style.display = "block"
        }
    }

    useEffect(() => {
        loadQueries()
    }, [])

    return (
        <div className="db-page-containter">
            <div className="db-page-title db-page-item">
                <h2 className="db-page-title-header">Messages</h2>
            </div>
            <div className="db-page-item">
                <Routes>
                    <Route path="/" element={
                        <div>
                            <div className="query-item-cont query-table-head">
                                <div className="query-store-hidden query-item-sender query-table-header-item">
                                    Sender
                                </div>
                                <div className="query-sender-hidden query-item-sender query-table-header-item">
                                    Store
                                </div>
                                <div className="query-item-reason">
                                    Reason
                                </div>
                                <div className="query-item-status">
                                    Status
                                </div>
                                <div className="query-item-actions">
                                    Actions
                                </div>
                            </div>
                            
                            {queries.map((query) => {
                                return <QueryItem key={query.queryId} query={query}/>
                            })}
                        </div>
                    }/>
                    <Route path={`/*`} element={<QueryMessage/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default Queries;
