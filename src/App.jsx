import { useEffect, useState } from "react";
import JobItem from "./components/JobItem";

const BASE_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

function App() {
  const [candidate, setCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const email = "TU_EMAIL_AQUI";

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);

        // Fetch candidate data
        const candidateRes = await fetch(
          `${BASE_URL}/api/candidate/get-by-email?email=${email}`
        );

        if (!candidateRes.ok) {
          throw new Error("Failed to fetch candidate data");
        }

        const candidateData = await candidateRes.json();
        setCandidate(candidateData);

        // Fetch job list
        const jobsRes = await fetch(`${BASE_URL}/api/jobs/get-list`);

        if (!jobsRes.ok) {
          throw new Error("Failed to fetch job list");
        }

        const jobsData = await jobsRes.json();
        setJobs(jobsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Open Positions</h2>

      {jobs.map((job) => (
        <JobItem
          key={job.id}
          job={job}
          candidate={candidate}
        />
      ))}
    </div>
  );
}

export default App;
