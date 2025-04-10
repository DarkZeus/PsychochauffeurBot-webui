import React from 'react';
import {
    Search,
    MoreHorizontal,
    Edit,
    Trash,
    Ban,
    Check,
    MessageSquare,
    Filter,
    Download,
    UserPlus,
    Users as UsersIcon,
    Clock,
    Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users')({
  component: Users,
})

// Mock user data
const usersData = [
  {
    id: 12345678,
    username: "john_doe",
    firstName: "John",
    lastName: "Doe",
    profilePic: null,
    status: "active",
    role: "user",
    joinDate: "2025-01-15T14:30:00Z",
    lastActive: "2025-03-26T18:45:22Z",
    language: "en",
    timezone: "America/New_York",
    messageCount: 127,
    email: "john.doe@example.com",
    notes: "Regular user, interested in tech updates"
  },
  {
    id: 23456789,
    username: "jane_smith",
    firstName: "Jane",
    lastName: "Smith",
    profilePic: null,
    status: "active",
    role: "admin",
    joinDate: "2025-01-10T09:15:00Z",
    lastActive: "2025-03-27T10:12:08Z",
    language: "en",
    timezone: "Europe/London",
    messageCount: 342,
    email: "jane.smith@example.com",
    notes: "Main administrator"
  },
  {
    id: 34567890,
    username: "alex_kumar",
    firstName: "Alex",
    lastName: "Kumar",
    profilePic: null,
    status: "active",
    role: "moderator",
    joinDate: "2025-01-25T16:20:00Z",
    lastActive: "2025-03-26T21:30:45Z",
    language: "en",
    timezone: "Asia/Kolkata",
    messageCount: 215,
    email: "alex.kumar@example.com",
    notes: "Helps with content moderation"
  },
  {
    id: 45678901,
    username: "maria_garcia",
    firstName: "Maria",
    lastName: "Garcia",
    profilePic: null,
    status: "inactive",
    role: "user",
    joinDate: "2025-02-05T11:45:00Z",
    lastActive: "2025-03-15T08:22:10Z",
    language: "es",
    timezone: "Europe/Madrid",
    messageCount: 78,
    email: "maria.garcia@example.com",
    notes: "Inactive for over a week"
  },
  {
    id: 56789012,
    username: "zhang_wei",
    firstName: "Wei",
    lastName: "Zhang",
    profilePic: null,
    status: "blocked",
    role: "user",
    joinDate: "2025-02-12T13:10:00Z",
    lastActive: "2025-03-20T15:48:33Z",
    language: "zh",
    timezone: "Asia/Shanghai",
    messageCount: 56,
    email: "zhang.wei@example.com",
    notes: "Blocked for spam violations"
  },
  {
    id: 67890123,
    username: "emma_wilson",
    firstName: "Emma",
    lastName: "Wilson",
    profilePic: null,
    status: "active",
    role: "user",
    joinDate: "2025-02-18T10:25:00Z",
    lastActive: "2025-03-27T09:15:40Z",
    language: "en",
    timezone: "Australia/Sydney",
    messageCount: 92,
    email: "emma.wilson@example.com",
    notes: ""
  },
  {
    id: 78901234,
    username: "carlos_rodriguez",
    firstName: "Carlos",
    lastName: "Rodriguez",
    profilePic: null,
    status: "active",
    role: "user",
    joinDate: "2025-02-20T15:50:00Z",
    lastActive: "2025-03-26T22:05:19Z",
    language: "es",
    timezone: "America/Mexico_City",
    messageCount: 104,
    email: "carlos.rodriguez@example.com",
    notes: "Frequent user, interested in sports updates"
  }
];

// User status badge component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
    inactive: { label: 'Inactive', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
    blocked: { label: 'Blocked', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' }
  };

  const config = statusConfig[status] || statusConfig.active;

  return (
    <Badge variant="outline" className={config.color}>
      {config.label}
    </Badge>
  );
};

// User role badge component
const RoleBadge = ({ role }) => {
  const roleConfig = {
    admin: { label: 'Admin', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' },
    moderator: { label: 'Moderator', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
    user: { label: 'User', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' }
  };

  const config = roleConfig[role] || roleConfig.user;

  return (
    <Badge variant="outline" className={config.color}>
      {config.label}
    </Badge>
  );
};

function Users() {
    const [users, setUsers] = React.useState(usersData);
    const [userDialogOpen, setUserDialogOpen] = React.useState(false);
    const [messageDialogOpen, setMessageDialogOpen] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState(null);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [activeTab, setActiveTab] = React.useState('all');

    const handleOpenUserDialog = (user = null) => {
        setSelectedUser(user || {
            id: Math.max(...users.map(u => u.id)) + 1,
            username: '',
            firstName: '',
            lastName: '',
            profilePic: null,
            status: 'active',
            role: 'user',
            joinDate: new Date().toISOString(),
            lastActive: new Date().toISOString(),
            language: 'en',
            timezone: 'UTC',
            messageCount: 0,
            email: '',
            notes: ''
        });
        setUserDialogOpen(true);
    };

    const handleOpenMessageDialog = (user) => {
        setSelectedUser(user);
        setMessageDialogOpen(true);
    };

    const handleSaveUser = () => {
        if (users.some(u => u.id === selectedUser.id)) {
            setUsers(users.map(user =>
                user.id === selectedUser.id ? selectedUser : user
            ));
        } else {
            setUsers([...users, selectedUser]);
        }
        setUserDialogOpen(false);
    };

    const handleDeleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const handleToggleUserStatus = (id) => {
        setUsers(users.map(user =>
            user.id === id
                ? {
                    ...user,
                    status: user.status === 'active'
                        ? 'inactive'
                        : user.status === 'inactive'
                            ? 'active'
                            : 'inactive'
                }
                : user
        ));
    };

    const handleBlockUser = (id) => {
        setUsers(users.map(user =>
            user.id === id
                ? {...user, status: 'blocked'}
                : user
        ));
    };

    const handleUnblockUser = (id) => {
        setUsers(users.map(user =>
            user.id === id
                ? {...user, status: 'active'}
                : user
        ));
    };

    const filteredUsers = users.filter(user => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
            user.username.toLowerCase().includes(searchLower) ||
            user.firstName.toLowerCase().includes(searchLower) ||
            user.lastName.toLowerCase().includes(searchLower) ||
            user.email.toLowerCase().includes(searchLower);

        if (activeTab === 'all') return matchesSearch;
        if (activeTab === 'active') return matchesSearch && user.status === 'active';
        if (activeTab === 'inactive') return matchesSearch && user.status === 'inactive';
        if (activeTab === 'blocked') return matchesSearch && user.status === 'blocked';
        if (activeTab === 'admins') return matchesSearch && user.role === 'admin';

        return matchesSearch;
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Users</h1>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4"/>
                        Export
                    </Button>
                    <Button size="sm" onClick={() => handleOpenUserDialog()}>
                        <UserPlus className="mr-2 h-4 w-4"/>
                        Add User
                    </Button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"/>
                    <Input
                        className="pl-9 w-full"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4"/>
                    Filters
                </Button>
            </div>

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="all">All Users</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="inactive">Inactive</TabsTrigger>
                    <TabsTrigger value="blocked">Blocked</TabsTrigger>
                    <TabsTrigger value="admins">Admins</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-4">
                    <Card>
                        <CardHeader className="py-4">
                            <CardTitle>User Management</CardTitle>
                            <CardDescription>
                                View and manage users of your Telegram bot.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Last Active</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredUsers.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8">
                                                <UsersIcon className="h-8 w-8 mx-auto mb-2 text-gray-400"/>
                                                <p className="text-gray-500">No users found.</p>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredUsers.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar>
                                                            <AvatarImage
                                                                src={user.profilePic || `/api/placeholder/${user.id % 100}/${user.id % 100}`}
                                                                alt={`${user.firstName} ${user.lastName}`}/>
                                                            <AvatarFallback>
                                                                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div
                                                                className="font-medium">{user.firstName} {user.lastName}</div>
                                                            <div
                                                                className="text-sm text-gray-500">@{user.username}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-mono text-sm">{user.id}</TableCell>
                                                <TableCell>
                                                    <StatusBadge status={user.status}/>
                                                </TableCell>
                                                <TableCell>
                                                    <RoleBadge role={user.role}/>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <Clock className="h-3 w-3 mr-1 text-gray-500"/>
                                                        <span className="text-sm">
                              {new Date(user.lastActive).toLocaleDateString()}
                            </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                <MoreHorizontal className="h-4 w-4"/>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem
                                                                onClick={() => handleOpenUserDialog(user)}>
                                                                <Edit className="mr-2 h-4 w-4"/>
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => handleOpenMessageDialog(user)}>
                                                                <MessageSquare className="mr-2 h-4 w-4"/>
                                                                Message
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator/>
                                                            {user.status === 'blocked' ? (
                                                                <DropdownMenuItem
                                                                    onClick={() => handleUnblockUser(user.id)}>
                                                                    <Check className="mr-2 h-4 w-4"/>
                                                                    Unblock
                                                                </DropdownMenuItem>
                                                            ) : (
                                                                <>
                                                                    <DropdownMenuItem
                                                                        onClick={() => handleToggleUserStatus(user.id)}>
                                                                        {user.status === 'active' ? (
                                                                            <>
                                                                                <Ban className="mr-2 h-4 w-4"/>
                                                                                Deactivate
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <Check className="mr-2 h-4 w-4"/>
                                                                                Activate
                                                                            </>
                                                                        )}
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        onClick={() => handleBlockUser(user.id)}>
                                                                        <Ban className="mr-2 h-4 w-4 text-red-500"/>
                                                                        <span className="text-red-500">Block</span>
                                                                    </DropdownMenuItem>
                                                                </>
                                                            )}
                                                            <DropdownMenuSeparator/>
                                                            <DropdownMenuItem
                                                                className="text-red-500"
                                                                onClick={() => handleDeleteUser(user.id)}
                                                            >
                                                                <Trash className="mr-2 h-4 w-4"/>
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* User Edit Dialog */}
            <Dialog open={userDialogOpen} onOpenChange={setUserDialogOpen}>
                <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>
                            {selectedUser && (selectedUser.firstName || selectedUser.lastName)
                                ? `Edit User: ${selectedUser.firstName} ${selectedUser.lastName}`
                                : 'Add New User'}
                        </DialogTitle>
                        <DialogDescription>
                            {selectedUser && selectedUser.id
                                ? `Update details for user ID: ${selectedUser.id}`
                                : 'Create a new user record for your bot.'}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedUser && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        value={selectedUser.firstName}
                                        onChange={(e) => setSelectedUser({...selectedUser, firstName: e.target.value})}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        value={selectedUser.lastName}
                                        onChange={(e) => setSelectedUser({...selectedUser, lastName: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        value={selectedUser.username}
                                        onChange={(e) => setSelectedUser({...selectedUser, username: e.target.value})}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={selectedUser.email}
                                        onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={selectedUser.status}
                                        onValueChange={(value) => setSelectedUser({...selectedUser, status: value})}
                                    >
                                        <SelectTrigger id="status">
                                            <SelectValue placeholder="Select status"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                            <SelectItem value="blocked">Blocked</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Select
                                        value={selectedUser.role}
                                        onValueChange={(value) => setSelectedUser({...selectedUser, role: value})}
                                    >
                                        <SelectTrigger id="role">
                                            <SelectValue placeholder="Select role"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="user">User</SelectItem>
                                            <SelectItem value="moderator">Moderator</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="language">Language</Label>
                                    <Select
                                        value={selectedUser.language}
                                        onValueChange={(value) => setSelectedUser({...selectedUser, language: value})}
                                    >
                                        <SelectTrigger id="language">
                                            <SelectValue placeholder="Select language"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="en">English</SelectItem>
                                            <SelectItem value="es">Spanish</SelectItem>
                                            <SelectItem value="fr">French</SelectItem>
                                            <SelectItem value="de">German</SelectItem>
                                            <SelectItem value="zh">Chinese</SelectItem>
                                            <SelectItem value="ja">Japanese</SelectItem>
                                            <SelectItem value="ru">Russian</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="timezone">Timezone</Label>
                                    <Select
                                        value={selectedUser.timezone}
                                        onValueChange={(value) => setSelectedUser({...selectedUser, timezone: value})}
                                    >
                                        <SelectTrigger id="timezone">
                                            <SelectValue placeholder="Select timezone"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="UTC">UTC</SelectItem>
                                            <SelectItem value="America/New_York">America/New_York</SelectItem>
                                            <SelectItem value="Europe/London">Europe/London</SelectItem>
                                            <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                                            <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
                                            <SelectItem value="Asia/Shanghai">Asia/Shanghai</SelectItem>
                                            <SelectItem value="Australia/Sydney">Australia/Sydney</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                    id="notes"
                                    value={selectedUser.notes}
                                    onChange={(e) => setSelectedUser({...selectedUser, notes: e.target.value})}
                                    placeholder="Add any notes about this user..."
                                />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setUserDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveUser}>
                            Save User
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Send Message Dialog */}
            <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>
                            Send Message to {selectedUser?.firstName} {selectedUser?.lastName}
                        </DialogTitle>
                        <DialogDescription>
                            This message will be sent directly to the user via the Telegram bot.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage
                                    src={selectedUser?.profilePic || `/api/placeholder/${selectedUser?.id % 100}/${selectedUser?.id % 100}`}
                                    alt={`${selectedUser?.firstName} ${selectedUser?.lastName}`}/>
                                <AvatarFallback>
                                    {selectedUser?.firstName?.charAt(0)}{selectedUser?.lastName?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium">{selectedUser?.firstName} {selectedUser?.lastName}</div>
                                <div className="text-sm text-gray-500">@{selectedUser?.username}</div>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="messageType">Message Type</Label>
                            <Select defaultValue="text">
                                <SelectTrigger id="messageType">
                                    <SelectValue placeholder="Select message type"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="text">Text Message</SelectItem>
                                    <SelectItem value="photo">Photo with Caption</SelectItem>
                                    <SelectItem value="document">Document/File</SelectItem>
                                    <SelectItem value="poll">Poll</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="messageContent">Message Content</Label>
                            <Textarea
                                id="messageContent"
                                placeholder="Type your message here..."
                                className="min-h-[150px]"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="notification"/>
                            <Label htmlFor="notification">Send with notification</Label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setMessageDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                // In a real app, this would send the message
                                setMessageDialogOpen(false);
                            }}
                        >
                            <Send className="mr-2 h-4 w-4"/>
                            Send Message
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}