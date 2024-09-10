import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { Candidate } from "../interfaces/Candidate.interface";

const CandidateSearch: React.FC = () => {
  const [candidateData, setCandidateData] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(
    null
  );
  const [currentCandidateId, setCurrentCandidateId] = useState(0);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  async function getUserInformation(candidate: Candidate) {
    let response = await searchGithubUser(candidate?.login);
    setCurrentCandidate(response);
  }

  async function fetchGithubUser() {
    let response = await searchGithub();
    console.log(response);
    getUserInformation(response[currentCandidateId]);
    setCandidateData(response);
  }

  useEffect(() => {
    fetchGithubUser();
  }, []);

  useEffect(() => {
    const storedCandidates = localStorage.getItem("savedCandidates");
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
  }, [savedCandidates]);

  useEffect(() => {
    getUserInformation(candidateData[currentCandidateId]);
  }, [currentCandidateId]);

  const nextCandidate = () => {
    setCurrentCandidateId(currentCandidateId + 1);
  };

  const handleSkip = () => {
    nextCandidate();
  };

  const handleSave = () => {
    setSavedCandidates((previousCandidates: any) => [
      ...previousCandidates,
      currentCandidate,
    ]);
    nextCandidate();
  };

  return (
    <div className="candidates-search">
      <h1>Candidate Search</h1>
      {currentCandidate && (
        <div className="candidate-data">
          <div className="card">
            <img
              src={currentCandidate?.avatar_url}
              alt={currentCandidate?.login}
            />
            <div className="candidate-content">
              <h2>
                {currentCandidate?.name}({currentCandidate?.login})
              </h2>

              <p>Location: {currentCandidate?.location}</p>
              <p>Email: {currentCandidate?.email}</p>
              <p>Company: {currentCandidate?.company}</p>
              <p>Bio: {currentCandidate?.bio}</p>
            </div>
          </div>
          <div className="buttons">
            <CiCircleMinus color="red" onClick={handleSkip} />
            <CiCirclePlus color="green" onClick={handleSave} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;
