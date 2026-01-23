# 🔄 Keep Backend Alive Guide

Your Render free tier backend spins down after 15 minutes of inactivity. Here are several ways to keep it awake.

---

## ⭐ Option 1: Cron-Job.org (Recommended - Free & Easy)

**Best for:** Simple setup, no code needed

### Steps:

1. **Go to:** https://cron-job.org/en/
2. **Sign up** for a free account
3. **Create a new cron job:**
   - **Title:** Keep Ubuntu Health Vault Alive
   - **URL:** `https://your-backend.onrender.com/health`
   - **Schedule:** Every 10 minutes
   - **HTTP Method:** GET
   - **Enabled:** Yes

4. **Save** and you're done!

**Pros:**
- ✅ Completely free
- ✅ No code needed
- ✅ Reliable
- ✅ Email notifications if endpoint fails

**Cons:**
- ⚠️ Depends on external service

---

## Option 2: UptimeRobot (Free Monitoring + Keep Alive)

**Best for:** Monitoring + keeping alive

### Steps:

1. **Go to:** https://uptimerobot.com
2. **Sign up** for a free account
3. **Add New Monitor:**
   - **Monitor Type:** HTTP(s)
   - **Friendly Name:** Ubuntu Health Vault API
   - **URL:** `https://your-backend.onrender.com/health`
   - **Monitoring Interval:** 5 minutes (free tier)
   - **Alert Contacts:** Your email

4. **Create Monitor**

**Pros:**
- ✅ Free tier allows 50 monitors
- ✅ 5-minute intervals
- ✅ Uptime monitoring + alerts
- ✅ Status page available

**Cons:**
- ⚠️ 5-minute minimum interval (vs 1-minute on paid)

---

## Option 3: GitHub Actions (Free for Public Repos)

**Best for:** If you want to keep everything in your repo

I've created a GitHub Actions workflow for you:

### File: `.github/workflows/keep-alive.yml`

```yaml
name: Keep Backend Alive

on:
  schedule:
    # Runs every 10 minutes
    - cron: '*/10 * * * *'
  workflow_dispatch: # Allows manual trigger

jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Backend
        run: |
          response=$(curl -s -o /dev/null -w "%{http_code}" https://your-backend.onrender.com/health)
          if [ $response -eq 200 ]; then
            echo "✅ Backend is alive (HTTP $response)"
          else
            echo "⚠️ Backend returned HTTP $response"
            exit 1
          fi
```

**Setup:**
1. Create the file `.github/workflows/keep-alive.yml` in your repo
2. Replace `your-backend.onrender.com` with your actual URL
3. Commit and push
4. GitHub will automatically run it every 10 minutes

**Pros:**
- ✅ Free for public repos
- ✅ Integrated with your codebase
- ✅ Can customize easily
- ✅ Runs in GitHub's infrastructure

**Cons:**
- ⚠️ Only free for public repos
- ⚠️ Uses GitHub Actions minutes (but you get 2,000/month free)

---

## Option 4: Self-Hosted Cron (If You Have a Server)

**Best for:** If you have a VPS or always-on computer

### Linux/Mac:

```bash
# Edit crontab
crontab -e

# Add this line (pings every 10 minutes)
*/10 * * * * curl -s https://your-backend.onrender.com/health > /dev/null
```

### Windows (Task Scheduler):

1. Open Task Scheduler
2. Create Basic Task
3. Trigger: Daily, repeat every 10 minutes
4. Action: Start a program
5. Program: `curl`
6. Arguments: `https://your-backend.onrender.com/health`

**Pros:**
- ✅ Complete control
- ✅ No external dependencies

**Cons:**
- ⚠️ Requires always-on machine
- ⚠️ More complex setup

---

## Option 5: Frontend Self-Ping (Not Recommended)

**Why not recommended:** Only pings when users visit your site

You could add this to your frontend, but it only works when someone is using your app:

```javascript
// In your frontend App.jsx or main.jsx
useEffect(() => {
  const keepAlive = setInterval(() => {
    fetch('https://your-backend.onrender.com/health')
      .catch(err => console.log('Keep-alive ping failed'))
  }, 10 * 60 * 1000) // Every 10 minutes

  return () => clearInterval(keepAlive)
}, [])
```

**Pros:**
- ✅ No external service needed

**Cons:**
- ⚠️ Only works when users are on your site
- ⚠️ Wastes user's bandwidth
- ⚠️ Not reliable

---

## 📊 Comparison Table

| Solution | Cost | Reliability | Setup Difficulty | Recommended |
|----------|------|-------------|------------------|-------------|
| **Cron-Job.org** | Free | ⭐⭐⭐⭐⭐ | ⭐ Easy | ✅ Yes |
| **UptimeRobot** | Free | ⭐⭐⭐⭐⭐ | ⭐ Easy | ✅ Yes |
| **GitHub Actions** | Free* | ⭐⭐⭐⭐ | ⭐⭐ Medium | ✅ Yes |
| **Self-Hosted Cron** | Free | ⭐⭐⭐ | ⭐⭐⭐ Hard | ⚠️ Maybe |
| **Frontend Ping** | Free | ⭐ | ⭐ Easy | ❌ No |

*Free for public repos

---

## 🎯 My Recommendation

**Use Cron-Job.org or UptimeRobot:**

1. **Cron-Job.org** if you just want to keep it alive
2. **UptimeRobot** if you also want uptime monitoring and alerts

Both are:
- ✅ Free forever
- ✅ Super easy to set up (5 minutes)
- ✅ Very reliable
- ✅ No code changes needed

---

## ⚠️ Important Notes

### Cold Start Still Happens
Even with keep-alive pings, the **first request after deployment** will still be slow because Render needs to start the service.

### Better Solution: Upgrade to Paid Plan
If you need guaranteed uptime:
- **Render Starter Plan:** $7/month
- Always-on (no cold starts)
- 512 MB RAM → 2 GB RAM
- Worth it for production apps

### Free Tier Limits
Render free tier:
- 750 hours/month (enough for 1 service running 24/7)
- Spins down after 15 min inactivity
- 512 MB RAM
- Shared CPU

---

## 🚀 Quick Start (Cron-Job.org)

1. Go to https://cron-job.org/en/signup
2. Verify email
3. Click "Create Cron Job"
4. Fill in:
   ```
   Title: Keep Ubuntu Health Vault Alive
   URL: https://your-backend.onrender.com/health
   Execution schedule: */10 * * * * (every 10 minutes)
   ```
5. Click "Create"
6. Done! ✅

Your backend will now stay awake 24/7.

---

## 📝 Testing

After setting up, verify it's working:

```bash
# Check your backend is responding
curl https://your-backend.onrender.com/health

# Should return:
{"status":"ok","message":"Ubuntu Health Vault API is running"}
```

Monitor your Render logs to see the keep-alive pings coming in every 10 minutes.

---

## 🐛 Troubleshooting

**Problem:** Backend still sleeping
- Check cron job is enabled
- Verify URL is correct (include `https://`)
- Check Render logs for incoming requests

**Problem:** Too many requests
- 10 minutes is optimal (144 requests/day)
- Don't go below 5 minutes (unnecessary)

**Problem:** Cron job failing
- Check backend is actually deployed
- Verify `/health` endpoint works manually
- Check for CORS issues (shouldn't affect GET to /health)

---

Would you like me to create the GitHub Actions workflow file for you, or will you use one of the external services?

