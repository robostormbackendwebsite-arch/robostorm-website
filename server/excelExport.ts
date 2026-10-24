import ExcelJS from "exceljs";
import { RobostormsDataStore, getAllData } from "./db";

// Robostorms Corporate Color Palette for Excel Sheets
const BRAND_ORANGE = "FF5A36"; // School STEAM Labs
const PURPLE_HR = "7C3AED";    // Job Applications
const BLUE_ACTIVITY = "1D4ED8"; // Activity Center
const DARK_NAVY = "1A1A1A";

function styleHeaderRow(row: ExcelJS.Row, bgHex: string) {
  row.height = 30;
  row.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: `FF${bgHex}` },
    };
    cell.font = {
      name: "Calibri",
      size: 11,
      bold: true,
      color: { argb: "FFFFFFFF" },
    };
    cell.alignment = {
      vertical: "middle",
      horizontal: "left",
      wrapText: true,
    };
    cell.border = {
      top: { style: "thin", color: { argb: "FFCCCCCC" } },
      left: { style: "thin", color: { argb: "FFCCCCCC" } },
      bottom: { style: "medium", color: { argb: "FF333333" } },
      right: { style: "thin", color: { argb: "FFCCCCCC" } },
    };
  });
}

function styleDataRow(row: ExcelJS.Row, isEven: boolean) {
  row.height = 24;
  row.eachCell((cell) => {
    if (isEven) {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFF9FAFB" },
      };
    }
    cell.font = {
      name: "Calibri",
      size: 10,
      color: { argb: "FF111827" },
    };
    cell.alignment = {
      vertical: "middle",
      horizontal: "left",
      wrapText: false,
    };
    cell.border = {
      top: { style: "thin", color: { argb: "FFE5E7EB" } },
      left: { style: "thin", color: { argb: "FFE5E7EB" } },
      bottom: { style: "thin", color: { argb: "FFE5E7EB" } },
      right: { style: "thin", color: { argb: "FFE5E7EB" } },
    };
  });
}

function addTitleBanner(worksheet: ExcelJS.Worksheet, title: string, subtitle: string, columnSpan: number, accentColor: string) {
  // Title Row
  worksheet.mergeCells(1, 1, 1, columnSpan);
  const titleCell = worksheet.getCell(1, 1);
  titleCell.value = `ROBOSTORMS TECHNOLOGY PVT. LTD. - ${title.toUpperCase()}`;
  titleCell.font = { name: "Calibri", size: 14, bold: true, color: { argb: "FFFFFFFF" } };
  titleCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: DARK_NAVY } };
  titleCell.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
  worksheet.getRow(1).height = 36;

  // Subtitle & Export Timestamp Row
  worksheet.mergeCells(2, 1, 2, columnSpan);
  const subCell = worksheet.getCell(2, 1);
  const exportDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  subCell.value = `${subtitle} | Generated for Company Management: ${exportDate} IST`;
  subCell.font = { name: "Calibri", size: 10, italic: true, color: { argb: "FF374151" } };
  subCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF3F4F6" } };
  subCell.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
  worksheet.getRow(2).height = 22;

  // Blank Spacer Row
  worksheet.getRow(3).height = 8;
}

export async function generateExcelReport(
  customData?: RobostormsDataStore
): Promise<Buffer> {
  const data: RobostormsDataStore = customData || (await getAllData());
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Robostorms Technology Pvt. Ltd.";
  workbook.lastModifiedBy = "Robostorms Management Desk";
  workbook.created = new Date();
  workbook.modified = new Date();

  // =========================================================================
  // TAB 1: SCHOOL (Turnkey STEAM Labs & School Demos)
  // =========================================================================
  const wsSchool = workbook.addWorksheet("School", {
    views: [{ showGridLines: true }],
  });

  addTitleBanner(
    wsSchool,
    "School STEAM Labs & Inquiries",
    "Turnkey STEAM Innovation Labs, ATL labs, school demo bookings, and institutional inquiries",
    10,
    BRAND_ORANGE
  );

  wsSchool.getRow(4).values = [
    "Reference ID",
    "School / Institution Name",
    "Contact Person",
    "Phone / WhatsApp",
    "Official Email",
    "City / Location",
    "Program / Lab Interest",
    "Preferred Slot",
    "Notes / Requirements",
    "Submission Date",
  ];
  styleHeaderRow(wsSchool.getRow(4), BRAND_ORANGE);

  wsSchool.columns = [
    { key: "id", width: 22 },
    { key: "schoolName", width: 34 },
    { key: "contactPerson", width: 26 },
    { key: "phone", width: 20 },
    { key: "email", width: 28 },
    { key: "city", width: 22 },
    { key: "programInterest", width: 32 },
    { key: "slot", width: 28 },
    { key: "notes", width: 38 },
    { key: "createdAt", width: 22 },
  ];

  // Consolidate both school registrations and school consultations
  const schoolList: any[] = [];
  const seenSchoolIds = new Set<string>();

  data.schools.forEach((item) => {
    if (item.id && !seenSchoolIds.has(item.id)) {
      seenSchoolIds.add(item.id);
      schoolList.push({
        id: item.id,
        schoolName: item.schoolName,
        contactPerson: item.contactPerson,
        phone: item.phone,
        email: item.email,
        city: item.city || "Maharashtra",
        programInterest: item.programInterest || "Turnkey STEAM Lab Setup",
        slot: item.preferredDate ? `${item.preferredDate} (${item.preferredTime || 'Standard Slot'})` : "Immediate / Flexible",
        notes: item.notes || "",
        createdAt: item.createdAt ? new Date(item.createdAt).toLocaleString("en-IN") : "Recent",
      });
    }
  });

  data.consultations
    .filter((c) => c.clientType === "school")
    .forEach((item) => {
      if (item.id && !seenSchoolIds.has(item.id)) {
        seenSchoolIds.add(item.id);
        schoolList.push({
          id: item.id,
          schoolName: item.schoolName || item.name,
          contactPerson: item.contactPerson || item.name,
          phone: item.phone,
          email: item.email,
          city: item.city || "Maharashtra",
          programInterest: item.stream || "Turnkey STEAM Lab Setup",
          slot: `${item.preferredDate} (${item.preferredTime})`,
          notes: item.notes || "",
          createdAt: item.createdAt ? new Date(item.createdAt).toLocaleString("en-IN") : "Recent",
        });
      }
    });

  schoolList.forEach((item, index) => {
    const row = wsSchool.addRow(item);
    styleDataRow(row, index % 2 === 0);
  });

  // =========================================================================
  // TAB 2: JOB (Career Applications)
  // =========================================================================
  const wsJob = workbook.addWorksheet("Job", {
    views: [{ showGridLines: true }],
  });

  addTitleBanner(
    wsJob,
    "Career & Trainer Applications",
    "Applicants for Business Development Executive, STEAM Trainers, Robotics Engineers, and Management",
    11,
    PURPLE_HR
  );

  wsJob.getRow(4).values = [
    "Application ID",
    "Candidate Full Name",
    "Position Applied",
    "Phone / WhatsApp",
    "Email Address",
    "Preferred Location",
    "Qualification",
    "Experience",
    "Resume / Portfolio Link",
    "Candidate Message",
    "Applied Date",
  ];
  styleHeaderRow(wsJob.getRow(4), PURPLE_HR);

  wsJob.columns = [
    { key: "id", width: 22 },
    { key: "fullName", width: 26 },
    { key: "jobTitle", width: 32 },
    { key: "phone", width: 20 },
    { key: "email", width: 28 },
    { key: "preferredLocation", width: 20 },
    { key: "qualification", width: 24 },
    { key: "experience", width: 18 },
    { key: "portfolioLink", width: 34 },
    { key: "message", width: 36 },
    { key: "createdAt", width: 22 },
  ];

  data.careers.forEach((item, index) => {
    const row = wsJob.addRow({
      id: item.id || `app-${index + 1}`,
      fullName: item.fullName,
      jobTitle: item.jobTitle || item.jobId,
      phone: item.phone,
      email: item.email,
      preferredLocation: item.preferredLocation,
      qualification: item.qualification,
      experience: item.experience || "Fresher",
      portfolioLink: item.portfolioLink || "None provided",
      message: item.message || "",
      createdAt: item.createdAt ? new Date(item.createdAt).toLocaleString("en-IN") : "Recent",
    });
    styleDataRow(row, index % 2 === 0);
  });

  // =========================================================================
  // TAB 3: ACTIVITY CENTER (Student & Parent Registrations)
  // =========================================================================
  const wsActivity = workbook.addWorksheet("Activity Center", {
    views: [{ showGridLines: true }],
  });

  addTitleBanner(
    wsActivity,
    "Activity Center Registrations",
    "Student & parent enrollments for Robotics, Coding, Electronics, and Tarabai Park activity center batches",
    9,
    BLUE_ACTIVITY
  );

  wsActivity.getRow(4).values = [
    "Registration ID",
    "Student / Parent Name",
    "Phone / WhatsApp",
    "Email Address",
    "Course Interest",
    "Preferred Batch",
    "Scheduled Visit",
    "Notes / Details",
    "Registered Date",
  ];
  styleHeaderRow(wsActivity.getRow(4), BLUE_ACTIVITY);

  wsActivity.columns = [
    { key: "id", width: 22 },
    { key: "parentName", width: 26 },
    { key: "phone", width: 20 },
    { key: "email", width: 28 },
    { key: "courseInterest", width: 30 },
    { key: "preferredBatch", width: 24 },
    { key: "slot", width: 26 },
    { key: "notes", width: 38 },
    { key: "createdAt", width: 22 },
  ];

  const activityList: any[] = [];
  const seenActivityIds = new Set<string>();

  data.parents.forEach((item) => {
    if (item.id && !seenActivityIds.has(item.id)) {
      seenActivityIds.add(item.id);
      activityList.push({
        id: item.id,
        parentName: item.parentName || item.studentName,
        phone: item.phone,
        email: item.email,
        courseInterest: item.courseInterest,
        preferredBatch: item.preferredBatch || "Standard Weekend Batch",
        slot: "Center Visit",
        notes: item.notes || "",
        createdAt: item.createdAt ? new Date(item.createdAt).toLocaleString("en-IN") : "Recent",
      });
    }
  });

  data.consultations
    .filter((c) => c.clientType === "parent")
    .forEach((item) => {
      if (item.id && !seenActivityIds.has(item.id)) {
        seenActivityIds.add(item.id);
        activityList.push({
          id: item.id,
          parentName: item.name,
          phone: item.phone,
          email: item.email,
          courseInterest: item.stream,
          preferredBatch: "Activity Center Batch",
          slot: `${item.preferredDate} (${item.preferredTime})`,
          notes: item.notes || "",
          createdAt: item.createdAt ? new Date(item.createdAt).toLocaleString("en-IN") : "Recent",
        });
      }
    });

  activityList.forEach((item, index) => {
    const row = wsActivity.addRow(item);
    styleDataRow(row, index % 2 === 0);
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}
