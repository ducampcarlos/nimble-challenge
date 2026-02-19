import { useState } from "react";

const BASE_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

function JobItem({ job, candidate }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!repoUrl) {
      setStatus("Please enter a repository URL.");
      return;
    }

    try {
      setLoading(true);
      setStatus(null);

      const response = await fetch(
        `${BASE_URL}/api/candidate/apply-to-job`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uuid: candidate.uuid,
            jobId: job.id,
            candidateId: candidate.candidateId,
            repoUrl: repoUrl,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Submission failed");
      }

      setStatus("Application submitted successfully.");
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
  <h3>{job.title}</h3>

  <input
    type="text"
    placeholder="GitHub repository URL"
    value={repoUrl}
    onChange={(e) => setRepoUrl(e.target.value)}
  />

  <button onClick={handleSubmit} disabled={loading}>
    {loading ? "Submitting..." : "Submit"}
  </button>

  {status && (
    <p className={status.includes("Error") ? "error" : "success"}>
      {status}
    </p>
  )}
</div>
  );
}

export default JobItem;
