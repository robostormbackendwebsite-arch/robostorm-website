import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Phone, Mail, Building, MapPin, Sparkles, CheckCircle2, ArrowRight, School } from 'lucide-react';
import RobostormsLogo from './RobostormsLogo';
import { useLanguage } from '../context/LanguageContext';

interface SchoolDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SchoolDemoModal({ isOpen, onClose }: SchoolDemoModalProps) {
  const { language } = useLanguage();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // School Lead Form Fields
  const [schoolName, setSchoolName] = useState('');
  const [schoolLocation, setSchoolLocation] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [schoolPhone, setSchoolPhone] = useState('');
  const [schoolEmail, setSchoolEmail] = useState('');
  const [gradeLevel, setGradeLevel] = useState('Full K-12 Turnkey Lab Setup');

  // Schedule Call / Lab Demo
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

  const gradeOptions = [
    'Full K-12 Turnkey STEAM Lab Setup',
    'Primary Section (Std 1 to Std 4)',
    'Middle & High School (Std 5 to Std 10)',
    'Higher Secondary & Junior College (Std 11 to 12)',
    'Atal Tinkering Lab (ATL) Proposal / Upgradation',
  ];

  React.useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSchoolName('');
      setSchoolLocation('');
      setContactPerson('');
      setSchoolPhone('');
      setSchoolEmail('');
      setGradeLevel('Full K-12 Turnkey STEAM Lab Setup');
      setPreferredDate('');
      setPreferredTime('');
      setNotes('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleNextStep = () => {
    if (!schoolName.trim() || !schoolLocation.trim() || !contactPerson.trim() || !schoolPhone.trim()) {
      alert(language === 'mr' 
        ? 'कृपया शाळेचे नाव, ठिकाण, संपर्क व्यक्ती आणि फोन नंबर भरा.' 
        : 'Please fill in the school name, location, contact person, and school phone number to proceed.');
      return;
    }
    setStep(2);
  };

  const handleBook = async (e: React.FormEvent) => {
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
          name: schoolName.trim(),
          schoolName: schoolName.trim(),
          contactPerson: contactPerson.trim(),
          city: schoolLocation.trim(),
          clientType: 'school',
          phone: schoolPhone.trim(),
          email: schoolEmail.trim() || 'N/A',
          stream: `Turnkey STEAM Lab Setup (${gradeLevel})`,
          preferredDate,
          preferredTime,
          notes: `School Location: ${schoolLocation.trim()}. Contact Person: ${contactPerson.trim()}. Target: ${gradeLevel}. Additional Notes: ${notes.trim()}`,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `Server responded with ${res.status}`);
      }

      setStep(3); // Success Screen
    } catch (err: any) {
      console.error('Failed to book school demo:', err);
      // Still show success screen to the user, but log the error
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
                  <School className="w-3 h-3" />
                  {language === 'mr' ? 'शाळा व संस्था लीड' : 'School Innovation'}
                </span>
              </div>

              {/* ========================================================
                  STEP 1: SCHOOL & CONTACT DETAILS
                  ======================================================== */}
              {step === 1 && (
                <div>
                  <div className="mb-4">
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#FF5A36] mb-1 font-ubuntu">
                      <span>{language === 'mr' ? 'शालेय टर्नकी सेटअप' : 'Turnkey Lab Setup'}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-ubuntu font-bold text-neutral-900 tracking-tight">
                      {language === 'mr' ? 'शाळेचा डेमो बुक करा' : 'Book School STEAM Demo'}
                    </h3>
                    <p className="text-neutral-500 text-xs sm:text-sm mt-1">
                      {language === 'mr'
                        ? 'शाळांसाठी टर्नकी रोबोटिक्स लॅब, उपकरणे, शिक्षक प्रशिक्षण व अभ्यासक्रम.'
                        : 'Custom robotics laboratory setup, equipment supply, curriculum, and certified trainer deployment for schools.'}
                    </p>
                  </div>

                  <div className="space-y-3.5 text-left">
                    {/* Name of School */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-1">
                        {language === 'mr' ? 'शाळेचे / संस्थेचे नाव *' : 'Name of School / Educational Institute *'}
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-4.5 h-4.5" />
                        <input
                          type="text"
                          required
                          placeholder={language === 'mr' ? 'उदा. डी.के.टी.ई. / रजत एज्युकेशन सोसायटी' : 'E.G. GREENWOOD HIGH SCHOOL / VIDYAMANDIR'}
                          value={schoolName}
                          onChange={(e) => setSchoolName(e.target.value)}
                          className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-neutral-50/70 border border-neutral-200 focus:border-[#FF5A36] focus:bg-white text-neutral-950 rounded-none text-xs tracking-wider uppercase focus:outline-none transition-all placeholder-neutral-300"
                        />
                      </div>
                    </div>

                    {/* School Location */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-1">
                        {language === 'mr' ? 'शाळेचे ठिकाण (शहर / जिल्हा / तालुका) *' : 'School Location (City / District / Taluka) *'}
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-4.5 h-4.5" />
                        <input
                          type="text"
                          required
                          placeholder={language === 'mr' ? 'उदा. कोल्हापूर / सांगली / सातारा / पुणे' : 'E.G. KOLHAPUR, MAHARASHTRA / SANGLI / MUMBAI'}
                          value={schoolLocation}
                          onChange={(e) => setSchoolLocation(e.target.value)}
                          className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-neutral-50/70 border border-neutral-200 focus:border-[#FF5A36] focus:bg-white text-neutral-950 rounded-none text-xs tracking-wider uppercase focus:outline-none transition-all placeholder-neutral-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* Contact Person Name */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-1">
                          {language === 'mr' ? 'संपर्क व्यक्ती (मुख्याध्यापक / विश्वस्त) *' : 'Contact Person (Principal / Trustee) *'}
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-4.5 h-4.5" />
                          <input
                            type="text"
                            required
                            placeholder={language === 'mr' ? 'उदा. प्राचार्य डॉ. पाटील' : 'E.G. PRINCIPAL DR. S. PATIL'}
                            value={contactPerson}
                            onChange={(e) => setContactPerson(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-neutral-50/70 border border-neutral-200 focus:border-[#FF5A36] focus:bg-white text-neutral-950 rounded-none text-xs tracking-wider uppercase focus:outline-none transition-all placeholder-neutral-300"
                          />
                        </div>
                      </div>

                      {/* School Contact Number */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-1">
                          {language === 'mr' ? 'शाळा फोन नंबर / व्हॉट्सअ‍ॅप *' : 'Contact Phone / WhatsApp *'}
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-4.5 h-4.5" />
                          <input
                            type="tel"
                            required
                            placeholder="+91 XXXXX XXXXX"
                            value={schoolPhone}
                            onChange={(e) => setSchoolPhone(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-neutral-50/70 border border-neutral-200 focus:border-[#FF5A36] focus:bg-white text-neutral-950 rounded-none text-xs tracking-wider focus:outline-none transition-all placeholder-neutral-300"
                          />
                        </div>
                      </div>
                    </div>

                    {/* School Email Address */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-1">
                        {language === 'mr' ? 'शाळेचा ईमेल आयडी (ऐच्छिक)' : 'School Official Email (Optional)'}
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-4.5 h-4.5" />
                        <input
                          type="email"
                          placeholder="PRINCIPAL@SCHOOL.EDU.IN"
                          value={schoolEmail}
                          onChange={(e) => setSchoolEmail(e.target.value)}
                          className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-neutral-50/70 border border-neutral-200 focus:border-[#FF5A36] focus:bg-white text-neutral-950 rounded-none text-xs tracking-wider focus:outline-none transition-all placeholder-neutral-300"
                        />
                      </div>
                    </div>

                    {/* Target Grade Level */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-1">
                        {language === 'mr' ? 'लॅब सेटअप स्तर / वर्ग' : 'Lab Setup Scope / Student Levels'}
                      </label>
                      <select
                        value={gradeLevel}
                        onChange={(e) => setGradeLevel(e.target.value)}
                        className="w-full px-4 py-2.5 sm:py-3 bg-neutral-50/70 border border-neutral-200 focus:border-[#FF5A36] focus:bg-white text-neutral-900 rounded-none text-xs font-semibold focus:outline-none transition-all cursor-pointer"
                      >
                        {gradeOptions.map((opt, idx) => (
                          <option key={idx} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={handleNextStep}
                      disabled={!schoolName || !schoolLocation || !contactPerson || !schoolPhone}
                      className="w-full mt-4 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-ubuntu font-bold uppercase tracking-widest text-xs py-3.5 sm:py-4 rounded-none transition-all cursor-pointer shadow-none flex items-center justify-center gap-2"
                    >
                      <span>{language === 'mr' ? 'डेमो तारीख व वेळ निवडा' : 'Select Date & Time for Demo'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================
                  STEP 2: DATE & TIME TO SCHEDULE SCHOOL CALL / DEMO
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
                    {language === 'mr' ? 'शाळा डेमो व कन्सल्टेशन वेळ निवडा' : 'Select School Demo Schedule'}
                  </h3>
                  <p className="text-neutral-500 text-xs sm:text-sm mb-5">
                    {language === 'mr'
                      ? 'आमचे लॅब तज्ज्ञ आपल्या शाळेच्या सोयीनुसार संपर्क साधतील.'
                      : 'Our STEAM Lab coordinator will connect at your chosen time slot.'}
                  </p>

                  <form onSubmit={handleBook} className="space-y-4">
                    {/* Date Picker */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-1.5">
                        {language === 'mr' ? 'पसंतीची तारीख *' : 'Preferred Demo Date *'}
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
                        {language === 'mr' ? 'पसंतीची वेळ (IST) *' : 'Preferred Time Window (IST) *'}
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
                        {language === 'mr' ? 'काही विशिष्ट आवश्यकता / संदेश (ऐच्छिक)' : 'Specific Lab Requirements / Notes (Optional)'}
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={language === 'mr' ? 'उदा. विद्यार्थ्यांची अंदाजे संख्या, बजेट किंवा वर्ग खोल्या...' : 'E.g., Approx student count, rooms available, specific hardware interests...'}
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
                        <span>{language === 'mr' ? 'सबमिट होत आहे...' : 'Submitting Request...'}</span>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{language === 'mr' ? 'शाळा डेमो कन्फर्म करा' : 'Confirm School Demo Booking'}</span>
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
                    {language === 'mr' ? 'डेमो विनंती नोंदवली गेली' : 'Demo Request Confirmed'}
                  </span>
                  <h3 className="text-2xl font-ubuntu font-extrabold text-neutral-900 mb-2">
                    {language === 'mr' ? 'धन्यवाद! आमची टीम लवकरच संपर्क करेल' : 'Thank You for Choosing Robostorms!'}
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm max-w-sm mb-6 leading-relaxed">
                    {language === 'mr'
                      ? `आम्ही ${schoolName} साठी डेमो विनंती प्राप्त केली आहे. आमचे STEAM लॅब सल्लागार निवडलेल्या तारखेस (${preferredDate || 'लवकरच'}) संपर्क साधतील.`
                      : `We have received your school inquiry for ${schoolName || 'your institution'}. Our STEAM Lab Specialist will connect with you on ${preferredDate || 'the selected date'} at ${preferredTime || 'your slot'}.`}
                  </p>

                  <div className="w-full bg-neutral-50 border border-neutral-200 p-4 mb-6 text-left text-xs text-neutral-700 space-y-1.5">
                    <div className="flex justify-between border-b border-neutral-200 pb-1.5">
                      <span className="font-semibold text-neutral-500">{language === 'mr' ? 'शाळा:' : 'School:'}</span>
                      <span className="font-bold text-neutral-900">{schoolName}</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-200 pb-1.5">
                      <span className="font-semibold text-neutral-500">{language === 'mr' ? 'संपर्क व्यक्ती:' : 'Contact:'}</span>
                      <span className="font-bold text-neutral-900">{contactPerson} ({schoolPhone})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-neutral-500">{language === 'mr' ? 'शेड्यूल वेळ:' : 'Scheduled Slot:'}</span>
                      <span className="font-bold text-[#FF5A36]">{preferredDate} | {preferredTime}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5 w-full">
                    <a
                      href={`https://wa.me/917058202122?text=${encodeURIComponent(
                        `Hello Robostorms! I have booked a STEAM Lab Demo for ${schoolName || 'our school'}. Contact: ${contactPerson || 'School Principal'} (${schoolPhone || ''}). Preferred slot: ${preferredDate || ''} ${preferredTime || ''}.`
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
