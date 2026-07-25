import type { DashboardProps } from "../types/dashboard-props";

export const SidebarContent = [
    {
        title: "Build",
        content: [
            {
                label: "Generate",
                href: "/dashboard/build/generate",
                icon: "file-user"
            },
            {
                label: "ATS checker",
                href: "/dashboard/build/ats-checker",
                icon: "save-check"
            },
        ] satisfies DashboardProps[]
    } ,
    {
        title: "Library",
        content: [
            {
                label: "Template",
                href: "/dashboard/library/generate",
                icon: "form"
            },
        ] satisfies DashboardProps[]
    } ,
    
]