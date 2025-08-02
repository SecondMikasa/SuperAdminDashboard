import {
    Home,
    Users,
    Building2,
    BarChart3,
    Settings,
    HelpCircle,
    FileText,
    Tag,
    MessageSquare
} from "lucide-react"

import { cn } from "../../utils/cn"

const sidebarItems = [
    { icon: Home, label: "Dashboard", active: false },
    { icon: Users, label: "Platform Admins", active: true },
    { icon: Building2, label: "Societies", active: false },
    { icon: BarChart3, label: "Analytics", active: false },
    { icon: FileText, label: "Reports", active: false },
    { icon: Tag, label: "Tags", active: false },
    { icon: MessageSquare, label: "Messages", active: false },
    { icon: Settings, label: "Settings", active: false },
    { icon: HelpCircle, label: "Help", active: false },
]

export function Sidebar() {
    return (
        <div className="w-16 flex flex-col items-center py-4 space-y-2">
            {
                sidebarItems.map((item, index) => (
                    <div
                        key={index}
                        className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer transition-colors",
                            item.active ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600",
                        )}
                    >
                        <item.icon
                            className="w-6 h-6"
                        />
                    </div>
                ))}
        </div>
    )
}
