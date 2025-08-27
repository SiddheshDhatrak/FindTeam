import { useState } from "react";
import Landing from "@/components/Landing";
import CandidateProfile from "@/components/CandidateProfile";
import RecruiterDashboard from "@/components/RecruiterDashboard";
import CandidateDashboard from "@/components/CandidateDashboard";

interface Candidate {
  id: string;
  name: string;
  email: string;
  role: string;
  experience: string;
  skills: string[];
  availability: "Available" | "Unavailable";
  bio: string;
  resumeFile: string;
  createdAt: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'candidate-profile' | 'recruiter-dashboard' | 'candidate-dashboard'>('landing');
  const [userType, setUserType] = useState<'candidate' | 'recruiter' | null>(null);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

  // Mock candidate data
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      role: "Senior Frontend Developer",
      experience: "5 years",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js"],
      availability: "Available",
      bio: "Passionate frontend developer with 5+ years of experience building scalable web applications. Expertise in modern React ecosystem and responsive design.",
      resumeFile: "sarah_johnson_resume.pdf",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael.chen@email.com",
      role: "Full Stack Engineer",
      experience: "7 years",
      skills: ["Python", "Django", "React", "PostgreSQL", "AWS", "Docker"],
      availability: "Available",
      bio: "Full-stack engineer with strong backend expertise and DevOps skills. Love building robust, scalable systems from conception to deployment.",
      resumeFile: "michael_chen_resume.pdf",
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      role: "UX/UI Designer",
      experience: "4 years",
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems"],
      availability: "Available",
      bio: "Creative UX/UI designer focused on creating intuitive, user-centered experiences. Strong background in user research and design thinking methodologies.",
      resumeFile: "emily_rodriguez_resume.pdf",
      createdAt: new Date().toISOString(),
    },
    {
      id: "4",
      name: "David Kim",
      email: "david.kim@email.com",
      role: "Backend Developer",
      experience: "6 years",
      skills: ["Java", "Spring Boot", "Microservices", "Kubernetes", "Redis", "MySQL"],
      availability: "Available",
      bio: "Backend developer specializing in microservices architecture and distributed systems. Experienced in building high-performance, scalable APIs.",
      resumeFile: "david_kim_resume.pdf",
      createdAt: new Date().toISOString(),
    },
    {
      id: "5",
      name: "Lisa Thompson",
      email: "lisa.thompson@email.com",
      role: "Data Scientist",
      experience: "3 years",
      skills: ["Python", "Machine Learning", "TensorFlow", "SQL", "R", "Tableau"],
      availability: "Available",
      bio: "Data scientist with expertise in machine learning and statistical analysis. Passionate about turning data into actionable business insights.",
      resumeFile: "lisa_thompson_resume.pdf",
      createdAt: new Date().toISOString(),
    }
  ]);

  const handleSelectRole = (role: 'candidate' | 'recruiter') => {
    setUserType(role);
    if (role === 'candidate') {
      setCurrentView('candidate-profile');
    } else {
      setCurrentView('recruiter-dashboard');
    }
  };

  const handleProfileComplete = (profile: Candidate) => {
    setCandidates(prev => [...prev, profile]);
    setCurrentCandidate(profile);
    setCurrentView('candidate-dashboard');
  };

  const handleSelectCandidate = (candidateId: string) => {
    setCandidates(prev => 
      prev.map(candidate => 
        candidate.id === candidateId 
          ? { ...candidate, availability: "Unavailable" as const }
          : candidate
      )
    );
    setSelectedCandidates(prev => [...prev, candidateId]);
  };

  const handleToggleAvailability = (candidateId: string) => {
    setCandidates(prev => 
      prev.map(candidate => 
        candidate.id === candidateId 
          ? { 
              ...candidate, 
              availability: candidate.availability === "Available" ? "Unavailable" as const : "Available" as const 
            }
          : candidate
      )
    );
    
    if (currentCandidate && currentCandidate.id === candidateId) {
      setCurrentCandidate(prev => 
        prev ? { 
          ...prev, 
          availability: prev.availability === "Available" ? "Unavailable" as const : "Available" as const 
        } : null
      );
    }
  };

  const handleBackToHome = () => {
    setCurrentView('landing');
    setUserType(null);
    setCurrentCandidate(null);
  };

  return (
    <div className="min-h-screen">
      {currentView === 'landing' && (
        <Landing onSelectRole={handleSelectRole} />
      )}
      
      {currentView === 'candidate-profile' && (
        <CandidateProfile 
          onProfileComplete={handleProfileComplete}
          onBack={handleBackToHome}
        />
      )}
      
      {currentView === 'recruiter-dashboard' && (
        <RecruiterDashboard 
          candidates={candidates}
          onBack={handleBackToHome}
          onSelectCandidate={handleSelectCandidate}
          selectedCandidates={selectedCandidates}
        />
      )}
      
      {currentView === 'candidate-dashboard' && currentCandidate && (
        <CandidateDashboard 
          candidate={currentCandidate}
          onBack={handleBackToHome}
          onToggleAvailability={handleToggleAvailability}
          notifications={[]}
        />
      )}
    </div>
  );
}