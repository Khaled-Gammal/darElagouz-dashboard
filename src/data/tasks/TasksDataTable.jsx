"use client";
import { DataTableDemo } from "@/components/shared/table-data";
import { useConfirmMessage } from "@/hooks/delete-dialog";
import { useStepsDialog } from "@/hooks/use-steps-dialog";

export default function TasksDataTable({ tasks }) {
  const columns = [
    {
      id: "title",
      header: "Task Title",
      accessorKey: "title",
      className: "text-left",
    },
    {
      id: "assigned_to",
      header: "Assigned TO",
      accessorKey: "assigned_to",
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
    },

    {
      id: "creation_date",
      header: "Creation Date ",
      accessorKey: "creation_date",
    },
    {
      id: "due_date",
      header: "Due Date",
      accessorKey: "due_date",
    },

    {
      id: "actions",
      header: "Actions",
      accessorKey: "actions",
      className: "text-center",
    },
  ];
  const data = [
    {
      id: "m5gr84i9",
      title: "Task 1",
      assigned_to: ["G9", "G10", "G11"],
      status: "Started",
      creation_date: "19 - 08 - 2024",
      due_date: "3 Days",
    },
    {
      id: "3u1reuv4",
      title: "Task 2",
      assigned_to: ["G9", "G10", "G11"],
      status: "Started",
      creation_date: "19 - 08 - 2024",
      due_date: "3 Days",
    },
    {
      id: "derv1ws0",
      title: "Task 3",
      assigned_to: ["G9", "G10", "G11"],
      status: "Started",
      creation_date: "19 - 08 - 2024",
      due_date: "3 Days",
    },
    {
      id: "derv1ws",
      title: "Task 4",
      assigned_to: ["G9", "G10", "G11"],
      status: "Started",
      creation_date: "19 - 08 - 2024",
      due_date: "3 Days",
    },
    {
      id: "dervws0",
      title: "Task 5",
      assigned_to: ["G9", "G10", "G11"],
      status: "Started",
      creation_date: "19 - 08 - 2024",
      due_date: "3 Days",
    },
    {
      id: "dev1ws0",
      title: "Task 6",
      assigned_to: ["G9", "G10", "G11"],
      status: "Started",
      creation_date: "19 - 08 - 2024",
      due_date: "3 Days",
    },
    {
      id: "derv1ws0",
      title: "Task 7",
      assigned_to: ["G9", "G10", "G11"],
      status: "Started",
      creation_date: "19 - 08 - 2024",
      due_date: "3 Days",
    },
    {
      id: "derv1ws0",
      title: "Task 8",
      assigned_to: ["G9", "G10", "G11"],
      status: "Started",
      creation_date: "19 - 08 - 2024",
      due_date: "3 Days",
    },
    {
      id: "derv1ws0",
      title: "Task 9",
      assigned_to: ["G9", "G10", "G11"],
      status: "Started",
      creation_date: "19 - 08 - 2024",
      due_date: "3 Days",
    },
  ];
  const addSessionFields = [
    {
      id: "session",
      name: "session", // Add `name` here to match state
      label: "Session Name",
      placeholder: "Enter session name",
      type: "text",
    },
    {
      id: "department",
      name: "department", // Add `name` here to match state
      label: "Department Name",
      placeholder: "Select department name",
      type: "selected",
      options: ["Quran", "Tafseer", "Tagweed"],
    },
    {
      id: "date",
      name: "date", // Add `name` here to match state
      label: "Session Date",
      placeholder: "Select session date",
      type: "date",
    },
    {
      id: "time",
      name: "time", // Add `name` here to match state
      label: "Session Time",
      placeholder: "Select session time",
      type: "time",
    },
    {
      id: "link",
      name: "link", // Add `name` here to match state
      label: "Session joining Link",
      placeholder: "Enter session joining Link",
      type: "text",
    },
  ];
  const [handleAddEmployee, addSessionConfirmDialog] = useStepsDialog({
    onConfirm: (id) => console.log("Add", id),
    title: "Add a New Session",
    fields: addSessionFields,
  });
  const [handleDelete, deleteComponentConfirmDialog] = useConfirmMessage({
    onConfirm: async (id) => console.log("Delete", id),
    text: "Do you sure you wanna to delete this task ? ",
    title: "Delete task",
  });
  const handleEdit = (id) => {
    console.log("Edit", id);
  };

  return (
    <div>
      <DataTableDemo
        data={data}
        columns={columns}
        isPending={false}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      {deleteComponentConfirmDialog}
      {addSessionConfirmDialog}
    </div>
  );
}
