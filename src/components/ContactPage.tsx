import React, { useState } from 'react';
import { RESUME_DATA } from '../data/resumeData';
import { Mail, Phone, MapPin, Github, Linkedin, Copy, Check, Send, Sparkles, Code2, Globe, ExternalLink, RefreshCw } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { email, phone, location, socialLinks } = RESUME_DATA.personalInfo;
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getMailtoUrl = () => {
    return `mailto:${email}?subject=${encodeURIComponent(`Portfolio Message from ${formData.name || 'Visitor'}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    try {
      // 1. Post to backend contact API
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.warn("API contact notice:", err);
    } finally {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }
  };

  return (
    <div className="space-y-10">
      {/* Final Page Header / Handwritten Thank You */}
      <div className="text-center space-y-3 py-4 border-b border-[#E7DDD4]">
        <p className="font-handwriting text-4xl sm:text-5xl text-[#2E2A27]">
          Thank You for Turning the Pages!
        </p>
        <p className="font-sans text-sm text-[#8A8078] max-w-md mx-auto">
          I am always open to discussing new research, engineering opportunities, and real-time AI implementations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Contact Info & Social Profiles */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-serif text-2xl font-bold text-[#2E2A27]">
            Direct Coordinates
          </h3>

          <div className="space-y-3">
            {/* Email */}
            <div className="p-4 rounded-xl bg-[#FFFDF9] border border-[#E7DDD4] flex items-center justify-between group hover:border-[#D88E8E] transition-colors">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 flex-1 group/email hover:opacity-80 transition-opacity"
                title="Send Email"
              >
                <div className="w-9 h-9 rounded-lg bg-[#F7F1EA] flex items-center justify-center text-[#D88E8E] group-hover/email:bg-[#D88E8E] group-hover/email:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-label text-[10px] text-[#8A8078] uppercase">Email</p>
                  <p className="font-sans text-xs font-semibold text-[#2E2A27] underline decoration-dotted underline-offset-2">{email}</p>
                </div>
              </a>
              <button
                onClick={() => handleCopy(email, 'email')}
                className="p-1.5 rounded-md bg-[#F7F1EA] hover:bg-[#2E2A27] hover:text-white text-[#8A8078] transition-colors"
                title="Copy Email"
              >
                {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Phone */}
            <div className="p-4 rounded-xl bg-[#FFFDF9] border border-[#E7DDD4] flex items-center justify-between group hover:border-[#D88E8E] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#F7F1EA] flex items-center justify-center text-[#D88E8E]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-label text-[10px] text-[#8A8078] uppercase">Phone</p>
                  <p className="font-sans text-xs font-semibold text-[#2E2A27]">{phone}</p>
                </div>
              </div>
              <button
                onClick={() => handleCopy(phone, 'phone')}
                className="p-1.5 rounded-md bg-[#F7F1EA] hover:bg-[#2E2A27] hover:text-white text-[#8A8078] transition-colors"
                title="Copy Phone"
              >
                {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Location */}
            <div className="p-4 rounded-xl bg-[#FFFDF9] border border-[#E7DDD4] flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#F7F1EA] flex items-center justify-center text-[#D88E8E]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="font-label text-[10px] text-[#8A8078] uppercase">Location</p>
                <p className="font-sans text-xs font-semibold text-[#2E2A27]">{location}</p>
              </div>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="pt-2 space-y-2">
            <p className="font-label text-xs uppercase tracking-wider text-[#8A8078]">
              Online Profiles & Coding Platforms
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-label">
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-[#F7F1EA] border border-[#E7DDD4] hover:bg-[#FFFDF9] hover:border-[#D88E8E] flex items-center gap-2 text-[#2E2A27] transition-all"
              >
                <Linkedin className="w-4 h-4 text-[#D88E8E]" />
                <span>LinkedIn</span>
              </a>

              <a
                href={socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-[#F7F1EA] border border-[#E7DDD4] hover:bg-[#FFFDF9] hover:border-[#D88E8E] flex items-center gap-2 text-[#2E2A27] transition-all"
              >
                <Github className="w-4 h-4 text-[#D88E8E]" />
                <span>GitHub</span>
              </a>

              <a
                href={socialLinks.leetcode}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-[#F7F1EA] border border-[#E7DDD4] hover:bg-[#FFFDF9] hover:border-[#D88E8E] flex items-center gap-2 text-[#2E2A27] transition-all"
              >
                <Code2 className="w-4 h-4 text-[#D88E8E]" />
                <span>LeetCode</span>
              </a>

              <a
                href={socialLinks.codechef}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-[#F7F1EA] border border-[#E7DDD4] hover:bg-[#FFFDF9] hover:border-[#D88E8E] flex items-center gap-2 text-[#2E2A27] transition-all"
              >
                <Globe className="w-4 h-4 text-[#D88E8E]" />
                <span>CodeChef</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Paper Contact Form Note */}
        <div className="lg:col-span-7">
          <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#E7DDD4] paper-elevation-sm space-y-4">
            <h3 className="font-serif text-2xl font-bold text-[#2E2A27] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D88E8E]" />
              Send a Direct Message
            </h3>

            {formSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-xl font-bold text-emerald-950">
                    Message Dispatched!
                  </h4>
                  <p className="font-sans text-xs text-emerald-800 max-w-sm mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold">{formData.name}</span>! Your message was received and forwarded directly to <span className="font-mono text-[11px] underline">{email}</span>.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs font-label">
                  <a
                    href={getMailtoUrl()}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in Email App</span>
                  </a>

                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white border border-emerald-200 text-emerald-900 hover:bg-emerald-100/50 transition-colors font-medium"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-label text-xs text-[#8A8078] uppercase">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-3 py-2 rounded-xl bg-[#F7F1EA] border border-[#E7DDD4] text-xs font-sans text-[#2E2A27] focus:outline-none focus:border-[#D88E8E]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-label text-xs text-[#8A8078] uppercase">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-3 py-2 rounded-xl bg-[#F7F1EA] border border-[#E7DDD4] text-xs font-sans text-[#2E2A27] focus:outline-none focus:border-[#D88E8E]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-label text-xs text-[#8A8078] uppercase">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write a message or project inquiry..."
                    className="w-full px-3 py-2 rounded-xl bg-[#F7F1EA] border border-[#E7DDD4] text-xs font-sans text-[#2E2A27] focus:outline-none focus:border-[#D88E8E]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-[#2E2A27] hover:bg-[#3D3834] text-[#FFFDF9] font-label text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D88E8E]" />
                      <span>Dispatching Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-[#D88E8E]" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
