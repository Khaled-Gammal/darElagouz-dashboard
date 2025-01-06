'use client'
import InputField from '@/components/shared/input-field'
import { Button } from '@/components/ui/button'
import UseSearchParamsHook from '@/hooks/use-search-params'
import button from "@/style/button.module.css"
import { useEffect, useReducer } from 'react'
const initialState = {
    address: '',
    city: '',
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'address':
            return {...state, address: action.payload}
        case 'city':
            return {...state, city: action.payload}
        default:
            return state
    }
}
export default function ThiredStep() {
    
   const {pathname,router,addQueryString}=UseSearchParamsHook()
   const [state,dispatch]=useReducer(reducer,initialState)

    const handleConfirm = () => {
        
        
        router.push(pathname)
        localStorage.removeItem('task')
    }
const handleBackClick = () => {
    addQueryString('step','2')
}

useEffect(()=>{
    const task=JSON.parse(localStorage.getItem('task'))
    Object.keys(task).forEach(key=>{
        dispatch({type:key,payload:task[key]})
    })
},[])
  return (
    <div className='flex flex-col gap-4'>
        
           
        <InputField
            name={'address'}
            label={'Address'}
            placeholder={'Enter the address'}
            value={state?.address}
            onChange={(e)=>dispatch({type:'address',payload:e.target.value})}
            />
            <InputField
            name={'city'}
            label={'City'}
            placeholder={'Enter the city'}
            value={state?.city}
            onChange={(e)=>dispatch({type:'city',payload:e.target.value})}
            />
           
            <div className="flex mt-8 w-full' justify-around gap-20">
                <Button className={`${button['cancel-button']} w-full`} onClick={handleBackClick}>Back</Button>
                <Button className={`${button['confirm-button']} w-full`} onClick={handleConfirm}>Confirm</Button>
            </div>
    
    </div>
  )
}
