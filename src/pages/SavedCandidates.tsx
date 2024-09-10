import { useEffect, useState } from "react";
import { Candidate } from "../interfaces/Candidate.interface";
import { CiCircleMinus } from "react-icons/ci";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = localStorage.getItem("savedCandidates");
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  const handleDelete = (id: number) => {
    const updatedItems = savedCandidates.filter((item) => item.id !== id);
    setSavedCandidates(updatedItems);
  };

  return (
    <>
      <h1>Potential Candidates</h1>

      {savedCandidates && (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Location</th>
                <th>Email</th>
                <th>Company</th>
                <th>Bio</th>
                <th>Reject</th>
              </tr>
            </thead>
            <tbody>
              {savedCandidates.map((candidate, index) => (
                <tr key={index}>
                  <td>
                    <img src={candidate?.avatar_url} alt={candidate?.login} />
                  </td>
                  <td>{candidate?.login}</td>
                  <td>{candidate?.location}</td>
                  <td>{candidate?.email}</td>
                  <td>{candidate?.company}</td>
                  <td>{candidate?.bio}</td>
                  <td>
                    <CiCircleMinus
                      color="red"
                      onClick={() => handleDelete(candidate.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default SavedCandidates;
