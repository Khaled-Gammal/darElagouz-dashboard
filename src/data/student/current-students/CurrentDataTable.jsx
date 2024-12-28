
'use client';

import { DataTableDemo } from "@/components/shared/table-data";
import { useAddDialog } from "@/hooks/custom-dialog";
import { useEditDialog } from "@/hooks/custom-edit-dialog";
import { useViewDialog } from "@/hooks/custom-view-dialog";
import { useConfirmMessage } from "@/hooks/delete-dialog";
import { handleDeleteRow } from "@/lib/actions/delete-server";
import { handleUpdateInServer } from "@/lib/actions/patch-server";
import { compareData } from "@/lib/utils";
import { toast } from "sonner";
import { editCurrentStudentsFields, viewCurrentStudentsFields } from "./constant-data";
import { DateFilter } from "@/components/shared/date-filter";
import { useState } from "react";
import UseSearchParamsHook from "@/hooks/use-search-params";
import moment from "moment";




export default function CurrentDataTable({currentStudent}) {
console.log(currentStudent);
const [filterDate,setFilterDate]=useState('')
const {pathname,addQueryString}=UseSearchParamsHook() 
  const columns = [
    {
        id: "select",
        header: "",
        className: "text-center",
        accessorKey: "student_id",

    },
    {
      id: "full_name",
      header: "Student Name",
      accessorKey: "full_name",
      className: "text-left",
    },
    {
      id: "code",
      header: "Student Code",
      accessorKey: "code",
      className: "text-center",
    },
    {
      id: "email",
      header: "Student Mail",
      accessorKey: "email",
      className: "text-center",
    },
    
    {
      id: "groups",
      header: "Group Name",
      accessorKey: "groups",
      className: "text-center",
     
    },
    {
      id: "department",
      header: "Department",
      accessorKey: "department",
      className: "text-center",
    },
    {
      id: "phone_number",
      header: "Phone Number",
      accessorKey: "phone_number",
      className: "text-center",
    },
    {
      id: "actions",
      header: "Actions",
      accessorKey: "actions",
      className: "text-center",
    },
  ];
console.log(currentStudent)
  const columnsData = currentStudent?.results.map((student) => {
    return {
      code: student?.code,
      full_name: student.full_name,
      student_id: student.student_id,
      user_image:student?.user_image,
      groups: student.groups.map((group) => group.group_name).join(", "),
      department: student.departments?.map((department) => department.department_name).join(", "),
      phone_number: student.phone_number,
      email: student.email,
      age:student.age,
      gender: student.gender
    };
  }
  );
  
 
  const [handleEditCurrentStudents, editCurrentStudentsConfirmDialog] = useEditDialog({
    onConfirm: (state) => handleEditCurrentStudent(state),
    title: "Edit Student Profile",
    fields: editCurrentStudentsFields,
  });

  const [handleDelete, deleteComponentConfirmDialog] = useConfirmMessage({
    onConfirm: (row) => handleDeleteRow("/dashboard/current-students/", row?.student_id, "/student"),
    text: "Do you sure you wanna to delete this student ? ",
    title: "Delete Student",
    successMessage: "Student deleted successfully",
  });

  const [handleViewCurrentStudent, viewCurrentStudentsConfirmDialog] = useViewDialog({
    // onConfirm: (state) => handleEditCurrentStudent(state),
    title: "Employee Profile",
    fields: viewCurrentStudentsFields,
  });
  const handleEditCurrentStudent = async (state) => {
    try {
      columnsData.forEach(async (row) => {
        if (row.student_id === state.student_id) {
          const changes = compareData(row, state);
          if (Object.keys(changes).length > 0) {
            console.log("changes=>", changes);
            // Call the API to update the student
            const formData=changes
            const response = await handleUpdateInServer(
              `/dashboard/current-students/${row.student_id}/`,
              "PATCH",
              formData,
              true,
              "object",
              "/student"
            );
            if (response.success) {
            toast.success(response.success);
            console.log("Update response=>", response);
            }else {
              toast.error(response.error);
            }
          }
        }
      });
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

const handleFilterDate=(newValue)=>{
  setFilterDate(newValue)
  const formattedDate = moment(newValue).format('DD-MM-YYYY');
  addQueryString("date",formattedDate)
}
  return (
    <div className="flex flex-col gap-6">
    <div className="flex justify-end items-center">
    <DateFilter
      value={filterDate}
      onChange={handleFilterDate}
    />
    </div>
      <DataTableDemo data={columnsData} columns={columns} isPending={false} 
      onDelete={handleDelete}
      onEdit={handleEditCurrentStudents}
      onView={handleViewCurrentStudent}
      />
     {deleteComponentConfirmDialog}
      {editCurrentStudentsConfirmDialog}
      {viewCurrentStudentsConfirmDialog}
    </div>
  );
}
