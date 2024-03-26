import "./errors.css"

function InternalServerError()
{
    return (
        <div id="message">
            <h2>500</h2>
            <h1>Internal Server Error</h1>
            <p>This is an issue on our part. Please try again or if the issue persist please contact us.</p>
        </div>
    )
}

export default InternalServerError