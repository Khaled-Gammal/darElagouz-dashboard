'use client'
import { DatePickerDemo } from '@/components/shared/date-picker'
import InputField from '@/components/shared/input-field'
import SelectField from '@/components/shared/select-field'
import { Button } from '@/components/ui/button'
import UseSearchParamsHook from '@/hooks/use-search-params'
import React, { useEffect, useReducer } from 'react'
import button from "@/style/button.module.css"
const initialState = {
    title: '',
    assignedTo: '',
    status: '',
    creationDate: '',
    dueDate: ''
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'title':
            return {...state, title: action.payload}
        case 'assignedTo':
            return {...state, assignedTo: action.payload}
        case 'status':
            return {...state, status: action.payload}
        case 'creationDate':
            return {...state, creationDate: action.payload}
        case 'dueDate':
            return {...state, dueDate: action.payload}
        default:
            return state
    }
}

export default function FirstStep() {
    const {addQueryString}=UseSearchParamsHook()
    const [state,dispatch]=useReducer(reducer,initialState)
    const handleNextClick = () => {
        addQueryString('step','2')
        localStorage.setItem('task',JSON.stringify(state))
    }
    useEffect(()=>{
        addQueryString('step', '1')

    },[])

    return (
        <div>
           <div className="mt-4 flex flex-col gap-[14px]">
            <InputField
            name={'title'}
            label={'Title'}
            placeholder={'Enter the title of the task'}
            value={state?.title}
            onChange={(e)=>dispatch({type:'title',payload:e.target.value})}
            />
            <SelectField
            id={'group_id'}
            name={'Assigned To'}
            label={'Assigned To'}
            placeholder={'Select the person'}
            value={state?.assignedTo}
            onChange={(e)=>dispatch({type:'assignedTo',payload:e})}
            renderValue={(options,value)=>{
                const selectedOption = options?.find(option=>option.group_id===value)
                return selectedOption?.name
            }}
            path={'/dashboard/groups/'}
            options={[]}
            view='name'
            />
            <SelectField
            name={'Status'}
            label={'Status'}
            placeholder={'Select the status'}
            value={state?.status}
            onChange={(e)=>dispatch({type:'status',payload:e})}
            options={['Started','Not Started','Completed']}
            />
            <DatePickerDemo
            id={'creationDate'}
            label={'Creation Date'}
            placeholder={'Select the date'}
            value={state?.creationDate}
            onChange={(e)=>dispatch({type:'creationDate',payload:e})}
            />
            <InputField
            name="Due Date"
            label="Due Date"
            placeholder="Select the date"
            value={state?.dueDate}
            onChange={(e)=>dispatch({type:'dueDate',payload:e.target.value})}
            />
            </div>
            <div className="mt-8 flex justify-around gap-20">
            <Button className={`${button['cancel-button']} w-full`}>Cancel</Button>
            <Button className={`${button['confirm-button']} w-full`} onClick={handleNextClick}>Next</Button>
           
            </div>
        </div>
    )
}