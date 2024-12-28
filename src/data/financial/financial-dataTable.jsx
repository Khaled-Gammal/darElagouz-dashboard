import { DataTableDemo } from "@/components/shared/table-data";
import React from "react";

export const FinancialDataTable = ({financial}) => {
    const  financialData = financial?.results.map((financial) => {
        return {
          id: financial.id,
          name: financial.name||"hamda",
        };
      }
    );
    const columns = [
        {
            id: "select",
            header: "",
            className: "text-center",
            accessorKey: "id",
        },
        {
            id: "name",
            header: "Financial Name",
            accessorKey: "name",
        },
        {
            id: "actions",
            header: "Actions",
            accessorKey: "actions",
            className: "text-center",
        },
    ];

  return (
    <div>
      <DataTableDemo
        data={financialData}
        count={financial?.count}
        columns={columns}
        isPending={false}
        // onDelete={handleDelete}
        // onEdit={handleEditEmployee}
        // onView={handleViewEmployee}
        // onPagination={(page) => handlePagonation(page)}
      />
    </div>
  );
};
