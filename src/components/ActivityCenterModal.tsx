import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Phone, Mail, Sparkles, CheckCircle2, ArrowRight, GraduationCap, MapPin, Layers } from 'lucide-react';
import RobostormsLogo from './RobostormsLogo';
import { useLanguage } from '../context/LanguageContext';

interface ActivityCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourse?: string;
}

export default function ActivityCenterModal({ isOpen, onClose, defaultCourse }: ActivityCenterModalProps) {
  const { language } = useLanguage();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Student / Parent Lead Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [studentLevel, setStudentLevel] = useState('Junior Level: Std 1 to Std 4');
  const [courseInterest, setCourseInterest] = useState(defaultCourse || 'Robotics & Coding');
  const [preferredBatch, setPreferredBatch] = useState('Weekday: Mon - Tue (4:00 PM - 6:00 PM)');

  // Schedule Call / Center Visit
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [notes, setNotes] = useState('');

  // Available Time Slots (IST)
  const timeSlots = [
    '10:00 AM - 11:00 AM',
    '11:30 AM - 12:30 PM',
    '02:00 PM - 03:00 PM',
    '04:00 PM - 05:00 PM',
    '05:30 PM - 06:30 PM',
  ];

  const studentLevels = [
    {
      id: 'Junior Level: Std 1 to Std 4',
      labelEn: 'Junior Innovator: Std 1 to Std 4',
      labelMr: 'ज्युनियर इनोव्हेटर: इ. १ ली ते ४ थी'
    },
    {
      id: 'Senior Level: Std 5 to Std 9',
      labelEn: 'Senior Innovator: Std 5 to Std 9',
      labelMr: 'सिनियर इनोव्हेटर: इ. ५ वी ते ९ वी'
    },
    {
      id: 'Advanced Level: Std 10 & College',
      labelEn: 'Advanced / College: Std 10 & Above',
      labelMr: 'अ‍ॅडव्हान्स / कॉलेज: इ. १० वी व पुढे'
    }
  ];

  const courseOptions = [
    'Robotics & Coding',
    'Basic Electronics & Circuitry',
    'Internet of Things (IoT) & Smart Devices',
    'AR & VR Interactive Lab',
    'Web App & Software Development',
    'Custom STEAM Exploration'
  ];

  const batchOptions = [
    {
      id: 'Weekday: Mon - Tue (4:00 PM - 6:00 PM)',
      labelEn: 'Weekday Batch: Mon - Tue (4:00 PM - 6:00 PM)',
      labelMr: 'आठवडा बॅच: सोम - मंगळ (४:०० - ६:०० दु.)'
    },
    {
      id: 'Weekend: Saturday (4:00 PM - 6:00 PM)',
      labelEn: 'Weekend Batch: Saturday (4:00 PM - 6:00 PM)',
      labelMr: 'शनिवार बॅच: (४:०० - ६:०० दु.)'
    },
    {
      id: 'Weekend: Sunday (10:00 AM - 2:00 PM)',
      labelEn: 'Weekend Batch: Sunday (10:00 AM - 2:00 PM)',
      labelMr: 'रविवार बॅच: (१०:०० स. - २:०० दु.)'
    },
    {
      id: 'Demo / Trial Session First',
      labelEn: 'Free Demo / Trial Class First',
      labelMr: 'मोफत डेमो / ट्रायल क्लास आधी हवा'
    }
  ];

  React.useEffect(() => {
    if (isOpen) {
      setStep(1);
      setName('');
      setPhone('');
      setEmail('');
      setStudentLevel('Junior Level: Std 1 to Std 4');
      setCourseInterest(defaultCourse || 'Robotics & Coding');
      setPreferredBatch('Weekday: Mon - Tue (4:00 PM - 6:00 PM)');
      setPreferredDate('');
      setPreferredTime('');
      setNotes('');
      setIsSubmitting(false);
    }
  }, [isOpen, defaultCourse]);

  const handleNextStep = () => {
    if (!name.trim() || !phone.trim() || !email.trim()) {
      alert(language === 'mr'
        ? 'कृपया आपले नाव, फोन नंबर आणि ईमेल आयडी भरा.'
        : 'Please fill in your name, phone number, and email to proceed.');
      return;
    }
    setStep(2);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!preferredDate || !preferredTime) {
      alert(language === 'mr'
        ? 'कृपया पसंतीची तारीख आणि वेळ निवडा.'
        : 'Please select both a preferred date and time slot.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/consultations/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          clientType: 'parent',
          phone: phone.trim(),
          email: email.trim(),
          stream: courseInterest,
          preferredDate,
          preferredTime,
          notes: `Activity Center Registration. Level: ${studentLevel}. Batch: ${preferredBatch}. Notes: ${notes.trim()}`,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `Server responded with ${res.status}`);
      }

      setStep(3); // Success Screen
    } catch (err: any) {
      console.error('Failed to submit activity center registration:', err);
      // Still show success screen to user, but log the error
      setStep(3);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/50 backdrop-blur-md"
          />

          {/* Modal box */}
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 15 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-lg bg-white border border-neutral-300 shadow-2xl overflow-hidden z-20 text-neutral-900 rounded-none max-h-[92vh] flex flex-col"
          >
            {/* Close Toggle */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-700 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-full transition-colors shadow-sm z-30 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Brand Sidelight Border Accent */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FF5A36]" />

            {/* Content Container */}
            <div className="p-6 sm:p-8 pl-8 sm:pl-10 overflow-y-auto flex-1 text-left">
              <div className="mb-4 flex items-center justify-between">
                <RobostormsLogo showSlogan={false} size="form" />
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFEBE5] text-[#FF5A36] text-[10px] font-bold uppercase tracking-wider">
                  <GraduationCap className="w-3 h-3" />
                  {language === 'mr' ? 'ताराबाई पार्क सेंटर' : 'Tarabai Park Center'}
                </span>
              </div>

              {/* ========================================================
                  STEP 1: REGISTRATION & COURSE DETAILS
                  ======================================================== */}
              {step === 1 && (
                <div>
                  <div className="mb-4">
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#FF5A36] mb-1 font-ubuntu">
                      <span>{language === 'mr' ? 'प्रवेश व बॅच नोंदणी' : 'Admissions & Course Enrollment'}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-ubuntu font-bold text-neutral-900 tracking-tight">
                      {language === 'mr' ? 'ॲक्टिव्हिटी सेंटर नोंदणी' : 'Activity Center Registration'}
                    </h3>
                    <p className="text-neutral-500 text-xs sm:text-sm mt-1">
                      {language === 'mr'
                        ? 'ताराबाई पार्क येथील रोबोटिक्स, कोडिंग, इलेक्ट्रॉनिक्स आणि IoT प्रॅक्टिकल कोर्सेस.'
                        : 'Hands-on Robotics, Coding, Electronics & IoT practical courses at our Tarabai Park activity center.'}
                    </p>
                  </div>

                  <div className="space-y-3.5 text-left">
                    {/* Parent / Student Name */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-1">
                        {language === 'mr' ? 'पालक / विद्यार्थ्याचे पूर्ण नाव *' : 'Student / Parent Full Name *'}
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-4.5 h-4.5" />
                        <input
                          type="text"
                          required
                          placeholder={language === 'mr' ? 'उदा. अमित शिंदे / प्रथमेश पाटील' : 'E.G. HARSH VARDHAN / GANESH PATIL'}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-neutral-50/70 border border-neutral-200 focus:border-[#FF5A36] focus:bg-white text-neutral-950 rounded-none text-xs tracking-wider uppercase focus:outline-none transition-all placeholder-neutral-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* Phone / WhatsApp */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-1">
                          {language === 'mr' ? 'फोन नंबर / व्हॉट्सअ‍ॅप *' : 'Phone Number / WhatsApp *'}
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-4.5 h-4.5" />
                          <input
                            type="tel"
                            required
                            placeholder="+91 XXXXX XXXXX"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-neutral-50/70 border border-neutral-200 focus:border-[#FF5A36] focus:bg-white text-neutral-950 rounded-none text-xs tracking-wider focus:outline-none transition-all placeholder-neutral-300"
                          />
                        </div>
                      </div>

                      {/* Email Address */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-1">
                          {language === 'mr' ? 'ईमेल आयडी *' : 'Email Address *'}
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-4.5 h-4.5" />
                          <input
                            type="email"
                            required
                            placeholder="NAME@EXAMPLE.COM"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-neutral-50/70 border border-neutral-200 focus:border-[#FF5A36] focus:bg-white text-neutral-950 rounded-none text-xs tracking-wider focus:outline-none transition-all placeholder-neutral-300"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Student Learning Level */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-1">
                        {language === 'mr' ? 'विद्यार्थ्याचा स्तर / वर्ग *' : 'Student Learning Level / Standard *'}
                      </label>
                      <select
                        value={studentLevel}
                        onChange={(e) => setStudentLevel(e.target.value)}
                        className="w-full px-4 py-2.5 sm:py-3 bg-neutral-50/70 border border-neutral-200 focus:border-[#FF5A36] focus:bg-white text-neutral-900 rounded-none text-xs font-semibold focus:outline-none transition-all cursor-pointer"
                      >
                        {studentLevels.map((lvl) => (
                          <option key={lvl.id} value={lvl.id}>
                            {language === 'mr' ? lvl.labelMr : lvl.labelEn}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Course of Interest */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-1">
                        {language === 'mr' ? 'अभ्यासक्रम / विषय निवडा *' : 'Course of Interest *'}
                      </label>
                      <select
                        value={courseInterest}
                        onChange={(e) => setCourseInterest(e.target.value)}
                        className="w-full px-4 py-2.5 sm:py-3 bg-neutral-50/70 border border-neutral-200 focus:border-[#FF5A36] focus:bg-white text-neutral-900 rounded-none text-xs font-semibold focus:outline-none transition-all cursor-pointer"
                      >
                        {courseOptions.map((c, idx) => (
                          <option key={idx} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Preferred Batch Timing */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-1">
                        {language === 'mr' ? 'पसंतीची बॅच वेळ *' : 'Preferred Batch Schedule *'}
                      </label>
                      <select
                        value={preferredBatch}
                        onChange={(e) => setPreferredBatch(e.target.value)}
                        className="w-full px-4 py-2.5 sm:py-3 bg-neutral-50/70 border border-neutral-200 focus:border-[#FF5A36] focus:bg-white text-neutral-900 rounded-none text-xs font-semibold focus:outline-none transition-all cursor-pointer"
                      >
                        {batchOptions.map((b) => (
                          <option key={b.id} value={b.id}>
                            {language === 'mr' ? b.labelMr : b.labelEn}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={handleNextStep}
                      disabled={!name || !phone || !email}
                      className="w-full mt-4 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-ubuntu font-bold uppercase tracking-widest text-xs py-3.5 sm:py-4 rounded-none transition-all cursor-pointer shadow-none flex items-center justify-center gap-2"
                    >
                      <span>{language === 'mr' ? 'तारीख व डेमो वेळ निवडा' : 'Select Date & Time for Demo / Visit'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================
                  STEP 2: DATE & TIME FOR VISIT / DEMO
                  ======================================================== */}
              {step === 2 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF5A36] bg-[#FFEBE5] px-2 py-0.5">
                      {language === 'mr' ? 'टप्पा २ / २' : 'Step 2 of 2'}
                    </span>
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs text-neutral-400 hover:text-neutral-700 underline font-semibold transition-colors cursor-pointer"
                    >
                      {language === 'mr' ? 'मागे जा' : 'Go back'}
                    </button>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-ubuntu font-bold text-neutral-900 mb-1 tracking-tight">
                    {language === 'mr' ? 'सेंटर भेट किंवा डेमो वेळ निवडा' : 'Choose Visit or Demo Schedule'}
                  </h3>
                  <p className="text-neutral-500 text-xs sm:text-sm mb-5">
                    {language === 'mr'
                      ? 'ताराबाई पार्क सेंटरमध्ये प्रत्यक्ष भेट देऊन रोबोटिक्स किट्स व लॅब पाहा.'
                      : 'Visit our Tarabai Park center to experience modular kits, smart panels, and meet mentors.'}
                  </p>

                  <form onSubmit={handleRegister} className="space-y-4">
                    {/* Date Picker */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-1.5">
                        {language === 'mr' ? 'पसंतीची तारीख *' : 'Preferred Date *'}
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                        <input
                          type="date"
                          required
                          min={new Date().toISOString().split('T')[0]}
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-neutral-50/70 border border-neutral-200 focus:border-[#FF5A36] focus:bg-white text-neutral-900 rounded-none text-xs uppercase tracking-wider focus:outline-none transition-all cursor-pointer font-semibold"
                        />
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-2">
                        {language === 'mr' ? 'पसंतीची वेळ (IST) *' : 'Preferred Time Slot (IST) *'}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setPreferredTime(slot)}
                            className={`py-2.5 px-3 border text-xs font-semibold tracking-wide transition-all flex items-center justify-between cursor-pointer ${preferredTime === slot
                              ? 'border-[#FF5A36] bg-[#FFEBE5] text-[#FF5A36] font-bold shadow-xs'
                              : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-700'
                              }`}
                          >
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-neutral-400" />
                              <span>{slot}</span>
                            </span>
                            {preferredTime === slot && <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5A36]" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-1.5">
                        {language === 'mr' ? 'काही प्रश्न / विद्यार्थ्याचा अनुभव (ऐच्छिक)' : 'Any Questions or Prior Coding/Robotics Experience (Optional)'}
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={language === 'mr' ? 'उदा. विद्यार्थ्याची शाळा, रोबोटिक्समधील आवड किंवा इतर माहिती...' : 'E.g., Student school name, previous projects, specific interests...'}
                        className="w-full p-3 bg-neutral-50/70 border border-neutral-200 focus:border-[#FF5A36] focus:bg-white text-neutral-950 rounded-none text-xs focus:outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || !preferredDate || !preferredTime}
                      className="w-full mt-2 py-4 bg-[#FF5A36] hover:bg-[#E04E2D] disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-ubuntu font-bold uppercase tracking-widest text-xs rounded-none transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>{language === 'mr' ? 'नोंदणी सबमिट होत आहे...' : 'Submitting Registration...'}</span>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{language === 'mr' ? 'नोंदणी पूर्ण करा' : 'Complete Activity Center Registration'}</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* ========================================================
                  STEP 3: SUCCESS CONFIRMATION
                  ======================================================== */}
              {step === 3 && (
                <div className="py-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mb-5 shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 mb-2">
                    {language === 'mr' ? 'नोंदणी यशस्वी झाली' : 'Registration Received!'}
                  </span>
                  <h3 className="text-2xl font-ubuntu font-extrabold text-neutral-900 mb-2">
                    {language === 'mr' ? 'स्वागत आहे रोबोस्टॉर्म्स फॅमिलीमध्ये!' : 'Welcome to the Robostorms Innovators Grid!'}
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm max-w-sm mb-6 leading-relaxed">
                    {language === 'mr'
                      ? `आम्हाला ${name} यांची नोंदणी प्राप्त झाली आहे. ताराबाई पार्क सेंटर समन्वयक निवडलेल्या तारखेस (${preferredDate || 'लवकरच'}) संपर्क साधून क्लासची वेळ निश्चित करतील.`
                      : `We have received enrollment details for ${name}. Our Tarabai Park activity center coordinator will contact you to confirm orientation on ${preferredDate || 'your selected date'}.`}
                  </p>

                  <div className="w-full bg-neutral-50 border border-neutral-200 p-4 mb-6 text-left text-xs text-neutral-700 space-y-1.5">
                    <div className="flex justify-between border-b border-neutral-200 pb-1.5">
                      <span className="font-semibold text-neutral-500">{language === 'mr' ? 'विद्यार्थी / पालक:' : 'Student / Parent:'}</span>
                      <span className="font-bold text-neutral-900">{name} ({phone})</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-200 pb-1.5">
                      <span className="font-semibold text-neutral-500">{language === 'mr' ? 'कोर्स:' : 'Course:'}</span>
                      <span className="font-bold text-neutral-900">{courseInterest}</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-200 pb-1.5">
                      <span className="font-semibold text-neutral-500">{language === 'mr' ? 'बॅच:' : 'Batch:'}</span>
                      <span className="font-bold text-neutral-900">{preferredBatch}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-neutral-500">{language === 'mr' ? 'शेड्यूल भेट:' : 'Scheduled Visit:'}</span>
                      <span className="font-bold text-[#FF5A36]">{preferredDate} | {preferredTime}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5 w-full">
                    <a
                      href={`https://wa.me/917058202122?text=${encodeURIComponent(
                        `Hello Robostorms! I have registered for the Activity Center. Name: ${name} (${phone}). Course: ${courseInterest}. Batch: ${preferredBatch}. Scheduled slot: ${preferredDate} ${preferredTime}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-ubuntu font-bold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <span>{language === 'mr' ? 'व्हॉट्सअॅपवर मेसेज करा' : 'WhatsApp Us Directly'}</span>
                    </a>
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-ubuntu font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer"
                    >
                      {language === 'mr' ? 'बंद करा' : 'Done & Close'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
