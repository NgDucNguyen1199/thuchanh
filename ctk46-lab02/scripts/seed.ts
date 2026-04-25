import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing env vars: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seed() {
  console.log('Seeding data...')

  // 1. Get an admin user (needed for author_id)
  const { data: profiles, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('role', 'admin')
    .limit(1)

  if (profileError || !profiles || profiles.length === 0) {
    console.error('No admin profile found. Please register an account and set its role to admin first.')
    return
  }

  const adminId = profiles[0].id

  // 2. Insert Categories
  const categories = [
    { name: 'Công nghệ', slug: 'cong-nghe' },
    { name: 'Lập trình', slug: 'lap-trinh' },
    { name: 'Đời sống', slug: 'doi-song' },
  ]

  const { data: insertedCats, error: catError } = await supabase
    .from('categories')
    .upsert(categories, { onConflict: 'slug' })
    .select()

  if (catError) {
    console.error('Error seeding categories:', catError)
    return
  }

  console.log('Categories seeded.')

  // 3. Insert Posts
  const catMap = Object.fromEntries(insertedCats.map((c) => [c.slug, c.id]))

  const posts = [
    {
      author_id: adminId,
      category_id: catMap['lap-trinh'],
      title: 'Chào mừng đến với Next.js 15',
      slug: 'chao-mung-den-voi-nextjs-15',
      excerpt: 'Khám phá những tính năng mới nhất của Next.js 15 và cách bắt đầu.',
      content: 'Next.js 15 mang đến nhiều cải tiến về hiệu năng và trải nghiệm lập trình viên. Từ Turbopack mặc định đến các cải tiến trong Server Components...',
      status: 'published',
      published_at: new Date().toISOString(),
    },
    {
      author_id: adminId,
      category_id: catMap['cong-nghe'],
      title: 'AI và tương lai của lập trình',
      slug: 'ai-va-tuong-lai-cua-lap-trinh',
      excerpt: 'Liệu AI có thay thế lập trình viên trong tương lai gần?',
      content: 'Trí tuệ nhân tạo đang phát triển nhanh chóng, thay đổi cách chúng ta viết mã. Tuy nhiên, khả năng tư duy sáng tạo vẫn là lợi thế của con người...',
      status: 'published',
      published_at: new Date().toISOString(),
    },
    {
      author_id: adminId,
      category_id: catMap['doi-song'],
      title: 'Cân bằng giữa công việc và cuộc sống',
      slug: 'can-bang-cong-viec-cuoc-song',
      excerpt: 'Mẹo để giữ tinh thần thoải mái khi làm việc trong ngành IT.',
      content: 'Làm việc từ xa mang lại nhiều lợi ích nhưng cũng đi kèm với những thách thức. Hãy dành thời gian cho bản thân và gia đình nhiều hơn...',
      status: 'published',
      published_at: new Date().toISOString(),
    },
    {
      author_id: adminId,
      category_id: catMap['lap-trinh'],
      title: 'Học TypeScript trong 10 phút',
      slug: 'hoc-typescript-trong-10-phut',
      excerpt: 'Tại sao bạn nên dùng TypeScript thay vì JavaScript thuần?',
      content: 'TypeScript giúp bắt lỗi sớm hơn và cải thiện khả năng đọc mã. Các tính năng như Interface, Type Aliases rất mạnh mẽ...',
      status: 'published',
      published_at: new Date().toISOString(),
    },
    {
      author_id: adminId,
      category_id: catMap['cong-nghe'],
      title: 'Đánh giá iPhone 16 Pro Max',
      slug: 'danh-gia-iphone-16-pro-max',
      excerpt: 'Những cải tiến đáng giá trên dòng flagship mới nhất của Apple.',
      content: 'iPhone 16 Pro Max năm nay tập trung vào khả năng quay phim chuyên nghiệp và chip A18 Bionic mạnh mẽ vượt trội...',
      status: 'published',
      published_at: new Date().toISOString(),
    },
    {
      author_id: adminId,
      category_id: catMap['doi-song'],
      title: 'Tại sao bạn nên bắt đầu viết Blog?',
      slug: 'tai-sao-nen-bat-dau-viet-blog',
      excerpt: 'Viết lách là một cách tuyệt vời để hệ thống lại kiến thức và xây dựng thương hiệu cá nhân.',
      content: 'Mỗi bài viết là một lần bạn học lại kiến thức đó một cách sâu sắc hơn. Đừng ngần ngại chia sẻ những gì bạn biết...',
      status: 'published',
      published_at: new Date().toISOString(),
    },
  ]

  const { error: postError } = await supabase
    .from('posts')
    .upsert(posts, { onConflict: 'slug' })

  if (postError) {
    console.error('Error seeding posts:', postError)
    return
  }

  console.log('Posts seeded successfully!')
}

seed().catch(console.error)
