'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import UseSearchParamsHook from '@/hooks/use-search-params'
import button from "@/style/button.module.css"
export default function ThiredStep() {
    
   const {pathname,router,addQueryString}=UseSearchParamsHook()

    const handleConfirm = () => {
        
        
        router.push(pathname)
        localStorage.removeItem('task')
    }
const handleBackClick = () => {
    addQueryString('step','2')
}
  return (
    <div>
        
           
                <div className="space-y-1">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" />
                </div>
           
            <div className="flex mt-8 w-full' justify-around gap-20">
                <Button className={`${button['cancel-button']} w-full`} onClick={handleBackClick}>Back</Button>
                <Button className={`${button['confirm-button']} w-full`} onClick={handleConfirm}>Confirm</Button>
            </div>
    
    </div>
  )
}
