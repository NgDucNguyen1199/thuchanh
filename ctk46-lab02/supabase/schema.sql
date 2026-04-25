-- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null primary key,
  display_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Create a table for posts
create table posts (
  id uuid default gen_random_uuid() primary key,
  author_id uuid references profiles(id) not null,
  title text not null,
  slug text unique not null,
  content text,
  excerpt text,
  status text check (status in ('draft', 'published')) default 'draft',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  published_at timestamp with time zone
);

alter table posts enable row level security;

create policy "Published posts are viewable by everyone." on posts
  for select using (status = 'published');

create policy "Users can view all their own posts." on posts
  for select using (auth.uid() = author_id);

create policy "Users can insert their own posts." on posts
  for insert with check (auth.uid() = author_id);

create policy "Users can update their own posts." on posts
  for update using (auth.uid() = author_id);

create policy "Users can delete their own posts." on posts
  for delete using (auth.uid() = author_id);

-- Create a table for comments
create table comments (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references posts(id) on delete cascade not null,
  author_id uuid references profiles(id) not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table comments enable row level security;

create policy "Comments are viewable by everyone." on comments
  for select using (
    exists (
      select 1 from posts where posts.id = comments.post_id and posts.status = 'published'
    )
  );

create policy "Authenticated users can insert comments." on comments
  for insert with check (auth.role() = 'authenticated');

create policy "Users can delete their own comments." on comments
  for delete using (auth.uid() = author_id);

-- Function to handle new user signup
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create a profile when a new user signs up
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Trigger for updated_at on posts and profiles (optional but good practice)
create extension if not exists moddatetime schema extensions;

create trigger handle_updated_at_profiles before update on profiles
  for each row execute procedure moddatetime (updated_at);

create trigger handle_updated_at_posts before update on posts
  for each row execute procedure moddatetime (updated_at);
