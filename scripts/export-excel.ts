import path from "path";
import fs from "fs";
import os from "os";
import dotenv from "dotenv";
import { initDatabase, getAllData } from "../server/db";
import { generateExcelReport } from "../server/excelExport";

dotenv.config();

async function runExport() {
  console.log("=============================================================");
  console.log("   ROBOSTORMS - LIVE 3-TAB DATABASE EXCEL EXPORTER           ");
  console.log("=============================================================");
  console.log("Connecting to Google Cloud Firestore & local store...");

  initDatabase();

  console.log("Fetching live submissions...");
  const data = await getAllData();

  const totalSchools = data.schools.length + data.consultations.filter(c => c.clientType === 'school').length;
  const totalJobs = data.careers.length;
  const totalActivity = data.parents.length + data.consultations.filter(c => c.clientType === 'parent').length;

  console.log("\nSummary of records to export into 3 tabs:");
  console.log(`[Tab 1] School:          ${totalSchools} inquiries / bookings`);
  console.log(`[Tab 2] Job:             ${totalJobs} applicant records`);
  console.log(`[Tab 3] Activity Center: ${totalActivity} student enrollments`);

  console.log("\nGenerating refined 3-Tab Excel workbook...");
  const buffer = await generateExcelReport(data);

  const now = new Date();
  const dateStr = now.toISOString().split("T")[0];
  const filename = `Robostorms_Master_Data_${dateStr}.xlsx`;

  // 1. Save in project root directory
  const localOutputPath = path.join(process.cwd(), filename);
  fs.writeFileSync(localOutputPath, buffer);
  console.log(`\n✔ Saved to Project Folder: ${localOutputPath}`);

  // 2. Save directly to the Windows Desktop of the company computer
  const candidateDesktops = [
    path.join(os.homedir(), "OneDrive", "Desktop"),
    path.join(os.homedir(), "Desktop"),
    "C:\\Users\\admin\\OneDrive\\Desktop",
    "C:\\Users\\admin\\Desktop",
  ];

  let savedToDesktop = false;
  for (const deskPath of candidateDesktops) {
    if (fs.existsSync(deskPath)) {
      const desktopOutputPath = path.join(deskPath, filename);
      fs.writeFileSync(desktopOutputPath, buffer);
      console.log(`✔ Saved directly to Desktop: ${desktopOutputPath}`);
      savedToDesktop = true;
      break;
    }
  }

  if (!savedToDesktop) {
    console.log(`(Note: Desktop path not found, saved to project folder: ${localOutputPath})`);
  }

  console.log("\n=============================================================");
  console.log("EXCEL EXPORT COMPLETED SUCCESSFULLY WITH EXACTLY 3 TABS!");
  console.log("=============================================================");
}

runExport().catch((err) => {
  console.error("Export failed:", err);
  process.exit(1);
});
