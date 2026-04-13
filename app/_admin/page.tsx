"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ThemeToggle } from "@/components/theme-toggle"
import {
    LogOut,
    Mail,
    MailOpen,
    MessageSquare,
    Users,
    CalendarDays,
    ShieldCheck,
    Search,
    Eye,
    CheckCircle2,
    Loader2,
    Inbox,
    Building2,
    Phone,
    Clock,
    RefreshCcw,
} from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

interface Contact {
    id: number
    name: string
    email: string
    phone: string
    company: string
    role: string
    message: string
    role_specific_data: string
    is_read: number
    created_at: string
}

interface Stats {
    total: number
    unread: number
    today: number
    uniqueRoles: number
}

const ROLE_LABELS: Record<string, string> = {
    founder: "Founder / Entrepreneur",
    investor: "Investor / VC",
    enabler: "Enabler / Accelerator",
}

const ROLE_COLORS: Record<string, string> = {
    founder: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    investor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    enabler: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
}

const ROLE_SPECIFIC_LABELS: Record<string, string> = {
    fundingStage: "Funding Stage",
    teamSize: "Team Size",
    industry: "Industry / Sector",
    investmentRange: "Investment Range",
    investmentStage: "Investment Stage",
    sectorsOfInterest: "Sectors of Interest",
    organizationType: "Organization Type",
    programType: "Program Type",
    supportServices: "Support Services",
}

function formatDate(dateStr: string): string {
    const date = new Date(dateStr + "Z")
    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}

function formatRelativeDate(dateStr: string): string {
    const date = new Date(dateStr + "Z")
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return formatDate(dateStr)
}

export default function AdminDashboard() {
    const router = useRouter()
    const [contacts, setContacts] = useState<Contact[]>([])
    const [stats, setStats] = useState<Stats>({ total: 0, unread: 0, today: 0, uniqueRoles: 0 })
    const [isLoading, setIsLoading] = useState(true)
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [roleFilter, setRoleFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")

    const fetchMessages = useCallback(async () => {
        try {
            const response = await fetch("/api/admin/messages")
            if (response.status === 401) {
                router.push("/admin/login")
                return
            }
            const data = await response.json()
            setContacts(data.contacts || [])
            setStats(data.stats || { total: 0, unread: 0, today: 0, uniqueRoles: 0 })
        } catch {
            toast.error("Failed to fetch messages")
        } finally {
            setIsLoading(false)
        }
    }, [router])

    useEffect(() => {
        fetchMessages()
    }, [fetchMessages])

    const handleLogout = async () => {
        try {
            await fetch("/api/admin/logout", { method: "POST" })
            router.push("/admin/login")
            router.refresh()
        } catch {
            toast.error("Failed to log out")
        }
    }

    const handleMarkAsRead = async (id: number) => {
        try {
            const response = await fetch("/api/admin/messages", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            })

            if (response.ok) {
                setContacts((prev) =>
                    prev.map((c) => (c.id === id ? { ...c, is_read: 1 } : c))
                )
                setStats((prev) => ({ ...prev, unread: Math.max(0, prev.unread - 1) }))
                toast.success("Marked as read")
            }
        } catch {
            toast.error("Failed to update message")
        }
    }

    const handleViewContact = (contact: Contact) => {
        setSelectedContact(contact)
        setDialogOpen(true)
        if (!contact.is_read) {
            handleMarkAsRead(contact.id)
        }
    }

    const filteredContacts = contacts.filter((contact) => {
        const matchesSearch =
            searchQuery === "" ||
            contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.company.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesRole = roleFilter === "all" || contact.role === roleFilter

        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "unread" && !contact.is_read) ||
            (statusFilter === "read" && contact.is_read)

        return matchesSearch && matchesRole && matchesStatus
    })

    const getRoleSpecificData = (contact: Contact) => {
        try {
            const data = JSON.parse(contact.role_specific_data)
            return Object.entries(data).filter(([, v]) => v)
        } catch {
            return []
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Loader2 className="h-10 w-10 animate-spin text-primary-blue mx-auto" />
                    <p className="text-muted-foreground">Loading dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Admin Header */}
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Link href="/" className="flex items-center space-x-2 group">
                            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">MT</span>
                            </div>
                        </Link>
                        <div className="h-6 w-px bg-border" />
                        <div className="flex items-center space-x-2">
                            <ShieldCheck className="h-5 w-5 text-primary-blue" />
                            <span className="font-semibold text-foreground">Admin Dashboard</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <ThemeToggle />
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleLogout}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {/* Page Title */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Contact Messages</h1>
                    <p className="text-muted-foreground mt-1">
                        View and manage messages submitted through the contact form.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <Card className="border-primary-blue-light hover:shadow-md transition-shadow">
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Messages</p>
                                    <p className="text-3xl font-bold text-foreground mt-1">{stats.total}</p>
                                </div>
                                <div className="w-12 h-12 bg-primary-blue-light rounded-xl flex items-center justify-center">
                                    <MessageSquare className="h-6 w-6 text-primary-blue" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-orange-200 dark:border-orange-900/30 hover:shadow-md transition-shadow">
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Unread</p>
                                    <p className="text-3xl font-bold text-foreground mt-1">{stats.unread}</p>
                                </div>
                                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                                    <Mail className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-emerald-200 dark:border-emerald-900/30 hover:shadow-md transition-shadow">
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Today</p>
                                    <p className="text-3xl font-bold text-foreground mt-1">{stats.today}</p>
                                </div>
                                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center">
                                    <CalendarDays className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-purple-200 dark:border-purple-900/30 hover:shadow-md transition-shadow">
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Unique Roles</p>
                                    <p className="text-3xl font-bold text-foreground mt-1">{stats.uniqueRoles}</p>
                                </div>
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                                    <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="mb-6">
                    <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search by name, email, or company..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <div className="flex gap-3 w-full md:w-auto">
                                <Select value={roleFilter} onValueChange={setRoleFilter}>
                                    <SelectTrigger className="w-full md:w-[180px]">
                                        <SelectValue placeholder="Filter by role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Roles</SelectItem>
                                        <SelectItem value="founder">Founder</SelectItem>
                                        <SelectItem value="investor">Investor</SelectItem>
                                        <SelectItem value="enabler">Enabler</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-full md:w-[180px]">
                                        <SelectValue placeholder="Filter by status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="unread">Unread</SelectItem>
                                        <SelectItem value="read">Read</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => {
                                        setIsLoading(true)
                                        fetchMessages()
                                    }}
                                    title="Refresh"
                                >
                                    <RefreshCcw className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Messages Table */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">
                                Messages
                                {filteredContacts.length !== contacts.length && (
                                    <span className="text-sm font-normal text-muted-foreground ml-2">
                                        ({filteredContacts.length} of {contacts.length})
                                    </span>
                                )}
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {filteredContacts.length === 0 ? (
                            <div className="text-center py-16 space-y-4">
                                <Inbox className="h-12 w-12 text-muted-foreground mx-auto opacity-50" />
                                <div>
                                    <p className="text-lg font-medium text-foreground">No messages found</p>
                                    <p className="text-sm text-muted-foreground">
                                        {contacts.length === 0
                                            ? "Contact form submissions will appear here."
                                            : "Try adjusting your filters."}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[40px]"></TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead className="hidden md:table-cell">Email</TableHead>
                                            <TableHead className="hidden lg:table-cell">Company</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead className="hidden md:table-cell">Date</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredContacts.map((contact) => (
                                            <TableRow
                                                key={contact.id}
                                                className={`cursor-pointer transition-colors hover:bg-muted/50 ${!contact.is_read ? "bg-primary-blue/[0.03]" : ""
                                                    }`}
                                                onClick={() => handleViewContact(contact)}
                                            >
                                                <TableCell>
                                                    {contact.is_read ? (
                                                        <MailOpen className="h-4 w-4 text-muted-foreground" />
                                                    ) : (
                                                        <Mail className="h-4 w-4 text-primary-blue" />
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <span className={`${!contact.is_read ? "font-semibold" : ""}`}>
                                                        {contact.name}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell text-muted-foreground">
                                                    {contact.email}
                                                </TableCell>
                                                <TableCell className="hidden lg:table-cell text-muted-foreground">
                                                    {contact.company || "—"}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="secondary"
                                                        className={`text-xs ${ROLE_COLORS[contact.role] || ""}`}
                                                    >
                                                        {ROLE_LABELS[contact.role] || contact.role}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                                                    {formatRelativeDate(contact.created_at)}
                                                </TableCell>
                                                <TableCell>
                                                    {contact.is_read ? (
                                                        <Badge variant="outline" className="text-xs">
                                                            Read
                                                        </Badge>
                                                    ) : (
                                                        <Badge className="text-xs bg-primary-blue hover:bg-primary-blue">
                                                            New
                                                        </Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end space-x-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0"
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                handleViewContact(contact)
                                                            }}
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        {!contact.is_read && (
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-8 w-8 p-0 text-emerald-600"
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    handleMarkAsRead(contact.id)
                                                                }}
                                                            >
                                                                <CheckCircle2 className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </main>

            {/* Message Detail Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                    {selectedContact && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-3 text-xl">
                                    <span>{selectedContact.name}</span>
                                    <Badge
                                        variant="secondary"
                                        className={`text-xs ${ROLE_COLORS[selectedContact.role] || ""}`}
                                    >
                                        {ROLE_LABELS[selectedContact.role] || selectedContact.role}
                                    </Badge>
                                </DialogTitle>
                            </DialogHeader>

                            <div className="space-y-6 mt-4">
                                {/* Contact Info Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                                        <Mail className="h-4 w-4 text-primary-blue flex-shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-xs text-muted-foreground">Email</p>
                                            <p className="text-sm font-medium truncate">{selectedContact.email}</p>
                                        </div>
                                    </div>

                                    {selectedContact.phone && (
                                        <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                                            <Phone className="h-4 w-4 text-primary-blue flex-shrink-0" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Phone</p>
                                                <p className="text-sm font-medium">{selectedContact.phone}</p>
                                            </div>
                                        </div>
                                    )}

                                    {selectedContact.company && (
                                        <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                                            <Building2 className="h-4 w-4 text-primary-blue flex-shrink-0" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Company</p>
                                                <p className="text-sm font-medium">{selectedContact.company}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                                        <Clock className="h-4 w-4 text-primary-blue flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Submitted</p>
                                            <p className="text-sm font-medium">{formatDate(selectedContact.created_at)}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Message */}
                                {selectedContact.message && (
                                    <div>
                                        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                                            <MessageSquare className="h-4 w-4 text-primary-blue" />
                                            Message
                                        </h4>
                                        <div className="p-4 bg-muted/30 rounded-lg border">
                                            <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                                                {selectedContact.message}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Role Specific Data */}
                                {getRoleSpecificData(selectedContact).length > 0 && (
                                    <div>
                                        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                                            <Users className="h-4 w-4 text-primary-blue" />
                                            {ROLE_LABELS[selectedContact.role] || selectedContact.role} Details
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {getRoleSpecificData(selectedContact).map(
                                                ([key, value]) => (
                                                    <div
                                                        key={key}
                                                        className="p-3 bg-muted/50 rounded-lg"
                                                    >
                                                        <p className="text-xs text-muted-foreground">
                                                            {ROLE_SPECIFIC_LABELS[key] || key}
                                                        </p>
                                                        <p className="text-sm font-medium mt-0.5 capitalize">
                                                            {String(value).replace(/-/g, " ")}
                                                        </p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Action Footer */}
                                <div className="flex justify-end pt-2 border-t">
                                    {!selectedContact.is_read && (
                                        <Button
                                            onClick={() => handleMarkAsRead(selectedContact.id)}
                                            className="bg-primary-blue hover:bg-primary-blue-dark"
                                        >
                                            <CheckCircle2 className="mr-2 h-4 w-4" />
                                            Mark as Read
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
