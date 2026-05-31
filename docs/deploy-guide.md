# Deploy Guide — Publish Your Site for Free

This guide walks you through publishing your site live on the internet using GitHub and Vercel — both are free.

---

## What You Need

- A [GitHub](https://github.com) account (free) — for storing your code
- A [Vercel](https://vercel.com) account (free) — for hosting and deploying your site
- The project folder that was built by the AI agent

---

## Step 1 — Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in.
2. Click the **+** icon in the top right → **New repository**.
3. Give it a name (e.g., `my-business-website`).
4. Set it to **Public** or **Private** — both work with Vercel free tier.
5. Leave all other options as default. Click **Create repository**.
6. GitHub will show you a page with setup instructions — keep this tab open.

---

## Step 2 — Push Your Code to GitHub

Open your terminal (the same one you used with Claude Code) and run these commands from inside your project folder:

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

Once this succeeds, refresh your GitHub repository page — you should see all your project files there.

---

## Step 3 — Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (you can sign in with your GitHub account — recommended).
2. Click **Add New Project** on your dashboard.
3. Under **Import Git Repository**, find and select the repository you just created.
4. Click **Import**.

---

## Step 4 — Configure & Deploy

Vercel automatically detects Next.js projects. On the configuration screen:

- **Framework Preset:** Next.js (should be auto-detected)
- **Root Directory:** leave empty (or point to the project folder if your repo has multiple projects)
- **Build Command:** leave as default (`next build`)
- **Output Directory:** leave as default (`.next`)
- **Environment Variables:** skip for now unless your project requires them

Click **Deploy**.

Vercel will build and deploy your site in about 1–2 minutes.

---

## Step 5 — Your Site Is Live

When the deploy finishes, Vercel gives you a URL like:

```
https://my-business-website.vercel.app
```

Your site is now live and publicly accessible. Share that link!

---

## Step 6 — Automatic Deployments (Bonus)

Every time you push new code to GitHub, Vercel automatically redeploys your site. This means:
- Fix a typo → push to GitHub → site updates in ~1 minute.
- No manual re-deploys needed.

---

## Optional — Connect a Custom Domain

If you have a custom domain (e.g., `mybusiness.com`):

1. In your Vercel project dashboard, go to **Settings → Domains**.
2. Click **Add Domain** and type your domain name.
3. Vercel will show you DNS records to add.
4. Log in to where you bought your domain (GoDaddy, Namecheap, Google Domains, etc.).
5. Find the **DNS Settings** for your domain.
6. Add the records Vercel shows you (usually an **A record** and/or **CNAME record**).
7. Wait 10–60 minutes for DNS to propagate.
8. Your custom domain is now connected and HTTPS is automatic.

---

## Troubleshooting

**Build fails on Vercel**
- Check the deploy log in your Vercel dashboard for the error message.
- Most common cause: a missing environment variable or a package version mismatch.
- Share the error message with Claude Code and it will fix it.

**Site looks different from local preview**
- Clear your browser cache and reload.
- Check that all image files are in the `public/` folder.

**Custom domain not connecting**
- DNS changes take up to 48 hours in rare cases.
- Verify you added the correct record type (A vs CNAME) as shown in Vercel.

**Vercel URL shows 404**
- Make sure you pushed all files to the correct branch (`main`).
- In Vercel settings, confirm the **Production Branch** is set to `main`.

---

## Free Tier Limits (Vercel Hobby Plan)

The free Vercel plan includes:
- Unlimited personal projects
- 100GB bandwidth per month
- Automatic HTTPS
- Automatic deployments from GitHub
- 1 custom domain per project

This is more than enough for a professional portfolio or small business site.

---

*MyCloudeWEB Deploy Guide — Copyright: Luis Recalde 2026 — MIT License*
