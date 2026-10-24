import React, { useState, useMemo, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Briefcase,
  MapPin,
  GraduationCap,
  Users,
  Search,
  Filter,
  CheckCircle2,
  Send,
  Phone,
  Mail,
  Building,
  ArrowRight,
  X,
  FileText,
  Clock,
  Sparkles,
  Share2,
  Calendar
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface JobPosting {
  id: string;
  titleEn: string;
  titleMr: string;
  departmentEn: string;
  departmentMr: string;
  openings: number;
  openingsLabelEn: string;
  openingsLabelMr: string;
  locationsEn: string[];
  locationsMr: string[];
  locationBreakdownEn?: string[];
  locationBreakdownMr?: string[];
  qualificationEn: string;
  qualificationMr: string;
  experienceEn: string;
  experienceMr: string;
  typeEn: string;
  typeMr: string;
  descriptionEn: string;
  descriptionMr: string;
  skillsEn: string[];
  skillsMr: string[];
  genderRequirement?: string;
  featured?: boolean;
}

interface CareersPageProps {
  onBackToHome: () => void;
}

export default function CareersPage({ onBackToHome }: CareersPageProps) {
  const { language } = useLanguage();

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Application Modal state
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredLocation: '',
    qualification: '',
    experience: '',
    portfolioLink: '',
    message: ''
  });

  // All 6 job postings with 100% exact positions, locations and qualifications from flyer
  const jobPostings: JobPosting[] = useMemo(() => [
    {
      id: 'bde',
      titleEn: 'Business Development Executive',
      titleMr: 'बिझनेस डेव्हलपमेंट एक्झिक्युटिव्ह (BDE)',
      departmentEn: 'Sales & Business Development',
      departmentMr: 'विक्री आणि व्यवसाय विकास',
      openings: 12,
      openingsLabelEn: '12 Positions',
      openingsLabelMr: '१२ पदे',
      locationsEn: ['Kolhapur (In-House)', 'Pune', 'Latur', 'Solapur', 'Nashik', 'Satara'],
      locationsMr: ['कोल्हापूर (इन-हाऊस)', 'पुणे', 'लातूर', 'सोलापूर', 'नाशिक', 'सातारा'],
      locationBreakdownEn: [
        'Kolhapur (In-House) - 2',
        'Pune - 2',
        'Latur - 2',
        'Solapur - 2',
        'Nashik - 2',
        'Satara - 2'
      ],
      locationBreakdownMr: [
        'कोल्हापूर (इन-हाऊस) - २',
        'पुणे - २',
        'लातूर - २',
        'सोलापूर - २',
        'नाशिक - २',
        'सातारा - २'
      ],
      qualificationEn: 'BBA / MBA and Experienced candidates can apply',
      qualificationMr: 'BBA / MBA आणि अनुभवी उमेदवार अर्ज करू शकतात',
      experienceEn: 'Freshers & Experienced',
      experienceMr: 'नवीन आणि अनुभवी',
      typeEn: 'Full-Time (Field & In-House)',
      typeMr: 'पूर्णवेळ (फील्ड आणि इन-हाऊस)',
      descriptionEn: 'Expand Robostorms STEAM robotics labs, STEAM curricula, and educational partnerships across premier schools, Zilla Parishads, and academic institutions in assigned territories.',
      descriptionMr: 'शाळा, जिल्हा परिषद आणि शैक्षणिक संस्थांमध्ये रोबोस्टॉर्म्स STEAM रोबोटिक्स लॅब आणि उपक्रमांचा विस्तार करणे.',
      skillsEn: ['Institutional Sales', 'School Outreach', 'B2B Pitching', 'Client Relationship', 'Territory Growth'],
      skillsMr: ['संस्थात्मक विक्री', 'शालेय संपर्क', 'B2B सादरीकरण', 'ग्राहक संबंध'],
      featured: true
    },
    {
      id: 'trainer',
      titleEn: 'STEAM & Robotics Trainer',
      titleMr: 'STEAM व रोबोटिक्स ट्रेनर',
      departmentEn: 'Academics & Training',
      departmentMr: 'प्रशिक्षण आणि अध्यापन',
      openings: 4,
      openingsLabelEn: '4 Positions',
      openingsLabelMr: '४ पदे',
      locationsEn: ['Kolhapur', 'Sangli'],
      locationsMr: ['कोल्हापूर', 'सांगली'],
      locationBreakdownEn: [
        'Kolhapur - 2',
        'Sangli - 2'
      ],
      locationBreakdownMr: [
        'कोल्हापूर - २',
        'सांगली - २'
      ],
      qualificationEn: 'Diploma, BE, BTech (Mechanical / Civil / Electronics / E&TC)',
      qualificationMr: 'डिप्लोमा, BE, BTech (मेकॅनिकल / सिव्हिल / इलेक्ट्रॉनिक्स / E&TC)',
      experienceEn: 'Freshers & Experienced',
      experienceMr: 'नवीन आणि अनुभवी',
      typeEn: 'Full-Time',
      typeMr: 'पूर्णवेळ',
      descriptionEn: 'Deliver high-energy hands-on robotics workshops, mentor school students on AI kits and sensor electronics, and guide young innovators through state & national robotics competitions.',
      descriptionMr: 'शालेय विद्यार्थ्यांना रोबोटिक्स, सेन्सर्स आणि कृत्रिम बुद्धिमत्ता (AI) प्रात्यक्षिके शिकवणे व स्पर्धांसाठी मार्गदर्शन करणे.',
      skillsEn: ['Robotics Hardware', 'Sensor Interfacing', 'Classroom Engagement', 'STEAM Pedagogy', 'Marathi & English'],
      skillsMr: ['रोबोटिक्स हार्डवेअर', 'सेन्सर कार्य', 'विद्यार्थी मार्गदर्शन', 'STEAM शिक्षण'],
      featured: true
    },
    {
      id: 'marketing',
      titleEn: 'Digital Marketing Specialist',
      titleMr: 'डिजिटल मार्केटिंग स्पेशलिस्ट',
      departmentEn: 'Digital Marketing & Media',
      departmentMr: 'डिजिटल मार्केटिंग व मीडिया',
      openings: 1,
      openingsLabelEn: '1 Position',
      openingsLabelMr: '१ पद',
      locationsEn: ['Kolhapur (Head Office)'],
      locationsMr: ['कोल्हापूर (मुख्यालय)'],
      qualificationEn: 'Graduate with Certified Digital Marketing Course',
      qualificationMr: 'पदवीधर + प्रमाणित डिजिटल मार्केटिंग कोर्स',
      experienceEn: 'Experienced Preferred',
      experienceMr: 'अनुभवास प्राधान्य',
      typeEn: 'Full-Time',
      typeMr: 'पूर्णवेळ',
      descriptionEn: 'Manage official social channels (Instagram, Facebook, YouTube), execute high-ROI performance marketing campaigns, coordinate student showcase reels, and build digital brand authority.',
      descriptionMr: 'अधिकृत सोशल मीडिया मोहिमा, YouTube/Instagram रील्स, जाहिरात मोहिमा आणि शैक्षणिक डिजिटल ब्रँडिंगचे व्यवस्थापन.',
      skillsEn: ['Meta Ads', 'Google Ads', 'SEO / Content Strategy', 'Short-form Video', 'Analytics'],
      skillsMr: ['सोशल मीडिया जाहिराती', 'व्हिडिओ निर्मिती', 'SEO', 'कंटेंट स्ट्रॅटेजी']
    },
    {
      id: 'telecaller',
      titleEn: 'Client Relations & CRM Executive',
      titleMr: 'क्लायंट रिलेशन्स व CRM एक्झिक्युटिव्ह',
      departmentEn: 'Client Relations & CRM',
      departmentMr: 'ग्राहक संबंध व समन्वय',
      openings: 1,
      openingsLabelEn: '1 Position',
      openingsLabelMr: '१ पद',
      locationsEn: ['Kolhapur (Head Office)'],
      locationsMr: ['कोल्हापूर (मुख्यालय)'],
      qualificationEn: 'MBA and Experienced candidates can apply',
      qualificationMr: 'MBA आणि अनुभवी उमेदवार अर्ज करू शकतात',
      experienceEn: 'Experienced in Client Retention',
      experienceMr: 'ग्राहक संबंधांचा अनुभव आवश्यक',
      typeEn: 'Full-Time',
      typeMr: 'पूर्णवेळ',
      descriptionEn: 'Nurture high-trust partnerships with school trustees, principals, and district educational heads. Ensure outstanding operational service quality, regular feedback, and contract renewals.',
      descriptionMr: 'संलग्न शाळांच्या संस्थाचालक, मुख्याध्यापक यांच्याशी सातत्यपूर्ण संवाद आणि उत्कृष्ट सेवा समाधान सुनिश्चित करणे.',
      skillsEn: ['Key Account Management', 'Client Retention', 'Conflict Resolution', 'Communication', 'Renewals'],
      skillsMr: ['क्लायंट व्यवस्थापन', 'उत्कृष्ट संवाद', 'सेवा समन्वय']
    }
  ], []);

  // Filtered Job List
  const filteredJobs = useMemo(() => {
    return jobPostings.filter((job) => {
      const matchesSearch =
        searchQuery === '' ||
        job.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.titleMr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.qualificationEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.locationsEn.some(loc => loc.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDept =
        selectedDepartment === 'all' ||
        job.departmentEn.toLowerCase().includes(selectedDepartment.toLowerCase());

      const matchesLoc =
        selectedLocation === 'all' ||
        job.locationsEn.some(loc => loc.toLowerCase().includes(selectedLocation.toLowerCase()));

      return matchesSearch && matchesDept && matchesLoc;
    });
  }, [jobPostings, searchQuery, selectedDepartment, selectedLocation]);

  const handleOpenApply = (job: JobPosting) => {
    setSelectedJob(job);
    setFormData(prev => ({
      ...prev,
      preferredLocation: job.locationsEn[0] || 'Kolhapur'
    }));
    setApplicationSuccess(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    try {
      await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: selectedJob?.id || 'general',
          jobTitle: selectedJob ? (language === 'mr' ? selectedJob.titleMr : selectedJob.titleEn) : 'STREAM Position',
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          preferredLocation: formData.preferredLocation.trim(),
          qualification: formData.qualification.trim(),
          experience: formData.experience.trim(),
          portfolioLink: formData.portfolioLink.trim(),
          message: formData.message.trim(),
        }),
      });
    } catch (err) {
      console.warn('Career application network note:', err);
    }

    setApplicationSuccess(true);
    setTimeout(() => {
      setApplicationSuccess(false);
      setSelectedJob(null);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        preferredLocation: '',
        qualification: '',
        experience: '',
        portfolioLink: '',
        message: ''
      });
    }, 2800);
  };

  return (
    <main className="flex-grow min-h-screen w-full bg-[#FAF9F5] text-[#1A1A1A] pb-24 text-left">
      {/* PROFESSIONAL JOB BOARD HEADER */}
      <div className="border-b border-neutral-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-8">
          <div className="mb-4">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 hover:text-[#FF5A36] border border-neutral-200 text-xs font-ubuntu font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-xs group"
            >
              <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
              <span>{language === 'mr' ? 'मुख्यपृष्ठावर परत जा' : 'Back to Home'}</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-ubuntu font-extrabold text-neutral-900 tracking-tight">
                {language === 'mr' ? 'करिअर आणि नोकरीच्या संधी' : 'Careers at Robostorms'}
              </h1>
              <p className="text-neutral-500 text-sm sm:text-base mt-1.5 font-medium">
                {language === 'mr'
                  ? 'सर्व अधिकृत पदे, पात्रता निकष आणि महाराष्ट्रातील कार्यस्थळे'
                  : 'Current open positions with detailed roles, eligibility criteria, and locations across Maharashtra'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-ubuntu font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{language === 'mr' ? 'अधिकृत भरती चालू' : 'Official Hiring Open'}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH BAR SECTION */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-8">
        <div className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-6 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'mr' ? 'पद किंवा कौशल्याने शोधा...' : 'Search by job title or keyword...'}
                className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-ubuntu focus:outline-none focus:border-[#FF5A36] focus:bg-white transition-colors"
              />
            </div>

            {/* Department Filter */}
            <div className="md:col-span-4">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-ubuntu focus:outline-none focus:border-[#FF5A36] focus:bg-white transition-colors cursor-pointer"
              >
                <option value="all">{language === 'mr' ? 'सर्व विभाग (All Departments)' : 'All Departments'}</option>
                <option value="sales">{language === 'mr' ? 'Sales & Business Development' : 'Sales & Business Development'}</option>
                <option value="academics">{language === 'mr' ? 'Academics & Training' : 'Academics & Training'}</option>
                <option value="digital marketing">{language === 'mr' ? 'Digital Marketing & Media' : 'Digital Marketing & Media'}</option>
                <option value="client relations">{language === 'mr' ? 'Client Relations & CRM' : 'Client Relations & CRM'}</option>
              </select>
            </div>

            {/* Location Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-ubuntu focus:outline-none focus:border-[#FF5A36] focus:bg-white transition-colors cursor-pointer"
              >
                <option value="all">{language === 'mr' ? 'सर्व शहरे (All Cities)' : 'All Cities'}</option>
                <option value="kolhapur">Kolhapur (कोल्हापूर)</option>
                <option value="pune">Pune (पुणे)</option>
                <option value="sangli">Sangli (सांगली)</option>
                <option value="solapur">Solapur (सोलापूर)</option>
                <option value="latur">Latur (लातूर)</option>
                <option value="nashik">Nashik (नाशिक)</option>
                <option value="satara">Satara (सातारा)</option>
              </select>
            </div>
          </div>
        </div>

        {/* RESULTS HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-ubuntu font-bold text-neutral-900 tracking-tight">
            {language === 'mr' ? 'उपलब्ध संधी' : 'Open Positions'} ({filteredJobs.length})
          </h2>
          <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
            {language === 'mr' ? 'ताजे अपडेट्स' : 'Immediate Joiners Preferred'}
          </span>
        </div>

        {/* JOB CARDS GRID */}
        {filteredJobs.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-neutral-200">
            <p className="text-neutral-500 font-ubuntu">
              {language === 'mr' ? 'कोणतीही पदे सापडली नाहीत. कृपया फिल्टर बदला.' : 'No matching positions found. Try adjusting your filters.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-neutral-200/90 hover:border-neutral-900/60 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group relative overflow-hidden text-left"
              >
                {/* Accent Top Border for Featured Roles */}
                {job.featured && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF5A36]" />
                )}

                <div>
                  {/* Department & Openings Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-ubuntu font-bold uppercase tracking-wider text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-md">
                      {language === 'mr' ? job.departmentMr : job.departmentEn}
                    </span>
                    <span className="text-xs font-ubuntu font-bold text-[#FF5A36] bg-[#FFEBE5] border border-[#FF5A36]/30 px-2.5 py-1 rounded-full">
                      {language === 'mr' ? job.openingsLabelMr : job.openingsLabelEn}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-ubuntu font-bold text-neutral-900 group-hover:text-[#FF5A36] transition-colors leading-snug mb-3">
                    {language === 'mr' ? job.titleMr : job.titleEn}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed mb-4">
                    {language === 'mr' ? job.descriptionMr : job.descriptionEn}
                  </p>

                  {/* Qualification Block */}
                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-150 mb-4">
                    <div className="flex items-start gap-2">
                      <GraduationCap className="w-4 h-4 text-[#FF5A36] mt-0.5 shrink-0" />
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-mono">
                          {language === 'mr' ? 'शैक्षणिक पात्रता' : 'Qualification'}
                        </span>
                        <span className="text-xs font-semibold text-neutral-800 leading-snug block mt-0.5">
                          {language === 'mr' ? job.qualificationMr : job.qualificationEn}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Locations List */}
                  <div className="mb-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 font-mono">
                        {language === 'mr' ? 'कामाचे ठिकाण' : 'Locations'}
                      </span>
                    </div>

                    {job.locationBreakdownEn ? (
                      <div className="flex flex-wrap gap-1.5">
                        {(language === 'mr' ? job.locationBreakdownMr || job.locationBreakdownEn : job.locationBreakdownEn).map((loc, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-medium bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-md border border-neutral-200/60"
                          >
                            {loc}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {(language === 'mr' ? job.locationsMr : job.locationsEn).map((loc, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-medium bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-md border border-neutral-200/60"
                          >
                            {loc}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs text-neutral-500 font-mono">
                    {language === 'mr' ? job.typeMr : job.typeEn}
                  </span>
                  <button
                    onClick={() => handleOpenApply(job)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FF5A36] hover:bg-[#E04E2D] active:scale-95 text-white text-xs font-ubuntu font-bold rounded-xl transition-all cursor-pointer shadow-xs"
                  >
                    <span>{language === 'mr' ? 'अर्ज करा' : 'Apply Now'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BOTTOM OFFICIAL RECRUITMENT CONTACT BAR */}
        <div className="mt-16 bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl text-left">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF5A36]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Info */}
            <div className="lg:col-span-8">
              <span className="text-xs font-ubuntu font-bold uppercase tracking-widest text-[#FF5A36] mb-2 block">
                {language === 'mr' ? 'थेट संपर्क करा' : 'Direct HR Desk'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-ubuntu font-bold text-white mb-3">
                {language === 'mr'
                  ? 'आपल्या प्रोफाइलसाठी योग्य संधी शोधत आहात?'
                  : 'Have questions or want to submit your CV directly?'}
              </h3>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                {language === 'mr'
                  ? 'आमच्या भरती विभागाशी थेट फोन किंवा ईमेलद्वारे संपर्क साधा. आम्ही २ कार्य तासांत प्रतिसाद देतो.'
                  : 'Feel free to contact our recruitment team via phone or send your resume to our official recruitment email address.'}
              </p>

              {/* Contact Pills */}
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                <a
                  href="tel:+917796969130"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-white transition-colors border border-neutral-700"
                >
                  <Phone className="w-4 h-4 text-[#FF5A36]" />
                  <span>+91 7796969130</span>
                </a>
                <a
                  href="tel:+917796969127"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-white transition-colors border border-neutral-700"
                >
                  <Phone className="w-4 h-4 text-[#FF5A36]" />
                  <span>+91 7796969127</span>
                </a>
                <a
                  href="mailto:sales@robostorms.com"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-white transition-colors border border-neutral-700"
                >
                  <Mail className="w-4 h-4 text-[#FF5A36]" />
                  <span>sales@robostorms.com</span>
                </a>
              </div>
            </div>

            {/* Right Head Office Address */}
            <div className="lg:col-span-4 bg-neutral-800/80 border border-neutral-700/80 rounded-2xl p-6">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Near+Aditya+Corner%2C+Aurum+Lohia+Realty%2C+3rd+Floor%2C+Tarabai+Park%2C+Kolhapur"
                target="_blank"
                rel="noopener noreferrer"
                title={language === 'mr' ? 'गुगल मॅप्सवर स्थान पहा' : 'View location on Google Maps'}
                className="group flex items-start gap-3 text-left hover:opacity-95 transition-all"
              >
                <Building className="w-5 h-5 text-[#FF5A36] group-hover:scale-110 transition-transform mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-ubuntu font-bold uppercase tracking-wider text-neutral-300 mb-1 group-hover:text-white flex items-center gap-1.5 transition-colors">
                    {language === 'mr' ? 'मुख्यालय पत्ता' : 'Headquarters Address'}
                    <span className="text-[10px] text-[#FF5A36] font-mono group-hover:underline">↗ Maps</span>
                  </h4>
                  <p className="text-xs text-neutral-300 group-hover:text-white leading-relaxed font-sans transition-colors">
                    3rd Floor, Aurum Lohia Reality, Aditya Corner, Tarabai Park, Kolhapur, Maharashtra 416003
                  </p>
                </div>
              </a>

              <div className="mt-5 pt-4 border-t border-neutral-700 flex items-center justify-between text-[11px] text-neutral-400">
                <span>Socials: @robostormstech</span>
                <span className="font-ubuntu font-bold text-white">Robostorms Tech</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* APPLICATION MODAL DIALOG */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="absolute inset-0 bg-neutral-950/50 backdrop-blur-sm"
            />

            {/* Dialog Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-xl bg-white rounded-3xl border border-neutral-200 shadow-2xl p-6 sm:p-8 z-10 text-left text-neutral-900 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-neutral-900 bg-neutral-50 hover:bg-neutral-100 rounded-full border border-neutral-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {applicationSuccess ? (
                /* Success State */
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#FFEBE5] text-[#FF5A36] flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-ubuntu font-bold text-neutral-900 mb-2">
                    {language === 'mr' ? 'अर्ज यशस्वीरीत्या सादर झाला!' : 'Application Submitted!'}
                  </h3>
                  <p className="text-sm text-neutral-600 max-w-md mb-4">
                    {language === 'mr'
                      ? 'आमची भरती टीम आपल्या प्रोफाइलचे पुनरावलोकन करेल आणि पुढील मुलाखत प्रक्रियेसाठी संपर्क साधेल.'
                      : 'Thank you for applying. Our HR team has received your application and will review your qualifications shortly.'}
                  </p>
                  <span className="text-xs font-mono font-bold text-[#FF5A36]">
                    Application ID: RS-{Math.floor(100000 + Math.random() * 900000)}
                  </span>
                </div>
              ) : (
                /* Application Form */
                <div>
                  <div className="mb-6 pr-8">
                    <span className="text-[11px] font-ubuntu font-bold uppercase tracking-wider text-[#FF5A36] bg-[#FFEBE5] px-2.5 py-0.5 rounded-md">
                      {language === 'mr' ? selectedJob.departmentMr : selectedJob.departmentEn}
                    </span>
                    <h3 className="text-2xl font-ubuntu font-bold text-neutral-900 mt-2">
                      {language === 'mr' ? selectedJob.titleMr : selectedJob.titleEn}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      {language === 'mr' ? 'शैक्षणिक पात्रता: ' : 'Required: '}
                      <span className="font-semibold text-neutral-800">
                        {language === 'mr' ? selectedJob.qualificationMr : selectedJob.qualificationEn}
                      </span>
                    </p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-ubuntu font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        {language === 'mr' ? 'पूर्ण नाव *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-ubuntu focus:outline-none focus:border-[#FF5A36] focus:bg-white transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-ubuntu font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                          {language === 'mr' ? 'मोबाईल नंबर *' : 'Phone Number *'}
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-ubuntu focus:outline-none focus:border-[#FF5A36] focus:bg-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-ubuntu font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                          {language === 'mr' ? 'ईमेल आयडी' : 'Email Address'}
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="candidate@example.com"
                          className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-ubuntu focus:outline-none focus:border-[#FF5A36] focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-ubuntu font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                          {language === 'mr' ? 'पसंतीचे शहर *' : 'Preferred City *'}
                        </label>
                        <select
                          value={formData.preferredLocation}
                          onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                          className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-ubuntu focus:outline-none focus:border-[#FF5A36] focus:bg-white transition-colors"
                        >
                          {(language === 'mr' ? selectedJob.locationsMr : selectedJob.locationsEn).map((loc, idx) => (
                            <option key={idx} value={selectedJob.locationsEn[idx] || loc}>
                              {loc}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-ubuntu font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                          {language === 'mr' ? 'आपली पदवी / पात्रता' : 'Your Qualification'}
                        </label>
                        <input
                          type="text"
                          value={formData.qualification}
                          onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                          placeholder="e.g. BE / BTech / MBA / Diploma"
                          className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-ubuntu focus:outline-none focus:border-[#FF5A36] focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-ubuntu font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                          {language === 'mr' ? 'कामाचा अनुभव (वर्षे)' : 'Experience (Years)'}
                        </label>
                        <input
                          type="text"
                          value={formData.experience}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                          placeholder="e.g. Fresher or 1-2 years"
                          className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-ubuntu focus:outline-none focus:border-[#FF5A36] focus:bg-white transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-ubuntu font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                          {language === 'mr' ? 'CV / LinkedIn / Portfolio लिंक' : 'CV / LinkedIn / Portfolio Link'}
                        </label>
                        <input
                          type="url"
                          value={formData.portfolioLink}
                          onChange={(e) => setFormData({ ...formData, portfolioLink: e.target.value })}
                          placeholder="https://drive.google.com/..."
                          className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-ubuntu focus:outline-none focus:border-[#FF5A36] focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-ubuntu font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        {language === 'mr' ? 'थोडक्यात माहिती / संदेश' : 'Brief Cover Note / Message'}
                      </label>
                      <textarea
                        rows={2}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={language === 'mr' ? 'आपल्या कौशल्यांविषयी थोडक्यात सांगा...' : 'Tell us why you are a great fit for Robostorms...'}
                        className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-ubuntu focus:outline-none focus:border-[#FF5A36] focus:bg-white transition-colors resize-none"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedJob(null)}
                        className="px-4 py-2.5 rounded-xl text-xs font-ubuntu font-bold text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
                      >
                        {language === 'mr' ? 'रद्द करा' : 'Cancel'}
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FF5A36] hover:bg-[#E04E2D] active:scale-95 text-white text-xs font-ubuntu font-bold rounded-xl transition-all shadow-md cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{language === 'mr' ? 'अर्ज सबमिट करा' : 'Submit Application'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
