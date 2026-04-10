import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface DashboardCardProps {
    title: string;
    subtitle?: string;
    icon: LucideIcon;
    iconBg?: string;
    link?: string
}

export default function DashboardCard({
    title='',
    subtitle,
    icon: Icon,
    iconBg = "bg-blue-100",
    link='',
}: DashboardCardProps) {
    return (

        <Link href={link}>
        <div className="rounded-2xl border-[#8C8C8C] bg-white p-5 shadow-sm hover:shadow-md transition cursor-pointer">
            <div className={`rounded-xl p-3 text-center justify-center`}>
                    <Icon className={"h-6 w-6 text-[#13499f]"} />
            </div>
            {/*<p className="text-sm text-gray-500">{title}</p>*/}
                <h2 className="mt-2 text-[20px] font-bold text-[#13499f]">
                {title}
            </h2>
            {subtitle && (
                <p className="mt-1 text-sm text-gray-400">{subtitle}</p>
            )}
            </div>
        </Link>
    );
}
