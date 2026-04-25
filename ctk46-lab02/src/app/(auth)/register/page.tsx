import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { signup } from '@/app/actions/auth'

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Đăng ký</CardTitle>
          <CardDescription className="text-center">Tạo tài khoản mới</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signup} className="space-y-3">
            <Label htmlFor="display_name">Tên hiển thị</Label>
            <Input id="display_name" name="display_name" required />
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
            <Label htmlFor="password">Mật khẩu</Label>
            <Input id="password" name="password" type="password" required />
            <Button type="submit" className="w-full">Đăng ký</Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <Link href="/login" className="text-sm text-blue-500">Đã có tài khoản?</Link>
        </CardFooter>
      </Card>
    </div>
  )
}
