# Deployment Guide for JAGA

This guide outlines the steps to deploy the JAGA application (Frontend-Only Version) to **Vercel**, the recommended platform for Next.js applications.

## Prerequisites

1.  **GitHub Account**: You need a GitHub account to host your code.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com/) (you can log in with GitHub).
3.  **Git Installed**: Ensure Git is installed on your machine.

## Step 1: Push Code to GitHub

If you haven't already, you need to push this project to a GitHub repository.

1.  **Initialize Git** (if not done):
    ```bash
    git init
    ```

2.  **Commit your changes**:
    ```bash
    git add .
    git commit -m "Ready for deployment"
    ```

3.  **Create a new repository** on GitHub.
4.  **Link and push**:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    git branch -M main
    git push -u origin main
    ```

## Step 2: Deploy to Vercel

1.  Log in to your **Vercel Dashboard**.
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your GitHub repository (**JAGA**).
4.  **Configure Project**:
    *   **Framework Preset**: Next.js (should be auto-detected).
    *   **Root Directory**: Click "Edit" and select `frontend`. **(Crucial Step)**
    *   **Environment Variables**: None required (we are using mock data for this demo).
5.  Click **"Deploy"**.

## Step 3: Verify Deployment

Vercel will build your application. Once complete, you will get a live URL (e.g., `https://jaga-app.vercel.app`).

*   Click the link to open your app.
*   Test the login (Singpass QR).
*   Navigate through the dashboard and feature pages.

## Troubleshooting

*   **Build Failures**: Check the Vercel logs. Common issues are linting errors. If strictly necessary, you can disable linting during build by adding this to `frontend/next.config.mjs`:
    ```javascript
    const nextConfig = {
      eslint: {
        ignoreDuringBuilds: true,
      },
    };
    export default nextConfig;
    ```
