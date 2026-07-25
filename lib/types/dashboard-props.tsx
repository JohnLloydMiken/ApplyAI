export type IconKey = "file-user" | "save-check" | "form"


export interface DashboardProps{
    label:string,
    href: string,
    icon: IconKey
}