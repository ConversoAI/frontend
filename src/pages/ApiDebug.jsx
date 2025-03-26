import { useState } from "react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";

export default function ApiDebug() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("test");

  const testEndpoint = "https://dev.app.conversoaistudio.com/api/test";
  const waitlistEndpoint =
    "https://dev.app.conversoaistudio.com/api/auth/waitlist";

  const resetResults = () => {
    setResponse(null);
    setError(null);
  };

  const testApi = async () => {
    resetResults();
    setIsLoading(true);

    try {
      console.log(
        `Testing endpoint: ${activeTab === "test" ? testEndpoint : waitlistEndpoint}`,
      );

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:
          activeTab === "test"
            ? JSON.stringify({ ok: "Is it working" })
            : JSON.stringify({
                email: "test@example.com",
                first_name: "Test",
                last_name: "User",
              }),
      };

      const response = await fetch(
        activeTab === "test" ? testEndpoint : waitlistEndpoint,
        requestOptions,
      );

      const textResponse = await response.text();
      console.log("Raw response:", textResponse);

      let data;
      try {
        data = JSON.parse(textResponse);
      } catch (e) {
        console.log("Response is not valid JSON:", e);
        data = { raw: textResponse };
      }

      console.log("Parsed response:", data);

      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status}, Response: ${JSON.stringify(data)}`,
        );
      }

      setResponse({
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries([...response.headers.entries()]),
        data: data,
      });
    } catch (err) {
      console.error("API test error:", err);
      setError({
        message: err.message,
        stack: err.stack,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-gray-50 p-4 md:p-8">
        <div className="container mx-auto max-w-4xl bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            API Debug Page
          </h1>

          <div className="tabs tabs-boxed mb-6">
            <a
              className={`tab ${activeTab === "test" ? "tab-active" : ""}`}
              onClick={() => {
                resetResults();
                setActiveTab("test");
              }}
            >
              Test Endpoint
            </a>
            <a
              className={`tab ${activeTab === "waitlist" ? "tab-active" : ""}`}
              onClick={() => {
                resetResults();
                setActiveTab("waitlist");
              }}
            >
              Waitlist Endpoint
            </a>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Endpoint Details</h2>
            <div className="bg-gray-100 p-4 rounded-md">
              <p className="font-mono break-all">
                <span className="font-bold">URL:</span>{" "}
                {activeTab === "test" ? testEndpoint : waitlistEndpoint}
              </p>
              <p className="font-mono mt-2">
                <span className="font-bold">Method:</span> POST
              </p>
              <p className="font-mono mt-2">
                <span className="font-bold">Body:</span>
                <code className="block bg-gray-700 text-white p-2 rounded mt-1 overflow-x-auto">
                  {JSON.stringify(
                    activeTab === "test"
                      ? { ok: "Is it working" }
                      : {
                          email: "test@example.com",
                          first_name: "Test",
                          last_name: "User",
                        },
                    null,
                    2,
                  )}
                </code>
              </p>
            </div>
          </div>

          <div className="mb-6 flex">
            <button
              className={`btn btn-primary ${isLoading ? "loading" : ""}`}
              onClick={testApi}
              disabled={isLoading}
            >
              {isLoading ? "Testing..." : "Test API"}
            </button>

            {(response || error) && (
              <button
                className="btn ml-2"
                onClick={resetResults}
                disabled={isLoading}
              >
                Clear Results
              </button>
            )}
          </div>

          {response && (
            <div className="mt-6">
              <h2 className="text-lg font-medium mb-2 text-success">
                Response
              </h2>
              <div className="bg-success bg-opacity-10 p-4 rounded-md">
                <p className="mb-2">
                  <span className="font-bold">Status:</span> {response.status}{" "}
                  {response.statusText}
                </p>
                <div className="mb-2">
                  <p className="font-bold mb-1">Headers:</p>
                  <pre className="bg-gray-700 text-white p-2 rounded overflow-x-auto">
                    {JSON.stringify(response.headers, null, 2)}
                  </pre>
                </div>
                <div>
                  <p className="font-bold mb-1">Data:</p>
                  <pre className="bg-gray-700 text-white p-2 rounded overflow-x-auto">
                    {JSON.stringify(response.data, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-6">
              <h2 className="text-lg font-medium mb-2 text-error">Error</h2>
              <div className="bg-error bg-opacity-10 p-4 rounded-md">
                <p className="mb-2 font-bold">{error.message}</p>
                <p className="text-sm text-gray-600">
                  Check the browser console for more details.
                </p>
                <pre className="bg-gray-700 text-white p-2 rounded mt-2 overflow-x-auto text-sm">
                  {error.stack}
                </pre>
              </div>
            </div>
          )}

          <div className="mt-6">
            <h2 className="text-lg font-medium mb-2">Console Output</h2>
            <p className="text-sm text-gray-600 mb-2">
              Open your browser's developer console (F12 or right-click →
              Inspect → Console) to see detailed logs.
            </p>
            <div className="bg-gray-800 text-gray-200 p-4 rounded-md font-mono text-sm">
              <p>
                // Console output will appear in your browser's developer tools
              </p>
              <p>// The page is logging:</p>
              <p>// - API endpoint being called</p>
              <p>// - Raw text response</p>
              <p>// - Parsed JSON response (or error)</p>
              <p>// - Any errors encountered</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
