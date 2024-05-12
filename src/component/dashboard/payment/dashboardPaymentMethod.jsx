import "./dashboardPaymentMethod.css";

function DashboardPaymentMethod() {
    return (
        <div>
        <div className="db-page-containter">
            <div className="db-page-title db-page-item">
                <h2 className="db-page-title-header">Payment Method</h2>
            </div>

            <div className="db-page-item">
                <div className="payment-table-cont">
                    <div className="payment-item-cont payment-item-head">
                            <div className="payment-item-name">
                                Cardholder Name
                            </div>                     
                            <div className="payment-item-number">
                                Card Number
                            </div>              
                            <div className="payment-item-exp">
                                Expiration Date 
                            </div>       
                            <div className="payment-item-sec">
                                Security Code
                            </div>        
                    </div>
                </div>
             </div>
    
        </div>
</div>
    );
}

export default DashboardPaymentMethod;