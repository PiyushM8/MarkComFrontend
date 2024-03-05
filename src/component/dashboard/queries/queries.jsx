import { Link } from "react-router-dom";
import "./queries.css";
import { useEffect, useState } from "react";
import QueryItem from "./queryItem";
import { getQueriesBySellerId } from "../../../services/query";

function Queries() {

    const [ queries, setQueries ] = useState([])

    const loadQueries = async () => {
        const response = await getQueriesBySellerId()
        setQueries(response.data)
    }

    useEffect(() => {
        loadQueries()
    }, [])

    return (
        <div className="db-page-containter">
            <div className="db-page-title db-page-item">
                <h2 className="db-page-title-header">Queries</h2>

            </div>
            <div className="db-page-item">
                <div className="query-item-cont query-table-head">
                    <div className="query-item-sender query-table-header-item">
                        Sender
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
        </div>
    );
}

export default Queries;
