import {
    Home,
    Users,
    Building2,
    BarChart3,
    Settings,
    HelpCircle,
    FileText,
    Tag,
    MessageSquare,
    ArrowLeft
} from "lucide-react"

import { cn } from "../../utils/cn"

const sidebarItems = [
    { icon: ArrowLeft, label: "Back", active: false, color: "bg-orange-500" },
    { icon: Home, label: "Dashboard", active: false, color: "bg-blue-500" },
    { icon: Users, label: "Platform Admins", active: true, color: "bg-green-500" },
    { icon: Building2, label: "Societies", active: false, color: "bg-purple-500" },
    { icon: BarChart3, label: "Analytics", active: false, color: "bg-indigo-500" },
    { icon: FileText, label: "Reports", active: false, color: "bg-pink-500" },
    { icon: Tag, label: "Tags", active: false, color: "bg-yellow-500" },
    { icon: MessageSquare, label: "Messages", active: false, color: "bg-red-500" },
    { icon: Settings, label: "Settings", active: false, color: "bg-gray-500" },
    { icon: HelpCircle, label: "Help", active: false, color: "bg-teal-500" },
]

export function Sidebar() {
    return (
        <div className="w-16 bg-white flex flex-col items-center py-4 space-y-3 min-h-screen">
            {
                sidebarItems.map((item, index) => (
                    <div
                        key={index}
                        className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105",
                            item.active ? item.color : "bg-slate-700 hover:bg-slate-600",
                        )}
                        title={item.label}
                    >
                        <item.icon
                            className={cn(
                                "w-5 h-5",
                                item.active ? "text-white" : "text-slate-300"
                            )}
                        />
                    </div>
                ))}
        </div>
    )
}
