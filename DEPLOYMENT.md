# Deploy SalesAI

The simplest hosted setup is Vercel for the React frontend and Render for the Express API. After deployment, open the Vercel URL directly; VS Code and your computer do not need to stay open.

## 1. Push the latest code to GitHub

Open PowerShell in the project folder:

```powershell
cd C:\Users\PS\Desktop\inter
git add .
git commit -m "Prepare SalesAI deployment"
git push ghy main
```

The repository already has a remote named `ghy`. If Git reports there is nothing to commit, continue to the next step.

## 2. Deploy the backend to Render

1. Sign in to [Render](https://render.com/) and create a **Web Service** from the `Shreya-3024/Voice-assestance` GitHub repository.
2. Select the `main` branch.
3. Set **Root Directory** to `backend`.
4. Set **Build Command** to `npm install`.
5. Set **Start Command** to `npm start`.
6. Add these environment variables in Render's Environment settings:
   - `GEMINI_API_KEY`: a valid Gemini API key. Use a newly rotated key; do not put it in Git or frontend settings.
   - `ALLOWED_ORIGIN`: temporarily set to `http://localhost:5173`; replace it after the frontend is deployed.
7. Deploy, then copy the Render service URL (for example `https://salesai-api.onrender.com`).
8. Verify `https://<your-render-service>/api/health` returns `{"status":"ok","service":"SalesAI backend"}`.

Render supplies `PORT` automatically. Do not set it to a fixed value.

## 3. Deploy the frontend to Vercel

1. Sign in to [Vercel](https://vercel.com/) and import the same GitHub repository.
2. Set **Root Directory** to `frontend`.
3. Choose Vite if Vercel does not detect it automatically. Use `npm run build` as the build command and `dist` as the output directory.
4. Add the environment variable `VITE_API_URL` with the Render service URL from step 2, with no trailing slash.
5. Deploy and copy the Vercel site URL.

## 4. Connect and test

1. In Render, change `ALLOWED_ORIGIN` to the exact Vercel origin, including `https://` and excluding any path. Example: `https://salesai-demo.vercel.app`.
2. Save the environment change and wait for Render to redeploy.
3. Open the Vercel URL, start a conversation, send a text message, and end the conversation to verify the generated summary.
4. Permit microphone access if prompted. Browser speech recognition support varies; text input remains available.

The Gemini key belongs only in Render's backend environment variables. Never add it to `VITE_*` variables, source files, screenshots, or Git commits. Because a key was previously shared in chat, revoke that key and use a replacement before making the public deployment.

## Run locally without opening VS Code

Double-click `Start-SalesAI.bat` in the project folder. It opens separate backend and frontend PowerShell windows, checks that both services started, and opens the app in your browser. Keep those two PowerShell windows open while using the local version. For access without keeping those windows or your computer running, use the hosted deployment above.

## Hosting and AI availability

Vercel serves the static frontend. Render runs the API independently of VS Code, although free service tiers may sleep or have usage limits. Gemini quotas and availability are managed by Google and can temporarily prevent responses even when the website is online.
