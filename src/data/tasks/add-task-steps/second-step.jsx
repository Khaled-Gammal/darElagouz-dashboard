'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UseSearchParamsHook from "@/hooks/use-search-params";
import button from "@/style/button.module.css";

export default function SecondStep() {
   const {addQueryString,router}=UseSearchParamsHook()
  const handleNextClick = () => {
    addQueryString("step", "3");
  };

  const handleBackClick = () => {
    router.push('/tasks/?step=1')
  };
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
       
        
 <div className="mt-8 flex justify-around gap-20 w-full">
            <Button className={`${button['cancel-button']} w-full`} onClick={handleBackClick}>Back</Button>
            <Button className={`${button['confirm-button']} w-full`} onClick={handleNextClick}>Next</Button>
           
            </div>
       
     
    </div>
  );
}
