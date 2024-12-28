
import { FinancialDataTable } from "@/data/financial/financial-dataTable";
import { GetDataInServerSide } from "@/lib/actions/get-server";


export default async function EmployeesPage() {

  const financial = await GetDataInServerSide(
    '/dashboard/admins/'
  )
  return (
      <div>
       <FinancialDataTable financial={financial}/>
      </div>
    )
  }
  