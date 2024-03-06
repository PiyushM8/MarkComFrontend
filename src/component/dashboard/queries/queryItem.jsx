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
                <div className={`${query.QueryStatus}`}>
                    {query.QueryStatus}
                </div>
            </div>
            <div className="query-item-actions">
                <div className="query-action-item">
                    <div><i className="fas fa-reply"/></div>
                </div>
                <Link to={`/dashboard/queries/${query.QueryId}`} className="query-action-item">
                    <i className="fas fa-edit"/>
                </Link>
                <div className="query-action-item">
                    <div><i className="fas fa-trash"/></div>
                </div>
            </div>
        </div>
    )
}

export default QueryItem