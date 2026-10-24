import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ArrowRight, Compass, GraduationCap, Award } from 'lucide-react';
import { COURSES } from '../data';
import { Course } from '../types';

interface CourseFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CourseFinderModal({ isOpen, onClose }: CourseFinderModalProps) {
  const [step, setStep] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [matches, setMatches] = useState<Course[]>([]);
  const [enrolled, setEnrolled] = useState(false);

  // Reset quiz states when closed/opened
  React.useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedSubject('');
      setSelectedLevel('');
      setMatches([]);
      setEnrolled(false);
    }
  }, [isOpen]);

  const handleSubjectSelect = (sub: string) => {
    setSelectedSubject(sub);
    setStep(2);
  };

  const handleLevelSelect = (lvl: string) => {
    setSelectedLevel(lvl);
    
    // Perform real match search from global courses list
    const filtered = COURSES.filter(c => {
      const matchSub = c.subject.toLowerCase().includes(selectedSubject.toLowerCase()) || 
                       selectedSubject === 'All';
      const matchLvl = c.level === lvl || lvl === 'All';
      return matchSub && matchLvl;
    });

    // Fallback: If no strict matches, just show general ones
    setMatches(filtered.length > 0 ? filtered : COURSES.slice(0, 3));
    setStep(3);
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
            className="relative w-full max-w-2xl bg-white rounded-2xl border border-neutral-200 shadow-2xl p-8 max-h-[90vh] overflow-y-auto z-10 text-neutral-900"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-neutral-700 bg-neutral-50 hover:bg-neutral-100 rounded-full border border-neutral-200 transition-colors shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Stepper indicator line */}
            <div className="flex items-center gap-2 mb-8 max-w-[200px]">
              <div className={`h-1.5 rounded-none flex-1 transition-all ${step >= 1 ? 'bg-[#FF5A36]' : 'bg-neutral-200'}`} />
              <div className={`h-1.5 rounded-none flex-1 transition-all ${step >= 2 ? 'bg-[#FF5A36]' : 'bg-neutral-200'}`} />
              <div className={`h-1.5 rounded-none flex-1 transition-all ${step >= 3 ? 'bg-[#FF5A36]' : 'bg-neutral-200'}`} />
            </div>

            {/* Step 1: Subjects */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex items-center gap-2 text-[#FF5A36] mb-3 font-bold text-xs uppercase tracking-widest">
                  <Compass className="w-4 h-4" />
                  <span>STEP 1 OF 3</span>
                </div>
                <h3 className="text-2xl font-black text-neutral-950 uppercase tracking-tight mb-3">
                  What is your primary area of focus?
                </h3>
                <p className="text-neutral-600 mb-6 text-sm">
                  Choose a subject to filter through our certified teachers and courses instantly.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'robotics', label: 'Robotics & Coding', count: '18 Courses', desc: 'Robots, Sensors, Logic Blocks' },
                    { id: 'electronics', label: 'Basic Electronics', count: '12 Courses', desc: 'Breadboards, Circuits, Voltage' },
                    { id: 'iot', label: 'Internet of Things (IoT)', count: '15 Courses', desc: 'Smart Sensors, ESP32 WiFi Controllers' },
                    { id: 'arvr', label: 'AR & VR Lab', count: '10 Courses', desc: 'Interactive 3D Worlds & Gestures' },
                    { id: 'webapp', label: 'Web App Development', count: '22 Courses', desc: 'React 19 & High-Performance Hosting' },
                    { id: 'All', label: 'Explore All Fields', count: '80+ Courses', desc: 'Browse our entire STEAM curriculum' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSubjectSelect(item.label)}
                      className="text-left p-5 bg-neutral-50 hover:bg-[#FFEBE5]/50 border border-neutral-150 hover:border-neutral-200 rounded-xl transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-neutral-900 text-base">{item.label}</span>
                          <span className="text-[9px] font-bold text-[#FF5A36] uppercase bg-[#FF5A36]/10 px-2.5 py-0.5 rounded">
                            {item.count}
                          </span>
                        </div>
                        <p className="text-neutral-500 text-xs mt-1 leading-normal">{item.desc}</p>
                      </div>
                      <div className="flex justify-end mt-4">
                        <span className="p-1.5 bg-white group-hover:bg-[#FF5A36] text-neutral-400 group-hover:text-white rounded-lg transition-all border border-neutral-200">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Learning Level */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex items-center gap-2 text-[#FF5A36] mb-3 font-bold text-xs uppercase tracking-widest">
                  <GraduationCap className="w-4 h-4" />
                  <span>STEP 2 OF 3</span>
                </div>
                <h3 className="text-2xl font-black text-neutral-950 uppercase tracking-tight mb-3">
                  What is your background level?
                </h3>
                <p className="text-neutral-600 mb-6 text-sm">
                  We customize the teaching speed and vocabulary to match your current experience.
                </p>

                <div className="space-y-3">
                  {[
                    { lvl: 'Beginner', title: 'Curious Beginner', desc: 'Zero background experience. Needs slow, thorough, step-by-step guidance.' },
                    { lvl: 'Intermediate', title: 'Experienced Practitioner', desc: 'Understand core frameworks/rudimentaries. Ready to build robust portfolios.' },
                    { lvl: 'Advanced', title: 'Elite Technical Professional', desc: 'Actively working in field. Focus on architecture, optimizations, and deep topics.' },
                    { lvl: 'All', title: 'Any Experience Level', desc: 'Show me any difficulty course matching this topic.' },
                  ].map((item) => (
                    <button
                      key={item.lvl}
                      onClick={() => handleLevelSelect(item.lvl)}
                      className="w-full text-left p-5 bg-neutral-50 hover:bg-[#FFEBE5]/50 border border-neutral-150 hover:border-neutral-200 rounded-xl transition-all flex items-center justify-between group"
                    >
                      <div>
                        <h4 className="font-bold text-neutral-900 text-base mb-1">{item.title}</h4>
                        <p className="text-neutral-500 text-xs max-w-lg">{item.desc}</p>
                      </div>
                      <span className="p-2 bg-white group-hover:bg-[#FF5A36] text-neutral-450 group-hover:text-white rounded-lg transition-all border border-neutral-200">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setStep(1)}
                  className="mt-6 text-xs font-bold uppercase tracking-widest text-[#FF5A36] hover:text-[#E04E2D] transition-colors block"
                >
                  ← Go back to Step 1
                </button>
              </motion.div>
            )}

            {/* Step 3: Matches Screen */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="flex items-center gap-2 text-emerald-600 mb-2 font-bold text-xs uppercase tracking-widest">
                  <Award className="w-4 h-4" />
                  <span>MATCHES FOUND</span>
                </div>
                <h3 className="text-2xl font-black text-neutral-950 uppercase tracking-tight mb-2">
                  We found {matches.length} matches!
                </h3>
                <p className="text-neutral-500 mb-6 text-xs uppercase tracking-widest font-mono">
                  Topic: <span className="text-neutral-900 font-bold">{selectedSubject}</span> • Level: <span className="text-neutral-900 font-bold">{selectedLevel}</span>
                </p>

                {enrolled ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-emerald-50 border border-emerald-200 text-center rounded-xl mb-6 shadow-sm"
                  >
                    <Check className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                    <h4 className="font-bold text-lg text-emerald-600 uppercase tracking-widest mb-1">ENROLLMENT CONFIRMED</h4>
                    <p className="text-neutral-600 text-xs max-w-sm mx-auto">
                      You are now enrolled in your personalized candidate courses! Access credentials have been dispatched to your active emails.
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                    {matches.map((course) => (
                      <div
                        key={course.id}
                        className="flex flex-col sm:flex-row bg-neutral-50 border border-neutral-200 rounded-xl overflow-hidden group transition-all"
                      >
                        <img
                          src={`${course.image}`}
                          alt={course.title}
                          className="w-full sm:w-28 h-28 object-cover"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/services/stem-lab-robotics-kit.jpg';
                          }}
                        />
                        <div className="p-4 flex-1 flex flex-col justify-between text-left">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[9px] font-bold tracking-widest uppercase text-neutral-400">
                                {course.subject}
                              </span>
                              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 rounded">
                                ★ {course.rating.toFixed(1)}
                              </span>
                            </div>
                            <h4 className="font-bold text-neutral-900 text-sm group-hover:text-[#FF5A36] transition-colors leading-snug">
                              {course.title}
                            </h4>
                            <p className="text-neutral-500 text-xs line-clamp-1 mt-1 font-normal">
                              {course.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <span className="text-[10px] text-neutral-400 font-mono">
                              {course.duration} • {course.level}
                            </span>
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                              {course.students} students
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">
                  {!enrolled ? (
                    <button
                      onClick={() => setEnrolled(true)}
                      className="w-full sm:flex-1 py-4 bg-neutral-950 hover:bg-neutral-800 text-white font-bold uppercase tracking-widest text-xs rounded-none transition-all text-center"
                    >
                      Register in matching courses
                    </button>
                  ) : null}
                  <button
                    onClick={() => {
                      setStep(1);
                      setEnrolled(false);
                    }}
                    className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-neutral-50 border border-neutral-250 text-neutral-800 font-bold uppercase tracking-widest text-xs rounded-none transition-all"
                  >
                    {enrolled ? "Take Quiz Again" : "Reset Questionnaire"}
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
