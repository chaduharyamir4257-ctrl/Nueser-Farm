-- Run this once in Supabase Dashboard -> SQL Editor -> New query.
-- Sets up the three catalog tables plus row-level security so that
-- ANYONE can read products (public storefront) but only a logged-in
-- admin can write (create/update/delete).

create extension if not exists pgcrypto;

create table if not exists plants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  category text not null check (category in ('indoor','outdoor','succulent','flowering')),
  size text,
  size_value numeric,
  size_unit text check (size_unit in ('inch', 'feet')),
  age text,
  age_value numeric,
  age_unit text check (age_unit in ('months', 'years')),
  price integer not null,
  sale_price integer,
  discount_percent numeric,
  promo_label text,
  promo_tags text[] default '{}',
  promo_start_at timestamptz,
  promo_end_at timestamptz,
  is_featured boolean default false,
  is_new_arrival boolean default false,
  description text,
  care_light text,
  care_watering text,
  image_url text,
  gallery_urls text[] default '{}',
  in_stock boolean default true,
  created_at timestamptz default now()
);

alter table plants
  add column if not exists size_value numeric,
  add column if not exists size_unit text,
  add column if not exists age_value numeric,
  add column if not exists age_unit text,
  add column if not exists sale_price integer,
  add column if not exists discount_percent numeric,
  add column if not exists promo_label text,
  add column if not exists promo_tags text[] default '{}',
  add column if not exists promo_start_at timestamptz,
  add column if not exists promo_end_at timestamptz,
  add column if not exists is_featured boolean default false,
  add column if not exists is_new_arrival boolean default false;

alter table plants
  drop constraint if exists plants_size_unit_check,
  drop constraint if exists plants_age_unit_check;

alter table plants
  add constraint plants_size_unit_check check (size_unit in ('inch', 'feet'));

alter table plants
  add constraint plants_age_unit_check check (age_unit in ('months', 'years'));

create table if not exists fertilizers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price integer not null,
  sale_price integer,
  discount_percent numeric,
  promo_label text,
  promo_tags text[] default '{}',
  promo_start_at timestamptz,
  promo_end_at timestamptz,
  is_featured boolean default false,
  is_new_arrival boolean default false,
  description text,
  image_url text,
  in_stock boolean default true,
  created_at timestamptz default now()
);

alter table fertilizers
  add column if not exists sale_price integer,
  add column if not exists discount_percent numeric,
  add column if not exists promo_label text,
  add column if not exists promo_tags text[] default '{}',
  add column if not exists promo_start_at timestamptz,
  add column if not exists promo_end_at timestamptz,
  add column if not exists is_featured boolean default false,
  add column if not exists is_new_arrival boolean default false;

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  address text,
  company text,
  reference text,
  notes text,
  created_at timestamptz default now()
);

alter table clients
  add column if not exists email text,
  add column if not exists phone text,
  add column if not exists address text,
  add column if not exists company text,
  add column if not exists reference text,
  add column if not exists notes text;

alter table clients
  alter column email drop not null,
  alter column phone drop not null;

alter table clients enable row level security;
drop policy if exists "Admin read clients" on clients;
drop policy if exists "Admin write clients" on clients;
create policy "Admin read clients" on clients for select using (auth.role() = 'authenticated');
create policy "Admin write clients" on clients for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  size_label text,
  description text,
  image_url text,
  created_at timestamptz default now()
);

-- Row Level Security: public can read, only authenticated admin can write
alter table plants enable row level security;
alter table fertilizers enable row level security;
alter table services enable row level security;

drop policy if exists "Public read plants" on plants;
drop policy if exists "Public read fertilizers" on fertilizers;
drop policy if exists "Public read services" on services;
drop policy if exists "Admin write plants" on plants;
drop policy if exists "Admin write fertilizers" on fertilizers;
drop policy if exists "Admin write services" on services;

create policy "Public read plants" on plants for select using (true);
create policy "Public read fertilizers" on fertilizers for select using (true);
create policy "Public read services" on services for select using (true);

create policy "Admin write plants" on plants for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin write fertilizers" on fertilizers for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin write services" on services for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Inquiries table: stores messages submitted from the public contact form.
create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  topic text,
  message text not null,
  read boolean default false,
  created_at timestamptz default now()
);

alter table inquiries enable row level security;
drop policy if exists "Allow public insert inquiries" on inquiries;
drop policy if exists "Admin read inquiries" on inquiries;
drop policy if exists "Admin write inquiries" on inquiries;
drop policy if exists "Admin update inquiries" on inquiries;
drop policy if exists "Admin delete inquiries" on inquiries;
create policy "Allow public insert inquiries" on inquiries for insert using (true) with check (true);
create policy "Admin read inquiries" on inquiries for select using (auth.role() = 'authenticated');
create policy "Admin update inquiries" on inquiries for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin delete inquiries" on inquiries for delete using (auth.role() = 'authenticated');

-- If you are using Supabase storage for admin uploads, add the images bucket and storage policies.
-- Run these in the Supabase SQL editor if the bucket does not already exist.
--
-- select storage.create_bucket('images', 'public');
--
-- alter table storage.objects enable row level security;
--
-- create policy "Allow authenticated storage delete" on storage.objects for delete
--   using (auth.role() = 'authenticated' AND bucket_id = 'images');
--
-- create policy "Allow authenticated storage insert" on storage.objects for insert
--   with check (auth.role() = 'authenticated' AND bucket_id = 'images');

-- After running this: Authentication -> Users -> Add user, to create
-- the one owner login used by /admin.
