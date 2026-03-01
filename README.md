# Big’s BBQ & Smokehouse  
## Identity-First Detection Engineering – Phase 1

---

## Overview

This project simulates a vulnerable hospitality hiring platform to explore how identity-first detection engineering can surface abuse patterns before backend processing.

Rather than focusing solely on blocking attacks, this prototype models observable telemetry and evaluates how detection rules behave under real misuse conditions.

This is Phase 1 of a multi-phase detection case study under the HunterCloudSec framework.

---

## Objectives

- Simulate real-world web input abuse (SQLi, XSS, anomalous patterns)
- Capture canonical event telemetry (Actor • Action • Target • Outcome • Context)
- Evaluate rule-based detection scoring
- Identify coverage gaps before expanding detection logic

---

## Architecture

Frontend:
- Static HTML (multi-page simulation)
- JavaScript detection engine (`app.js`)
- Client-side telemetry modeling

Detection Logic:
- Pattern-based SQL injection detection
- XSS payload detection
- Heuristic scoring model
- Baseline vs malicious differentiation

---

## Repository Structure

bigs-detection-phase1/
│
├── index.html # Landing page
├── apply.html # Simulated job application form
├── about.html # Company information
├── missions.html # Narrative context
├── app.js # Detection & telemetry logic
├── styles.css # UI styling
├── telemetry-analysis/ # Detection notes & findings
├── bigs-bbq-honeypot-project.md # Case study notes


---

## Phase 1 Findings

✔ SQL injection patterns detected  
✔ XSS payload patterns detected  
✔ Baseline behavior logged correctly  
⚠ Long anomalous inputs not flagged  
⚠ Semantic prompt-injection behavior only partially scored  

This phase revealed a key insight:

Detection systems only surface attack types they are explicitly modeled to detect.

---

## Why This Project Exists

Security visibility is not automatic.

If detection logic does not explicitly encode attack types, those attacks remain invisible in telemetry.

This prototype was built to:

- Expose detection blind spots
- Model structured telemetry
- Prepare for Phase 2 rule expansion

---

## Next Phase

Phase 2 will introduce:

- Improved anomaly scoring
- Semantic abuse modeling
- Event normalization before ingestion
- Expanded detection taxonomy

---

## About

Created by Jermaine Hunter  
Cloud & AI Security Engineer  
HunterCloudSec — Design • Deploy • Defend  

Portfolio: https://www.huntercloudsec.dev/
LinkedIn: https://linkedin.com/in/jermaine-hunter
