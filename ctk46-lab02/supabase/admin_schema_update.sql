-- 1. Thêm cột role vào bảng profiles
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='role') THEN
        ALTER TABLE public.profiles ADD COLUMN role text DEFAULT 'user' CHECK (role IN ('admin', 'user'));
    END IF;
END $$;

-- 2. Tạo bảng danh mục (categories)
CREATE TABLE IF NOT EXISTS public.categories (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    slug text UNIQUE NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Thêm category_id vào bảng posts
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='category_id') THEN
        ALTER TABLE public.posts ADD COLUMN category_id uuid REFERENCES public.categories(id);
    END IF;
END $$;

-- 4. Bật RLS cho bảng categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- 5. Cập nhật RLS cho Categories
DROP POLICY IF EXISTS "Categories are viewable by everyone." ON public.categories;
CREATE POLICY "Categories are viewable by everyone." ON public.categories
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Only admin can modify categories." ON public.categories;
CREATE POLICY "Only admin can modify categories." ON public.categories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

-- 6. Cập nhật RLS cho Posts (Chỉ Admin mới được thêm/sửa/xóa)
DROP POLICY IF EXISTS "Users can insert their own posts." ON public.posts;
DROP POLICY IF EXISTS "Users can update their own posts." ON public.posts;
DROP POLICY IF EXISTS "Users can delete their own posts." ON public.posts;

CREATE POLICY "Only admin can insert posts." ON public.posts
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Only admin can update posts." ON public.posts
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Only admin can delete posts." ON public.posts
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

-- 7. Cập nhật RLS cho Profiles (Admin có quyền xem và sửa role)
DROP POLICY IF EXISTS "Admin can view all profiles." ON public.profiles;
CREATE POLICY "Admin can view all profiles." ON public.profiles
    FOR SELECT USING (
        auth.uid() = id OR 
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

DROP POLICY IF EXISTS "Admin can update roles." ON public.profiles;
CREATE POLICY "Admin can update roles." ON public.profiles
    FOR UPDATE USING (
        auth.uid() = id OR 
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

-- 8. Cập nhật RLS cho Comments (Admin có thể xóa bất kỳ comment nào)
DROP POLICY IF EXISTS "Admin and owners can delete comments." ON public.comments;
CREATE POLICY "Admin and owners can delete comments." ON public.comments
    FOR DELETE USING (
        auth.uid() = author_id OR 
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

-- 9. Trigger tự động cập nhật updated_at cho categories
DROP TRIGGER IF EXISTS handle_updated_at_categories ON public.categories;
CREATE TRIGGER handle_updated_at_categories BEFORE UPDATE ON public.categories
    FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);
