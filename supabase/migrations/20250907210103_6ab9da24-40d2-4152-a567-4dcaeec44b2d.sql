
-- 1) PROFILES RLS HARDENING
alter table public.profiles enable row level security;

-- Drop overly permissive policies if they exist
drop policy if exists "Users can view all profiles" on public.profiles;
drop policy if exists "Users can update their own profile" on public.profiles;
drop policy if exists "Admins can insert profiles" on public.profiles;

-- Restrict SELECT: users see their own; admins see all
create policy "Users can view own profile"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

create policy "Admins can view all profiles"
  on public.profiles
  for select
  to authenticated
  using (is_admin(auth.uid()));

-- Restrict INSERT:
-- - Regular users: can only insert their own row and only with role='farm_owner'
create policy "Users can insert their own profile (farm_owner only)"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = id and role = 'farm_owner'::user_role);

-- - Admins: can insert any profile (for admin ops / backfill)
create policy "Admins can insert profiles"
  on public.profiles
  for insert
  to authenticated
  with check (is_admin(auth.uid()));

-- Restrict UPDATE:
-- - Users can update only their own row (details), but a trigger (below) forbids role changes unless admin
create policy "Users can update their own profile"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- - Admins can update any profile
create policy "Admins can update any profile"
  on public.profiles
  for update
  to authenticated
  using (is_admin(auth.uid()))
  with check (is_admin(auth.uid()));

-- 1b) Prevent role changes by non-admins via trigger
create or replace function public.prevent_role_change_by_non_admin()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'UPDATE' then
    if new.role is distinct from old.role and not is_admin(auth.uid()) then
      raise exception 'Only admins can change roles';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_prevent_role_change on public.profiles;
create trigger trg_prevent_role_change
before update on public.profiles
for each row execute function public.prevent_role_change_by_non_admin();

-- 1c) Ensure profile auto-creation on signup (prevents self-insert escalation)
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2) STORAGE POLICIES FOR 'farm-images' BUCKET
-- Public read (keep images visible to all visitors)
drop policy if exists "Public read farm-images" on storage.objects;
create policy "Public read farm-images"
  on storage.objects
  for select
  to public
  using (bucket_id = 'farm-images');

-- Only admins or farm owners (based on first path segment = farm_id) can insert
drop policy if exists "Owners can upload farm-images" on storage.objects;
create policy "Owners can upload farm-images"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'farm-images'
    and (
      is_admin(auth.uid())
      or exists (
        select 1 from public.farms
        where id = uuid(split_part(name, '/', 1)) and owner_id = auth.uid()
      )
    )
  );

-- Only admins or farm owners can update/replace objects
drop policy if exists "Owners can update farm-images" on storage.objects;
create policy "Owners can update farm-images"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'farm-images'
    and (
      is_admin(auth.uid())
      or exists (
        select 1 from public.farms
        where id = uuid(split_part(name, '/', 1)) and owner_id = auth.uid()
      )
    )
  )
  with check (
    bucket_id = 'farm-images'
    and (
      is_admin(auth.uid())
      or exists (
        select 1 from public.farms
        where id = uuid(split_part(name, '/', 1)) and owner_id = auth.uid()
      )
    )
  );

-- Only admins or farm owners can delete their objects
drop policy if exists "Owners can delete farm-images" on storage.objects;
create policy "Owners can delete farm-images"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'farm-images'
    and (
      is_admin(auth.uid())
      or exists (
        select 1 from public.farms
        where id = uuid(split_part(name, '/', 1)) and owner_id = auth.uid()
      )
    )
  );

-- 3) OPTIONAL: ADD PUBLIC CONTACT EMAIL TO FARMS (so we can keep profiles private)
alter table public.farms
  add column if not exists contact_email text;
