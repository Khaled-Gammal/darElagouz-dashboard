import InputField from "@/components/shared/input-field";
import SelectField from "@/components/shared/select-field";

import { GetDataInServerSide } from "@/lib/actions/get-server";
import Image from "next/image";

export default async function EmployeePage({ params }) {
  const admin = await GetDataInServerSide(`/dashboard/admins/${params?.id}/`);
  console.log(admin);
  
  return (
    <div className="flex flex-col gap-6 md:w-[75%]  ">
      <div className="h-[110px] w-[107px] overflow-hidden">
        <Image
          src={admin?.image}
          alt="employee image"
          width={100}
          height={100}
          className="rounded-[6px] object-contain"
          loading="lazy"
        />
      </div>
      <InputField label="Employee Name" value={admin?.full_name} disabled />
      <InputField label="Email Address" value={admin?.email} disabled />
      <InputField label="Phone Number" value={admin?.phone_number} disabled />
      <InputField label="Age" value={admin?.age} disabled />
      <SelectField
        label="Gender"
        value={admin?.gender}
        options={["Male", "Female"]}
        id="gender"
        name="gender"
        placeholder="select your gender"
        disabled
      />
      <SelectField
        label="Section"
        value={admin?.section_id}
        options={[admin?.section_id]}
        id="section"
        name="section"
        placeholder="select your section"
        disabled
      />
    </div>
  );
}
