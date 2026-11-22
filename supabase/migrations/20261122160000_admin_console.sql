-- The admin console at /admin.
--
-- The console reads and writes through the signed-in admin's own session, so
-- everything it can do is decided here, by row level security, and not by
-- the page. Three things are needed:
--
--   1. The owner's account holds the admin role.
--   2. Admins can see and update the tables the console manages where they
--      could not before (requests could be read but not updated; visa
--      applications and uploaded documents could not be read at all).
--   3. A function that lists accounts, because auth.users is not reachable
--      from the browser.

-- 1. The owner is an admin. The account already exists; this only adds the
--    role, and does nothing if it is already there.
insert into public.user_roles (user_id, role)
select u.id, 'admin'::public.app_role
from auth.users u
where lower(u.email) = 'gdzeukou@gmail.com'
  and u.email_confirmed_at is not null
  and not exists (
    select 1 from public.user_roles r
    where r.user_id = u.id and r.role = 'admin'
  );

-- 2. What an admin can reach.

-- Requests: move a lead through its stages and keep notes on it.
drop policy if exists "Admin can update all submissions" on public.form_submissions;
create policy "Admin can update all submissions" on public.form_submissions
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Visa applications started in the old application form.
drop policy if exists "Admins can view all applications" on public.visa_applications;
create policy "Admins can view all applications" on public.visa_applications
  for select to authenticated
  using (public.is_admin());

drop policy if exists "Admins can update all applications" on public.visa_applications;
create policy "Admins can update all applications" on public.visa_applications
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Documents travelers uploaded to their file, and the files themselves.
drop policy if exists "Admins can view all documents" on public.user_documents;
create policy "Admins can view all documents" on public.user_documents
  for select to authenticated
  using (public.is_admin());

drop policy if exists "Admins can view all documents in storage" on storage.objects;
create policy "Admins can view all documents in storage" on storage.objects
  for select to authenticated
  using (bucket_id = 'user-documents' and public.is_admin());

-- 3. Every account, with what the console shows about it. No passport
--    number or date of birth: the list does not need them.
create or replace function public.admin_list_users()
returns table (
  id uuid,
  email text,
  created_at timestamptz,
  last_sign_in_at timestamptz,
  email_confirmed boolean,
  providers text[],
  first_name text,
  last_name text,
  phone text,
  nationality text,
  roles text[],
  request_count bigint,
  order_count bigint
)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;

  return query
  select
    u.id,
    u.email::text,
    u.created_at,
    u.last_sign_in_at,
    u.email_confirmed_at is not null,
    coalesce(
      array(select jsonb_array_elements_text(u.raw_app_meta_data -> 'providers')),
      '{}'::text[]
    ),
    p.first_name,
    p.last_name,
    p.phone,
    p.nationality,
    coalesce(
      (select array_agg(r.role::text order by r.role) from public.user_roles r where r.user_id = u.id),
      '{}'::text[]
    ),
    (select count(*) from public.form_submissions f
      where f.user_id = u.id or lower(f.email) = lower(u.email)),
    (select count(*) from public.scoutpass_orders o
      where lower(o.email) = lower(u.email))
  from auth.users u
  left join public.profiles p on p.id = u.id
  order by u.created_at desc;
end;
$$;

revoke all on function public.admin_list_users() from public, anon;
grant execute on function public.admin_list_users() to authenticated;
