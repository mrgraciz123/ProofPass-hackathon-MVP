export interface GithubStats {
  login: string;
  followers: number;
  following: number;
  public_repos: number;
  total_stars: number;
  top_languages: string[];
  account_age_years: number;
  trust_gain: number;
}

export async function fetchGithubStats(username: string): Promise<GithubStats> {
  const userRes = await fetch(`https://api.github.com/users/${username}`);
  if (!userRes.ok) {
    throw new Error("GitHub user not found");
  }
  const userData = await userRes.json();

  // Fetch repositories to calculate stars and languages
  // In a real app we would paginate, but for demo just get first 100
  const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
  let reposData = [];
  if (reposRes.ok) {
    reposData = await reposRes.json();
  }

  let totalStars = 0;
  const languageCounts: Record<string, number> = {};

  for (const repo of reposData) {
    totalStars += repo.stargazers_count || 0;
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  }

  // Sort languages by count
  const sortedLanguages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0])
    .slice(0, 3); // top 3 languages

  // Base trust gain calculation
  let trustGain = 0;
  
  // Repos logic
  if (userData.public_repos > 50) trustGain += 5;
  else if (userData.public_repos > 10) trustGain += 3;
  else if (userData.public_repos > 0) trustGain += 1;

  // Stars logic
  if (totalStars > 1000) trustGain += 10;
  else if (totalStars > 100) trustGain += 7;
  else if (totalStars > 10) trustGain += 4;
  else if (totalStars > 0) trustGain += 2;

  // Followers logic
  if (userData.followers > 500) trustGain += 5;
  else if (userData.followers > 50) trustGain += 3;
  else if (userData.followers > 5) trustGain += 1;

  // Account Age logic
  const createdDate = new Date(userData.created_at);
  const ageYears = (new Date().getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
  
  if (ageYears > 5) trustGain += 5;
  else if (ageYears > 3) trustGain += 3;
  else if (ageYears > 1) trustGain += 1;

  // Cap at 20 points
  trustGain = Math.min(20, trustGain);

  return {
    login: userData.login,
    followers: userData.followers,
    following: userData.following,
    public_repos: userData.public_repos,
    total_stars: totalStars,
    top_languages: sortedLanguages,
    account_age_years: Math.round(ageYears * 10) / 10,
    trust_gain: trustGain
  };
}
