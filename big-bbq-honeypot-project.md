
# Big’s BBQ & Smokehouse — Web Application Honeypot  
### HunterCloudSec Detection Engineering Project

---

## 📌 Project Summary

This project simulates a realistic restaurant hiring website that is intentionally instrumented as a **web application honeypot**.

The goal is not to build a restaurant site, but to demonstrate how a security engineer:

- Instruments a web application for telemetry
- Detects malicious behavior (XSS, SQLi, bot traffic, prompt injection)
- Logs structured detection events
- Builds detection logic before a SIEM is introduced
- Designs a system that can later feed into Google Cloud Logging / Chronicle

This project transforms a UX-style mock site into a **monitored attack surface**.

---

## 🎯 Primary Objective

Demonstrate practical **Detection Engineering** by building:

> A client-side telemetry and detection layer that observes, analyzes, and flags suspicious behavior in real time.

---

## 🧠 Core Concept

Most portfolio projects show:
> “I know what XSS and SQLi are.”

This project shows:
> “I built a system that detects XSS and SQLi attempts.”

---

## 🏗️ System Architecture

User Interaction (forms, chat, URLs, clicks)  
↓  
security-logger.js (telemetry + detection rules)  
↓  
Structured HCS Web Events (console / localStorage / future Cloud Logging)  
↓  
Detection Evidence (screenshots, detections page, case study)

---

## 🧩 Components of the Project

### 1. Realistic Front-End Environment

A believable hiring site with:

- Careers page
- Menu page
- About / Mission pages
- Chatbot hiring assistant (“Biggie”)
- Form inputs
- Query parameters
- User interaction surface

---

### 2. `security-logger.js` — The Detection Brain

This script:

- Monitors page views
- Monitors query parameters
- Monitors form submissions
- Monitors input changes (blur/change)
- Monitors rapid clicking (bot behavior)
- Monitors user agent signals
- Hooks into chatbot messages
- Applies detection rules to all inputs
- Produces structured detection events

---

### 3. Detection Rules Implemented

| Attack Type | Detection Example |
|-------------|-------------------|
| XSS | `<script>`, `javascript:` |
| SQL Injection | `UNION SELECT`, `OR 1=1` |
| Command Injection | `; cat /etc/passwd` |
| Path Traversal | `../` |
| SSRF | `127.0.0.1` |
| Bot Traffic | headless UA, webdriver, rapid clicks |

---

### 4. Structured Event Schema

Every event follows a defined schema:

`hcs.web_event.v1`

Including:

- session_id
- page context
- client metadata
- redacted input data (length + hash)
- detection score
- detection rule hits
- flagged true/false

---

### 5. Chatbot Integration

User messages are analyzed for:

- Prompt injection
- Malicious payloads
- Suspicious input patterns

---

## 🧪 Attack Scenarios Demonstrated

| Scenario | What Happens | Detection |
|----------|---------------|-----------|
| Query param XSS | URL injection | `query_params` flagged |
| Form SQLi | Injection in input | `input_blur` / `form_submit` flagged |
| Chat injection | Malicious chat text | `chat_message` flagged |
| Bot clicking | Rapid click pattern | `behavior` flagged |

---

## 🧾 Evidence Collected for Portfolio

- Console screenshots of detection events
- Event schema documentation
- security-logger.js source
- Attack scenario walkthrough
- Architecture diagram
- Case study write-up

---

## 🏁 Final Outcome

Big’s BBQ appears to be a simple hiring site.

But underneath, it behaves like:

> A monitored web application with live detection logic — exactly what a security engineer builds in production.
