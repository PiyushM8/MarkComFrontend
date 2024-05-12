import "./dashboardCategoriesPage.css";


function DashboardCategoriesPage() {
    return (
        <div>
        <div className="db-page-containter">
            <div className="db-page-title db-page-item">
                <h2 className="db-page-title-header">Categories</h2>
            </div>

            <div className="db-page-item">
                <div className="cat-table-cont">
                    <div className="cat-item-cont cat-item-head">
                            <div className="cat-item-rating">
                                Product
                            </div>
                            <div className="cat-item-category">
                                Category/Department
                            </div>
                    </div>
                </div>
             </div>
    
        </div>
</div>
    );
}

export default DashboardCategoriesPage;