import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { login, loginWithGithub } from '@/app/actions/auth'
import { Mail, Lock, ArrowRight, User } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-lg border-t-4 border-t-blue-600">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-extrabold text-center tracking-tight">Chào mừng trở lại</CardTitle>
          <CardDescription className="text-center text-gray-500">
            Đăng nhập để quản lý bài viết của bạn
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          <form action={login} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                Email
              </Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="name@example.com"
                required 
                className="focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-400" />
                  Mật khẩu
                </Label>
              </div>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                placeholder="••••••••"
                required 
                className="focus:ring-blue-500"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2">
              Đăng nhập Email
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Hoặc tiếp tục với</span>
            </div>
          </div>

          <form action={loginWithGithub}>
            <Button type="submit" variant="outline" className="w-full border-gray-300 hover:bg-gray-50 font-medium">
              <User className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t bg-gray-50/50 p-6 rounded-b-lg">
          <div className="text-sm text-center text-gray-600">
            Chưa có tài khoản?{' '}
            <Link href="/register" className="text-blue-600 hover:underline font-semibold">
              Tạo tài khoản mới
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
