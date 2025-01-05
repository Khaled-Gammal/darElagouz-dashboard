import { DatePickerDemo } from "@/components/shared/date-picker";
import DragFile from "@/components/shared/drag-file";
import ImagePicker from "@/components/shared/image-picker";
import InputField from "@/components/shared/input-field";
import { PhoneInput } from "@/components/shared/phone-number";
import SelectField from "@/components/shared/select-field";
import TextAreaField from "@/components/shared/text-area";
import { TimePickerDemo } from "@/components/shared/time-picker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useEffect, useReducer, useState } from "react";

const initialValues = {
  loading: false,
  error: null,
  // Initialize with empty values for dynamic fields
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true, error: null };
    case "error":
      return { ...state, loading: false, error: action.payload };
    case "success":
      return { ...state, loading: false, error: null };
    case "values":
      return { ...state, ...action.payload }; // Merge new values with the existing state
    default:
      return state;
  }
};

export const useViewDialog = ({
  title = "Add Items",
  fields,
  viewFooter,
  onConfirm = () => {},
}) => {
 
  const [open, setOpen] = useState(false);
  const [args, setArgs] = useState(null);

  const handleOpen = (...params) => {
    console.log("params",params);
    setArgs([...params]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 

  const [state, dispatch] = useReducer(reducer, initialValues);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "loading" }); // Show loading state when submitting
    try {
      // Submit logic here, e.g., call API
      console.log("Form submitted with values:", state);
      onConfirm(state); // Call onConfirm callback with form values
      dispatch({ type: "success" }); // Set success state on successful submission
    } catch (error) {
      dispatch({ type: "error", payload: error.message }); // Handle error state
    }
  };

  useEffect(() => {
    
    if (args) {
      dispatch({ type: "values", payload:args.reduce((acc, field) => {
        acc[field.name] = field.value;
        return acc;
      }
      
      )});
    }
  }, [args]);
console.log(state);
  const dialog = (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle className="text-center text-primary text-lg font-medium">
            {title}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center gap-4 pt-[35px] pb-[29px]">
            {fields?.map((field) =>
              field.type === "image" ? (
                <div className="mb-2" key={field.id}>
                  <ImagePicker
                    disabled={field.disabled}
                    value={state[field.name]}
                    onChange={(value) => {
                      dispatch({
                        type: "values",
                        payload: { [field.name]: value },
                      });
                    }}
                  />
                </div>
              ) : field.type === "selected" ? (
                <SelectField
                  name={field.name}
                  id={field.id}
                  label={field.label}
                  placeholder={field.placeholder}
                  // error={state?.error[field?.name]||""} // Display individual field error
                  path={field.path}
                  view={field.view}
                  renderValue={field.renderValue}
                  value={state[field.name] || ""}
                  options={field.options}
                  disabled={field.disabled}
                  onChange={(value) => {
                    dispatch({
                      type: "values",
                      payload: { [field.name]: value },
                    });
                  }}
                />
              ) : field.type === "date" ? (
                <DatePickerDemo
                  id={field.id}
                  label={field.label}
                  placeholder={field.placeholder}
                  value={state[field.name]}
                  disabled={field.disabled}
                  onChange={(value) => {
                    dispatch({
                      type: "values",
                      payload: { [field.name]: value },
                    });
                  }}
                />
              ) : field.type === "time" ? (
                <TimePickerDemo
                  id={field.id}
                  label={field.label}
                  placeholder={field.placeholder}
                  disabled={field.disabled}
                  value={state[field.name]}
                  onChange={(value) => {
                    dispatch({
                      type: "values",
                      payload: { [field.name]: value },
                    });
                  }}
                />
              ) : field.type === "description" ? (
                <div className=" w-full" key={field.id}>
                  <TextAreaField
                    name={field.name}
                    id={field.id}
                    label={field.label}
                    placeholder={field.placeholder}
                    error={state.error}
                    disabled={field.disabled}
                    value={state[field.name] || ""}
                    onChange={(e) => {
                      dispatch({
                        type: "values",
                        payload: { [field.name]: e.target.value },
                      });
                    }}
                  />
                </div>
              ) :field.type==="file"?
              <DragFile
              id={field.id}
              label={field.label}
              name={field.name}
              type={field.upload}
              value={state[field.name]}
              onChange={(value) => {
                dispatch({
                  type: "values",
                  payload: { [field.name]: value },
                });
              }}
              />
              :field.type === "phone" ? (
                <PhoneInput
                  name={field.name}
                  id={field.id}
                  label={field.label}
                  placeholder={field.placeholder}
                  value={state[field.name]}
                  disabled={field.disabled}
                  onChange={(value) => {
                    dispatch({
                      type: "values",
                      payload: { [field.name]: value },
                    });
                  }}
                />
              ) : (
                <div className=" w-full" key={field.id}>
                  <InputField
                    name={field.name}
                    type={field.type}
                    id={field.id}
                    label={field.label}
                    placeholder={field.placeholder}
                    error={state.error}
                    disabled={field.disabled}
                    value={state[field.name] || ""}
                    onChange={(e) => {
                      dispatch({
                        type: "values",
                        payload: { [field.name]: e.target.value },
                      });
                    }}
                  />
                </div>
              )
            )}
          </div>
          {/* Dialog footer */}
          {viewFooter?
          <DialogFooter className="flex items-center justify-between gap-6 md:gap-[60px] ">
            <DialogClose asChild>
              <Button className={"cancel-button w-full"} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              className={"confirm-button w-full"}
              type="submit"
              disabled={state.loading}
            >
              {state.loading ? "Loading..." : "Add"}
            </Button>
          </DialogFooter>:null}
        </form>
      </DialogContent>
    </Dialog>
  );

  return [handleOpen, dialog];
};
