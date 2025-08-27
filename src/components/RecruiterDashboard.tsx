import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Filter, Eye, CheckCircle, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

interface RecruiterDashboardProps {
  candidates: Candidate[];
  onBack: () => void;
  onSelectCandidate: (candidateId: string) => void;
  selectedCandidates: string[];
}

export default function RecruiterDashboard({ 
  candidates, 
  onBack, 
  onSelectCandidate, 
  selectedCandidates 
}: RecruiterDashboardProps) {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = !roleFilter || candidate.role.toLowerCase().includes(roleFilter.toLowerCase());
    const matchesSkill = !skillFilter || candidate.skills.some(skill => 
      skill.toLowerCase().includes(skillFilter.toLowerCase())
    );
    const isAvailable = candidate.availability === "Available";
    
    return matchesSearch && matchesRole && matchesSkill && isAvailable;
  });

  const handleSelectCandidate = (candidateId: string) => {
    onSelectCandidate(candidateId);
    toast({
      title: "Candidate selected!",
      description: "The candidate has been notified and is now unavailable to other recruiters.",
    });
  };

  const availableCandidates = candidates.filter(c => c.availability === "Available").length;
  const mySelections = selectedCandidates.length;

  if (selectedCandidate) {
    return (
      <div className="min-h-screen bg-muted/30 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button variant="ghost" onClick={() => setSelectedCandidate(null)} className="mb-6">
            ← Back to Search
          </Button>

          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="text-lg font-semibold bg-gradient-primary text-primary-foreground">
                      {selectedCandidate.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{selectedCandidate.name}</CardTitle>
                    <CardDescription className="text-lg">{selectedCandidate.role}</CardDescription>
                    <Badge variant={selectedCandidate.availability === "Available" ? "default" : "secondary"} className="mt-2">
                      {selectedCandidate.availability}
                    </Badge>
                  </div>
                </div>
                {selectedCandidate.availability === "Available" && (
                  <Button 
                    onClick={() => handleSelectCandidate(selectedCandidate.id)}
                    variant="success"
                    size="lg"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Select Candidate
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Contact Information</h3>
                <p className="text-muted-foreground">{selectedCandidate.email}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Experience</h3>
                <p className="text-muted-foreground">{selectedCandidate.experience}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills.map(skill => (
                    <Badge key={skill} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Professional Summary</h3>
                <p className="text-muted-foreground leading-relaxed">{selectedCandidate.bio}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Resume</h3>
                <Button variant="outline" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Resume ({selectedCandidate.resumeFile})
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-gradient-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Button variant="ghost" onClick={onBack} className="mb-2">
                ← Back to Home
              </Button>
              <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>
              <p className="text-muted-foreground">Find and select top talent for your team</p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-background rounded-lg p-4 shadow-soft">
                <div className="text-2xl font-bold text-primary">{availableCandidates}</div>
                <div className="text-sm text-muted-foreground">Available</div>
              </div>
              <div className="bg-background rounded-lg p-4 shadow-soft">
                <div className="text-2xl font-bold text-success">{mySelections}</div>
                <div className="text-sm text-muted-foreground">Selected</div>
              </div>
              <div className="bg-background rounded-lg p-4 shadow-soft">
                <div className="text-2xl font-bold text-warning">{filteredCandidates.length}</div>
                <div className="text-sm text-muted-foreground">Matches</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <Card className="mb-8 bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search Candidates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="search">Search by name or role</Label>
                <Input
                  id="search"
                  placeholder="Enter name or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="role">Filter by role</Label>
                <Input
                  id="role"
                  placeholder="e.g., Frontend Developer"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="skill">Filter by skill</Label>
                <Input
                  id="skill"
                  placeholder="e.g., React"
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <Card key={candidate.id} className="bg-gradient-card shadow-card hover:shadow-strong transition-smooth">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{candidate.name}</CardTitle>
                    <CardDescription>{candidate.role}</CardDescription>
                  </div>
                  <Badge variant="default" className="bg-success text-success-foreground">
                    Available
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Experience: {candidate.experience}</p>
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.slice(0, 3).map(skill => (
                        <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                      ))}
                      {candidate.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">+{candidate.skills.length - 3} more</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setSelectedCandidate(candidate)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="success" 
                      size="sm"
                      onClick={() => handleSelectCandidate(candidate.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Select
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCandidates.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No candidates found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or check back later for new candidates.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}