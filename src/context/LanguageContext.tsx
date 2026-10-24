import { createContext, useContext, useState, ReactNode } from 'react';
import { Subject, Course } from '../types';

export type Language = 'en' | 'mr';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  tSubject: (sub: Subject) => Subject;
  tCourse: (course: Course) => Course;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav & Common
    'nav.home': 'Home',
    'nav.subjects': 'Subjects',
    'nav.courses': 'Courses',
    'nav.services': 'Services',
    'nav.inventra': 'Inventra',
    'nav.reviews': 'Reviews',
    'nav.collaboration': 'Collaboration',
    'nav.careers': 'Careers',
    'nav.mentor': 'Our Team',
    'nav.aboutUs': 'About Us',
    'nav.forBusiness': 'For business',
    'nav.bookCall': 'Book School Demo',
    'nav.popularSubjects': 'Popular Subjects',
    'nav.certifiedCoursesAvailable': 'Certified Courses available',
    'nav.findMatches': 'Find matches',
    'brand.tagline': 'Smart Learning Solutions',

    // Hero
    'hero.title1': "INDIA'S MOST",
    'hero.title2': 'TRUSTED SCHOOL',
    'hero.title3': 'INNOVATION PLATFORM',
    'hero.subtitle': 'Empowering Schools with AI, Robotics, STEAM, Coding and Future-Ready Innovation Labs.',
    'hero.bookSchoolDemo': 'Book School Demo',
    'hero.exploreSolutions': 'Explore Our Solutions',
    'hero.findCourse': 'Find course',
    'hero.viewBlog': 'View our blog',
    'hero.featuredIn': 'Featured In',

    // Bottom Stats Row
    'stats.studentsEngaged': '5,00,000+',
    'stats.studentsEngagedLabel': 'Students engaged',
    'stats.studentsEngagedSub': 'through programs',
    'stats.studentsBadge': 'Students',

    'stats.labsEstablished': '2,500+',
    'stats.labsEstablishedLabel': 'Labs established',
    'stats.labsEstablishedSub': 'in ZP & municipal schools',
    'stats.labsBadge': 'Labs',

    'stats.teachersTrained': '15,000+',
    'stats.teachersTrainedLabel': 'Teachers trained',
    'stats.teachersTrainedSub': 'and upskilled',
    'stats.teachersBadge': 'Teachers',

    'stats.atlStem': '150+',
    'stats.atlStemLabel': 'ATL & STEAM',
    'stats.atlStemSub': 'Labs implemented',
    'stats.atlBadge': 'ATL & STEAM',

    'stats.partnerSchools': 'Partner Schools',
    'stats.districtsCoverage': 'Districts Coverage',
    'stats.studentScale': 'Student scale',
    'stats.schoolsDesc': 'Our educational syllabus and hands-on modules are trusted by over 1,700 partner schools across regions, introducing students to next-gen scientific and technological learning.',
    'stats.districtsDesc': 'Active expansion across 15+ educational districts. Our curriculum scale provides resources directly to classrooms, empowering teachers and coordinators alike.',
    'stats.studentDesc': 'Humble impact serving over 10 Lakh+ active students. Empowering the youth to transition from passive consumers to skilled creators of future technologies.',
    'stats.keyCollaborators': 'Key Collaborators:',
    'stats.districtModel': 'District Collaboration Model:',
    'stats.modelQuote': '"Delivering standardized STEAM materials, robot builder blueprints, and local learning centers to create an interconnected student grid."',
    'stats.quoteText': '"Having access to the training modules and mechanical kits completely transformed how our high school operates learning. Over 10 lakh students now have access to high-fidelity coursework."',
    'stats.quoteAuthor': 'Dr. Rajesh Deshmukh',
    'stats.quoteRole': 'Academic Director',
    'stats.launchMatcher': 'Launch Course Matcher',
    'stats.viewRoster': 'View course roster matches',
    'stats.empowerFuture': 'Empowering the Future Generation',

    // STEAM Labs Section
    'labs.title': 'STEAM Labs setup',
    'labs.subtitle': 'State-of-the-Art STEAM Laboratories',
    'labs.desc': 'Our comprehensive, accredited lab models provide schools with modern diagnostics, physical components, and step-by-step physical-digital curriculum models.',
    'labs.blueprint': 'Full End-to-End Service Blueprint',
    'labs.step1': 'Installing Labs',
    'labs.step1Desc': 'Hardware setup',
    'labs.step2': 'Maintaining It',
    'labs.step2Desc': 'Continuous support',
    'labs.step3': 'Training Students',
    'labs.step3Desc': 'STEAM learning',
    'labs.step4': 'Training Teachers',
    'labs.step4Desc': 'Pedagogic coaching',
    'labs.step5': 'Certifying Labs',
    'labs.step5Desc': 'Model space mark',

    // Credentials Section
    'cred.title': 'ACCREDITED AND RECOGNIZED',
    'cred.intro': 'Our training and curriculum paths are trusted by regional boards and physical science departments alike, ensuring university-grade quality at all stages.',

    // Courses Section
    'courses.title': 'Explore Certified Courses',
    'courses.subtitle': 'Find the right path for your technological journey',
    'courses.level': 'Level',
    'courses.duration': 'Duration',
    'courses.rating': 'Rating',
    'courses.students': 'Students',
    'courses.enroll': 'Enroll Now',
    'courses.noMatching': 'No matching courses found. Try altering your filter parameters!',

    // School Testimonials Section
    'school.title': 'Trusted by Leading Educators',
    'school.subtitle': 'What School Owners Have to Say',

    // Reviews Section
    'reviews.title': 'Student Testimonials',
    'reviews.subtitle': 'Real reviews from future innovators',

    // Connect Section
    'connect.title': 'Connect with Robostorms',
    'connect.subtitle': 'Stay up to date with student innovation, regional STEAM fairs, and workshop open-houses.',
    'connect.facebookDesc': 'Connect with regional STEAM centers, student fairs, and parent innovation communities.',
    'connect.youtubeDesc': 'Access hours of physical assembly step-by-steps, lab tours, and programming tutorials.',
    'connect.whatsappDesc': 'Get prompt chat support regarding kits, parts procurement, registration and open seats.',
    'connect.btnChat': 'Join the Chat',
    'connect.btnRegister': 'Register for Fair',

    // Footer Section
    'footer.mission': 'Empowering Education with Cutting-Edge Innovation and Smart Learning Solutions.',
    'footer.partner': 'Active Educational partner',
    'footer.services': 'Our Services',
    'footer.community': 'Community',
    'footer.resources': 'Resources',
    'footer.sales': 'Sales Desk',
    'footer.support': 'Support Desk',
    'footer.headOffice': 'Head Office',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms & Conditions',
    'footer.copyright': '© 2026 Robostorms Technologies Inc.',

    // Inventra Section
    'inventra.badge': 'Robotics Competition & Project Expo',
    'inventra.title': 'Robostorms Inventra',
    'inventra.desc': 'Inventraa is Robostorms flagship Robotics Competition & Project Expo that gives students a platform to showcase creativity, innovation, teamwork and technical talent. It encourages practical exposure, confidence and a spirit of invention.',
    'inventra.tag1': 'Creativity & Innovation',
    'inventra.tag2': 'Teamwork & Technical Talent',
    'inventra.tag3': 'Practical Exposure',
    'inventra.tag4': 'Spirit of Invention',
    'inventra.participate': 'Participate in Inventra',
    'inventra.learnMore': 'Click Here to Learn More!',
    'inventra.galleryTitle': 'Moments from Inventra Robotics Competitions',
    'inventra.gallerySub': 'Explore highlights, student project showcases, and innovation exhibitions from our latest events.',

    // Collaboration Section
    'collab.badge': 'Institutional Partnerships',
    'collab.title': 'Collaborations & Network',
    'collab.subtitle': 'Empowering students across Maharashtra through trusted government and school partnerships.',
    'collab.govTitle': 'Government Collaborations',
    'collab.govSubtitle': 'Zilla Parishad & Municipal School Deployments',
    'collab.govCount': '11 Key Initiatives Across Maharashtra',
    'collab.schoolTitle': 'Associated Schools',
    'collab.schoolSubtitle': 'Leading Private & Autonomous Educational Institutions',

    // Services Definition
    'service.s1': 'STEAM Lab Setup',
    'service.d1': 'Full-infrastructure labs with interactive panels & diagnostic equipment.',
    'service.s2': 'Training / Activity Center',
    'service.d2': 'Accredited STEAM workspace workshops for students & teachers.',
    'service.s3': 'Web App Development and Hosting',
    'service.d3': 'Custom-built client interfaces, interactive programs, & reliable server pipelines.',
    'service.s4': 'Interactive Panel / Electronics Material Hub',
    'service.d4': 'Advanced electronics kits, breadboard elements, and modern sensory inputs.',

    // Community / Resources Links
    'link.scientist': 'Robostorms Young Scientist',
    'link.register': 'Competition Register',

    // Subjects
    'subj.robotics.name': 'Robotics & Coding',
    'subj.robotics.desc': 'Learn to build autonomous machines, understand kinematics, and master logical blocks.',
    'subj.electronics.name': 'Basic Electronics',
    'subj.electronics.desc': 'Master fundamentals of circuits, resistors, capacitors, and microcontrollers.',
    'subj.iot.name': 'Internet of Things (IoT)',
    'subj.iot.desc': 'Connect sensors, capture telemetry, and build intelligent smart-home models.',
    'subj.arvr.name': 'AR & VR Lab',
    'subj.arvr.desc': 'Design immersive virtual worlds, augmented overlay systems, and spatial interfaces.',
    'subj.webapp.name': 'Web App Development',
    'subj.webapp.desc': 'Build fast full-stack applications with modern frameworks and robust servers.',
    'subj.cs.name': 'Computer Science',
    'subj.cs.desc': 'Learn Software Engineering, Web Development, Databases, and AI Engineering.',
    'subj.design.name': 'Creative Design',
    'subj.design.desc': 'Master Graphic Design, UI/UX, Vector Illustration, Typography, and Motion.',

    // Courses
    'course.robotics-coding-mastery': 'Autonomous Robotics & Fundamentals of Coding',
    'course.robotics-coding-mastery.desc': 'Build real-world autonomous robots, program logical sensor feedback loops, and master scratch-to-block programming.',

    'course.electronics-foundations': 'Basic Electronics, Circuits & Microcontrollers',
    'course.electronics-foundations.desc': 'Dive deep into breadboard circuit prototyping, electrical components, voltage laws, and basic controller setups.',

    'course.iot-smart-systems': 'Internet of Things (IoT): Smart Home Sensors & Telemetry',
    'course.iot-smart-systems.desc': 'Learn to wire ESP32/NodeMCU controllers, transmit real-time telemetry datasets over MQTT, and integrate dashboard triggers.',

    'course.ar-vr-spatial': 'AR & VR Lab: Spatial Audio & Interactive 3D Environments',
    'course.ar-vr-spatial.desc': 'Assemble immersive spatial virtual reality coordinates, program gesture cues, and create custom stereoscopic experiences.',

    'course.webapp-dev-pro': 'Web App Development Bootcamp: React 19 & Tailwind',
    'course.webapp-dev-pro.desc': 'Design robust client/server interfaces, establish local caching layers, customize layout frames, and deploy on Cloud containers.',

    'course.vector-art': 'Creative Illustration: Line Art & Vector Painting',
    'course.vector-art.desc': 'Recreate line art styles, play with character designs, and formulate colorful illustrations.',

    'course.startup-scaling': 'Bootstrapping & Scaling High-Growth Startups',
    'course.startup-scaling.desc': 'Go from zero to product-market fit, handle unit economics, and manage team psychology.',

    'course.fluent-spanish': 'Fluid Spanish: Accelerated Listening & Conversational Speaking',
    'course.fluent-spanish.desc': 'Connect naturally, refine your native pronunciation, and learn essential colloquial idioms.',

    'course.quantum-cosmology': 'Introduction to Quantum Mechanics & Modern Cosmology',
    'course.quantum-cosmology.desc': 'Analyze wave-particle duality, Black Hole mechanics, and General Relativity mathematical structures.'
  },
  mr: {
    // Nav & Common
    'nav.home': 'मुख्यपृष्ठ',
    'nav.subjects': 'विविध विषय',
    'nav.courses': 'कोर्सेस',
    'nav.services': 'सेवा',
    'nav.inventra': 'इन्व्हेन्ट्रा',
    'nav.reviews': 'अभिप्राय',
    'nav.collaboration': 'सहकार्य',
    'nav.careers': 'करिअर',
    'nav.mentor': 'आमची टीम',
    'nav.aboutUs': 'आमच्याबद्दल',
    'nav.forBusiness': 'व्यावसायिक चौकशी',
    'nav.bookCall': 'शाळेचा डेमो बुक करा',
    'nav.popularSubjects': 'लोकप्रिय विषय',
    'nav.certifiedCoursesAvailable': 'प्रमाणित कोर्सेस उपलब्ध',
    'nav.findMatches': 'योग्य कोर्स शोधा',
    'brand.tagline': 'स्मार्ट लर्निंग सोल्युशन्स',

    // Hero
    'hero.title1': 'भारतातील सर्वात',
    'hero.title2': 'विश्वासू शालेय',
    'hero.title3': 'इनोव्हेशन प्लॅटफॉर्म',
    'hero.subtitle': 'AI, रोबोटिक्स, STEAM, कोडिंग आणि भविष्यवेधी इनोव्हेशन लॅब्सद्वारे शाळांचे सक्षमीकरण.',
    'hero.bookSchoolDemo': 'शाळेचा डेमो बुक करा',
    'hero.exploreSolutions': 'आमचे सोल्यूशन्स पहा',
    'hero.findCourse': 'योग्य कोर्स शोधा',
    'hero.viewBlog': 'आमचा ब्लॉग पहा',
    'hero.featuredIn': 'वैशिष्ट्यीकृत',

    // Bottom Stats Row
    'stats.studentsEngaged': '५,००,०००+',
    'stats.studentsEngagedLabel': 'प्रशिक्षित विद्यार्थी',
    'stats.studentsEngagedSub': 'विविध उपक्रमांद्वारे',
    'stats.studentsBadge': 'विद्यार्थी',

    'stats.labsEstablished': '२,५००+',
    'stats.labsEstablishedLabel': 'लॅब्स स्थापना',
    'stats.labsEstablishedSub': 'जि. प. व मनपा शाळांमध्ये',
    'stats.labsBadge': 'लॅब्स',

    'stats.teachersTrained': '१५,०००+',
    'stats.teachersTrainedLabel': 'शिक्षक प्रशिक्षण',
    'stats.teachersTrainedSub': 'कौशल्य विकास',
    'stats.teachersBadge': 'शिक्षक',

    'stats.atlStem': '१५०+',
    'stats.atlStemLabel': 'ATL & STEAM',
    'stats.atlStemSub': 'लॅब्स अंमलबजावणी',
    'stats.atlBadge': 'ATL & STEAM',

    'stats.partnerSchools': 'भागीदार शाळा',
    'stats.districtsCoverage': 'जिल्हे कव्हरेज',
    'stats.studentScale': 'विद्यार्थी प्रमाण',
    'stats.schoolsDesc': 'आमचा शैक्षणिक अभ्यासक्रम आणि प्रात्यक्षिक प्रयोगांवर आधारित मॉड्यूल्स संपूर्ण क्षेत्रातील १,७०० पेक्षा जास्त भागीदार शाळांद्वारे विश्वसनीय आहेत, जे विद्यार्थ्यांना वैज्ञानिक आणि तांत्रिक शिक्षणाची ओळख करून देतात.',
    'stats.districtsDesc': '१५ हून अधिक शैक्षणिक जिल्ह्यांमध्ये सक्रिय विस्तार. आमचा अभ्यासक्रम प्रत्येक वर्गात थेट संसाधने उपलब्ध करून देतो, ज्यामुळे शिक्षक आणि समन्वयक सक्षम होतात.',
    'stats.studentDesc': '१० लाखांहून अधिक सक्रिय विद्यार्थ्यांना सुलभ तंत्रज्ञान शिक्षण. युवा पिढीला तंत्रज्ञानाचे केवळ ग्राहक न बनवता भविष्यातील तंत्रज्ञानाचे कुशल निर्माते होण्यासाठी सक्षम करणे.',
    'stats.keyCollaborators': 'मुख्य सहयोगी:',
    'stats.districtModel': 'जिल्हा सहयोग मॉडेल:',
    'stats.modelQuote': '"एकमेकांशी जोडलेली शैक्षणिक व्यवस्था तयार करण्यासाठी आम्ही प्रमाणित विज्ञान साहित्य, रोबोट बिल्डर ब्ल्यूप्रिंट्स आणि स्थानिक शिक्षण केंद्रे थेट वर्गापर्यंत पुरवतो."',
    'stats.quoteText': '"प्रशिक्षण मॉड्यूल्स आणि मेकॅनिकल किट्सच्या उपलब्धतेमुळे आमच्या हायस्कूलमधील शिकण्याची पद्धत पूर्णपणे बदलली आहे. आता १० लाखांपेक्षा जास्त विद्यार्थ्यांना उच्च दर्जाच्या तांत्रिक अभ्यासक्रमाचा लाभ मिळत आहे."',
    'stats.quoteAuthor': 'डॉ. राजेश देशमुख',
    'stats.quoteRole': 'शैक्षणिक संचालक',
    'stats.launchMatcher': 'कोर्स मॅचर सुरू करा',
    'stats.viewRoster': 'कोर्स यादी सामने पहा',
    'stats.empowerFuture': 'भावी पिढीचे सक्षमीकरण',

    // STEAM Labs Section
    'labs.title': 'स्ट्रीम लॅब सेटअप',
    'labs.subtitle': 'अत्याधुनिक प्रगत लॅबोरेटरीज',
    'labs.desc': 'आमचे सर्वसमावेशक, मान्यताप्राप्त लॅब मॉडेल्स शाळांना आधुनिक उपकरणे, प्रत्यक्ष साधने आणि अभ्यासक्रम मॉडेल्ससह सुसज्ज बनवतात.',
    'labs.blueprint': 'पूर्ण एंड-टू-एंड सेवा मार्गदर्शक',
    'labs.step1': 'लॅब स्थापना',
    'labs.step1Desc': 'हार्डवेअर आणि सेटअप',
    'labs.step2': 'सतत देखभाल',
    'labs.step2Desc': 'तांत्रिक पाठबळ',
    'labs.step3': 'विद्यार्थी प्रशिक्षण',
    'labs.step3Desc': 'प्रगत STEAM शिक्षण',
    'labs.step4': 'शिक्षक प्रशिक्षण',
    'labs.step4Desc': 'शैक्षणिक मार्गदर्शन',
    'labs.step5': 'लॅब प्रमाणीकरण',
    'labs.step5Desc': 'मॉडेल स्पेस प्रमाणपत्र',

    // Credentials Section
    'cred.title': 'अधिकृत आणि मान्यताप्राप्त',
    'cred.intro': 'आमचे प्रशिक्षण आणि अभ्यासक्रम प्रादेशिक विद्याशाखा आणि भौतिकशास्त्र विभागांद्वारे प्रमाणित आहेत, जे उच्च स्तरावर विद्यापीठ दर्जाची गुणवत्ता सुनिश्चित करतात.',

    // Courses Section
    'courses.title': 'प्रमाणित कोर्सेस शोधा',
    'courses.subtitle': 'तुमच्या तांत्रिक प्रवासासाठी योग्य मार्ग शोधा',
    'courses.level': 'स्तर',
    'courses.duration': 'कालावधी',
    'courses.rating': 'रेटिंग',
    'courses.students': 'विद्यार्थी',
    'courses.enroll': 'आता प्रवेश घ्या',
    'courses.noMatching': 'काही ठोस कोर्सेस सापडले नाहीत. कृपया वेगळे पर्याय निवडून शोधा!',

    // School Testimonials Section
    'school.title': 'अग्रगण्य शाळा आणि शिक्षकांचा विश्वास',
    'school.subtitle': 'शाळा मालकांचे व मुख्याध्यापकांचे मनोगत',

    // Reviews Section
    'reviews.title': 'विद्यार्थ्यांचे अभिप्राय',
    'reviews.subtitle': 'भविष्यातील नवसंशोधकांचे वास्तविक अनुभव आणि प्रतिक्रिया',

    // Connect Section
    'connect.title': 'रोबोस्टॉर्म्सशी संपर्क साधा',
    'connect.subtitle': 'विद्यार्थ्यांचे तांत्रिक शोध, प्रादेशिक STEAM मेळे आणि कार्यशाळांच्या ताज्या अपडेट्स मिळवा.',
    'connect.facebookDesc': 'प्रादेशिक STEAM केंद्रे, विद्यार्थी मेळावे आणि पालक संशोधन संस्थांशी जोडले जा.',
    'connect.youtubeDesc': 'व्हिडिओद्वारे स्टेप-बाय-स्टेप रोबोटिक्स असेंब्ली, अत्याधुनिक तंत्रज्ञान आणि कोडिंग प्रगत मार्गदर्शक पहा.',
    'connect.whatsappDesc': 'अभ्यासक्रम किट्स, सुटे भाग खरेदी आणि नवीन बॅचेस नोंदणीबाबत व्हाट्सॲपवर त्वरित सहाय्य मिळवा.',
    'connect.btnChat': 'समुदायात सामील व्हा',
    'connect.btnRegister': 'मेळाव्यासाठी नोंदणी करा',

    // Footer Section
    'footer.mission': 'अत्याधुनिक नवकल्पना आणि स्मार्ट शिक्षण उपायांसह शिक्षणाचे सक्षमीकरण.',
    'footer.partner': 'सक्रिय शैक्षणिक भागीदार',
    'footer.services': 'आमच्या सेवा',
    'footer.community': 'समुदाय',
    'footer.resources': 'महत्त्वाचे दुवे',
    'footer.sales': 'विक्री विभाग',
    'footer.support': 'मदत विभाग',
    'footer.headOffice': 'मुख्य कार्यालय',
    'footer.privacy': 'गोपनीयता धोरण',
    'footer.terms': 'नियम आणि अटी',
    'footer.copyright': '© २०२६ रोबोस्टॉर्म्स टेक्नॉलॉजीज इंक.',

    // Inventra Section
    'inventra.badge': 'रोबोटिक्स स्पर्धा आणि प्रोजेक्ट एक्सपो',
    'inventra.title': 'रोबोस्टॉर्म्स इन्व्हेन्ट्रा',
    'inventra.desc': 'इन्व्हेन्ट्रा ही रोबोस्टॉर्म्सची अग्रगण्य रोबोटिक्स स्पर्धा आणि प्रोजेक्ट एक्सपो आहे, जी विद्यार्थ्यांना सर्जनशीलता, नाविन्यता, सांघिक कार्य आणि तांत्रिक गुणवत्ता प्रदर्शित करण्यासाठी एक हक्काचे व्यासपीठ मिळवून देते. ही स्पर्धा विद्यार्थ्यांना प्रत्यक्ष कृतीतून शिकण्याची संधी, आत्मविश्वास आणि नाविन्यपूर्ण शोधांची प्रेरणा देते.',
    'inventra.tag1': 'सर्जनशीलता आणि नाविन्य',
    'inventra.tag2': 'सांघिक कार्य आणि तांत्रिक कौशल्य',
    'inventra.tag3': 'प्रत्यक्ष कृतीतून अनुभव',
    'inventra.tag4': 'नाविन्यपूर्ण शोधवृत्ती',
    'inventra.participate': 'इन्व्हेन्ट्रा मध्ये सहभागी व्हा',
    'inventra.learnMore': 'अधिक माहितीसाठी येथे क्लिक करा!',
    'inventra.galleryTitle': 'इन्व्हेन्ट्रा रोबोटिक्स स्पर्धांची क्षणचित्रे',
    'inventra.gallerySub': 'आमच्या स्पर्धांमधील विद्यार्थ्यांचे नाविन्यपूर्ण रोबोटिक्स प्रकल्प, प्रदर्शन आणि अविस्मरणीय क्षण.',

    // Collaboration Section
    'collab.badge': 'संस्थात्मक भागीदारी',
    'collab.title': 'सहकार्य आणि भागीदारी',
    'collab.subtitle': 'महाराष्ट्रभरातील विद्यार्थ्यांपर्यंत प्रगत STEAM शिक्षण पोहोचवण्यासाठी शासन आणि शाळांसोबतची मजबूत भागीदारी.',
    'collab.govTitle': 'शासकीय सहकार्य (Government Collaborations)',
    'collab.govSubtitle': 'जिल्हा परिषद व शासकीय शाळांमधील रोबोस्टॉर्म्स लॅब उपक्रम',
    'collab.govCount': 'महाराष्ट्रातील ११ प्रमुख जिल्हा उपक्रम',
    'collab.schoolTitle': 'संलग्न शाळा (Associated Schools)',
    'collab.schoolSubtitle': 'महाराष्ट्रातील नामांकित खाजगी व स्वायत्त शिक्षण संस्था',

    // Services Definition
    'service.s1': 'स्ट्रीम लॅब सेटअप',
    'service.d1': 'परस्परसंवादी पॅनेल्स आणि निदान उपकरणांसह पूर्ण पायाभूत सुविधा लॅब स्थापना.',
    'service.s2': 'प्रशिक्षण / क्रियाकलाप केंद्र',
    'service.d2': 'विद्यार्थी आणि शिक्षकांसाठी मान्यताप्राप्त STEAM कार्यशाळा आणि उपक्रम केंद्र.',
    'service.s3': 'वेब ॲप विकास आणि वेब होस्टिंग',
    'service.d3': 'कस्टम क्लायंट इंटरफेसेस, प्रगत वेब सिस्टिम्स आणि विश्वसनीय सर्वर अंमलबजावणी.',
    'service.s4': 'मटेरियल हब व इलेक्ट्रॉनिक्स साहित्य संग्रह',
    'service.d4': 'अत्याधुनिक इलेक्ट्रॉनिक्स किट्स, मायक्रोकंट्रोलर्स, सेन्सर्स आणि ब्रेडबोर्डचे समृद्ध केंद्र.',

    // Community / Resources Links
    'link.scientist': 'रोबोस्टॉर्म्स यंग सायंटिस्ट',
    'link.register': 'स्पर्धा नोंदणी',

    // Subjects
    'subj.robotics.name': 'रोबोटिक्स आणि कोडिंग',
    'subj.robotics.desc': 'स्वयंचलित रोबो तयार करणे, मेकॅनिक्स आणि मूलभूत तार्किक कोडिंग शिकणे.',
    'subj.electronics.name': 'मूलभूत इलेक्ट्रॉनिक्स',
    'subj.electronics.desc': 'सर्किट्स, रेझिस्टर्स, कॅपेसिटर्स आणि मायक्रोकंट्रोलर्सचे मूलभूत ज्ञान आत्मसात करा.',
    'subj.iot.name': 'इंटरनेट ऑफ थिंग्स (IoT)',
    'subj.iot.desc': 'स्मार्ट-होम मॉडेल्स तयार करण्यासाठी सेन्सर्स आणि कंट्रोलर जोडणे शिका.',
    'subj.arvr.name': 'एआर आणि व्हीआर लॅब',
    'subj.arvr.desc': 'आभासी जगात किंवा वर्च्युअल विश्वामध्ये त्रिमितीय डिझाइन व परस्परसंवादी अनुभव तयार करा.',
    'subj.webapp.name': 'वेब ॲप विकास',
    'subj.webapp.desc': 'आधुनिक तंत्रज्ञान आणि वेगवान सर्वर वापरून वेब ॲप्लिकेशन्स तयार करणे.',
    'subj.cs.name': 'संगणक विज्ञान (Computer Science)',
    'subj.cs.desc': 'सॉफ्टवेअर अभियांत्रिकी, डेटाबेस आणि कृत्रिम बुद्धिमत्ता (AI) मधील महत्वाचे पैलू.',
    'subj.design.name': 'सर्जनशील डिझाईन',
    'subj.design.desc': 'ग्राफिक डिझाइन, युझर इंटरफेस (UI/UX) आणि व्हिज्युअल आर्ट्सचे तंत्र शोधा.',

    // Courses
    'course.robotics-coding-mastery': 'स्वयंचलित रोबोटिक्स आणि कोडिंग फाउंडेशन',
    'course.robotics-coding-mastery.desc': 'वास्तविक वापराचे स्वयंचलित रोबो बनवा, सेन्सर फीडबॅक लूप प्रोग्राम करा आणि स्क्रॅच-टू-ब्लॉक कोडिंग शिका.',

    'course.electronics-foundations': 'मूलभूत इलेक्ट्रॉनिक्स, सर्किट्स आणि मायक्रोकंट्रोलर्स',
    'course.electronics-foundations.desc': 'ब्रेडबोर्ड डिझाइन, इलेक्ट्रॉनिक घटक, व्होल्टेज नियम आणि कंट्रोलर जोडणी अभ्यासा.',

    'course.iot-smart-systems': 'इंटरनेट ऑफ थिंग्स (IoT): स्मार्ट होम सेन्सर्स आणि टेलिमेट्री',
    'course.iot-smart-systems.desc': 'ESP32 कंट्रोलर्स जोडणे, रिअल-टाइम डेटा क्लाउडवर पाठवणे आणि कंट्रोल सिस्टीम उभी करणे.',

    'course.ar-vr-spatial': 'एआर आणि व्हीआर लॅब: परस्परसंवादी त्रिमितीय रचना',
    'course.ar-vr-spatial.desc': 'आभासी विश्वातील संवाद रचना आणि स्पेशल ऑडिओ तंत्रज्ञानाचा थरारक अनुभव तयार करा.',

    'course.webapp-dev-pro': 'वेब ॲप डेव्हलपमेंट बूटकॅम्प: React आणि Tailwind CSS',
    'course.webapp-dev-pro.desc': 'दर्जेदार क्लायंट-सर्वर इंटरफेस विकसित करा, डेटा कॅशिंग आणि क्लाउड कंटेनर डेव्हलपमेंट शिका.',

    'course.vector-art': 'सर्जनशील डिझाइन: रेखाचित्र आणि वेक्टर पेंटिंग',
    'course.vector-art.desc': 'आधुनिक रेखाचित्र आणि कलाकृती बनवण्यासाठी रंगसंगती आणि कॅरेक्टर डिझाइनचे कौशल्य शिका.',

    'course.startup-scaling': 'स्टार्टअप डेव्हलपमेंट आणि बिझनेस स्केलिंग',
    'course.startup-scaling.desc': 'शून्यापासून व्यावसायिक मॉडेल उभारणे, युनिट इकॉनॉमिक्स आणि संघ व्यवस्थापन शिका.',

    'course.fluent-spanish': 'प्रवाही स्पॅनिश भाषा: संवाद कौशल्य',
    'course.fluent-spanish.desc': 'स्पॅनिश भाषेचे उच्चारण सुधारा, रोजच्या वापरातील वाक्ये आणि संवाद कौशल्ये सुलभ पद्धतीने शिका.',

    'course.quantum-cosmology': 'क्वांटम मेकॅनिक्स आणि आधुनिक खगोलशास्त्र परिचय',
    'course.quantum-cosmology.desc': 'ब्लॅक होल मेकॅनिक्स, वेव्ह-पार्टिकल ड्युअलिटी आणि रिलेटिव्हिटीच्या समीकरणांचा अभ्यास.'
  }
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  const tSubject = (sub: Subject): Subject => {
    const nameKey = `subj.${sub.id}.name`;
    const descKey = `subj.${sub.id}.desc`;
    return {
      ...sub,
      name: translations[language][nameKey] || sub.name,
      description: translations[language][descKey] || sub.description
    };
  };

  const tCourse = (course: Course): Course => {
    const titleKey = `course.${course.id}`;
    const descKey = `course.${course.id}.desc`;
    const subjectKey = `subj.${course.subject.toLowerCase().replace(/ & /g, '').replace(/ /g, '')}.name`;
    return {
      ...course,
      title: translations[language][titleKey] || course.title,
      description: translations[language][descKey] || course.description,
      subject: translations[language][subjectKey] || course.subject
    };
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tSubject, tCourse }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
