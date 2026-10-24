import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore, Firestore, FieldValue } from "firebase-admin/firestore";
import fs from "fs";
import path from "path";

// Types for data models
export interface SchoolRegistration {
  id?: string;
  schoolName: string;
  contactPerson: string;
  phone: string;
  email: string;
  city: string;
  state?: string;
  programInterest: string; // e.g. "STREAM Innovation Lab", "ATL Tinkering Lab", "Robotics & Coding"
  studentCount?: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
  status: "new" | "contacted" | "calibrated" | "confirmed";
  createdAt: string;
  serverTimestamp?: any;
}

export interface ParentRegistration {
  id?: string;
  parentName: string;
  studentName?: string;
  studentGradeOrAge?: string;
  phone: string;
  email: string;
  courseInterest: string; // e.g. "Robotics & Coding", "Basic Electronics & IoT", "Web App Development"
  preferredBatch?: string;
  notes?: string;
  status: "new" | "contacted" | "enrolled";
  createdAt: string;
  serverTimestamp?: any;
}

export interface ConsultationBooking {
  id?: string;
  name: string; // School or Parent/Client name
  clientType: "school" | "parent" | "individual";
  schoolName?: string;
  contactPerson?: string;
  city?: string;
  phone: string;
  email: string;
  stream: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: "pending" | "confirmed" | "completed";
  createdAt: string;
  serverTimestamp?: any;
}

export interface JobApplication {
  id?: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  phone: string;
  email: string;
  preferredLocation: string;
  qualification: string;
  experience?: string;
  portfolioLink?: string;
  message?: string;
  status: "applied" | "reviewing" | "shortlisted";
  createdAt: string;
  serverTimestamp?: any;
}

export interface Subscriber {
  id?: string;
  email: string;
  source: string;
  createdAt: string;
  serverTimestamp?: any;
}

export interface RobostormsDataStore {
  schools: SchoolRegistration[];
  parents: ParentRegistration[];
  consultations: ConsultationBooking[];
  careers: JobApplication[];
  subscribers: Subscriber[];
}

// Local JSON file path used as resilient persistent cache / zero-config store
const DATA_DIR = path.join(process.cwd(), "data");
const LOCAL_DB_PATH = path.join(DATA_DIR, "robostorms_db.json");

// Ensure clean data store without any demo data
function ensureCleanDataStore(): RobostormsDataStore {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const emptyStore: RobostormsDataStore = {
    schools: [],
    parents: [],
    consultations: [],
    careers: [],
    subscribers: [],
  };

  if (!fs.existsSync(LOCAL_DB_PATH)) {
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(emptyStore, null, 2), "utf-8");
    return emptyStore;
  }

  try {
    const raw = fs.readFileSync(LOCAL_DB_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return {
      schools: Array.isArray(parsed.schools) ? parsed.schools : [],
      parents: Array.isArray(parsed.parents) ? parsed.parents : [],
      consultations: Array.isArray(parsed.consultations) ? parsed.consultations : [],
      careers: Array.isArray(parsed.careers) ? parsed.careers : [],
      subscribers: Array.isArray(parsed.subscribers) ? parsed.subscribers : [],
    };
  } catch (e) {
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(emptyStore, null, 2), "utf-8");
    return emptyStore;
  }
}

function writeLocalDb(data: RobostormsDataStore) {
  try {
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write to local cache file:", err);
  }
}

// Check and Initialize Google Cloud Firestore
let firestoreDb: Firestore | null = null;
let isFirestoreConnected = false;
let connectionNote = "";

export function initDatabase() {
  try {
    const defaultLocalKey = path.join(process.cwd(), "serviceAccountKey.json");
    const rawPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || process.env.GOOGLE_APPLICATION_CREDENTIALS;
    const resolvedCustomPath = rawPath ? path.resolve(process.cwd(), rawPath) : undefined;
    const serviceAccountPath = (resolvedCustomPath && fs.existsSync(resolvedCustomPath))
      ? resolvedCustomPath
      : (fs.existsSync(defaultLocalKey) ? defaultLocalKey : undefined);

    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
      : undefined;

    const apps = getApps();

    if (!apps.length) {
      if (serviceAccountPath && fs.existsSync(serviceAccountPath)) {
        const fileContent = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));
        const targetProjectId = fileContent.project_id || "robostorms-official";
        initializeApp({
          credential: cert(fileContent),
          projectId: targetProjectId,
        });
        firestoreDb = getFirestore();
        isFirestoreConnected = true;
        connectionNote = `Connected to Google Cloud Firestore (Project: ${targetProjectId})`;
      } else if (serviceAccountJson) {
        const parsedKey = JSON.parse(serviceAccountJson);
        const targetProjectId = parsedKey.project_id || "robostorms-official";
        initializeApp({
          credential: cert(parsedKey),
          projectId: targetProjectId,
        });
        firestoreDb = getFirestore();
        isFirestoreConnected = true;
        connectionNote = `Connected to Google Cloud Firestore (Project: ${targetProjectId})`;
      } else if (projectId && clientEmail && privateKey) {
        initializeApp({
          credential: cert({
            projectId,
            clientEmail,
            privateKey,
          }),
          projectId,
        });
        firestoreDb = getFirestore();
        isFirestoreConnected = true;
        connectionNote = `Connected to Google Cloud Firestore (Project: ${projectId})`;
      } else {
        isFirestoreConnected = false;
        connectionNote = "Awaiting Firebase Service Account credentials in .env (Saving real incoming user submissions to local store)";
      }
    } else {
      firestoreDb = getFirestore();
      isFirestoreConnected = true;
      connectionNote = "Connected to Google Cloud Firestore";
    }

    if (firestoreDb) {
      try {
        firestoreDb.settings({ ignoreUndefinedProperties: true });
      } catch (e) {
        // Settings already applied
      }
    }
  } catch (error: any) {
    console.warn("Firebase Admin initialization note:", error.message || error);
    isFirestoreConnected = false;
    connectionNote = `Fallback active: ${error.message}`;
  }

  ensureCleanDataStore();
  console.log(`[Database System] ${connectionNote}`);
  return { isFirestoreConnected, connectionNote };
}

// Utility to strip undefined properties before saving to Firestore
function cleanFirestoreData<T extends Record<string, any>>(obj: T): Record<string, any> {
  const cleaned: Record<string, any> = {};
  for (const [key, val] of Object.entries(obj)) {
    if (val !== undefined && val !== null) {
      cleaned[key] = val;
    }
  }
  return cleaned;
}

export function getDatabaseStatus() {
  return {
    isFirestoreConnected,
    mode: isFirestoreConnected ? "Google Cloud Firestore" : "Local Persistent Storage",
    note: connectionNote,
  };
}

// -------------------------------------------------------------
// Real-time Data Operations (Stores precisely to Firestore)
// -------------------------------------------------------------

// 1. School Registration
export async function addSchoolRegistration(data: Omit<SchoolRegistration, "id" | "createdAt" | "status"> & { notes?: string }) {
  const timestamp = new Date().toISOString();
  const newEntry: SchoolRegistration = {
    ...data,
    id: `sch-${Date.now().toString(36)}-${Math.floor(1000 + Math.random() * 9000)}`,
    status: "new",
    createdAt: timestamp,
  };

  if (isFirestoreConnected && firestoreDb) {
    try {
      const payload = cleanFirestoreData({
        ...newEntry,
        serverTimestamp: FieldValue.serverTimestamp(),
      });
      const docRef = await firestoreDb.collection("schools_registrations").add(payload);
      await firestoreDb.collection("schools").doc(docRef.id).set(payload);
      newEntry.id = docRef.id;
      console.log(`[Firestore] Successfully saved school registration ${docRef.id}`);
    } catch (err) {
      console.error("Firestore school registration error:", err);
    }
  }

  const store = ensureCleanDataStore();
  store.schools.unshift(newEntry);
  writeLocalDb(store);

  return newEntry;
}

// 2. Parent / Student Registration
export async function addParentRegistration(data: Omit<ParentRegistration, "id" | "createdAt" | "status">) {
  const timestamp = new Date().toISOString();
  const newEntry: ParentRegistration = {
    ...data,
    id: `par-${Date.now().toString(36)}-${Math.floor(1000 + Math.random() * 9000)}`,
    status: "new",
    createdAt: timestamp,
  };

  if (isFirestoreConnected && firestoreDb) {
    try {
      const payload = cleanFirestoreData({
        ...newEntry,
        serverTimestamp: FieldValue.serverTimestamp(),
      });
      const docRef = await firestoreDb.collection("parents_registrations").add(payload);
      await firestoreDb.collection("parents").doc(docRef.id).set(payload);
      newEntry.id = docRef.id;
      console.log(`[Firestore] Successfully saved parent registration ${docRef.id}`);
    } catch (err) {
      console.error("Firestore parent registration error:", err);
    }
  }

  const store = ensureCleanDataStore();
  store.parents.unshift(newEntry);
  writeLocalDb(store);

  return newEntry;
}

// 3. Consultation Booking
export async function addConsultationBooking(data: Omit<ConsultationBooking, "id" | "createdAt" | "status">) {
  const timestamp = new Date().toISOString();
  const newEntry: ConsultationBooking = {
    ...data,
    id: `con-${Date.now().toString(36)}-${Math.floor(1000 + Math.random() * 9000)}`,
    status: "pending",
    createdAt: timestamp,
  };

  if (isFirestoreConnected && firestoreDb) {
    try {
      const payload = cleanFirestoreData({
        ...newEntry,
        serverTimestamp: FieldValue.serverTimestamp(),
      });
      const docRef = await firestoreDb.collection("consultations").add(payload);
      await firestoreDb.collection("consultations_bookings").doc(docRef.id).set(payload);
      newEntry.id = docRef.id;
      console.log(`[Firestore] Successfully saved consultation ${docRef.id}`);

      // If client is a school or parent, also mirror to respective Firestore collection
      if (data.clientType === "school") {
        const schoolPayload = cleanFirestoreData({
          schoolName: data.schoolName || data.name,
          contactPerson: data.contactPerson || data.name,
          phone: data.phone,
          email: data.email,
          city: data.city || "Maharashtra",
          programInterest: data.stream || "Turnkey STEAM Lab Setup",
          preferredDate: data.preferredDate,
          preferredTime: data.preferredTime,
          notes: data.notes || `Scheduled Call on ${data.preferredDate} at ${data.preferredTime}`,
          status: "new",
          createdAt: timestamp,
          serverTimestamp: FieldValue.serverTimestamp(),
        });
        await firestoreDb.collection("schools_registrations").doc(docRef.id).set(schoolPayload);
        await firestoreDb.collection("schools").doc(docRef.id).set(schoolPayload);
      } else if (data.clientType === "parent") {
        const parentPayload = cleanFirestoreData({
          parentName: data.name,
          phone: data.phone,
          email: data.email,
          courseInterest: data.stream,
          preferredDate: data.preferredDate,
          preferredTime: data.preferredTime,
          notes: `Consultation on ${data.preferredDate} at ${data.preferredTime}. ${data.notes || ""}`.trim(),
          status: "new",
          createdAt: timestamp,
          serverTimestamp: FieldValue.serverTimestamp(),
        });
        await firestoreDb.collection("parents_registrations").doc(docRef.id).set(parentPayload);
        await firestoreDb.collection("parents").doc(docRef.id).set(parentPayload);
      }
    } catch (err) {
      console.error("Firestore consultation error:", err);
    }
  }

  const store = ensureCleanDataStore();
  store.consultations.unshift(newEntry);

  if (data.clientType === "school") {
    store.schools.unshift({
      id: `sch-call-${Date.now().toString(36)}`,
      schoolName: data.schoolName || data.name,
      contactPerson: data.contactPerson || data.name,
      phone: data.phone,
      email: data.email,
      city: data.city || "Maharashtra",
      programInterest: data.stream || "Turnkey STEAM Lab Setup",
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      notes: data.notes || `Scheduled Call on ${data.preferredDate} at ${data.preferredTime}`,
      status: "new",
      createdAt: timestamp,
    });
  } else if (data.clientType === "parent") {
    store.parents.unshift({
      id: `par-call-${Date.now().toString(36)}`,
      parentName: data.name,
      phone: data.phone,
      email: data.email,
      courseInterest: data.stream,
      notes: `Consultation on ${data.preferredDate} at ${data.preferredTime}. ${data.notes || ""}`.trim(),
      status: "new",
      createdAt: timestamp,
    });
  }

  writeLocalDb(store);
  return newEntry;
}

// 4. Job Application
export async function addJobApplication(data: Omit<JobApplication, "id" | "createdAt" | "status">) {
  const timestamp = new Date().toISOString();
  const newEntry: JobApplication = {
    ...data,
    id: `app-${Date.now().toString(36)}-${Math.floor(1000 + Math.random() * 9000)}`,
    status: "applied",
    createdAt: timestamp,
  };

  if (isFirestoreConnected && firestoreDb) {
    try {
      const payload = cleanFirestoreData({
        ...newEntry,
        serverTimestamp: FieldValue.serverTimestamp(),
      });
      const docRef = await firestoreDb.collection("job_applications").add(payload);
      await firestoreDb.collection("careers").doc(docRef.id).set(payload);
      newEntry.id = docRef.id;
      console.log(`[Firestore] Successfully saved job application ${docRef.id}`);
    } catch (err) {
      console.error("Firestore job application error:", err);
    }
  }

  const store = ensureCleanDataStore();
  store.careers.unshift(newEntry);
  writeLocalDb(store);

  return newEntry;
}

// 5. Subscriber
export async function addSubscriber(email: string, source: string = "website") {
  const store = ensureCleanDataStore();
  const existing = store.subscribers.find(s => s.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return existing;
  }

  const timestamp = new Date().toISOString();
  const newEntry: Subscriber = {
    id: `sub-${Date.now().toString(36)}`,
    email,
    source,
    createdAt: timestamp,
  };

  if (isFirestoreConnected && firestoreDb) {
    try {
      await firestoreDb.collection("subscribers").add(
        cleanFirestoreData({
          ...newEntry,
          serverTimestamp: FieldValue.serverTimestamp(),
        })
      );
    } catch (err) {
      console.error("Firestore subscriber write error:", err);
    }
  }

  store.subscribers.unshift(newEntry);
  writeLocalDb(store);
  return newEntry;
}

// 6. Get all real data
export async function getAllData(): Promise<RobostormsDataStore> {
  const localData = ensureCleanDataStore();

  if (!isFirestoreConnected || !firestoreDb) {
    return localData;
  }

  try {
    const [schoolsSnap, parentsSnap, consultationsSnap, careersSnap, subscribersSnap] = await Promise.all([
      firestoreDb.collection("schools_registrations").orderBy("createdAt", "desc").get(),
      firestoreDb.collection("parents_registrations").orderBy("createdAt", "desc").get(),
      firestoreDb.collection("consultations").orderBy("createdAt", "desc").get(),
      firestoreDb.collection("job_applications").orderBy("createdAt", "desc").get(),
      firestoreDb.collection("subscribers").orderBy("createdAt", "desc").get(),
    ]);

    const firestoreSchools = schoolsSnap.docs.map(d => ({ id: d.id, ...d.data() } as SchoolRegistration));
    const firestoreParents = parentsSnap.docs.map(d => ({ id: d.id, ...d.data() } as ParentRegistration));
    const firestoreConsultations = consultationsSnap.docs.map(d => ({ id: d.id, ...d.data() } as ConsultationBooking));
    const firestoreCareers = careersSnap.docs.map(d => ({ id: d.id, ...d.data() } as JobApplication));
    const firestoreSubscribers = subscribersSnap.docs.map(d => ({ id: d.id, ...d.data() } as Subscriber));

    const mergeById = <T extends { id?: string }>(cloudArr: T[], localArr: T[]): T[] => {
      const map = new Map<string, T>();
      localArr.forEach(item => { if (item.id) map.set(item.id, item); });
      cloudArr.forEach(item => { if (item.id) map.set(item.id, item); });
      return Array.from(map.values());
    };

    const mergedStore: RobostormsDataStore = {
      schools: mergeById(firestoreSchools, localData.schools),
      parents: mergeById(firestoreParents, localData.parents),
      consultations: mergeById(firestoreConsultations, localData.consultations),
      careers: mergeById(firestoreCareers, localData.careers),
      subscribers: mergeById(firestoreSubscribers, localData.subscribers),
    };

    // Keep local file backup synchronized
    try {
      fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(mergedStore, null, 2), "utf-8");
    } catch (_) {}

    return mergedStore;
  } catch (err) {
    console.warn("Firestore read failed, returning cached records:", err);
    return localData;
  }
}

// 7. Get summary counts
export async function getDashboardStats() {
  const data = await getAllData();
  return {
    totalSchools: data.schools.length,
    totalParents: data.parents.length,
    totalConsultations: data.consultations.length,
    totalApplications: data.careers.length,
    totalSubscribers: data.subscribers.length,
    isFirestoreConnected,
    mode: isFirestoreConnected ? "Google Cloud Firestore" : "Local Database",
  };
}
