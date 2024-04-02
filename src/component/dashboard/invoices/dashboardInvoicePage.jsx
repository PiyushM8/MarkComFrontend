import { Route, Routes } from "react-router-dom";
import "./dashboardInvoicePage.css"
import { useEffect, useState } from "react";

function DashboardInvoicePage() {

    return (
        <div>
            <div className="db-page-containter">
                <div className="db-page-title db-page-item">
                    <h2 className="db-page-title-header">Invoices</h2>

                </div>

                <div className="db-page-item">
                    <div className="invoice-table-cont">
                        <div className="invoice-item-cont invoice-item-head">
                            <div className="invoice-item-email">
                                email
                            </div>
                            <div className="invoice-item-name">
                                name
                            </div>
                            <div className="invoice-item-quanity">
                                quantity
                            </div>
                            <div className="invoice-item-price">
                                Price
                            </div>
                            <div className="invoice-item-status">
                                Status
                            </div>
                            <div className="invoice-item-payment">
                                paymentMethod
                            </div>
                            <div className="invoice-item-creationDate">
                                created
                            </div>
                            <div className="invoice-item-fulfilledDate">
                                fulfilled
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default DashboardInvoicePage;