"use client";
import { useRef, useState } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { GetDataInServerSide } from "@/lib/actions/get-server";

function SelectField({
  id,
  value,
  onChange,
  label,
  options:intialValue=[],
  path,
  placeholder = "Select",
  error,
  disabled = false,
  renderValue = () => null,
  view = "name",
}) {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(intialValue);
  const labelRef = useRef(null);
console.log(path);

  const handleGetData = async () => {
    setLoading(true);
    try {
      const res = await GetDataInServerSide(path);
      console.log(res);
      if (res) {
        setOptions(res?.results);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (selectedValue) => {
    
    onChange(selectedValue); // Propagate the selected object
  }

  const handleFocus = () => {
    if (labelRef.current) {
      labelRef.current.classList.add("text-primary"); // Apply primary color on focus
    }
  };

  const handleBlur = () => {
    if (labelRef.current) {
      labelRef.current.classList.remove("text-primary"); // Remove primary color on blur
    }
  };
  return (
    <div className="w-full">
      {label && (
        <Label
          ref={labelRef}
          htmlFor={id}
          className={`text-sm font-light ${error ? "text-red-800" : "text-gray-400"}`}
        >
          {label}
        </Label>
      )}
      <Select
        id={id}
        onOpenChange={options.length < 1 ? handleGetData : null}
        value={value}
        onValueChange={handleSelectChange} // Hook into the selection change
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={error}
        disabled={disabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue>
          {renderValue() ? renderValue(options,value) : value ? options?.find(opt => opt === value) : placeholder}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {loading ? (
            <SelectItem value="loading" disabled>
              Loading...
            </SelectItem>
          ) : (
            options?.map((item) => (
              console.log(item),
              <SelectItem key={item} value={item[id]?item[id]:item}>
                {item[view] ? item[view] : item}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
      {error && <div className="text-red-800 text-xs font-normal">{error}</div>}
    </div>
  );
}

export default SelectField;
