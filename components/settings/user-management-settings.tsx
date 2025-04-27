"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Mail, UserPlus, User, Shield, UserCog, UserX } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface UserData {
  id: string
  name: string
  email: string
  role: string
  status: string
  lastActive: string
  avatarUrl?: string
}

export function UserManagementSettings() {
  const { toast } = useToast()
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [inviteData, setInviteData] = useState({
    email: "",
    role: "member",
  })

  // Mock user data
  const [users, setUsers] = useState<UserData[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@acme.com",
      role: "admin",
      status: "active",
      lastActive: "Just now",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@acme.com",
      role: "manager",
      status: "active",
      lastActive: "2 hours ago",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@acme.com",
      role: "member",
      status: "active",
      lastActive: "1 day ago",
    },
    {
      id: "4",
      name: "Alice Brown",
      email: "alice@acme.com",
      role: "member",
      status: "pending",
      lastActive: "Never",
    },
  ])

  const handleInviteChange = (field: string, value: string) => {
    setInviteData({
      ...inviteData,
      [field]: value,
    })
  }

  const handleInviteSubmit = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsInviteDialogOpen(false)

      // Add the invited user to the list with pending status
      const newUser: UserData = {
        id: Date.now().toString(),
        name: inviteData.email.split("@")[0], // Temporary name from email
        email: inviteData.email,
        role: inviteData.role,
        status: "pending",
        lastActive: "Never",
      }

      setUsers([...users, newUser])

      // Reset invite form
      setInviteData({
        email: "",
        role: "member",
      })

      toast({
        title: "Invitation sent",
        description: `An invitation has been sent to ${inviteData.email}`,
      })
    }, 1000)
  }

  const handleRemoveUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId))

    toast({
      title: "User removed",
      description: "The user has been removed from your organization.",
    })
  }

  const handleChangeRole = (userId: string, newRole: string) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole } : user)))

    toast({
      title: "Role updated",
      description: "The user's role has been updated successfully.",
    })
  }

  const handleResendInvite = (email: string) => {
    toast({
      title: "Invitation resent",
      description: `A new invitation has been sent to ${email}`,
    })
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "manager":
        return "bg-blue-100 text-blue-800"
      case "member":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4" />
      case "manager":
        return <UserCog className="h-4 w-4" />
      case "member":
        return <User className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Team Members</h3>
          <p className="text-sm text-muted-foreground">Manage users who have access to your organization.</p>
        </div>
        <Button onClick={() => setIsInviteDialogOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite User
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      {user.avatarUrl ? (
                        <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
                      ) : (
                        <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`${getRoleBadgeColor(user.role)} flex w-fit items-center gap-1`} variant="outline">
                    {getRoleIcon(user.role)}
                    <span className="capitalize">{user.role}</span>
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeColor(user.status)} variant="outline">
                    <span className="capitalize">{user.status}</span>
                  </Badge>
                </TableCell>
                <TableCell>{user.lastActive}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {user.status === "pending" ? (
                        <DropdownMenuItem onClick={() => handleResendInvite(user.email)}>
                          <Mail className="mr-2 h-4 w-4" />
                          Resend Invite
                        </DropdownMenuItem>
                      ) : (
                        <>
                          <DropdownMenuItem onClick={() => handleChangeRole(user.id, "admin")}>
                            <Shield className="mr-2 h-4 w-4" />
                            Make Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleChangeRole(user.id, "manager")}>
                            <UserCog className="mr-2 h-4 w-4" />
                            Make Manager
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleChangeRole(user.id, "member")}>
                            <User className="mr-2 h-4 w-4" />
                            Make Member
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuItem
                        onClick={() => handleRemoveUser(user.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <UserX className="mr-2 h-4 w-4" />
                        Remove User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>Send an invitation to join your organization.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="colleague@example.com"
                value={inviteData.email}
                onChange={(e) => handleInviteChange("email", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={inviteData.role} onValueChange={(value) => handleInviteChange("role", value)}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>Admin</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="manager">
                    <div className="flex items-center gap-2">
                      <UserCog className="h-4 w-4" />
                      <span>Manager</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="member">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Member</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                {inviteData.role === "admin" && "Admins have full access to all settings and can manage users."}
                {inviteData.role === "manager" &&
                  "Managers can manage agents and view analytics, but cannot change organization settings."}
                {inviteData.role === "member" && "Members can use the platform but cannot modify settings."}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInviteSubmit} disabled={!inviteData.email || isLoading}>
              {isLoading ? "Sending..." : "Send Invitation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
