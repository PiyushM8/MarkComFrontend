import React from "react";
import "./invoicePreview.css";

function CustomerInvoicePreview({ invoice }) {
  const handleViewInvoice = () => {
    window.location.href = `/${invoice.Username}/order/${invoice.InvoiceId}`;
  };

  return (
    <div className="cd-invoice-preview">
      <div className="cd-invoice-preview-header" onClick={handleViewInvoice}>
        <div className="cd-invoice-info-cont">
          <img
            className="cd-invoice-img-preview"
            src={`https://imagedelivery.net/BMDilndsvZPipd90__49rQ/${invoice.ProductImage}/public`}
            alt="Product preview"
          />
          <div className="cd-invoice-p-title-and-id">
            <div className="cd-invoice-p-title">
              {invoice.Quantity}x - {invoice.Title}
            </div>
            <div className="cd-invoice-p-id">Order #: {invoice.InvoiceId}</div>
          </div>
        </div>
        <div className="cd-invoice-p-total">
          <div className="cd-invoice-p-total-header">Total</div>
          <div className="cd-invoice-p-total-price">${invoice.InvoicePrice}</div>
        </div>
        <div className="cd-invoice-p-status">{invoice.InvoiceStatus}</div>
      </div>
    </div>
  );
}

export default CustomerInvoicePreview;
