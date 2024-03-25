
import  "./dashboardFeedbackPage.css";



function DashboardFeedbackPage() {
    return (
    <div>
        <div className="db-page-containter">
            <div className="db-page-title db-page-item">
                <h2 className="db-page-title-header">Feedback</h2>
            </div>

            <div className="db-page-item">
                <div className="feedback-table-cont">
                    <div className="feedback-item-cont feedback-item-head">
                            <div className="feedback-item-rating">
                                Rating
                            </div>
                            <div className="feedback-item-created">
                                Created
                            </div>
                            <div className="feedback-item-message">
                                Message
                            </div>
                    </div>
                </div>
             </div>
    
        </div>
</div>
    );
}

export default DashboardFeedbackPage;