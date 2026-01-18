import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { createFileRoute } from '@tanstack/react-router';
import {
  ArrowUpRight,
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  MessageSquare,
  Plus,
  Search,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="min-h-screen">
      <SignedIn>
        <main className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here's an overview of your workspace.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-primary">+12%</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-primary">+8%</span> from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">2 pending invites</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Hours Logged</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">284h</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - Tasks */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tabs Section */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Tasks</CardTitle>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="Search tasks..." className="pl-9" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="active">Active</TabsTrigger>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="space-y-3">
                      <TaskItem
                        title="Review design mockups"
                        project="Website Redesign"
                        priority="high"
                        dueDate="Today"
                      />
                      <TaskItem
                        title="Implement authentication flow"
                        project="Mobile App"
                        priority="medium"
                        dueDate="Tomorrow"
                      />
                      <TaskItem
                        title="Write API documentation"
                        project="Backend Services"
                        priority="low"
                        dueDate="Jan 25"
                        completed
                      />
                      <TaskItem
                        title="Setup CI/CD pipeline"
                        project="DevOps"
                        priority="medium"
                        dueDate="Jan 28"
                      />
                    </TabsContent>
                    <TabsContent value="active" className="space-y-3">
                      <TaskItem
                        title="Review design mockups"
                        project="Website Redesign"
                        priority="high"
                        dueDate="Today"
                      />
                      <TaskItem
                        title="Implement authentication flow"
                        project="Mobile App"
                        priority="medium"
                        dueDate="Tomorrow"
                      />
                    </TabsContent>
                    <TabsContent value="completed" className="space-y-3">
                      <TaskItem
                        title="Write API documentation"
                        project="Backend Services"
                        priority="low"
                        dueDate="Jan 25"
                        completed
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Project Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Progress</CardTitle>
                  <CardDescription>Track your ongoing projects</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ProjectProgress name="Website Redesign" progress={75} color="primary" />
                  <ProjectProgress name="Mobile App Development" progress={45} color="primary" />
                  <ProjectProgress name="Marketing Campaign" progress={90} color="primary" />
                  <ProjectProgress name="Database Migration" progress={30} color="primary" />
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Task
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Meeting
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>

              {/* Team Members */}
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>Your active collaborators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <TeamMember name="Sarah Johnson" role="Designer" status="online" initials="SJ" />
                  <TeamMember name="Mike Chen" role="Developer" status="online" initials="MC" />
                  <TeamMember name="Emily Davis" role="PM" status="away" initials="ED" />
                  <TeamMember name="Alex Smith" role="Developer" status="offline" initials="AS" />
                </CardContent>
              </Card>

              {/* Settings Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">Email Notifications</div>
                      <div className="text-xs text-muted-foreground">Receive email updates</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">Push Notifications</div>
                      <div className="text-xs text-muted-foreground">Browser notifications</div>
                    </div>
                    <Switch />
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Default View</div>
                    <Select defaultValue="board">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="board">Board View</SelectItem>
                        <SelectItem value="list">List View</SelectItem>
                        <SelectItem value="calendar">Calendar View</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Button Showcase */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Component Showcase</CardTitle>
              <CardDescription>Preview of UI components with your brand colors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Buttons */}
                <div>
                  <h3 className="mb-3 text-sm font-medium text-muted-foreground">Buttons</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>

                {/* Badges */}
                <div>
                  <h3 className="mb-3 text-sm font-medium text-muted-foreground">Badges</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </div>

                {/* Inputs */}
                <div>
                  <h3 className="mb-3 text-sm font-medium text-muted-foreground">Inputs</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <Input placeholder="Text input..." className="max-w-xs" />
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center gap-2">
                      <Checkbox id="terms" />
                      <label htmlFor="terms" className="text-sm">
                        Accept terms
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}

// Helper Components
function TaskItem({
  title,
  project,
  priority,
  dueDate,
  completed = false,
}: {
  title: string;
  project: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  completed?: boolean;
}) {
  const priorityColors = {
    high: 'bg-destructive/10 text-destructive',
    medium: 'bg-primary/10 text-primary',
    low: 'bg-muted text-muted-foreground',
  };

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-accent/50 ${completed ? 'opacity-60' : ''}`}
    >
      <Checkbox checked={completed} />
      <div className="flex-1 min-w-0">
        <div className={`font-medium ${completed ? 'line-through' : ''}`}>{title}</div>
        <div className="text-sm text-muted-foreground">{project}</div>
      </div>
      <Badge variant="outline" className={priorityColors[priority]}>
        {priority}
      </Badge>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" />
        {dueDate}
      </div>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <ArrowUpRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

function ProjectProgress({
  name,
  progress,
}: {
  name: string;
  progress: number;
  color: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}

function TeamMember({
  name,
  role,
  status,
  initials,
}: {
  name: string;
  role: string;
  status: 'online' | 'away' | 'offline';
  initials: string;
}) {
  const statusColors = {
    online: 'bg-green-500',
    away: 'bg-yellow-500',
    offline: 'bg-gray-400',
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Avatar className="h-9 w-9">
          <AvatarImage src="" />
          <AvatarFallback className="bg-primary/10 text-primary text-xs">{initials}</AvatarFallback>
        </Avatar>
        <div
          className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card ${statusColors[status]}`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{name}</div>
        <div className="text-xs text-muted-foreground">{role}</div>
      </div>
    </div>
  );
}
