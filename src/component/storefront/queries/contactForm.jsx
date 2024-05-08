import { useLocation } from "react-router-dom";
import "./contact.css"; // Import the CSS file for styling

const GetStoreNameFromURL = () => {
  const location = useLocation();
  const urlParts = location.pathname.split("/");
  return urlParts.length > 1 ? urlParts[1] : ""; // Return the second part of the URL path if it exists, otherwise return an empty string
};

function ContactForm() {
  const storeName = GetStoreNameFromURL();
  const supportEmail = `${storeName}@gmail.com`;

  return (
    <div className="store-contact-page-container">
      <h1>Contact us at {supportEmail}</h1>
    </div>
  );
}

export default ContactForm;
