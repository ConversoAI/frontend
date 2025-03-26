import { useState } from "react";

function WaitlistModal() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Make actual API call to the waitlist endpoint
      const response = await fetch(
        "https://dev.app.conversoaistudio.com/api/auth/waitlist",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        // Handle HTTP errors
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Waitlist submission successful:", data);

      // Show success state
      setIsSubmitted(true);

      // Auto-close after delay
      setTimeout(() => {
        document.getElementById("waitlist_modal").close();
        // Reset form and state after modal closes
        setTimeout(() => {
          setFormData({ first_name: "", last_name: "", email: "" });
          setIsSubmitted(false);
        }, 300);
      }, 3000);
    } catch (err) {
      console.error("Waitlist submission error:", err);
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    document.getElementById("waitlist_modal").close();
    // Reset form and success state when modal is closed
    setTimeout(() => {
      setFormData({ first_name: "", last_name: "", email: "" });
      setIsSubmitted(false);
      setError("");
    }, 300);
  };

  return (
    <dialog id="waitlist_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        {!isSubmitted ? (
          <>
            <h3 className="font-bold text-lg mb-4">Join our Waitlist</h3>
            {error && (
              <div className="alert alert-error mb-4">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className=" w-full flex flex-col md:flex-row items-center gap-4">
                <div className="form-control w-full">
                  <label className="floating-label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control w-full">
                  <label className="floating-label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              <div className="form-control w-full mt-4">
                <label className="floating-label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="modal-action">
                <button
                  type="submit"
                  className={`btn btn-primary ${isSubmitting ? "loading" : ""}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Join Waitlist"}
                </button>
                <button type="button" className="btn" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Thank You!</h3>
            <p className="mb-6">
              You've been added to our waitlist. We'll notify you when we
              launch.
            </p>
            <button className="btn btn-primary" onClick={closeModal}>
              Close
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}

export default WaitlistModal;
