import express from "express";
import path from "path";
import compression from "compression";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import {
  initDatabase,
  getDatabaseStatus,
  addSchoolRegistration,
  addParentRegistration,
  addConsultationBooking,
  addJobApplication,
  addSubscriber,
  getAllData,
  getDashboardStats,
} from "./server/db";
import { generateExcelReport } from "./server/excelExport";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize Real-Time Database Connection (Google Cloud Firestore)
  initDatabase();

  // High-Concurrency Performance Middleware
  app.use(compression());
  app.use(express.json({ limit: "100kb" }));

  // Static Asset Edge Caching (Browser & CDN max-age)
  app.use((req, res, next) => {
    if (
      req.url.startsWith("/assets/") ||
      req.url.match(/\.(js|css|webp|png|jpg|jpeg|gif|svg|woff2|woff|ttf|ico)$/)
    ) {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    }
    next();
  });

  // Initialize Gemini API
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey || "MOCK_KEY",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // Chatbot routing endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required." });
      }

      if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey === "MOCK_KEY") {
        const msgLower = message.toLowerCase();
        let fallbackText = "Hello! I'll act as your intelligent offline guide! Our primary physical center is situated at **Near Aditya Corner, Aurum Lohia Realty, 3rd Floor, Tarabai Park, Kolhapur**.\n\nI can tell you all about our STREAM curriculum (Robotics, Electronics, and Smart Labs). Would you like to schedule a direct call with us?";
        
        if (msgLower.includes("address") || msgLower.includes("location") || msgLower.includes("where") || msgLower.includes("kolhapur") || msgLower.includes("office") || msgLower.includes("branch")) {
          fallbackText = "Our official physical STREAM lab and corporate headquarters is located at:\n\n**Near Aditya Corner, Aurum Lohia Realty, 3rd Floor, Tarabai Park, Kolhapur**.\n\nYou are welcome to visit our activity center and electronics material hub for a live interactive demonstration!";
        } else if (msgLower.includes("course") || msgLower.includes("stream") || msgLower.includes("learn") || msgLower.includes("study") || msgLower.includes("recommend") || msgLower.includes("robot") || msgLower.includes("code")) {
          fallbackText = "We offer elite, hands-on physical and digital courses across multiple STREAM disciplines:\n\n* **Robotics & Coding**: Build autonomous hardware and master foundational programming.\n* **Stream Lab Setup**: Premium workspace and curriculum design for educational schools.\n* **Basic Electronics & IoT**: Understand sensor networks, microcontrollers, and circuit assembly.\n* **Web App Development**: High-performance software engineering cohorts accompanied by direct cloud hosting.\n\nWhich program would you like to explore first?";
        } else if (msgLower.includes("book") || msgLower.includes("call") || msgLower.includes("consult") || msgLower.includes("schedule") || msgLower.includes("phone") || msgLower.includes("contact")) {
          fallbackText = "You can schedule a live consultation instantly! Tap the **'Book Free Calibration Call Now'** button right inside this chat box to launch our calendar.\n\nAlternatively, you can contact our desks directly:\n* **Sales Desk**: sales@robostorms.com (+91 7058202122)\n* **Support Desk**: admin@robostorms.com (+91 7796969130)";
        }
        return res.json({ text: fallbackText });
      }

      // Dynamic informational text loaded automatically
      const systemPrompt = `You are "RoboBot", the voice-supported virtual STREAM advisor for Robostorms.
Your primary tasks are:
1. Recommend top STREAM courses based on student preferences (Robotics & Coding, Basic Electronics, IoT, AR/VR Lab, Web App Development).
2. Help users select subjects and explain what is covered.
3. Guide users to schedule a consultation call. Emphasize that they can click the "Book Call" button right inside this chat box to launch the booking scheduler!
4. State our official physical training center location whenever asked about location, address, office, Kolhapur, where we are, place, or branch.

Robostorms Physical Address is EXACTLY:
"Near Aditya Corner, Aurum Lohia Realty, 3rd Floor, Tarabai Park, Kolhapur"
You MUST repeat this address precisely whenever they ask for it.

Keep your replies extremely clear, conversational, and relatively brief (1-3 paragraphs max) so they are comfortable when read out loud by our built-in text-to-speech engine.`;

      let textResult = "";
      try {
        const chat = ai.chats.create({
          model: "gemini-3.5-flash",
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
          },
          history: history || [],
        });

        const result = await chat.sendMessage({ message });
        textResult = result.text;
      } catch (primaryErr: any) {
        console.warn("Primary model gemini-3.5-flash is temporarily unavailable. Failover to gemini-3.1-flash-lite...", primaryErr.message || primaryErr);
        
        const backupChat = ai.chats.create({
          model: "gemini-3.1-flash-lite",
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
          },
          history: history || [],
        });
        
        const backupResult = await backupChat.sendMessage({ message });
        textResult = backupResult.text;
      }

      res.json({ text: textResult });
    } catch (err: any) {
      console.warn("Gemini API errored, activating smart local assistant fallback:", err);
      
      const msgLower = req.body.message ? req.body.message.toLowerCase() : "";
      let fallbackText = "Hello! I am currently calibrating my cloud connection, but I'm fully here to assist you!\n\n* Our physical center is located **Near Aditya Corner, Aurum Lohia Realty, 3rd Floor, Tarabai Park, Kolhapur**.\n* I can introduce our **Robotics & Coding**, **IoT Electronics**, and **Stream Lab Setup** pathways.\n* You can click the **'Book Call'** button below to set up a direct consultation slot!";
      
      if (msgLower.includes("address") || msgLower.includes("location") || msgLower.includes("where") || msgLower.includes("kolhapur") || msgLower.includes("office") || msgLower.includes("branch")) {
        fallbackText = "Our official physical STREAM lab and corporate headquarters is situated at:\n\n**Near Aditya Corner, Aurum Lohia Realty, 3rd Floor, Tarabai Park, Kolhapur**.\n\nYou are welcome to drop by our center or schedule a live training slot!";
      } else if (msgLower.includes("course") || msgLower.includes("stream") || msgLower.includes("learn") || msgLower.includes("study") || msgLower.includes("recommend") || msgLower.includes("robot") || msgLower.includes("code")) {
        fallbackText = "We offer elite hands-on courses designed to inspire young creators:\n\n* **Robotics & Coding**: Interactive block and text coding driving real physical microcontrollers.\n* **Stream Lab Setup**: End-to-end laboratory setups for innovative academic institutions.\n* **Basic Electronics & IoT**: Learning smart home sensors, electrical components, and circuits.\n* **Web App Development**: Real-world cloud application design cohorts.\n\nWhich track or subject sounds most exciting to you?";
      } else if (msgLower.includes("book") || msgLower.includes("call") || msgLower.includes("consult") || msgLower.includes("schedule") || msgLower.includes("phone") || msgLower.includes("contact")) {
        fallbackText = "I would be delighted to set up a session! Please click the **'Book Free Calibration Call Now'** button below to launch our workspace scheduler.\n\nOr feel free to contact us directly:\n* **Sales**: sales@robostorms.com (+91 7058202122)\n* **Support**: admin@robostorms.com (+91 7796969130)";
      }
      
      res.json({ text: fallbackText });
    }
  });

  // -------------------------------------------------------------
  // DATABASE & FIRESTORE API ENDPOINTS
  // -------------------------------------------------------------

  // Initialize Database system (Google Cloud Firestore or Local Fallback)
  initDatabase();

  // 1. Health & Database Status
  app.get("/api/db/status", (req, res) => {
    try {
      const status = getDatabaseStatus();
      res.json(status);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 2. School Registration Endpoint
  app.post("/api/schools/register", async (req, res) => {
    try {
      const { schoolName, contactPerson, phone, email, city, state, programInterest, studentCount, notes } = req.body;
      if (!schoolName || !phone) {
        return res.status(400).json({ error: "School name and phone number are required." });
      }

      const result = await addSchoolRegistration({
        schoolName,
        contactPerson: contactPerson || schoolName,
        phone,
        email: email || "N/A",
        city: city || "Maharashtra",
        state: state || "Maharashtra",
        programInterest: programInterest || "STREAM Robotics & Coding Lab",
        studentCount: studentCount || "N/A",
        notes: notes || "",
      });

      res.status(201).json({ success: true, message: "School registered successfully!", data: result });
    } catch (err: any) {
      console.error("School registration error:", err);
      res.status(500).json({ error: "Failed to register school. " + err.message });
    }
  });

  // 3. Parent / Student Registration Endpoint
  app.post("/api/parents/register", async (req, res) => {
    try {
      const { parentName, studentName, studentGradeOrAge, phone, email, courseInterest, preferredBatch, notes } = req.body;
      if (!parentName || !phone) {
        return res.status(400).json({ error: "Parent name and phone number are required." });
      }

      const result = await addParentRegistration({
        parentName,
        studentName: studentName || parentName,
        studentGradeOrAge: studentGradeOrAge || "Student",
        phone,
        email: email || "N/A",
        courseInterest: courseInterest || "Robotics & Coding",
        preferredBatch: preferredBatch || "Weekend Batch",
        notes: notes || "",
      });

      res.status(201).json({ success: true, message: "Parent/Student registered successfully!", data: result });
    } catch (err: any) {
      console.error("Parent registration error:", err);
      res.status(500).json({ error: "Failed to register parent. " + err.message });
    }
  });

  // 4. Consultation Booking Endpoint
  app.post("/api/consultations/book", async (req, res) => {
    try {
      const { name, clientType, schoolName, contactPerson, city, phone, email, stream, preferredDate, preferredTime, notes } = req.body;
      const primaryName = name || schoolName;
      if (!primaryName || !phone) {
        return res.status(400).json({ error: "Name and phone number are required." });
      }

      const result = await addConsultationBooking({
        name: primaryName,
        clientType: clientType || "parent",
        schoolName: schoolName || (clientType === "school" ? primaryName : undefined),
        contactPerson: contactPerson || primaryName,
        city: city || "Maharashtra",
        phone,
        email: email || "N/A",
        stream: stream || (clientType === "school" ? "Turnkey STREAM Lab Setup" : "Robotics & Coding"),
        preferredDate: preferredDate || new Date().toISOString().slice(0, 10),
        preferredTime: preferredTime || "11:30 AM - 12:30 PM",
        notes: notes || "",
      });

      res.status(201).json({ success: true, message: "Consultation booked successfully!", data: result });
    } catch (err: any) {
      console.error("Consultation booking error:", err);
      res.status(500).json({ error: "Failed to book consultation. " + err.message });
    }
  });

  // 5. Job Application Endpoint
  app.post("/api/careers/apply", async (req, res) => {
    try {
      const { jobId, jobTitle, fullName, phone, email, preferredLocation, qualification, experience, portfolioLink, message } = req.body;
      if (!fullName || !phone) {
        return res.status(400).json({ error: "Full name and phone number are required." });
      }

      const result = await addJobApplication({
        jobId: jobId || "general",
        jobTitle: jobTitle || "STREAM Trainer / Executive",
        fullName,
        phone,
        email: email || "N/A",
        preferredLocation: preferredLocation || "Kolhapur",
        qualification: qualification || "Engineering / Graduate",
        experience: experience || "Fresher",
        portfolioLink: portfolioLink || "",
        message: message || "",
      });

      res.status(201).json({ success: true, message: "Application submitted successfully!", data: result });
    } catch (err: any) {
      console.error("Career application error:", err);
      res.status(500).json({ error: "Failed to submit application. " + err.message });
    }
  });

  // 6. Newsletter / Connect Subscriber Endpoint
  app.post("/api/subscribers/add", async (req, res) => {
    try {
      const { email, source } = req.body;
      if (!email || !email.includes("@")) {
        return res.status(400).json({ error: "Valid email is required." });
      }

      const result = await addSubscriber(email, source || "website");
      res.status(201).json({ success: true, message: "Subscribed successfully!", data: result });
    } catch (err: any) {
      console.error("Subscriber error:", err);
      res.status(500).json({ error: "Failed to subscribe. " + err.message });
    }
  });

  // 7. Admin Dashboard Stats
  app.get("/api/admin/stats", async (req, res) => {
    try {
      const stats = await getDashboardStats();
      res.json(stats);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 8. Admin Get All Data
  app.get("/api/admin/data", async (req, res) => {
    try {
      const allData = await getAllData();
      res.json(allData);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 9. Excel Export Endpoint (Direct Download into user / company computer)
  app.get("/api/admin/export/excel", async (req, res) => {
    try {
      const type = (req.query.type as any) || "all";
      const buffer = await generateExcelReport(type);
      const timestamp = new Date().toISOString().slice(0, 10);
      const filename = `robostorms_${type}_records_${timestamp}.xlsx`;

      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Content-Length", buffer.length);
      res.send(buffer);
    } catch (err: any) {
      console.error("Excel generation error:", err);
      res.status(500).json({ error: "Failed to generate Excel file: " + err.message });
    }
  });

  // Hot Module Replacement/Vite setup
  const isProduction = process.env.NODE_ENV === "production" || __filename.includes("dist");
  if (!isProduction) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        watch: {
          ignored: ["**/data/**", "**/*.json", "**/serviceAccountKey.json"],
        },
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });

  // Optimize socket pooling & keep-alive for 10k+ concurrent requests
  server.keepAliveTimeout = 65000;
  server.headersTimeout = 66000;
}

// Global Crash Prevention
process.on("uncaughtException", (err) => {
  console.error("[Node.js Process Safe Guard] Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason) => {
  console.error("[Node.js Process Safe Guard] Unhandled Rejection:", reason);
});

startServer();
