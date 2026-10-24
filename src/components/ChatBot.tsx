import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CuteWavingRobot from './CuteWavingRobot';
import {
  Send,
  X,
  Calendar,
  MapPin,
  ExternalLink,
  RotateCcw
} from 'lucide-react';

interface ChatBotProps {
  onOpenConsultation: () => void;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const ROBOSTORMS_MAP_URL =
  'https://www.google.com/maps/search/?api=1&query=Near+Aditya+Corner%2C+Aurum+Lohia+Realty%2C+3rd+Floor%2C+Tarabai+Park%2C+Kolhapur';

const SYSTEM_PROMPT = `You are "RoboBot", the official real-time AI assistant for Robostorms (a premier STEAM, Robotics, AI & Innovation education organization in India).

Your Personality: Friendly, enthusiastic, highly knowledgeable, polite, and concise.

Core Knowledge Base:
1. School STEAM Innovation Lab Setup:
   - Complete turnkey 8-phase installation for schools within 45 days.
   - Includes safety protocols, full documentation, dedicated certified trainers, regular student training, quarterly hardware audits, annual syllabus upgrades, and official STEAM certification.
   - Partnered with 2,500+ schools and colleges across Maharashtra (including Mumbai, Thane, Kolhapur, Sangli, Pune, etc.).

2. Robostorms Activity & Training Center (Kolhapur):
   - Hands-on interactive batches with dedicated hardware kits and smart screens.
   - Junior Level: Std 1 to Std 4
   - Senior Level: Std 5 to Std 9
   - Batch Timings:
     * Weekday Batches: Mon & Tue (4:00 PM - 6:00 PM)
     * Weekend Batches: Sat (4:00 PM - 6:00 PM) and Sun (10:00 AM - 2:00 PM)

3. Courses Offered:
   - Robotics & AI (Autonomous robots, sensor interfacing, robotic kits).
   - Basic Electronics & IoT (Circuitry, microcontrollers, sensor nodes).
   - Coding & Algorithmic Logic (Python, block programming, computational thinking).
   - Web App Development (Modern full-stack web applications).

4. Official Physical Address & Location:
   - When asked about address, office location, center, where we are located, or visiting us, ALWAYS provide the exact address with the Google Maps link attached directly to the address name as Markdown:
   [Near Aditya Corner, Aurum Lohia Realty, 3rd Floor, Tarabai Park, Kolhapur](${ROBOSTORMS_MAP_URL})
   - Visitors and school trustees are warmly welcome to visit for live lab demonstrations!

5. Contact Information:
   - Sales & School Lab Inquiries: sales@robostorms.com (+91 7058202122)
   - Support & Operations: admin@robostorms.com (+91 7796969130)
   - Direct Consultation: Users can book a demo call anytime.

Guidelines:
- Keep answers clear, well-structured, and concise (1 to 3 short paragraphs).
- Use bullet points when listing features or courses.
- ALWAYS attach the Google Maps link whenever giving the address.`;

export default function ChatBot({ onOpenConsultation }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hello! I'm **RoboBot**, your real-time STEAM & Robotics AI assistant. 👋\n\nHow can I help you today? Ask me anything about our school STEAM lab setup, activity center batches, courses, or center location!"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Real-time AI chat query via Pollinations.ai free unlimited API
  const handleSendMessage = async (textToSend?: string) => {
    const rawMsg = textToSend || inputValue;
    const msg = rawMsg.trim();
    if (!msg || isLoading) return;

    if (!textToSend) {
      setInputValue('');
    }

    // Append user message
    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: msg }
    ];
    setMessages(nextMessages);
    setIsLoading(true);

    try {
      // Build conversation history for API
      const apiMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...nextMessages.slice(-8).map(m => ({
          role: m.role,
          content: m.content
        }))
      ];

      // Call free, unlimited real-time AI API with timeout fallback
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 18000);

      const response = await fetch('https://text.pollinations.ai/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/plain, application/json'
        },
        body: JSON.stringify({
          messages: apiMessages,
          model: 'openai',
          temperature: 0.7
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      let replyText = await response.text();

      // Ensure address has map link attached if mentioned without markdown link
      if (
        (replyText.toLowerCase().includes('tarabai park') ||
          replyText.toLowerCase().includes('aditya corner')) &&
        !replyText.includes(ROBOSTORMS_MAP_URL)
      ) {
        replyText = replyText.replace(
          /Near Aditya Corner, Aurum Lohia Realty, 3rd Floor, Tarabai Park, Kolhapur/gi,
          `[Near Aditya Corner, Aurum Lohia Realty, 3rd Floor, Tarabai Park, Kolhapur](${ROBOSTORMS_MAP_URL})`
        );
      }

      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: replyText.trim() }
      ]);
    } catch (err) {
      console.warn('Real-time AI fetch fallback triggered:', err);

      // Intelligent local contextual fallback so the robot never fails
      const lower = msg.toLowerCase();
      let fallback = '';

      if (
        lower.includes('address') ||
        lower.includes('location') ||
        lower.includes('where') ||
        lower.includes('kolhapur') ||
        lower.includes('office') ||
        lower.includes('center') ||
        lower.includes('visit')
      ) {
        fallback = `Our official Robostorms headquarters and training center is located at:\n\n📍 **[Near Aditya Corner, Aurum Lohia Realty, 3rd Floor, Tarabai Park, Kolhapur](${ROBOSTORMS_MAP_URL})**\n\nYou are welcome to visit us for live STEAM lab and robotics demonstrations!`;
      } else if (
        lower.includes('school') ||
        lower.includes('lab') ||
        lower.includes('setup') ||
        lower.includes('turnkey')
      ) {
        fallback = `We provide complete **Turnkey School STEAM Innovation Lab Setup**:\n\n* **Guaranteed 45-Day Installation**: Rapid full-scale physical setup and equipment deployment.\n* **Dedicated Certified Trainers**: On-site instructors conduct regular curriculum classes for students & teachers.\n* **Quarterly Audits & Lifelong Upkeep**: Continuous hardware servicing, safety protocols, and syllabus upgrades.\n* **STEAM Certification**: Official accreditation for your school upon completing audits and competitions.\n\nWould you like to book a free school consultation demo?`;
      } else if (
        lower.includes('batch') ||
        lower.includes('time') ||
        lower.includes('timing') ||
        lower.includes('activity center') ||
        lower.includes('level')
      ) {
        fallback = `Here are our **Activity Center Batch Levels & Timings**:\n\n* **Junior Level**: Std 1 to Std 4\n* **Senior Level**: Std 5 to Std 9\n\n**Batch Schedules**:\n* **Weekday Batches**: Mon & Tue (4:00 PM - 6:00 PM)\n* **Weekend Batches**: Sat (4:00 PM - 6:00 PM) & Sun (10:00 AM - 2:00 PM)\n\nLocated at our center in **[Tarabai Park, Kolhapur](${ROBOSTORMS_MAP_URL})**.`;
      } else if (
        lower.includes('course') ||
        lower.includes('program') ||
        lower.includes('learn') ||
        lower.includes('teach')
      ) {
        fallback = `We offer hands-on, practical programs in future technologies:\n\n* **Robotics & AI**: Build smart robots with sensors, motors, and microcontrollers.\n* **Basic Electronics & IoT**: Understand circuits, breadboards, and wireless sensor devices.\n* **Coding & Logic**: Master computational thinking, Python, and block-based programming.\n* **Web App Development**: Real-world software creation and cloud projects.\n\nWhich age group or grade are you looking for?`;
      } else if (
        lower.includes('contact') ||
        lower.includes('call') ||
        lower.includes('phone') ||
        lower.includes('email') ||
        lower.includes('book')
      ) {
        fallback = `You can connect with our team directly:\n\n* 📞 **Sales & Demos**: +91 7058202122 (sales@robostorms.com)\n* 📞 **Support & Operations**: +91 7796969130 (admin@robostorms.com)\n* 📍 **Address**: [Near Aditya Corner, Aurum Lohia Realty, 3rd Floor, Tarabai Park, Kolhapur](${ROBOSTORMS_MAP_URL})\n\nClick the button below to schedule a direct demo call!`;
      } else {
        fallback = `Robostorms is dedicated to empowering students and schools through real-world **STEAM Innovation Labs** and **Robotics Training**.\n\nYou can ask me about our:\n* **School STEAM Lab Setup**\n* **Activity Center Batches & Timings**\n* **Robotics, AI & Coding Courses**\n* **Physical Center Address & Location** in Kolhapur.\n\nHow can I help you today?`;
      }

      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: fallback }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        role: 'assistant',
        content:
          "Chat reset! I'm **RoboBot**, ready to assist you with Robostorms STEAM labs, courses, batches, and locations. Ask me anything!"
      }
    ]);
  };

  // Markdown parser that handles bold, bullet points, and clickable markdown links [text](url)
  const renderFormattedText = (rawText: string, isUser: boolean) => {
    // Regex for markdown links: [link text](url)
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

    const parseSegments = (str: string) => {
      const parts: React.ReactNode[] = [];
      let lastIdx = 0;
      let match: RegExpExecArray | null;

      while ((match = linkRegex.exec(str)) !== null) {
        if (match.index > lastIdx) {
          parts.push(parseBold(str.substring(lastIdx, match.index)));
        }
        const linkText = match[1];
        const linkUrl = match[2];
        const isMap = linkUrl.includes('google.com/maps') || linkUrl.includes('maps.google');

        parts.push(
          <a
            key={match.index}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 font-bold underline underline-offset-2 transition-colors ${
              isUser
                ? 'text-white hover:text-amber-200'
                : 'text-[#FF5A36] hover:text-[#E04E2D]'
            }`}
          >
            {isMap && <MapPin className="w-3.5 h-3.5 shrink-0 inline" />}
            <span>{linkText}</span>
            <ExternalLink className="w-3 h-3 shrink-0 inline opacity-70" />
          </a>
        );

        lastIdx = match.index + match[0].length;
      }

      if (lastIdx < str.length) {
        parts.push(parseBold(str.substring(lastIdx)));
      }

      return parts;
    };

    const parseBold = (subStr: string) => {
      const boldSegments = subStr.split(/\*\*|__/);
      return boldSegments.map((segment, index) => {
        if (index % 2 === 1) {
          return (
            <strong
              key={index}
              className={`font-bold ${isUser ? 'text-white' : 'text-neutral-950'}`}
            >
              {segment}
            </strong>
          );
        }
        return segment;
      });
    };

    const lines = rawText.split('\n');
    return lines.map((line, i) => {
      const trimmed = line.trim();
      const isBullet =
        trimmed.startsWith('* ') ||
        trimmed.startsWith('- ') ||
        trimmed.startsWith('• ');

      let contentStr = trimmed;
      if (isBullet) {
        contentStr = trimmed.substring(2).trim();
      }

      if (isBullet) {
        return (
          <li
            key={i}
            className={`ml-4 list-disc text-xs sm:text-sm leading-relaxed mb-1 ${
              isUser ? 'text-white/95' : 'text-neutral-800'
            }`}
          >
            {parseSegments(contentStr)}
          </li>
        );
      }

      if (!contentStr) return <div key={i} className="h-1.5" />;

      return (
        <p
          key={i}
          className={`text-xs sm:text-sm leading-relaxed mb-1.5 last:mb-0 text-left ${
            isUser ? 'text-white' : 'text-neutral-800'
          }`}
        >
          {parseSegments(contentStr)}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Sparkle Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 font-sans">
        <button
          id="chatbot-trigger"
          onClick={() => setIsOpen(!isOpen)}
          title={isOpen ? 'Close RoboBot' : 'Chat with RoboBot in real-time'}
          aria-label={isOpen ? 'Close RoboBot chat' : 'Open RoboBot real-time chat'}
          className={`relative group rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl z-50 cursor-pointer ${
            isOpen
              ? 'w-12 h-12 bg-neutral-900 hover:bg-[#FF5A36] text-white border border-white/20'
              : 'w-16 h-16 sm:w-[68px] sm:h-[68px] bg-gradient-to-b from-neutral-900 to-neutral-950 border-2 border-white/20 hover:border-[#FF5A36] hover:shadow-[0_0_30px_rgba(255,90,54,0.45)]'
          }`}
        >
          {/* Subtle Ambient Pulse Ring when closed */}
          {!isOpen && (
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#FF5A36] via-amber-500 to-[#FF5A36] opacity-35 blur-sm group-hover:opacity-80 group-hover:animate-pulse transition-opacity duration-300 pointer-events-none" />
          )}

          {isOpen ? (
            <X className="w-6 h-6 animate-fade-in" />
          ) : (
            <div className="relative flex items-center justify-center w-full h-full p-1">
              <CuteWavingRobot size={52} isWaving={true} showShadow={false} />

              {/* Live status beacon dot in upper corner */}
              <span className="absolute top-1 right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5A36] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF5A36] border-2 border-neutral-950" />
              </span>
            </div>
          )}
        </button>
      </div>

      {/* Actual Conversational Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[94vw] sm:w-[410px] h-[580px] max-h-[85vh] bg-white border border-neutral-300/80 shadow-2xl z-50 flex flex-col overflow-hidden rounded-2xl font-sans"
          >
            {/* Top Corporate Branding Header */}
            <div className="bg-neutral-950 text-white p-4 shrink-0 flex items-center justify-between border-b border-neutral-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center p-0.5 shadow-inner">
                  <CuteWavingRobot size={30} isWaving={false} showShadow={false} />
                </div>
                <div>
                  <div className="font-ubuntu font-bold text-sm uppercase tracking-wider text-white">
                    RoboBot AI
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-zinc-400 font-semibold tracking-wider font-mono">
                      REAL-TIME ACTIVE
                    </span>
                  </div>
                </div>
              </div>

              {/* Header Action Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  className="p-2 text-zinc-400 hover:text-white hover:bg-neutral-900 rounded-lg transition-colors cursor-pointer"
                  title="Reset conversation"
                  aria-label="Reset conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white hover:bg-neutral-900 rounded-lg transition-colors cursor-pointer"
                  title="Close chat"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Middle Conversations Panel */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50/70">
              {messages.map((m, idx) => {
                const isUser = m.role === 'user';
                const hasAddressMention =
                  !isUser &&
                  (m.content.toLowerCase().includes('aditya corner') ||
                    m.content.toLowerCase().includes('tarabai park') ||
                    m.content.includes(ROBOSTORMS_MAP_URL));

                const hasConsultationMention =
                  !isUser &&
                  (m.content.toLowerCase().includes('consultation') ||
                    m.content.toLowerCase().includes('schedule') ||
                    m.content.toLowerCase().includes('demo call') ||
                    m.content.toLowerCase().includes('book a call'));

                return (
                  <div
                    key={idx}
                    className={`flex flex-col ${
                      isUser ? 'items-end' : 'items-start'
                    } space-y-1.5`}
                  >
                    <div className="flex items-center gap-1.5 px-1">
                      <span className="text-[10px] tracking-wider uppercase font-bold text-neutral-400 font-mono">
                        {isUser ? 'You' : 'RoboBot'}
                      </span>
                    </div>

                    <div
                      className={`max-w-[88%] px-4 py-3 text-left text-sm whitespace-pre-wrap shadow-xs transition-all ${
                        isUser
                          ? 'bg-[#FF5A36] text-white rounded-2xl rounded-tr-xs border border-[#FF5A36]'
                          : 'bg-white text-neutral-800 border border-neutral-200/90 rounded-2xl rounded-tl-xs'
                      }`}
                    >
                      {renderFormattedText(m.content, isUser)}

                      {/* Map Link Quick Action Card when address is mentioned */}
                      {hasAddressMention && (
                        <div className="mt-3 pt-2.5 border-t border-neutral-150">
                          <a
                            href={ROBOSTORMS_MAP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-2 bg-[#FFEBE5] hover:bg-[#FF5A36] text-[#FF5A36] hover:text-white border border-[#FF5A36]/30 hover:border-[#FF5A36] rounded-xl text-xs font-bold transition-all shadow-xs group"
                          >
                            <MapPin className="w-3.5 h-3.5 text-[#FF5A36] group-hover:text-white transition-colors" />
                            <span>Open Location on Google Maps</span>
                            <ExternalLink className="w-3 h-3 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                          </a>
                        </div>
                      )}

                      {/* Quick Trigger Call Booking Button inside bot messages that mention scheduling */}
                      {hasConsultationMention && (
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            onOpenConsultation();
                          }}
                          className="mt-3 w-full bg-[#FF5A36] hover:bg-neutral-900 text-white font-bold uppercase text-[10px] tracking-widest py-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 border border-[#FF5A36] shadow-sm"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Book Free Consultation Call</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Loader skeleton */}
              {isLoading && (
                <div className="flex flex-col items-start space-y-1.5">
                  <span className="text-[10px] tracking-wider uppercase font-bold text-neutral-400 font-mono">
                    RoboBot is thinking...
                  </span>
                  <div className="bg-white border border-neutral-200 px-4 py-3 rounded-2xl rounded-tl-xs flex items-center gap-1.5 shadow-xs">
                    <span className="w-2 h-2 bg-[#FF5A36] rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 bg-[#FF5A36] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 bg-[#FF5A36] rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Bottom Form input panel (Suggested questions completely removed) */}
            <div className="p-3 bg-neutral-50 border-t border-neutral-200 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                {/* Input Textbox */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full bg-white text-neutral-800 pl-4 pr-12 py-3 border border-neutral-300 focus:border-[#FF5A36] focus:outline-none transition-colors text-xs font-medium placeholder-neutral-400 rounded-xl shadow-xs"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                    <span className="text-[9px] font-mono font-bold text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded">
                      ENTER
                    </span>
                  </div>
                </div>

                {/* Send Trigger */}
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  aria-label="Send message"
                  className="p-3 bg-neutral-950 hover:bg-[#FF5A36] disabled:bg-neutral-200 disabled:cursor-not-allowed text-white transition-all duration-150 rounded-xl shrink-0 cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
