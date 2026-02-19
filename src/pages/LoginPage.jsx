import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email) {
      setError("Email is required.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${BASE_URL}/api/candidate/get-by-email?email=${email}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Candidate not found");
      }

      navigate("/jobs", { state: { candidate: data } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h2>Enter your email</h2>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        style={{ width: "300px", marginRight: "10px" }}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Loading..." : "Continue"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default LoginPage;
