// src/pages/ApiDebugPage.jsx
import { useState } from "react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";

export default function ApiDebugPage() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);

  // Define all API endpoints with test data
  const endpoints = {
    test: {
      name: "Test API",
      url: "https://dev.app.conversoaistudio.com/api/test",
      payload: { ok: "Is it working" },
    },
    waitlist: {
      name: "Join Waitlist",
      url: "https://dev.app.conversoaistudio.com/api/auth/waitlist",
      payload: {
        email: "test@example.com",
        first_name: "Test",
        last_name: "User",
      },
    },
    login: {
      name: "Login",
      url: "https://dev.app.conversoaistudio.com/api/auth/login",
      payload: {
        email: "saifkhan914533@gmail.com",
        password: "Test@123",
        is_google_login: false,
      },
    },
    "forgot-password": {
      name: "Forgot Password",
      url: "https://dev.app.conversoaistudio.com/api/auth/forgot-password",
      payload: {
        email: "test@example.com",
      },
    },
    "contact-us": {
      name: "Contact Us",
      url: "https://dev.app.conversoaistudio.com/api/auth/contact-us",
      payload: {
        fullName: "Test User",
        email: "test@example.com",
        subject: "Test Subject",
        message: "This is a test message.",
      },
    },
    "update-password": {
      name: "Update Password",
      url: "https://dev.app.conversoaistudio.com/api/auth/update-password",
      payload: {
        email: "test@example.com",
        current_password: "OldPass@123",
        new_password: "NewPass@123",
        confirm_new_password: "NewPass@123",
      },
    },
    signup: {
      name: "Signup",
      url: "https://dev.app.conversoaistudio.com/api/auth/login",
      payload: {
        email: "test@example.com",
        password: "Test@123",
        first_name: "Test",
        last_name: "User",
        mobile_number: "+12345678901",
        company: "Test Company",
        is_google_login: false,
      },
    },
  };

  const resetResults = () => {
    setResponse(null);
    setError(null);
  };

  const toggleAccordion = (key) => {
    setActiveAccordion(activeAccordion === key ? null : key);
    resetResults();
  };

  const testApi = async (endpointKey) => {
    resetResults();
    setIsLoading(true);

    try {
      const currentEndpoint = endpoints[endpointKey];
      console.log(`Testing endpoint: ${currentEndpoint.url}`);

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentEndpoint.payload),
      };

      const response = await fetch(currentEndpoint.url, requestOptions);

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

          <div className="space-y-4 mb-6">
            {Object.keys(endpoints).map((key) => (
              <div
                key={key}
                className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
              >
                <input
                  type="checkbox"
                  checked={activeAccordion === key}
                  onChange={() => toggleAccordion(key)}
                />
                <div className="collapse-title text-xl font-medium">
                  {endpoints[key].name}
                </div>
                <div className="collapse-content">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2">
                      Endpoint Details
                    </h3>
                    <div className="bg-gray-100 p-4 rounded-md">
                      <p className="font-mono break-all">
                        <span className="font-bold">URL:</span>{" "}
                        {endpoints[key].url}
                      </p>
                      <p className="font-mono mt-2">
                        <span className="font-bold">Method:</span> POST
                      </p>
                      <p className="font-mono mt-2">
                        <span className="font-bold">Body:</span>
                        <code className="block bg-gray-700 text-white p-2 rounded mt-1 overflow-x-auto">
                          {JSON.stringify(endpoints[key].payload, null, 2)}
                        </code>
                      </p>
                    </div>
                  </div>

                  <div className="mb-6 flex">
                    <button
                      className={`btn btn-primary ${isLoading && activeAccordion === key ? "loading" : ""}`}
                      onClick={() => testApi(key)}
                      disabled={isLoading}
                    >
                      {isLoading && activeAccordion === key
                        ? "Testing..."
                        : "Test API"}
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

                  {response && activeAccordion === key && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-2 text-success">
                        Response
                      </h3>
                      <div className="bg-success bg-opacity-10 p-4 rounded-md">
                        <p className="mb-2">
                          <span className="font-bold">Status:</span>{" "}
                          {response.status} {response.statusText}
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

                  {error && activeAccordion === key && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-2 text-error">
                        Error
                      </h3>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
