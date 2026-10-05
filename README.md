# Sage Hall Dance - Website Mockup & Handoff Scaffold

Revamped modern western website mockup for **Sage Hall Dance** (country swing & social dancehall), designed for direct zero-configuration hosting on **GitHub Pages**.

---

## 🌟 Included Features & Integrations

1. **Brand Identity & Extracted Logo**
   - High-resolution extracted transparent PNG logo (`assets/logo_dark_only.png`) derived directly from the dancehall flyer.
   - Warm western color palette: Cobalt/Navy (`#144d8c`), Sunflower Gold (`#d97724`), Saddle Leather (`#6b4329`), and Parchment Sand (`#faf6f0`).

2. **Flyer Schedule Spotlight**
   - Complete digital representation of the September country swing dance schedule across partner venues (**Fairgrounds Event Center**, **Mountain Valley Athletics**, and **Cache Bar 21+**).

3. **Google Calendar Integration**
   - Live embedded Google Calendar synced for mobile and desktop visitors.
   - **One-click organizer sign-in**: Organizers can tap the "Sign In to Google Calendar" button to add, edit, or delete dances directly from their phone/browser without logging into a website admin panel.
   - **Live Config Tool**: Visitors or admins can tap "Change Calendar ID" to preview their own calendar ID dynamically.

4. **Instagram Reels & Social Media Grid**
   - Responsive reel cards highlighting dance tutorials (barrel rolls, pretzel turns) and social night recap photo dumps.
   - Direct integration links to `@sagehalldance` on Instagram.

5. **Dancers of the Week**
   - Community spotlight cards highlighting top leads, follows, and rising stars with their favorite moves and social links.

6. **Partner Venues Section**
   - Clear breakdown of event nights, age restrictions, and venue highlights.

---

## 🚀 How to Host on GitHub Pages

Because this site uses pure standard HTML5, CSS3, and JavaScript, it requires **zero build steps** and works out of the box with GitHub Pages:

### Step 1: Initialize & Push to GitHub
Run the following commands in this directory:
```bash
git init
git add .
git commit -m "Initial Sage Hall Dance revamp mockup"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<REPO_NAME>.git
git push -u origin main
```

### Step 2: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** &rarr; **Pages** (under Code and automation).
3. Under **Branch**, select `main` and folder `/ (root)`.
4. Click **Save**.
5. Your website will be live in 1-2 minutes at:
   `https://<YOUR_GITHUB_USERNAME>.github.io/<REPO_NAME>/`

---

## 🤖 Handoff Guide for Gemini / Local Agents

To continue developing or customizing this project with an AI agent:

- **Connect Real Calendar**: Update `DEFAULT_CALENDAR_SRC` in `script.js` or the `src` attribute of the iframe in `index.html` with the dancehall's public Google Calendar ID.
- **Connect Real Instagram Reels**: Replace placeholder video cards with official Instagram embed code (`<blockquote class="instagram-media">...`) or Elfsight widget code.
- **Update Weekly Dancers**: Edit the `.dancers-grid` elements in `index.html` to spotlight new community members every week.
