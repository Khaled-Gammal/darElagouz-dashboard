"use client";

import { useAddDialog } from "@/hooks/custom-dialog";
import { addDepartmentFields, editDepartmentFields } from "./constant-data";
import DepartmentCard from "./department-card";
import { handleDeleteRow } from "@/lib/actions/delete-server";
import { useConfirmMessage } from "@/hooks/delete-dialog";
import { useEditDialog } from "@/hooks/custom-edit-dialog";
import { handlePostInServer } from "@/lib/actions/post-server";
import { toast } from "sonner";
import { handleUpdateInServer } from "@/lib/actions/patch-server";
import { compareData } from "@/lib/utils";

function DepartmentsDataTable({ departments }) {

  // data for the table
  const departmentsData = departments?.results;


   // add department dialog
   const [handleAddDepartment, addDepartmentConfirmDialog] = useAddDialog({
     onConfirm: (state) => handleAddNewDepartment(state),
    title: "Add a New Department",
    fields: addDepartmentFields,
    className:"border-0 bg-transparent text-primary mt-0  outline-0 shadow-none focus:ring-0 hover:bg-transparent",
  });

  // edit department  dialog
  const [handleEditDepartment, editDepartmentConfirmDialog] = useEditDialog({
    onConfirm: (state) => handleEdit(state),
    title: "Edit Department",
    fields: editDepartmentFields,
  });


  // delete department dialog
  const [handleDelete, deleteComponentConfirmDialog] = useConfirmMessage({
    onConfirm: (row) => handleDeleteRow("/dashboard/departments/",row?.id,"/departments"),
    text: "Do you sure you wanna to delete this Department ? ",
    title: "Delete Department",
  });


  // handle add function
  const handleAddNewDepartment = async(state) => {
    
    try {
      const formData = new FormData();
      // Append all keys of state to data except 'loading' and 'error'
      Object.keys(state).forEach(key => {
        if (key !== 'loading' && key !== 'error') {
          formData.append(key, state[key]);
        }
      });
     
      const response = await handlePostInServer(
        "/dashboard/departments/create-department/",
        formData,
        "/departments",
        false,
        "formData"
      );
      console.log(response);
      if (response.success) {
        toast.success(response.success);
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error("Error adding section:", error);
      toast.error("Error adding section");
    }
  
  }

   // handle edit function
   const handleEdit = (state) => {
    try {
      departmentsData.forEach(async (row) => {
        if (row.id === state.id) {
          const changes = compareData(row, state);
          if (Object.keys(changes).length > 0) {
            console.log("changes=>", changes);
            // Call the API to update the student
            const formData=changes
            const response = await handleUpdateInServer(
              `/dashboard/departments/${row?.id}/`,
              "PATCH",
              formData,
              true,
              "object",
              "/departments"
            );
            if (response.success) {
            toast.success(response.success);
            }else {
              toast.error(response.error);
            }
          }
        }
      });
    } catch (error) {
      console.error("Error updating instructor:", error);
    }
  }

  return (
    <div>
        <div className="flex flex-row justify-between items-center px-2 mb-4">
            <p className="text-md font-medium text-primary leading-5">
            Add New Department
            </p>
            {addDepartmentConfirmDialog}
            </div>
      {departmentsData?.map((department) => {
        return (
          <DepartmentCard
            key={department.id}
            row={department}
            onDelete={(row) => handleDelete(row)}
            onEdit={(e,row) => handleEditDepartment(row)}
          />
        );
      })}
      {deleteComponentConfirmDialog}
      {editDepartmentConfirmDialog}
    </div>
  );
}

export default DepartmentsDataTable;
