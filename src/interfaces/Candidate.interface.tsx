// TODO: Create an interface for the Candidate objects returned by the API

export interface Candidate {
  id: number;
  login: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  name: string;
  company: null;
  blog: string;
  location: string;
  email: null;
  bio: null;
  twitter_username: null;
}
