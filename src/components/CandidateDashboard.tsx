import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Eye, Edit, CheckCircle, Clock } from "lucide-react";

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

interface CandidateDashboardProps {
  candidate: Candidate;
  onBack: () => void;
  onToggleAvailability: (candidateId: string) => void;
  notifications: any[];
}

export default function CandidateDashboard({ 
  candidate, 
  onBack, 
  onToggleAvailability,
  notifications 
}: CandidateDashboardProps) {
  const mockStats = {
    profileViews: 12,
    applications: 3,
    matches: 5
  };

  const mockNotifications = [
    {
      id: 1,
      type: "view",
      message: "TechCorp recruiter viewed your profile",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      type: "selection",
      message: "Congratulations! You've been selected by StartupXYZ",
      time: "1 day ago",
      read: false
    },
    {
      id: 3,
      type: "view",
      message: "InnovateTech recruiter viewed your profile",
      time: "3 days ago",
      read: true
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-gradient-card border-b border-border/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Button variant="ghost" onClick={onBack} className="mb-2">
                ← Back to Home
              </Button>
              <h1 className="text-3xl font-bold">My Dashboard</h1>
              <p className="text-muted-foreground">Manage your profile and track your opportunities</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge 
                variant={candidate.availability === "Available" ? "default" : "secondary"}
                className={candidate.availability === "Available" ? "bg-success text-success-foreground" : ""}
              >
                {candidate.availability}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Overview */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="text-lg font-semibold bg-gradient-primary text-primary-foreground">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl">{candidate.name}</CardTitle>
                      <CardDescription className="text-lg">{candidate.role}</CardDescription>
                      <p className="text-sm text-muted-foreground mt-1">{candidate.experience} experience</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Professional Summary</h3>
                    <p className="text-muted-foreground leading-relaxed">{candidate.bio}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map(skill => (
                        <Badge key={skill} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Resume</h3>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      View Resume ({candidate.resumeFile})
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-card shadow-soft">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{mockStats.profileViews}</div>
                  <div className="text-sm text-muted-foreground">Profile Views</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-card shadow-soft">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-success mb-2">{mockStats.matches}</div>
                  <div className="text-sm text-muted-foreground">Matches</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-card shadow-soft">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-warning mb-2">{mockStats.applications}</div>
                  <div className="text-sm text-muted-foreground">Active Applications</div>
                </CardContent>
              </Card>
            </div>

            {/* Availability Control */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Availability Settings</CardTitle>
                <CardDescription>
                  Control whether recruiters can find and select you for opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="availability">Available for opportunities</Label>
                    <p className="text-sm text-muted-foreground">
                      When enabled, recruiters can discover and select you for positions
                    </p>
                  </div>
                  <Switch
                    id="availability"
                    checked={candidate.availability === "Available"}
                    onCheckedChange={() => onToggleAvailability(candidate.id)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-3 rounded-lg border ${
                        notification.read ? 'bg-muted/50' : 'bg-background border-primary/20'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {notification.type === 'selection' ? (
                          <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                        ) : notification.type === 'view' ? (
                          <Eye className="w-4 h-4 text-primary mt-0.5" />
                        ) : (
                          <Clock className="w-4 h-4 text-warning mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Edit className="w-4 h-4 mr-2" />
                  Update Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="w-4 h-4 mr-2" />
                  Notification Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}