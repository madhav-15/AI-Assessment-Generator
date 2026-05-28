"use client";

import { useState } from "react";
import { Bell, Lock, User } from "lucide-react";
import { SectionPage } from "@/components/layout/SectionPage";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);

  return (
    <SectionPage
      eyebrow="Account"
      title="Settings"
      description="Adjust personal preferences, notification behavior, and workspace account details."
      action={{ href: "/home", label: "Return home" }}
    >
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[24px] bg-white p-5" style={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.02)' }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#EBEBEB] bg-white">
              <User className="h-5 w-5 text-[#1E1E1E]" />
            </div>
            <div>
              <h2 className="text-[20px] font-bold tracking-[-0.04em] text-[#303030]" style={{ fontFamily: 'var(--font-bricolage)' }}>Profile</h2>
              <p className="text-[14px] text-[rgba(94,94,94,0.8)]" style={{ fontFamily: 'var(--font-bricolage)' }}>Workspace identity and account details.</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-[20px] bg-[#f7f7f7] p-4">
              <p className="text-[12px] uppercase tracking-[0.18em] text-[#A9A9A9]" style={{ fontFamily: 'var(--font-bricolage)' }}>Name</p>
              <p className="mt-1 text-[16px] font-bold tracking-[-0.04em] text-[#303030]" style={{ fontFamily: 'var(--font-bricolage)' }}>John Doe</p>
            </div>
            <div className="rounded-[20px] bg-[#f7f7f7] p-4">
              <p className="text-[12px] uppercase tracking-[0.18em] text-[#A9A9A9]" style={{ fontFamily: 'var(--font-bricolage)' }}>School</p>
              <p className="mt-1 text-[16px] font-bold tracking-[-0.04em] text-[#303030]" style={{ fontFamily: 'var(--font-bricolage)' }}>Delhi Public School, Bokaro Steel City</p>
            </div>
            <div className="rounded-[20px] bg-[#f7f7f7] p-4">
              <p className="text-[12px] uppercase tracking-[0.18em] text-[#A9A9A9]" style={{ fontFamily: 'var(--font-bricolage)' }}>Role</p>
              <p className="mt-1 text-[16px] font-bold tracking-[-0.04em] text-[#303030]" style={{ fontFamily: 'var(--font-bricolage)' }}>Teacher</p>
            </div>
          </div>
        </div>

        <div className="rounded-[24px] bg-white p-5" style={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.02)' }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#EBEBEB] bg-white">
              <Bell className="h-5 w-5 text-[#1E1E1E]" />
            </div>
            <div>
              <h2 className="text-[20px] font-bold tracking-[-0.04em] text-[#303030]" style={{ fontFamily: 'var(--font-bricolage)' }}>Preferences</h2>
              <p className="text-[14px] text-[rgba(94,94,94,0.8)]" style={{ fontFamily: 'var(--font-bricolage)' }}>Notifications and security behavior.</p>
            </div>
          </div>

          <label className="flex items-center justify-between rounded-[20px] bg-[#f7f7f7] p-4">
            <div>
              <p className="text-[16px] font-bold tracking-[-0.04em] text-[#303030]" style={{ fontFamily: 'var(--font-bricolage)' }}>Notifications</p>
              <p className="text-[14px] text-[rgba(94,94,94,0.8)]" style={{ fontFamily: 'var(--font-bricolage)' }}>Receive updates when generation finishes</p>
            </div>
            <input type="checkbox" checked={notifications} onChange={(event) => setNotifications(event.target.checked)} />
          </label>

          <div className="mt-4 rounded-[20px] bg-[#f7f7f7] p-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center border border-[#EBEBEB] bg-white">
                <Lock className="h-4 w-4 text-[#1E1E1E]" />
              </div>
              <p className="text-[16px] font-bold tracking-[-0.04em] text-[#303030]" style={{ fontFamily: 'var(--font-bricolage)' }}>Security</p>
            </div>
            <p className="mt-3 text-[14px] text-[rgba(94,94,94,0.8)]" style={{ fontFamily: 'var(--font-bricolage)' }}>Password and workspace access controls can be added here next.</p>
          </div>
        </div>
      </div>
    </SectionPage>
  );
}