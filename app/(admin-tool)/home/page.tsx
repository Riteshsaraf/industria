"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import DashboardCard from "@/app/components/DashboardCard";
import {
    Users,
    Form,
    ListCheck,
    Brackets,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  

  return (
     <div className="flex min-h-screen h-screen">

      {/* Sidebar */}
      <Sidebar/>
     

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto h-[calc(100vh-3.5rem)]">
              <h1 className="text-[18px] font-semibold mb-4 text-[#13499f]">Home</h1>
        
              <div className="p-6 rounded">
                  <h3 className="mb-8">Next ToolAdmin</h3>


                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                      {/* Card 1 */}
                      

                      {/* Card 3 */}
                      <DashboardCard
                          title="Manage Category"
                          subtitle="manage category"
                          icon={Brackets}
                          link={'/category/new'}
                      />


                      {/* Card 2 */}
                      <DashboardCard
                          title="Manage Company info"
                          subtitle="Create a company info"
                          icon={ListCheck}
                          link={'/company'}
                      />
                  </div>

        </div>
      </main>

    </div>
  );
}