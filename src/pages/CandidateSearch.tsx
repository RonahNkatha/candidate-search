import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

interface Candidate {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: null;
  blog: string;
  location: string;
  email: null;
  hireable: null;
  bio: null;
  twitter_username: null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

const CandidateSearch: React.FC = () => {
  const [candidateData, setCandidateData] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({});
  const [currentCandidateId, setCurrentCandidateId] = useState(0);
  const [savedCandidates, setSavedCandidates] = useState<any>([]);

  async function getUserInformation(candidate: any) {
    let response = await searchGithubUser(candidate.login);
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

  const nextCandidate = () => {
    setCurrentCandidateId(currentCandidateId + 1);
    getUserInformation(candidateData[currentCandidateId]);
    // console.log(candidateData.indexOf(currentCandidate) + 1);
  };

  const handleSkip = () => {
    nextCandidate();
  };

  const handleSave = () => {
    setSavedCandidates((previousCandidates: any) => [
      ...previousCandidates,
      currentCandidate,
    ]);
    localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
    nextCandidate();
  };

  return (
    <div>
      <h1>CandidateSearch</h1>
      {currentCandidate && (
        <div className="candidate-data">
          <div className="card">
            <img
              src={currentCandidate?.avatar_url}
              alt={currentCandidate?.login}
            />
            <h2>
              {currentCandidate?.login}({currentCandidate?.login})
            </h2>
            <p>Location: {currentCandidate?.location}</p>
            <p>Email: {currentCandidate?.email}</p>
            <p>Company: {currentCandidate?.company}</p>
            <p>Bio: {currentCandidate?.bio}</p>
          </div>
          <div className="buttons">
            <button onClick={handleSkip}>
              <CiCircleMinus />
            </button>
            <button onClick={handleSave}>
              <CiCirclePlus />
            </button>
          </div>
        </div>
      )}
    </div>
  );
