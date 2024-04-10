import { Link, useLocation } from "react-router-dom"

import "./queryItem.css"

function QueryItem({ query })
{
    const location = useLocation()

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
                <Link to={`/${location.pathname.split("/")[1]}/messages/${query.QueryId}`} className="query-action-item">
                    <i className="fas fa-reply"/>
                </Link>
            </div>
        </div>
    )
}

export default QueryItem