import "./dashboardCouponPage.css";

function DashboardCouponPage() {
    return (
        <div>
        <div className="db-page-containter">
            <div className="db-page-title db-page-item">
                <h2 className="db-page-title-header">Coupons</h2>
            </div>

            <div className="db-page-item">
                <div className="coupon-table-cont">
                    <div className="coupon-item-cont coupon-item-head">
                            <div className="coupon-item-code">
                                Code
                            </div>
                            <div className="coupon-item-type">
                                Type
                            </div>
                            <div className="coupon-item-discount">
                                Discount
                            </div>
                            <div className="coupon-item-use">
                                Use
                            </div>
                            <div className="coupon-item-max">
                                Max usage
                            </div>
                    </div>
                </div>
             </div>
    
        </div>
</div>
    );
}

export default DashboardCouponPage;