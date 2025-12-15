# CEYEL - Process Intelligence Platform

![CEYEL Banner](https://via.placeholder.com/1200x600?text=CEYEL+Platform)

**Process Intelligence for the Next Era of Operations**

CEYEL is a premium, animation-driven website for a deep-tech software platform. This project demonstrates a modern, minimalist, and "editorial SaaS" design approach, fully responsive and ready for production.

## 🚀 Project Overview

- **Stack:** React, Vite, Tailwind CSS, Framer Motion
- **Design:** Dark premium palette, fluid animations, minimalist typography.
- **Goal:** To communicate depth and intelligence without technical jargon or hardware references.

## 🛠️ Development

To run the project locally:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Start Development Server:**
    ```bash
    npm run dev
    ```

3.  **Build for Production:**
    ```bash
    npm run build
    ```

## 🌍 Deployment on Netlify

This project is optimized for Netlify.

1.  **Drag & Drop:**
    - Run `npm run build`.
    - Drag the `dist` folder to the Netlify Drop area.

2.  **Git Integration (Recommended):**
    - Push this repository to GitHub/GitLab.
    - Connect the repository to Netlify.
    - **Build Command:** `npm run build`
    - **Publish Directory:** `dist`

## 🌐 Custom Domain (GoDaddy)

To set up `ceyel.co.in` (or any custom domain) on Netlify:

1.  **Netlify:**
    - Go to **Domain Management** > **Add Custom Domain**.
    - Enter `ceyel.co.in`.

2.  **GoDaddy (DNS Settings):**
    - Go to your domain's DNS Management.
    - **A Record:** Point `@` to Netlify's load balancer IP: `75.2.60.5` (Check Netlify docs for the current IP).
    - **CNAME Record:** Point `www` to your Netlify site URL (e.g., `ceyel-platform.netlify.app`).

3.  **Verify:**
    - Wait for propagation (usually minutes, up to 24h).
    - Netlify will automatically provision an SSL certificate.

## 📄 License

© 2025 CEYEL. All rights reserved.
