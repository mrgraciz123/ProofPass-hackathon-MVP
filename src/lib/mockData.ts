// Mock data for ProofPass hackathon demo

export const MOCK_PASSPORT = {
  passportId: "PP-8F92-A3B1",
  userId: "user_current",
  proofScore: 72, // Baseline before GitHub connection
  globalRank: 4204,
  verificationLevel: "High",
  walletAddress: "0x8F92...A3B1",
  createdAt: "2024-01-15T10:00:00Z",
  verifiedOrgs: ["AKTU", "Razorpay", "NPTEL", "SIH"],
  profession: "Software Engineer",
  location: "Bangalore, India",
  name: "Abhay Tiwari", 
  college: "AKTU",
  gradYear: "2024",
  bio: "Full-stack engineer passionate about Web3 and scalable architectures. Former intern at Razorpay.",
  about: "I build robust systems. Built a decentralized voting app that won Smart India Hackathon. Verifiable skills in Cloud Computing, Spring Boot, and React.",
  projects: [
    { name: "Decentralized Voting", description: "Smart India Hackathon Winner 2023.", verifiedBy: "SIH" },
    { name: "Auth Proxy v2", description: "Auth proxy built in Java during Razorpay internship.", verifiedBy: "Razorpay" }
  ],
  scoreBreakdown: {
    degree: 25,
    internship: 15,
    nptel: 15,
    hackathon: 17, 
    references: 0,
    github: 0 // Will be populated by GitHub integration (aiming for 20 to reach 92)
  }
};

export const MOCK_CREDENTIALS = [
  {
    credentialId: "cred_04",
    title: "Software Engineer Intern",
    type: "Internship",
    issuer: "Razorpay",
    status: "verified",
    issuedAt: "2023-01-15",
    verificationDate: "2023-01-16",
    description: "Built scalable payment APIs processing millions in daily volume.",
    endDate: "2023-06-01",
    trustScoreImpact: "+15",
  },
  {
    credentialId: "cred_03",
    title: "Cloud Computing",
    type: "Certification",
    issuer: "NPTEL",
    status: "verified",
    issuedAt: "2021-08-22",
    verificationDate: "2021-08-23",
    description: "Completed with Elite+Gold certification.",
    endDate: null,
    trustScoreImpact: "+15",
  },
  {
    credentialId: "cred_02",
    title: "Smart India Hackathon Winner",
    type: "Hackathon",
    issuer: "Ministry of Education",
    status: "verified",
    issuedAt: "2022-09-01",
    verificationDate: "2022-09-05",
    description: "Built an on-chain identity verification system.",
    endDate: null,
    trustScoreImpact: "+17",
  },
  {
    credentialId: "cred_01",
    title: "B.Tech Computer Science",
    type: "Degree",
    issuer: "AKTU",
    status: "verified",
    issuedAt: "2024-05-20",
    verificationDate: "2024-05-21",
    description: "Graduated with 9.2 CGPA. Focus on Systems and Cloud Architecture.",
    endDate: null,
    trustScoreImpact: "+25",
  },
];

export const MOCK_ACTIVITY = [
  { id: 1, action: "Degree Verified", target: "Stanford University", date: "2 days ago", icon: "check" },
  { id: 2, action: "Verification Completed", target: "Google — Senior Engineer", date: "1 week ago", icon: "check" },
  { id: 3, action: "Trust Score Increased", target: "+12 points (now 87)", date: "1 week ago", icon: "up" },
  { id: 4, action: "Profile Viewed", target: "by Stripe Recruiter", date: "3 days ago", icon: "eye" },
];

export const MOCK_PROFESSIONALS = [
  {
    id: "p1",
    name: "Abhay Tiwari",
    githubUsername: "torvalds", // Still using a real username to pull stats
    role: "Software Engineer",
    location: "Bangalore, India",
    college: "AKTU",
    gradYear: "2024",
    score: 92,
    credentials: 15,
    status: "Active",
    verifiedAt: ["AKTU", "Razorpay", "NPTEL", "SIH", "GitHub"],
    specialty: "Engineering",
    skills: ["Cloud Computing", "Java", "Spring Boot", "React", "AWS"],
    experienceYears: 1,
    scoreBreakdown: { degree: 25, internship: 15, nptel: 15, hackathon: 17, references: 0, github: 20 }
  },
  {
    id: "p2",
    name: "Demo Candidate 2 (Gaearon)",
    githubUsername: "gaearon",
    role: "Frontend Engineer",
    location: "Hyderabad, India",
    college: "IIIT Hyderabad",
    gradYear: "2023",
    score: 85,
    credentials: 12,
    status: "Open to Offers",
    verifiedAt: ["IIIT Hyderabad", "Zoho", "GitHub"],
    specialty: "Engineering",
    skills: ["React", "JavaScript", "Redux", "TailwindCSS"],
    experienceYears: 1,
    scoreBreakdown: { degree: 25, internship: 15, nptel: 0, hackathon: 15, references: 10, github: 20 }
  },
  {
    id: "p3",
    name: "Demo Candidate 3 (Rauchg)",
    githubUsername: "rauchg",
    role: "Fullstack Developer",
    location: "Chennai, India",
    college: "NIT Trichy",
    gradYear: "2024",
    score: 90,
    credentials: 8,
    status: "Passive",
    verifiedAt: ["NIT Trichy", "PhonePe", "NPTEL"],
    specialty: "Engineering",
    skills: ["Next.js", "Node.js", "React", "TypeScript", "Blockchain"],
    experienceYears: 0,
    scoreBreakdown: { degree: 25, internship: 15, nptel: 15, hackathon: 15, references: 5, github: 15 }
  },
  {
    id: "p4",
    name: "Demo Candidate 4 (Leerob)",
    githubUsername: "leerob",
    role: "DevOps Engineer",
    location: "Pune, India",
    college: "AKTU",
    gradYear: "2022",
    score: 80,
    credentials: 10,
    status: "Available",
    verifiedAt: ["AKTU", "Infosys", "AWS"],
    specialty: "Engineering",
    skills: ["Python", "AWS", "Docker", "CI/CD", "Next.js"],
    experienceYears: 2,
    scoreBreakdown: { degree: 25, internship: 15, nptel: 0, hackathon: 10, references: 10, github: 20 }
  },
];

export const MOCK_JOBS = [
  {
    id: "j1",
    company: "Stripe",
    role: "Senior Frontend Engineer, Dashboard",
    location: "San Francisco, CA",
    type: "Full-time",
    remote: "Hybrid",
    postedAt: "2 days ago",
    requiredScore: 85,
    requiredSkills: ["React", "TypeScript", "B.S. Computer Science"],
    minExperienceYears: 5,
    description: "Build the interfaces that millions of businesses use to manage their global revenue operations."
  },
  {
    id: "j2",
    company: "OpenAI",
    role: "Research Engineer, Alignment",
    location: "San Francisco, CA",
    type: "Full-time",
    remote: "On-site",
    postedAt: "1 week ago",
    requiredScore: 90,
    requiredSkills: ["Python", "PyTorch", "Machine Learning"],
    minExperienceYears: 4,
    description: "Help ensure AGI is safe and beneficial by working on core alignment research and evaluation tools."
  },
  {
    id: "j3",
    company: "Vercel",
    role: "Staff Software Engineer, Infrastructure",
    location: "New York, NY",
    type: "Full-time",
    remote: "Remote",
    postedAt: "3 days ago",
    requiredScore: 80,
    requiredSkills: ["Go", "Kubernetes", "Distributed Systems", "AWS"],
    minExperienceYears: 6,
    description: "Design and scale the global edge network powering the modern web."
  },
  {
    id: "j4",
    company: "Linear",
    role: "Product Designer",
    location: "Remote",
    type: "Full-time",
    remote: "Remote",
    postedAt: "5 days ago",
    requiredScore: 82,
    requiredSkills: ["Figma", "Interaction Design"],
    minExperienceYears: 4,
    description: "Craft the most performant and beautiful project management tool in the world."
  }
];

export const MOCK_VERIFICATION_REQUESTS = [];

export const MOCK_MATCHES = [
  {
    id: "m1",
    matchedAt: "2 hours ago",
    entityType: "job",
    entity: {
      name: "Senior Software Engineer, Core Systems",
      subtitle: "Netflix · Los Gatos, CA",
      image: "NE"
    },
    status: "new",
  },
  {
    id: "m2",
    matchedAt: "1 day ago",
    entityType: "talent",
    entity: {
      name: "Sarah Chen",
      subtitle: "Staff Backend Engineer · Seattle, WA",
      image: "SC"
    },
    status: "messaged",
  }
];

export const MOCK_ACHIEVEMENTS = [];

export const MOCK_OPPORTUNITIES = [];
