# Python Module 1 — Assessment Portal

This GitHub Pages package contains the detailed Module 1 learning notes plus a quiz that can collect student results in Google Sheets through Google Apps Script.

## What students do

1. Enter Name, USN and Section.
2. Start the Module 1 Quiz.
3. Submit the quiz.
4. Score is calculated.
5. Result is sent to the Google Sheet.
6. Faculty can filter/download results.

## Important

GitHub Pages is a static website. It should NOT contain the student list, secret keys or Google credentials.

The Google Apps Script Web App acts as the backend.

## Setup

### 1. Create Google Sheet

Create a Google Sheet named:

`Python Module 1 Assessment Results`

Create a sheet named `Results`.

The website will create/use these columns:

Timestamp | Name | USN | Section | Assessment | Score | Total | Percentage

### 2. Open Apps Script

In the Google Sheet:

Extensions → Apps Script

Replace the default code with the contents of `Code.gs`.

### 3. Deploy

Deploy → New deployment

Select:

- Type: Web app
- Execute as: Me
- Who has access: Anyone

Deploy and copy the Web App URL.

### 4. Connect the website

Open:

`assets/app.js`

Find:

`const GOOGLE_SCRIPT_URL = "";`

Paste your Web App URL between the quotes.

Example:

`const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/XXXXXXXX/exec";`

Then upload the updated files to GitHub.

## Recommended result sheet

You can later extend the same backend for:
- Quiz
- Assignment
- Internal/FA
- Module Exam
- Practice tests

## Privacy and access

This setup is for assessment data collection, not high-security proctoring. Do not store passwords or sensitive personal information in the sheet. For official institutional examinations, use the college-approved LMS/assessment platform.
