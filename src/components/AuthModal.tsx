import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, CheckCircle2 } from 'lucide-react';
import RobostormsLogo from './RobostormsLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab: 'login' | 'signup';
}

export default function AuthModal({ isOpen, onClose, initialTab }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  React.useEffect(() => {
    setActiveTab(initialTab);
    setSuccessMsg('');
    setErrorMsg('');
  }, [initialTab, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!email || !password || (activeTab === 'signup' && !fullName)) {
      setErrorMsg('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password should be at least 6 characters.');
      return;
    }

    // Direct realistic feedback
    if (activeTab === 'signup') {
      setSuccessMsg(`Welcome to ROBOSTORMS, ${fullName.toUpperCase()}! Your account has been registered.`);
    } else {
      setSuccessMsg(`Welcome back! Logged in as ${email}.`);
    }

    // Reset inputs
    setTimeout(() => {
      onClose();
      setEmail('');
      setPassword('');
      setFullName('');
      setSuccessMsg('');
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-md bg-white rounded-none border border-neutral-200 shadow-2xl overflow-hidden z-10 text-neutral-900"
          >
            {/* Close Toggle */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-700 bg-neutral-50 hover:bg-neutral-100 rounded-full border border-neutral-200 transition-colors shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Logo/Tabs Header */}
            <div className="p-8 pb-4">
              <div className="flex items-center gap-1 mb-6">
                <RobostormsLogo showSlogan={false} size="form" />
              </div>

              {/* Tabs Toggler */}
              <div className="flex bg-neutral-100 border border-neutral-200 p-1 rounded-none">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('login');
                    setErrorMsg('');
                  }}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all rounded-none cursor-pointer ${
                    activeTab === 'login'
                      ? 'bg-neutral-950 text-white shadow-none'
                      : 'text-neutral-500 hover:text-neutral-950'
                  }`}
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('signup');
                    setErrorMsg('');
                  }}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all rounded-none cursor-pointer ${
                    activeTab === 'signup'
                      ? 'bg-neutral-950 text-white shadow-none'
                      : 'text-neutral-500 hover:text-neutral-950'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Inputs & Form area */}
            <div className="px-8 pb-8 pt-2 text-left">
              {successMsg ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-6 text-center"
                >
                  <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-widest text-emerald-600 mb-2">ACCESS GRANTED</h3>
                  <p className="text-neutral-600 text-xs leading-relaxed max-w-xs">{successMsg}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-none text-[10px] font-bold uppercase tracking-widest">
                      {errorMsg}
                    </div>
                  )}

                  {activeTab === 'signup' && (
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1.5">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="YOUR FULL NAME"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 focus:border-[#FF5A36] focus:bg-white text-neutral-900 rounded-none text-xs tracking-wider focus:outline-none transition-all placeholder-neutral-300"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                      <input
                        type="email"
                        placeholder="YOU@EXAMPLE.COM"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 focus:border-[#FF5A36] focus:bg-white text-neutral-900 rounded-none text-xs tracking-wider focus:outline-none transition-all placeholder-neutral-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1.5 flex justify-between">
                      <span>Password</span>
                      {activeTab === 'login' && (
                        <button
                          type="button"
                          className="text-[#FF5A36] hover:text-[#E04E2D] uppercase tracking-widest font-bold text-[9px] transition-colors cursor-pointer"
                        >
                          Forgot?
                        </button>
                      )}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 focus:border-[#FF5A36] focus:bg-white text-neutral-900 rounded-none text-xs tracking-wider focus:outline-none transition-all placeholder-neutral-300"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 bg-neutral-950 hover:bg-neutral-800 text-white font-bold uppercase tracking-widest text-xs py-4 rounded-none transition-all cursor-pointer"
                  >
                    {activeTab === 'login' ? 'Access Account' : 'Register Now'}
                  </button>
                </form>
              )}

              {/* Legal Note */}
              {!successMsg && (
                <div className="text-center mt-6 text-[9px] text-neutral-400 leading-relaxed uppercase tracking-widest">
                  By continuing, you agree to ROBOSTORMS's terms of business, privacy declarations, and cookies policy.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
