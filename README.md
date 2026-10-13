# IT313 – TypeScript Foundations for React Native

## Project Overview

The Enrollment Eligibility Checker calculates the average grade of each enrollee using their preliminary, midterm, and final grades. It determines whether each student is passing or on probation and generates a class eligibility report.

This project refactors the JavaScript registrar utility into TypeScript to catch type-related errors during development.

## TypeScript Concepts Applied

* **Basic types:** Specify strings, numbers, and function return types.
* **Interfaces:** Define the structures of `Enrollee` and `EligibilityReport`.
* **Type aliases:** Define `BatchId` as a union of `string` and `number`.
* **Enums:** Represent eligibility using `EnrollmentStatus.Passing` and `EnrollmentStatus.Probation`.
* **Union types and narrowing:** Allow the batch ID to have either a string or numeric value and use `typeof` to determine its type.
* **Optional properties:** Use `remarks?: string` for probation students.
* **Generics:** Implement `groupBy<T>` to group report entries while preserving their types.
* **Modules:** Export and import the grade calculation and status functions from `gradeUtils.ts`.
* **Asynchronous programming:** Use a simulated API request, `Promise`, `async/await`, and `try/catch`.
* **Array methods:** Use `map()` to generate reports and `reduce()` to calculate the class average.
* **Strict type checking:** Enable `"strict": true` in `tsconfig.json`.

## Project Files

* `gradeUtils.ts` – Defines the enrollment status enum, average calculation, and eligibility status function.
* `main.ts` – Contains the student data, report generation, generic grouping function, and output.
* `tsconfig.json` – Configures the TypeScript compiler.
* `README.md` – Documents the project.

## Requirements

Install Node.js and npm, then install the project dependencies:

```bash
npm install --save-dev typescript ts-node @types/node
```

## How to Run

Run the main program:

```bash
npx ts-node main.ts
```

Type-check the project without generating JavaScript files:

```bash
npx tsc --noEmit
```

The type-check command should complete without errors.

Note: `gradeUtils.ts` is a utility module imported by `main.ts`, not a standalone executable program.

## Expected Results

The program should display the individual student averages and eligibility statuses, include consultation remarks for probation students, and show:

* Class Average: 76.07
* Passing: 3 / 5

## Conclusion

TypeScript makes the Enrollment Eligibility Checker more reliable by explicitly defining data structures, restricting eligibility statuses, and detecting type errors before execution. These concepts also provide a foundation for typing React Native component props and state.
