import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Award, Building2, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AboutUsPageProps {
  onBackToHome: () => void;
}

export default function AboutUsPage({ onBackToHome }: AboutUsPageProps) {
  const { language } = useLanguage();

  return (
    <main className="flex-grow min-h-[75vh] w-full max-w-7xl mx-auto px-6 sm:px-12 py-10 sm:py-16 flex flex-col justify-start">
      {/* Navigation Back Button */}
      <div className="mb-8">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-neutral-100 text-neutral-700 hover:text-[#FF5A36] border border-neutral-200 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
          <span>{language === 'mr' ? 'मुख्यपृष्ठावर परत जा' : 'Back to Home'}</span>
        </button>
      </div>

      {/* Main About Us Container */}
      <div className="bg-white border border-neutral-200/80 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden text-left">
        {/* Decorative corner glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF5A36]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* 2-Column Layout: Left = Logo, Right = Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
          
          {/* LEFT HAND SIDE: LOGO (FREE-STANDING, UNBOXED) */}
          <div className="lg:col-span-5 flex items-center justify-center w-full py-4 sm:py-6">
            <img
              src="/robostorms-logo.png"
              alt="Robostorms - New Era of Technology"
              className="w-full max-w-[380px] sm:max-w-[420px] h-auto object-contain select-none transition-transform duration-300 hover:scale-[1.03]"
              draggable={false}
            />
          </div>

          {/* RIGHT HAND SIDE: INFORMATION */}
          <div className="lg:col-span-7 flex flex-col text-left">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFEBE5] text-[#FF5A36] rounded-full text-xs font-bold uppercase tracking-widest self-start mb-4">
              <Award className="w-3.5 h-3.5" />
              <span>About Us</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-ubuntu font-bold text-neutral-900 tracking-tight leading-tight mb-6">
              Robostorms Technology Pvt. Ltd.
            </h2>

            {/* Paragraph 1 */}
            <p className="text-neutral-700 text-base sm:text-lg leading-relaxed mb-5 font-normal">
              Robostorms Technology Pvt. Ltd. established in 2017, advances school education through structured Robotics, Artificial Intelligence, Coding, and STEAM programs integrated into mainstream academics. We combine hands-on, technology-driven learning with curriculum alignment to strengthen critical thinking, creativity, and real-world problem-solving skills.
            </p>

            {/* Paragraph 2 */}
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed mb-8 font-normal">
              Our work spans schools, learning centers, CSR implementations, and institutional partnerships. We support organizations in building future-ready learning environments through lab deployment, educator training, student programs, and sustained academic support that deliver measurable long-term value.
            </p>

            {/* Key Focus Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-neutral-100">
              <div className="flex items-center gap-2.5 text-neutral-800 text-xs sm:text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#FF5A36] shrink-0" />
                <span>Robotics, AI & STEAM Education</span>
              </div>
              <div className="flex items-center gap-2.5 text-neutral-800 text-xs sm:text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#FF5A36] shrink-0" />
                <span>Modern Lab Deployments</span>
              </div>
              <div className="flex items-center gap-2.5 text-neutral-800 text-xs sm:text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#FF5A36] shrink-0" />
                <span>Educator Training Programs</span>
              </div>
              <div className="flex items-center gap-2.5 text-neutral-800 text-xs sm:text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#FF5A36] shrink-0" />
                <span>CSR & Institutional Collaborations</span>
              </div>
            </div>
          </div>

        </div>

        {/* UNDER THE COMPANY INFORMATION: WHAT WE DO DIAGRAM & BULLET POINTS */}
        <div className="mt-12 sm:mt-16 pt-10 sm:pt-14 border-t border-neutral-200/80 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT SIDE: BULLET POINTS (very small) */}
            <div className="lg:col-span-7 flex flex-col text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full text-[11px] font-bold uppercase tracking-widest self-start mb-3">
                <span>{language === 'mr' ? 'कार्यप्रणाली' : 'Methodology & Scope'}</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-ubuntu font-bold text-neutral-900 tracking-tight leading-tight mb-2">
                {language === 'mr' ? 'आम्ही काय करतो (What We Do)' : 'What We Do'}
              </h3>
              
              <p className="text-neutral-500 text-xs sm:text-sm mb-6 leading-relaxed">
                {language === 'mr'
                  ? 'शालेय स्तरावर रोबोटिक्स आणि नवोन्मेषी तंत्रज्ञान शिक्षण प्रभावीपणे राबवण्यासाठी आमचे ६-टप्प्यांचे एकात्मिक मॉडेल:'
                  : 'Our comprehensive 6-stage operational framework powering hands-on STEAM and robotics across institutions:'}
              </p>

              {/* Small Bullet Points */}
              <ul className="space-y-3.5">
                {/* 01 */}
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#00B4D8]/15 text-[#0077B6] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-mono">
                    01
                  </span>
                  <div className="text-left">
                    <span className="text-xs sm:text-[13px] font-bold text-neutral-900 block leading-snug">
                      {language === 'mr' ? 'एंड-टू-एंड STEAM व रोबोटिक्स लॅब सोल्यूशन्स' : 'End-to-end STEAM & Robotics Lab Solutions'}
                    </span>
                    <span className="text-[11px] sm:text-xs text-neutral-500 leading-normal block mt-0.5">
                      {language === 'mr'
                        ? 'शाळांसाठी संपूर्ण पायाभूत सुविधा, अत्याधुनिक रोबोटिक्स किट्स व डायग्नोस्टिक लॅब सेटअप.'
                        : 'Turnkey physical lab setups, hardware components, sensory tools, and complete workspace infrastructure.'}
                    </span>
                  </div>
                </li>

                {/* 02 */}
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#0077B6]/15 text-[#0077B6] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-mono">
                    02
                  </span>
                  <div className="text-left">
                    <span className="text-xs sm:text-[13px] font-bold text-neutral-900 block leading-snug">
                      {language === 'mr' ? 'NEP 2020 सुसंगत अभ्यासक्रम व शैक्षणिक मॉड्यूल्स' : 'NEP 2020 Aligned Curriculum & Learning Modules'}
                    </span>
                    <span className="text-[11px] sm:text-xs text-neutral-500 leading-normal block mt-0.5">
                      {language === 'mr'
                        ? 'राष्ट्रीय शैक्षणिक धोरण २०२० शी सुसंगत, वर्गनिहाय श्रेणीबद्ध व प्रात्यक्षिकांवर आधारित मॉड्युल्स.'
                        : 'Standardized, grade-progressive STEAM syllabus mapped into mainstream academic schedules.'}
                    </span>
                  </div>
                </li>

                {/* 03 */}
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#2D9C5E]/15 text-[#2D9C5E] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-mono">
                    03
                  </span>
                  <div className="text-left">
                    <span className="text-xs sm:text-[13px] font-bold text-neutral-900 block leading-snug">
                      {language === 'mr' ? 'शिक्षक प्रशिक्षण व क्षमता बांधणी (ToT)' : 'Teacher Training & Capacity Building (ToT)'}
                    </span>
                    <span className="text-[11px] sm:text-xs text-neutral-500 leading-normal block mt-0.5">
                      {language === 'mr'
                        ? 'शिक्षकांना स्वतः प्रात्यक्षिके घेता यावीत यासाठी तज्ज्ञ प्रशिक्षकांकडून विशेष ToT प्रशिक्षण.'
                        : 'Comprehensive training-of-trainers enablement, teaching pedagogy, and hands-on kit coaching.'}
                    </span>
                  </div>
                </li>

                {/* 04 */}
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#8B1E3F]/15 text-[#8B1E3F] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-mono">
                    04
                  </span>
                  <div className="text-left">
                    <span className="text-xs sm:text-[13px] font-bold text-neutral-900 block leading-snug">
                      {language === 'mr' ? 'विद्यार्थी प्रशिक्षण, मेंटॉरिंग व प्रमाणीकरण' : 'Student Training, Mentoring, and Certification'}
                    </span>
                    <span className="text-[11px] sm:text-xs text-neutral-500 leading-normal block mt-0.5">
                      {language === 'mr'
                        ? 'प्रत्यक्ष प्रोजेक्ट मेकिंग, स्पर्धा तयारी, हॅकेथॉन मार्गदर्शन आणि अधिकृत प्रमाणपत्रे.'
                        : 'Hands-on practical projects, regional hackathons, science fairs, and industry-recognized certifications.'}
                    </span>
                  </div>
                </li>

                {/* 05 */}
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#E63946]/15 text-[#E63946] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-mono">
                    05
                  </span>
                  <div className="text-left">
                    <span className="text-xs sm:text-[13px] font-bold text-neutral-900 block leading-snug">
                      {language === 'mr' ? 'निरंतर शैक्षणिक व तांत्रिक साहाय्य' : 'Ongoing Academic & Technical Support'}
                    </span>
                    <span className="text-[11px] sm:text-xs text-neutral-500 leading-normal block mt-0.5">
                      {language === 'mr'
                        ? 'संपूर्ण वर्षभर अभ्यासक्रम मदत, हार्डवेअर दुरुस्ती व सुटे भाग पुरवठा, आणि शंका समाधान.'
                        : 'Continuous on-ground coordinator assistance, spare parts supply, and hardware troubleshooting.'}
                    </span>
                  </div>
                </li>

                {/* 06 */}
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#F77F00]/15 text-[#F77F00] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-mono">
                    06
                  </span>
                  <div className="text-left">
                    <span className="text-xs sm:text-[13px] font-bold text-neutral-900 block leading-snug">
                      {language === 'mr' ? 'अंमलबजावणी व कामगिरी मूल्यांकन' : 'Implementation & Performance Monitoring'}
                    </span>
                    <span className="text-[11px] sm:text-xs text-neutral-500 leading-normal block mt-0.5">
                      {language === 'mr'
                        ? 'नियमित प्रगती अहवाल, विद्यार्थ्यांची कौशल्य वाढ मोजणी आणि संस्थात्मक यश मापन.'
                        : 'Milestone tracking, student learning assessment metrics, and measurable institutional impact.'}
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* RIGHT SIDE: DIAGRAM (No border or outline, pure placement) */}
            <div className="lg:col-span-5 flex items-center justify-center p-2 sm:p-4">
              <img
                src="/what-we-do-transparent.webp"
                alt="What We Do - Robostorms Framework Diagram"
                className="w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] h-auto object-contain select-none transition-transform duration-300 hover:scale-[1.02]"
                draggable={false}
              />
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
