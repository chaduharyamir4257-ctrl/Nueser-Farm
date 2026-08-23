# Khalil Nursery — Easy Setup Guide

This project is a real nursery website built with Next.js, Tailwind CSS, Supabase, and Cloudinary.
You can run it locally right now, even before the real database is connected.

## Step 1: Install and start locally

1. Open a terminal in this folder:
   `e:/Personal_Projects/khalil-nursery-nextjs/khalil-nursery`
2. Install packages:
   `npm install`
3. Copy the example environment file:
   `copy .env.local.example .env.local`
4. Start the app:
   `npm run dev`
5. Open your browser:
   `http://localhost:3000`

If the site displays, your local setup is working.

## Step 2: Understand the `.env.local` file

This project uses a local environment file to store settings.
Open `.env.local` and fill in these values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
NEXT_PUBLIC_WHATSAPP_NUMBER=923474254696
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-preset-name
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USER=you@gmail.com
EMAIL_SMTP_PASS=your-app-password
EMAIL_TO=admin@example.com
```

Notes:
- `NEXT_PUBLIC_WHATSAPP_NUMBER` is the phone number customers use for orders.
- Cloudinary values are only needed if you want image upload in the admin panel.
- For Gmail, use `smtp.gmail.com`, port `587`, and an app password instead of your normal Gmail password.
- For SendGrid, set `EMAIL_SMTP_HOST=smtp.sendgrid.net`, `EMAIL_SMTP_PORT=587`, `EMAIL_SMTP_USER=apikey`, and `EMAIL_SMTP_PASS=<your-sendgrid-api-key>`.

## Step 3: Use the website now

The public website works with built-in sample data if Supabase is not ready yet.
This means you can see the store pages immediately.

Try these pages:
- `http://localhost:3000`
- `http://localhost:3000/plants`
- `http://localhost:3000/fertilizers`
- `http://localhost:3000/services`
- `http://localhost:3000/contact`

## Step 4: Admin login and dashboard

To use the admin panel, open:
- `http://localhost:3000/admin`

If the site redirects you to login, that is normal.
The admin panel is protected and only works after you connect Supabase and create a user.

## Step 5: Connect Supabase for real data

This is the only step needed to make the admin save real items.

1. Go to `https://supabase.com` and create a free project.
2. In Supabase, open the SQL Editor.
3. Open `supabase/schema.sql` in this project and run that SQL.
4. Copy the project URL and anon key from Supabase settings.
5. Paste them into `.env.local` under:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. In Supabase, go to Authentication → Users and add one user.
7. Restart the app:
   `npm run dev`
8. Use the new email/password to log in at `/admin/login`.

## Step 6: Add Cloudinary for admin image uploads

This is optional. If you want image upload in the admin dashboard, do this:

1. Create a Cloudinary account.
2. In Cloudinary, create an unsigned upload preset.
3. Add these values to `.env.local`:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
4. Restart the app.

## Step 7: Deploy later

When you are ready to deploy:
1. Push your code to GitHub.
2. Use Vercel to import the repository.
3. Add the same environment variables in Vercel.
4. Deploy.

## Quick checklist

- `npm install` ✅
- `.env.local` created ✅
- `npm run dev` working ✅
- Browser opens `http://localhost:3000` ✅
- Supabase optional for preview ✅
- Cloudinary optional for upload ✅

## If you want the simplest start

Start with sample data now.
Later, add Supabase and Cloudinary when you want the admin to save real data.

---

If you want, I can also give you the exact Supabase steps as a separate small checklist for your client deployment.
;