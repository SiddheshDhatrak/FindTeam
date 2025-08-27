import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Users, Search, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
// Fallback gradient background used instead of missing hero image asset
const heroImage = ""; // Intentionally empty to avoid runtime errors when asset is missing

const candidateEmails = [
  "candidate1@example.com",
  "candidate2@example.com",
];

const recruiterEmails = [
  "recruiter1@example.com",
  "recruiter2@example.com",
];

interface LandingProps {
  onSelectRole: (role: 'candidate' | 'recruiter') => void;
}

export default function Landing({ onSelectRole }: LandingProps) {
  const { toast } = useToast();
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"candidate" | "recruiter" | null>(null);
  const [email, setEmail] = useState("");
  const [isUnknownEmail, setIsUnknownEmail] = useState(false);

  const handleStartAuth = (role: "candidate" | "recruiter") => {
    setSelectedRole(role);
    setEmail("");
    setIsUnknownEmail(false);
    setAuthOpen(true);
  };

  const handleContinue = () => {
    if (!email.trim()) {
      toast({ title: "Email required", description: "Please enter your email to continue.", variant: "destructive" });
      return;
    }
    const list = selectedRole === "candidate" ? candidateEmails : recruiterEmails;
    const exists = list.includes(email.trim().toLowerCase());
    if (exists) {
      toast({ title: "Welcome back", description: `Logged in as ${email}` });
      setAuthOpen(false);
      onSelectRole(selectedRole!);
    } else {
      setIsUnknownEmail(true);
      toast({ title: "No account found", description: "Sign up to create a new account." });
    }
  };

  const handleSignup = () => {
    toast({ title: "Account created", description: `Signed up as ${email}` });
    setAuthOpen(false);
    onSelectRole(selectedRole!);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">TalentMatch</span>
          </div>
          <div className="flex items-center space-x-4"></div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-black/20"></div>
        {heroImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
          ></div>
        )}
        <div className="relative container mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Connect Talent with
            <span className="block bg-gradient-to-r from-white to-success-light bg-clip-text text-transparent">
              Opportunity
            </span>
          </h1>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            The modern platform where exceptional candidates meet forward-thinking recruiters. 
            Build your career or find your next star talent.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg px-8 py-6 h-auto"
              onClick={() => handleStartAuth('candidate')}
            >
              I'm a Candidate
            </Button>
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg px-8 py-6 h-auto"
              onClick={() => handleStartAuth('recruiter')}
            >
              I'm a Recruiter
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              How TalentMatch Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A streamlined process that connects the right people at the right time
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-card border-0 shadow-card hover:shadow-strong transition-smooth">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Create Your Profile</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Candidates build professional profiles and upload resumes. Recruiters define their requirements.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card hover:shadow-strong transition-smooth">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Smart Matching</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Our platform intelligently connects available candidates with relevant opportunities.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card hover:shadow-strong transition-smooth">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-success-foreground" />
                </div>
                <CardTitle className="text-xl">Secure Selection</CardTitle>
                <CardDescription className="text-muted-foreground">
                  One-click selection process with instant notifications and status updates for all parties.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who trust TalentMatch to advance their careers and build exceptional teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="candidate" 
              size="lg"
              onClick={() => handleStartAuth('candidate')}
            >
              Join as Candidate
            </Button>
            <Button 
              variant="recruiter" 
              size="lg"
              onClick={() => handleStartAuth('recruiter')}
            >
              Hire Top Talent
            </Button>
          </div>
        </div>
      </section>

      {/* Auth Dialog */}
      <Dialog open={authOpen} onOpenChange={setAuthOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedRole === 'recruiter' ? 'Recruiter Login' : 'Candidate Login'}</DialogTitle>
            <DialogDescription>
              Enter your email to log in. If you're new, you can sign up.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="text-xs text-muted-foreground">
              {selectedRole === 'candidate' ? (
                <div>
                  Try: candidate1@example.com or candidate2@example.com
                </div>
              ) : (
                <div>
                  Try: recruiter1@example.com or recruiter2@example.com
                </div>
              )}
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-2">
            {!isUnknownEmail && (
              <Button onClick={handleContinue} className="w-full sm:w-auto">Continue</Button>
            )}
            {isUnknownEmail && (
              <Button variant="success" onClick={handleSignup} className="w-full sm:w-auto">Sign Up</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}