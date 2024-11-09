"use client";
import { useState } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { GetDataInServer } from "@/lib/actions/get-server";

function SelectField({
  id,
  value,
  onChange,
  label,
  options = [],
  placeholder = "Select",
  error,
  renderValue = () => null,
  view = "name",
}) {
  const [loading, setLoading] = useState(false);
  const path = "hr/employees/";

  const handleGetData = async () => {
    setLoading(true);
    try {
      const res = await GetDataInServer({ path: path });
      options = res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (selectedValue) => {
    console.log("Selected value: ", selectedValue); // Logs the selected value
    onChange(selectedValue); // Call onChange to propagate the change
  };

  return (
    <div className="w-full">
      {label && (
        <Label htmlFor={id} className="text-sm font-light text-gray-400">
          {label}
        </Label>
      )}
      <Select
        id={id}
        onOpenChange={options.length < 1 ? handleGetData : null}
        value={value}
        onValueChange={handleSelectChange} // Hook into the selection change
        error={error}
      >
        <SelectTrigger className="w-full">
          <SelectValue>
            {renderValue() ? renderValue() : value ? options.find(opt => opt === value) : placeholder}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {loading ? (
            <SelectItem value="loading" disabled>
              Loading...
            </SelectItem>
          ) : (
            options?.map((item) => (
              <SelectItem key={item} value={item}>
                {item[view] ? item[view] : item}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
      {error && <div className="text-red-800 text-sm">{error}</div>}
    </div>
  );
}

export default SelectField;
