-- AtlasAI Store — Supabase Schema
-- Run this in your Supabase SQL editor

-- ─── Orders ───────────────────────────────────────────────────────────────────
create table if not exists public.orders (
  id             uuid primary key default gen_random_uuid(),
  customer_email text not null,
  customer_name  text,
  items          jsonb not null default '[]',
  total          numeric(10,2) not null,
  status         text not null default 'pending' check (status in ('pending','paid','refunded')),
  stripe_pi      text,
  created_at     timestamptz default now()
);

-- ─── Agent Logs ───────────────────────────────────────────────────────────────
create table if not exists public.agent_logs (
  id         uuid primary key default gen_random_uuid(),
  role       text not null,
  task       text not null,
  output     text,
  provider   text,
  created_at timestamptz default now()
);

-- ─── Analytics Events ─────────────────────────────────────────────────────────
create table if not exists public.analytics_events (
  id         uuid primary key default gen_random_uuid(),
  event      text not null,
  payload    jsonb default '{}',
  created_at timestamptz default now()
);

-- ─── RLS ──────────────────────────────────────────────────────────────────────
alter table public.orders          enable row level security;
alter table public.agent_logs      enable row level security;
alter table public.analytics_events enable row level security;

-- Only service role can read/write orders and logs (called from API routes)
-- No public access needed — all mutations go through Next.js API routes with service key
create policy "service only" on public.orders          for all using (false);
create policy "service only" on public.agent_logs      for all using (false);
create policy "service only" on public.analytics_events for all using (false);

-- ─── Indexes ──────────────────────────────────────────────────────────────────
create index if not exists orders_email_idx      on public.orders (customer_email);
create index if not exists orders_status_idx     on public.orders (status);
create index if not exists agent_logs_role_idx   on public.agent_logs (role);
create index if not exists analytics_event_idx   on public.analytics_events (event);
