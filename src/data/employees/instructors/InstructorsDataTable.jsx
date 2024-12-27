'use client';
import { DataTableDemo } from "@/components/shared/table-data";
import { useAddDialog } from "@/hooks/custom-dialog";
import { useEditDialog } from "@/hooks/custom-edit-dialog";
import { useConfirmMessage } from "@/hooks/delete-dialog";
import { addEmployFields, editEmployFields, viewEmployeeFields } from "./constant-data";
import { handleUpdateInServer } from "@/lib/actions/patch-server";
import { compareData } from "@/lib/utils";
import { toast } from "sonner";
import { handleDeleteRow } from "@/lib/actions/delete-server";
import { useViewDialog } from "@/hooks/custom-view-dialog";
import { handlePostInServer } from "@/lib/actions/post-server";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


export default function InstructorsDataTable({instructors}) {
  const searchParams = useSearchParams()
  const pathname = usePathname();
  const { replace } = useRouter();

  console.log(instructors);
// columns for the table
  const columns = [
    {
        id: "select",
        header: "",
        className: "text-center",
        accessorKey: "id",
    },
    {
      id: "full_name",
      header: "Employee Name",
      accessorKey: "full_name",
    },{
      id:"section",
      header:"Section",
      accessorKey:"departments",
      className: "text-center",
    },
    {
      id: "email",
      header: "Email Address",
      accessorKey: "email",
      className: "text-center",
    },
    {
      id: "phone_number",
      header: "Phone Number",
      accessorKey: "phone_number",
      className: "text-center",
    },{
      id: "gender",
      header: "Gender",
      accessorKey: "gender",
      className: "text-center",
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      className: "text-center",
    },
    {
      id: "image",
      header: "Image",
      accessorKey: "image",
      className: "text-center",
    },
    {
      id: "actions",
      header: "Actions",
      accessorKey: "actions",
      className: "text-center",
    },
  ];

  // // map the data to the columns
  const instructorsData = instructors?.results.map((admin) => {  
    return {
      id: admin?.instructor_id,
      full_name: admin?.full_name,
      departments: admin.departments.map((department) => department.department_name).join(", "),
      groups:admin.groups?.map((group)=>group?.group_name).join(","),
      email: admin?.email,
      phone_number: admin?.phone_number,
      gender: admin?.gender,
      age: admin?.age,
      status: admin.is_active ? "Active" : "Inactive",
      image: admin?.image,
    
    };
  }
  );
  
  // Add a new employee dialog
  const [handleAddEmployee, addEmployeeConfirmDialog] = useAddDialog({
    onConfirm: (state) => handleAddNewEmployee(state),
    title: "Add a New Instructor",
    fields: addEmployFields,
  });

  // // Edit employee dialog
  const [handleEditEmployee, editEmployeeConfirmDialog] = useEditDialog({
    onConfirm: (state) => handleEdit(state),
    title: "Edit Instructors",
    fields: editEmployFields,
  });

  const [handleViewEmployee, viewEmployeeConfirmDialog] = useViewDialog({
    // onConfirm: (state) => handleEditCurrentStudent(state),
    title: "Instructor's Profile",
    fields: viewEmployeeFields,
  });

  // // Delete employee dialog
  const [handleDelete, deleteComponentConfirmDialog] = useConfirmMessage({
    onConfirm: (row) => handleDeleteRow("/dashboard/instructors/",row?.id,"/employees/instructors"),
    text: "Do you sure you wanna to delete this instructor ? ",
    title: "Delete Instructors",
  });

  const handleAddNewEmployee = async (state) => {
     try {
      const data = new FormData();
      // Append all keys of state to data except 'loading' and 'error'
      Object.keys(state).forEach(key => {
        if (key !== 'loading' && key !== 'error') {
          data.append(key,state[key]);
        }
      });
      const response = await handlePostInServer(
        "/dashboard/create-instructor/",
        data,
        "/employees/instructors",
        false,
        "formData"
      );
      if (response.success) {
        toast.success(response.success);
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error("Error adding instructor:", error);
      toast.error("Error adding instructor");
    }
  };
  // Handle the edit employee request
  const handleEdit = (state) => {
    try {
      instructorsData.forEach(async (row) => {
        if (row.id === state.id) {
          const changes = compareData(row, state);
          if (Object.keys(changes).length > 0) {
            console.log("changes=>", changes);
            // Call the API to update the student
            const formData=changes
            const response = await handleUpdateInServer(
              `/dashboard/instructors/${row?.id}/`,
              "PATCH",
              formData,
              true,
              "object",
              "/employees/instructors"
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
      console.error("Error updating instructor:", error);
    }
   
  }
 
  const handlePagonation=(page)=>{
    const params = new URLSearchParams(searchParams);
    console.log("page",page)
    if (page) {
      params.set('page', page||1);
    } else {
      params.delete('page');
    }
    replace(`${pathname}?${params.toString()}`);
    
  }
  return (
    <div>
        <DataTableDemo 
       data={instructorsData}
       count={instructors?.count}
      columns={columns}
      isPending={false} 
      onDelete={handleDelete}
      onEdit={handleEditEmployee}
      onView={handleViewEmployee}
      onPagination={(page)=>handlePagonation(page)}
      />
     {deleteComponentConfirmDialog}
     {editEmployeeConfirmDialog} 
     {addEmployeeConfirmDialog}
     {viewEmployeeConfirmDialog}
    </div>
  );
}
