import { prisma } from "../src/lib/db";

const defaultProjects = [
  {
    name: "PirahusNext",
    techStack: "Next.js, TypeScript, TailwindCSS",
    description: "PirahusNext web application",
    status: "In Progress",
    repoUrl: "https://github.com/Some1Names/PirahusNext",
  },
  {
    name: "glory-service",
    techStack: "Go, Elysia, PostgreSQL",
    description: "Backend service for Glory platform",
    status: "In Progress",
    repoUrl: "https://github.com/vixvify/glory-service",
  },
  {
    name: "glory-portal",
    techStack: "Next.js, React, TailwindCSS",
    description: "Portal frontend for Glory platform",
    status: "In Progress",
    repoUrl: "https://github.com/vixvify/glory-portal",
  },
  {
    name: "acs-core-service",
    techStack: "Go, gRPC, PostgreSQL",
    description: "Core backend service for ACS system",
    status: "Completed",
    repoUrl: "https://github.com/asc-base/acs-core-service",
  },
  {
    name: "acs-portal",
    techStack: "Next.js, React, Shadcn UI",
    description: "ACS System Portal interface",
    status: "Completed",
    repoUrl: "https://github.com/asc-base/acs-portal",
  },
  {
    name: "payment-tracking-service",
    techStack: "Go, Elysia, MySQL",
    description: "Service for tracking payments and invoices",
    status: "In Progress",
    repoUrl: "https://github.com/ParkPawapon/payment-tracking-service",
  },
  {
    name: "payment-tracking-ui",
    techStack: "React, TypeScript, MUI",
    description: "Frontend UI for payment tracking dashboard",
    status: "In Progress",
    repoUrl: "https://github.com/ParkPawapon/payment-tracking-ui",
  },
  {
    name: "worklog-pa-fe",
    techStack: "Next.js, TailwindCSS, Zustand",
    description: "Worklog PA frontend application",
    status: "Planning",
    repoUrl: "https://github.com/ParkPawapon/worklog-pa-fe",
  },
];

async function main() {
  console.log("Seeding default projects...");
  
  // Clean wipe
  await prisma.project.deleteMany();
  
  const now = BigInt(Date.now());
  
  // Seed default projects
  await prisma.project.createMany({
    data: defaultProjects.map((p) => ({
      ...p,
      updatedAt: now,
    })),
  });
  
  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
