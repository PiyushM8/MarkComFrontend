import { Link } from "react-router-dom"

import "./queryItem.css"

function QueryItem({ query })
{
    return (
        <div className="query-item-cont">
            <div className="query-item-sender">
                {query.Email}
            </div>
            <div className="query-item-reason">
                {query.Reason}
            </div>
            <div className="query-item-status">
                {query.Status}
            </div>
            <div className="query-item-actions">
                <div className="query-action-item">
                    <div><i class="fas fa-eye"/></div>
                </div>
                <Link to={`/dashboard/querys/edit/${query.QueryId}`} className="query-action-item">
                    <i class="fas fa-edit"/>
                </Link>
                <div className="query-action-item">
                    <div><i class="fas fa-trash"/></div>
                </div>
            </div>
        </div>
    )
}

export default QueryItem