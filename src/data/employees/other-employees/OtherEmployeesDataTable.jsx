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
import { useRouter } from "next/navigation";


export default function EmployeesDataTable({admins}) {
console.log(admins);

  const router = useRouter();
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
      accessorKey:"section"
    },
    {
      id: "email",
      header: "Email Address",
      accessorKey: "email",
    },
    {
      id: "phone",
      header: "Phone Number",
      accessorKey: "phone",
    },{
      id: "gender",
      header: "Gender",
      accessorKey: "gender",
    },
    {
      id: "is_active",
      header: "Status",
      accessorKey: "is_active",
    },
    {
      id: "image",
      header: "Image",
      accessorKey: "image",
    },
    {
      id: "actions",
      header: "Actions",
      accessorKey: "actions",
      className: "text-center",
    },
  ];

  // map the data to the columns
  const adminsData = admins?.results.map((admin) => {  
    return {
      id: admin?.admin_id,
      full_name: admin?.full_name,
      section: admin.section_name,
      section_id: admin.section_id,
      email: admin.email,
      phone: admin.phone,
      gender: admin.gender,
      age: admin.age,
      is_active: admin.is_active ? "Active" : "Inactive",
      image: admin.image,
    
    };
  }
  );
  
  // Add a new employee dialog
  const [handleAddEmployee, addEmployeeConfirmDialog] = useAddDialog({
    onConfirm: (state) => handleAddNewEmployee(state),
    title: "Add a New Employee",
    fields: addEmployFields,
  });

  // Edit employee dialog
  const [handleEditEmployee, editEmployeeConfirmDialog] = useEditDialog({
    onConfirm: (state) => handleEdit(state),
    title: "Edit Employee",
    fields: editEmployFields,
  });

  const [handleViewEmployee, viewEmployeeConfirmDialog] = useViewDialog({
    // onConfirm: (state) => handleEditCurrentStudent(state),
    title: "Employee's Profile",
    fields: viewEmployeeFields,
  });

  // Delete employee dialog
  const [handleDelete, deleteComponentConfirmDialog] = useConfirmMessage({
    onConfirm: (row) => handleDeleteRow("/dashboard/admins/",row?.id,"/employees/other-employees"),
    text: "Do you sure you wanna to delete this employee ? ",
    title: "Delete Employee",
  });

  // add a new employee
  const handleAddNewEmployee = async (state) => {
    try {
      const data = new FormData();
      // Append all keys of state to data except 'loading' and 'error'
      Object.keys(state).forEach(key => {
        if (key !== 'loading' && key !== 'error') {
          data.append(key, state[key]);
        }
      });
     
      const response = await handlePostInServer(
        "/dashboard/create-admin/",
        data,
        "/employees/other-employees",
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
      console.error("Error adding employee:", error);
      toast.error("Error adding employee");
    }
  };
  // Handle the edit employee request
  const handleEdit = (state) => {
    try {
      adminsData.forEach(async (row) => {
        if (row.id === state.id) {
          const changes = compareData(row, state);
          if (Object.keys(changes).length > 0) {
            console.log("changes=>", changes);
            // Call the API to update the student
            const formData=changes
            const response = await handleUpdateInServer(
              `/dashboard/admins/${row?.id}/`,
              "PATCH",
              formData,
              true,
              "object",
              "/employees/other-employees"
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
 
  return (
    <div>
      <DataTableDemo 
      data={adminsData}
       columns={columns} isPending={false} 
      onDelete={handleDelete}
      onEdit={handleEditEmployee}
      onView={(row)=>router.push(`/employees/other-employees/${row.id}`)}
      />
     {deleteComponentConfirmDialog}
     {editEmployeeConfirmDialog}
     {addEmployeeConfirmDialog}
     {viewEmployeeConfirmDialog}
    </div>
  );
}
