import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import JobItem from "../components/JobItem";

const BASE_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

function JobsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const candidate = location.state?.candidate;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!candidate) {
      navigate("/");
      return;
    }

    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/jobs/get-list`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [candidate, navigate]);

  if (!candidate) return null;
  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
  <div className="container">
    <div className="card candidate-info">
      <h2>Candidate Information</h2>
      <p><strong>Name:</strong> {candidate.firstName} {candidate.lastName}</p>
      <p><strong>Email:</strong> {candidate.email}</p>
      <p><strong>UUID:</strong> {candidate.uuid}</p>
      <p><strong>Candidate ID:</strong> {candidate.candidateId}</p>
    </div>

    <h2>Open Positions</h2>

    <div className="jobs-grid">
      {jobs.map((job) => (
        <JobItem
          key={job.id}
          job={job}
          candidate={candidate}
        />
      ))}
    </div>
  </div>
);

}

export default JobsPage;
