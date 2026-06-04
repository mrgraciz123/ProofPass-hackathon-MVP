export interface TrustScoreBreakdown {
  degree: number;
  internship: number;
  nptel: number;
  hackathon: number;
  references: number;
  github: number;
}

export interface TalentProfile {
  id: string;
  name: string;
  githubUsername?: string;
  role: string;
  location: string;
  college?: string;
  gradYear?: string;
  score: number;
  scoreBreakdown?: TrustScoreBreakdown;
  credentials: number;
  verifiedAt: string[];
  specialty: string;
  skills: string[];
  experienceYears: number;
  githubStats?: {
    stars: number;
    repos: number;
    followers: number;
    languages: string[];
  };
}

export interface Opportunity {
  id: string;
  company: string;
  role: string;
  location: string;
  type: string;
  remote: string;
  requiredScore: number;
  requiredSkills: string[];
  minExperienceYears: number;
  description: string;
}

export interface MatchResult {
  score: number;
  reasons: string[];
}

export function calculateMatch(talent: TalentProfile, opportunity: Opportunity): MatchResult {
  let score = 100;
  const reasons: string[] = [];

  // Trust Score check
  if (talent.score >= opportunity.requiredScore) {
    reasons.push(`✓ Trust Score Above Requirement (${talent.score})`);
  } else {
    const diff = opportunity.requiredScore - talent.score;
    score -= (diff * 2); // Penalize heavily for low trust score
    reasons.push(`Missing: Trust Score below requirement (${talent.score} < ${opportunity.requiredScore})`);
  }

  // GitHub & Open Source Bonus
  if (talent.githubStats && talent.githubStats.repos > 0) {
    if (talent.githubStats.stars > 50) {
      reasons.push(`✓ High-Impact Open Source Contributor (${talent.githubStats.stars} Stars)`);
    } else {
      reasons.push(`✓ Active Open Source Profile (${talent.githubStats.repos} Repos)`);
    }
  } else if (talent.scoreBreakdown && talent.scoreBreakdown.github > 0) {
     reasons.push(`✓ Active Open Source Profile`);
  }

  // Location Check
  if (opportunity.remote === "Remote" || opportunity.remote === "Hybrid") {
    reasons.push(`✓ Location Match`);
  } else if (talent.location === opportunity.location || talent.location.includes(opportunity.location.split(',')[0])) {
    reasons.push(`✓ Location Match`);
  } else {
    score -= 10;
    reasons.push(`Mismatch: Role is in ${opportunity.location}`);
  }

  // Experience Check
  if (talent.experienceYears >= opportunity.minExperienceYears) {
    reasons.push(`✓ ${talent.experienceYears} Years Experience Verified`);
  } else {
    score -= 15;
    reasons.push(`Missing: Requires ${opportunity.minExperienceYears}+ years experience`);
  }

  // Skills & Certifications Check
  for (const skill of opportunity.requiredSkills) {
    if (talent.skills.includes(skill)) {
      // Format reasons beautifully
      if (skill.includes("Certification") || skill.includes("Degree") || skill.includes("B.S.") || skill.includes("Ph.D.")) {
        reasons.push(`✓ ${skill}`);
      } else {
        reasons.push(`✓ ${skill} Experience`);
      }
    } else {
      score -= 10;
      reasons.push(`Missing: ${skill}`);
    }
  }

  // Ensure bounds
  score = Math.max(0, Math.min(100, score));

  return { score, reasons };
}
