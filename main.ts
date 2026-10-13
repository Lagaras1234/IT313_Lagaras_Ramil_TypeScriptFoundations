import {
  EnrollmentStatus,
  computeAverage,
} from "./gradeUtils";

import getStatus from "./gradeUtils";

interface Enrollee {
  name: string;
  prelim: number;
  midterm: number;
  final: number;
}

interface EligibilityReport {
  name: string;
  average: number;
  status: EnrollmentStatus;
  remarks?: string;
}

const enrollees: Enrollee[] = [
  { name: "Ana Cruz", prelim: 85, midterm: 90, final: 88 },
  { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
  { name: "Cid Ramos", prelim: 95, midterm: 92, final: 97 },
  { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
  { name: "Eli Tan", prelim: 78, midterm: 80, final: 76 },
];

// Union type and type narrowing

type BatchId = string | number;

function displayBatchId(batchId: BatchId): void {
  if (typeof batchId === "number") {
    console.log(`Batch ID: ${batchId.toFixed(0)}`);
  } else {
    console.log(`Batch ID: ${batchId.toUpperCase()}`);
  }
}

displayBatchId(313);
displayBatchId("batch-313");

// Simulate a registrar API request
function getEnrollees(): Promise<Enrollee[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(enrollees), 500);
  });
}

// Generic function
function groupBy<T>(
  items: T[],
  keyFn: (item: T) => string
): Record<string, T[]> {
  return items.reduce<Record<string, T[]>>(
    (groups, item) => {
      const key = keyFn(item);

      if (!groups[key]) {
        groups[key] = [];
      }

      groups[key].push(item);
      return groups;
    },
    {}
  );
}

async function main(): Promise<void> {
  try {
    const students: Enrollee[] = await getEnrollees();

    const reports: EligibilityReport[] = students.map(
      (student): EligibilityReport => {
        const average = computeAverage(
          student.prelim,
          student.midterm,
          student.final
        );

        const status = getStatus(average);

        return {
          name: student.name,
          average,
          status,
          ...(status === EnrollmentStatus.Probation
            ? { remarks: "Needs consultation" }
            : {}),
        };
      }
    );

    console.log(
      "\n=== IT313 Enrollment Eligibility Report (TypeScript) ==="
    );

    reports.forEach((report) => {
      const remarks = report.remarks
        ? ` - ${report.remarks}`
        : "";

      console.log(
        `${report.name.padEnd(12)} - Average: ` +
        `${report.average.toFixed(2)} - ${report.status}${remarks}`
      );
    });

    const classTotal = reports.reduce(
      (total, report) => total + report.average,
      0
    );

    const classAverage =
      reports.length > 0 ? classTotal / reports.length : 0;

    const groupedReports = groupBy(
      reports,
      (report) => report.status
    );

    const passingCount =
      groupedReports[EnrollmentStatus.Passing]?.length ?? 0;

    console.log(`Class Average: ${classAverage.toFixed(2)}`);
    console.log(`Passing: ${passingCount} / ${reports.length}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        `Failed to retrieve enrollee records: ${error.message}`
      );
    } else {
      console.error("An unknown error occurred.");
    }
  }
}

main();