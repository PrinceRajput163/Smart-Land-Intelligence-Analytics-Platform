# Smart Land Intelligence & Analytics Platform

**SIH Problem Code:** SIH1318  
**Organization:** Ministry of Coal, Government of India  
**Problem Statement:** Analytics Based on Government Land Information System (GLIS) Data

## Overview
An AI-powered Enterprise GIS Decision Support Platform designed for intelligent government land monitoring, spatial analytics, and AI prediction.

## Tech Stack
- **Frontend:** React (Vite), Tailwind CSS v4, Framer Motion, Lucide React
- **GIS:** MapLibre GL JS (WebGL-accelerated)
- **Analytics:** Recharts
- **Routing:** React Router DOM v7

## Quick Start
```bash
cd frontend
npm install
npm run dev
```

## Features
- **National Command Center:** Live dashboard with government metrics.
- **GIS Intelligence:** MapLibre GL JS engine with 3-tier drill-down (National → State → District).
- **AI Prediction (Demo):** ML pipeline visualization for land suitability and risk analysis.
- **Land Records:** Centralized database viewer for verified government cadastre.
- **Reporting:** Automated official report generation and secure storage.

## Demonstration Note
This platform currently runs as a prototype. While spatial boundary data (India States, UP Districts, GBN Parcels/Highways) are authentic, all intelligence metrics (suitability scores, risk scores, AI predictions) and cadastral attributes are deterministically synthesized for UI demonstration purposes.

## Documentation
Please refer to the `PROJECT_CONTEXT.md` file for comprehensive details on architecture, data strategy, and AI handoff instructions.
