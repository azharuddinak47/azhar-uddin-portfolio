'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Save, Download, RotateCcw, User, BarChart3, 
  FolderKanban, Briefcase, Wrench, Mail, Plus, Trash2, Check, Sparkles, Award 
} from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { PortfolioData, ProjectItem, ExperienceItem, ToolItem, CertificationItem, AcademicItem } from '@/types/portfolio';
import { Button } from '@/components/common/Button';

interface EditPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'profile' | 'stats' | 'projects' | 'experience' | 'tools' | 'credentials' | 'contact';

export const EditPortfolioModal = ({ isOpen, onClose }: EditPortfolioModalProps) => {
  const { data, updateData, resetToDefault, exportConfigJson } = usePortfolio();

  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [saveToast, setSaveToast] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setFormData(data);
    }
  }, [isOpen, data]);

  if (!isOpen) return null;

  const handleSave = () => {
    updateData(() => formData);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all portfolio content back to original defaults?')) {
      resetToDefault();
      setFormData(data);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl rounded-[32px] bg-[#1a1916] border border-[#1d6de3]/30 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden z-10 my-6 flex flex-col max-h-[92vh]"
        >
          {/* Header Bar */}
          <div className="p-5 sm:p-6 border-b border-white/10 bg-[#161513] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#1d6de3] text-white flex items-center justify-center font-bold shadow-[0_0_15px_rgba(29,109,227,0.4)]">
                <Sparkles size={20} />
              </div>
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight font-[family-name:var(--font-poppins)] flex items-center gap-2">
                  <span>Portfolio Editor</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#1d6de3]/20 text-[#60a5fa] border border-[#1d6de3]/30 font-semibold uppercase">
                    Live
                  </span>
                </h2>
                <p className="text-xs text-[#998f8f]">
                  Edit your information, CV projects, experience, and contact details.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="flex items-center gap-1 px-4 sm:px-6 py-2.5 bg-[#141311] border-b border-white/5 overflow-x-auto no-scrollbar">
            {[
              { id: 'profile', label: 'Profile & Hero', icon: <User size={14} /> },
              { id: 'stats', label: 'Stats Counter', icon: <BarChart3 size={14} /> },
              { id: 'projects', label: 'Projects', icon: <FolderKanban size={14} /> },
              { id: 'experience', label: 'Experience', icon: <Briefcase size={14} /> },
              { id: 'tools', label: 'Skills & Tools', icon: <Wrench size={14} /> },
              { id: 'credentials', label: 'Certifications & Edu', icon: <Award size={14} /> },
              { id: 'contact', label: 'Contact Info', icon: <Mail size={14} /> },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#1d6de3] text-white font-bold shadow-[0_0_12px_rgba(29,109,227,0.35)]'
                    : 'text-[#998f8f] hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content Body (Scrollable) */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-grow no-scrollbar space-y-6">
            {/* TAB: PROFILE & HERO */}
            {activeTab === 'profile' && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.profile.name}
                      onChange={e => setFormData({
                        ...formData,
                        profile: { ...formData.profile, name: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#121110] border border-white/10 text-white text-sm focus:border-[#1d6de3] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Professional Role (e.g. UI/UX Designer)
                    </label>
                    <input
                      type="text"
                      value={formData.profile.role}
                      onChange={e => setFormData({
                        ...formData,
                        profile: { ...formData.profile, role: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#121110] border border-white/10 text-white text-sm focus:border-[#1d6de3] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Hero Headline Main (e.g. UI/UX)
                    </label>
                    <input
                      type="text"
                      value={formData.profile.heroHeadline}
                      onChange={e => setFormData({
                        ...formData,
                        profile: { ...formData.profile, heroHeadline: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#121110] border border-white/10 text-white text-sm focus:border-[#1d6de3] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Hero Headline Hollow (e.g. DESIGNER)
                    </label>
                    <input
                      type="text"
                      value={formData.profile.heroHeadlineHollow}
                      onChange={e => setFormData({
                        ...formData,
                        profile: { ...formData.profile, heroHeadlineHollow: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#121110] border border-white/10 text-white text-sm focus:border-[#1d6de3] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="text"
                      value={formData.profile.email}
                      onChange={e => setFormData({
                        ...formData,
                        profile: { ...formData.profile, email: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#121110] border border-white/10 text-white text-sm focus:border-[#1d6de3] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={formData.profile.phone}
                      onChange={e => setFormData({
                        ...formData,
                        profile: { ...formData.profile, phone: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#121110] border border-white/10 text-white text-sm focus:border-[#1d6de3] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Dribbble URL
                    </label>
                    <input
                      type="text"
                      value={formData.profile.dribbbleUrl || ''}
                      onChange={e => setFormData({
                        ...formData,
                        profile: { ...formData.profile, dribbbleUrl: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#121110] border border-white/10 text-white text-sm focus:border-[#1d6de3] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Behance URL
                    </label>
                    <input
                      type="text"
                      value={formData.profile.behanceUrl}
                      onChange={e => setFormData({
                        ...formData,
                        profile: { ...formData.profile, behanceUrl: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#121110] border border-white/10 text-white text-sm focus:border-[#1d6de3] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Facebook URL
                    </label>
                    <input
                      type="text"
                      value={formData.profile.facebookUrl || ''}
                      onChange={e => setFormData({
                        ...formData,
                        profile: { ...formData.profile, facebookUrl: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#121110] border border-white/10 text-white text-sm focus:border-[#1d6de3] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Instagram URL
                    </label>
                    <input
                      type="text"
                      value={formData.profile.instagramUrl || ''}
                      onChange={e => setFormData({
                        ...formData,
                        profile: { ...formData.profile, instagramUrl: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#121110] border border-white/10 text-white text-sm focus:border-[#1d6de3] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      LinkedIn URL
                    </label>
                    <input
                      type="text"
                      value={formData.profile.linkedinUrl}
                      onChange={e => setFormData({
                        ...formData,
                        profile: { ...formData.profile, linkedinUrl: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#121110] border border-white/10 text-white text-sm focus:border-[#1d6de3] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Twitter / X URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.profile.twitterUrl || ''}
                      onChange={e => setFormData({
                        ...formData,
                        profile: { ...formData.profile, twitterUrl: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#121110] border border-white/10 text-white text-sm focus:border-[#1d6de3] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Bio / Summary
                  </label>
                  <textarea
                    rows={3}
                    value={formData.profile.bio}
                    onChange={e => setFormData({
                      ...formData,
                      profile: { ...formData.profile, bio: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#121110] border border-white/10 text-white text-sm focus:border-[#1d6de3] focus:outline-none resize-none"
                  />
                </div>
              </div>
            )}

            {/* TAB: STATS */}
            {activeTab === 'stats' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {formData.stats.map((stat, idx) => (
                    <div key={stat.id || idx} className="p-4 rounded-2xl bg-[#131211] border border-white/8 space-y-3">
                      <span className="text-xs font-bold text-[#60a5fa] block">Card #{idx + 1}</span>
                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-1">Value (e.g. +2)</label>
                        <input
                          type="text"
                          value={stat.value}
                          onChange={e => {
                            const newStats = [...formData.stats];
                            newStats[idx].value = e.target.value;
                            setFormData({ ...formData, stats: newStats });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white font-bold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-1">Label</label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={e => {
                            const newStats = [...formData.stats];
                            newStats[idx].label = e.target.value;
                            setFormData({ ...formData, stats: newStats });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-1">Sublabel</label>
                        <input
                          type="text"
                          value={stat.sublabel}
                          onChange={e => {
                            const newStats = [...formData.stats];
                            newStats[idx].sublabel = e.target.value;
                            setFormData({ ...formData, stats: newStats });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: PROJECTS */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#998f8f]">
                    Manage showcase projects from your CV.
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const newProj: ProjectItem = {
                        id: `proj-${Date.now()}`,
                        title: 'New Project',
                        tagline: 'UI/UX Design Concept',
                        category: 'Mobile App',
                        image: '/assets/project_1.jpg',
                        link: 'https://behance.net',
                        year: '2026',
                        description: 'Detailed description of this newly designed project.',
                        tags: ['Figma', 'UI/UX']
                      };
                      setFormData({ ...formData, projects: [newProj, ...formData.projects] });
                    }}
                    className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1d6de3] text-white flex items-center gap-1.5 shadow-[0_0_12px_rgba(29,109,227,0.3)]"
                  >
                    <Plus size={14} /> Add Project
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.projects.map((proj, pIdx) => (
                    <div key={proj.id} className="p-4 sm:p-5 rounded-2xl bg-[#131211] border border-white/8 space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-bold text-[#60a5fa]">#{pIdx + 1} - {proj.title}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const filtered = formData.projects.filter(p => p.id !== proj.id);
                            setFormData({ ...formData, projects: filtered });
                          }}
                          className="text-red-400 hover:text-red-300 p-1 rounded-lg hover:bg-white/5"
                          title="Delete Project"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Title</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={e => {
                              const updated = [...formData.projects];
                              updated[pIdx].title = e.target.value;
                              setFormData({ ...formData, projects: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Tagline</label>
                          <input
                            type="text"
                            value={proj.tagline}
                            onChange={e => {
                              const updated = [...formData.projects];
                              updated[pIdx].tagline = e.target.value;
                              setFormData({ ...formData, projects: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Category</label>
                          <input
                            type="text"
                            value={proj.category}
                            onChange={e => {
                              const updated = [...formData.projects];
                              updated[pIdx].category = e.target.value;
                              setFormData({ ...formData, projects: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Behance / Case Study URL</label>
                          <input
                            type="text"
                            value={proj.link || ''}
                            onChange={e => {
                              const updated = [...formData.projects];
                              updated[pIdx].link = e.target.value;
                              setFormData({ ...formData, projects: updated });
                            }}
                            placeholder="https://www.behance.net/gallery/..."
                            className="w-full px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">App Store Link URL</label>
                          <input
                            type="text"
                            value={proj.appStoreLink || proj.appLink || proj.figmaLink || ''}
                            onChange={e => {
                              const updated = [...formData.projects];
                              updated[pIdx].appStoreLink = e.target.value;
                              updated[pIdx].appLink = e.target.value;
                              updated[pIdx].figmaLink = e.target.value;
                              setFormData({ ...formData, projects: updated });
                            }}
                            placeholder="https://apps.apple.com/app/..."
                            className="w-full px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={proj.description || ''}
                          onChange={e => {
                            const updated = [...formData.projects];
                            updated[pIdx].description = e.target.value;
                            setFormData({ ...formData, projects: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: EXPERIENCE */}
            {activeTab === 'experience' && (
              <div className="space-y-6">
                <span className="text-xs text-[#998f8f] block">
                  Work history & roles from your CV.
                </span>
                <div className="space-y-4">
                  {formData.experiences.map((exp, eIdx) => (
                    <div key={exp.id} className="p-4 sm:p-5 rounded-2xl bg-[#131211] border border-white/8 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Company</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={e => {
                              const updated = [...formData.experiences];
                              updated[eIdx].company = e.target.value;
                              setFormData({ ...formData, experiences: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Role</label>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={e => {
                              const updated = [...formData.experiences];
                              updated[eIdx].role = e.target.value;
                              setFormData({ ...formData, experiences: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Period</label>
                          <input
                            type="text"
                            value={exp.period}
                            onChange={e => {
                              const updated = [...formData.experiences];
                              updated[eIdx].period = e.target.value;
                              setFormData({ ...formData, experiences: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Logo URL</label>
                          <input
                            type="text"
                            value={exp.logo || ''}
                            placeholder="/assets/logo.png"
                            onChange={e => {
                              const updated = [...formData.experiences];
                              updated[eIdx].logo = e.target.value;
                              setFormData({ ...formData, experiences: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={exp.description}
                          onChange={e => {
                            const updated = [...formData.experiences];
                            updated[eIdx].description = e.target.value;
                            setFormData({ ...formData, experiences: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: TOOLS */}
            {activeTab === 'tools' && (
              <div className="space-y-6">
                <span className="text-xs text-[#998f8f] block">
                  Key Skills & Tools from your CV.
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {formData.tools.map((tool, tIdx) => (
                    <div key={tool.id} className="p-4 rounded-2xl bg-[#131211] border border-white/8 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{tool.name}</span>
                        <span className="text-[10px] text-[#60a5fa] bg-[#1d6de3]/15 px-2 py-0.5 rounded-full">{tool.level}</span>
                      </div>
                      <input
                        type="text"
                        value={tool.name}
                        onChange={e => {
                          const updated = [...formData.tools];
                          updated[tIdx].name = e.target.value;
                          setFormData({ ...formData, tools: updated });
                        }}
                        className="w-full px-2.5 py-1.5 rounded bg-black border border-white/10 text-white text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: CREDENTIALS */}
            {activeTab === 'credentials' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#60a5fa] mb-3">
                    Certifications
                  </h4>
                  {formData.certifications.map((cert, cIdx) => (
                    <div key={cert.id} className="p-4 rounded-2xl bg-[#131211] border border-white/8 space-y-2 mb-3">
                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-1">Certification Title</label>
                        <input
                          type="text"
                          value={cert.title}
                          onChange={e => {
                            const updated = [...formData.certifications];
                            updated[cIdx].title = e.target.value;
                            setFormData({ ...formData, certifications: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Issuer</label>
                          <input
                            type="text"
                            value={cert.issuer}
                            onChange={e => {
                              const updated = [...formData.certifications];
                              updated[cIdx].issuer = e.target.value;
                              setFormData({ ...formData, certifications: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Date</label>
                          <input
                            type="text"
                            value={cert.date}
                            onChange={e => {
                              const updated = [...formData.certifications];
                              updated[cIdx].date = e.target.value;
                              setFormData({ ...formData, certifications: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: CONTACT */}
            {activeTab === 'contact' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.contact.email}
                    onChange={e => setFormData({
                      ...formData,
                      contact: { ...formData.contact, email: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#121110] border border-white/10 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={formData.contact.phone}
                    onChange={e => setFormData({
                      ...formData,
                      contact: { ...formData.contact, phone: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#121110] border border-white/10 text-white text-sm"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions Bar */}
          <div className="p-4 sm:p-6 border-t border-white/10 bg-[#161513] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-red-400 hover:bg-white/5 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Reset to Defaults</span>
              </button>

              <button
                type="button"
                onClick={exportConfigJson}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Download size={14} />
                <span>Export JSON</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              {saveToast && (
                <span className="text-xs text-[#60a5fa] font-bold flex items-center gap-1">
                  <Check size={14} /> Saved & Applied Live!
                </span>
              )}
              <Button
                variant="lime"
                size="md"
                onClick={handleSave}
                icon={<Save size={16} />}
              >
                Save & Apply Live
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
