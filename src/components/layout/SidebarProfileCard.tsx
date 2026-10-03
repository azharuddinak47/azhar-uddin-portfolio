'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Download, ArrowUpRight, Award, Globe, Sparkles, ExternalLink } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Button } from '@/components/common/Button';

export const SidebarProfileCard = ({ onOpenEditModal }: { onOpenEditModal: () => void }) => {
  const { data, isEditMode } = usePortfolio();
  const { profile } = data;

  return (
    <aside className="w-full lg:w-[350px] shrink-0 sticky top-28 self-start z-20">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[32px] bg-[#1c1b18] border border-white/10 p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col justify-between relative overflow-hidden group hover:border-white/20 transition-all duration-300"
      >
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5ff41]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top: Portrait Image in Styled Frame */}
        <div className="relative w-full aspect-[4/4.2] rounded-[24px] overflow-hidden bg-[#131211] border border-white/10 mb-6 shadow-inner group/img">
          <img
            src={profile.avatarUrl || '/assets/avatar.jpg'}
            alt={profile.name}
            className="w-full h-full object-cover object-[75%_38%] group-hover/img:scale-105 transition-all duration-500"
          />

          {/* Availability pill on the image */}
          <div className="absolute top-3.5 left-3.5 z-10">
            <div className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#131211]/90 backdrop-blur-md text-[#c5ff41] border border-[#c5ff41]/30 flex items-center gap-1.5 shadow-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5ff41] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c5ff41]" />
              </span>
              <span>Available for Hire</span>
            </div>
          </div>
        </div>

        {/* Name and Professional Title */}
        <div className="mb-4">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-[family-name:var(--font-poppins)]">
              {profile.name}
            </h2>
          </div>
          <p className="text-sm font-bold text-[#c5ff41] tracking-wide uppercase">
            {profile.role}
          </p>
        </div>

        {/* Bio Summary */}
        <p className="text-xs sm:text-[13px] text-[#998f8f] leading-relaxed mb-6 font-normal line-clamp-4">
          {profile.bio}
        </p>

        {/* Direct Contact Pills */}
        <div className="flex flex-col gap-2.5 mb-6 text-xs text-neutral-300">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#131211] border border-white/5 hover:border-[#c5ff41]/40 hover:text-[#c5ff41] transition-colors truncate"
          >
            <Mail size={14} className="text-[#c5ff41] shrink-0" />
            <span className="truncate font-medium">{profile.email}</span>
          </a>

          <a
            href={`tel:${profile.phone}`}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#131211] border border-white/5 hover:border-[#c5ff41]/40 hover:text-[#c5ff41] transition-colors"
          >
            <Phone size={14} className="text-[#c5ff41] shrink-0" />
            <span className="font-medium">{profile.phone}</span>
          </a>

          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#131211] border border-white/5 text-[#998f8f]">
            <MapPin size={14} className="text-[#c5ff41] shrink-0" />
            <span className="font-medium truncate">{profile.location}</span>
          </div>
        </div>

        {/* Social Links Row (Behance, LinkedIn, etc.) */}
        <div className="flex items-center gap-2 mb-6">
          <a
            href={profile.behanceUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Behance Portfolio"
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#131211] border border-white/10 hover:border-[#c5ff41] hover:text-[#c5ff41] text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5"
          >
            <span>Behance</span>
            <ArrowUpRight size={12} />
          </a>

          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#131211] border border-white/10 hover:border-[#c5ff41] hover:text-[#c5ff41] text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5"
          >
            <span>LinkedIn</span>
            <ArrowUpRight size={12} />
          </a>
        </div>

        {/* Main CTA: Let's Work Together */}
        <div className="flex flex-col gap-2.5 pt-2">
          <Button
            variant="lime"
            size="md"
            href="#contact"
            className="w-full justify-center shadow-lg"
            icon={<ArrowUpRight size={16} />}
          >
            Let&apos;s Work Together
          </Button>

          {isEditMode && (
            <button
              type="button"
              onClick={onOpenEditModal}
              className="w-full py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#f46c38] text-white hover:bg-[#ff7e4a] transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles size={13} />
              Edit Profile Info
            </button>
          )}
        </div>
      </motion.div>
    </aside>
  );
};
