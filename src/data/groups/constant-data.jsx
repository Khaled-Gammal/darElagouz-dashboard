

export const addGroupFields = [
  {
    id: "group",
    name: "name", // Add `name` here to match state
    label: "Group Name",
    placeholder: "Enter group name",
    type: "text",
  },
  {
    id: "instructor_id",
    name: "instructor_id", // Add `name` here to match state
    label: "Instructor Name",
    placeholder: "Select instructor name",
    type: "selected",
    path: "/dashboard/instructors/",
    view: "full_name",
    options: [],
    renderValue: (options,value) => {
      const instructor = options?.find((option) => option?.instructor_id === Number(value))?.full_name;
      return instructor ? instructor : "Select your instructor"
    }
   
  },
  {
    id: "id",
    name: "department_id", // Add `name` here to match state
    label: "Department Name",
    placeholder: "Select department name",
    type: "selected",
    path: "/dashboard/departments/",
    view: "title",
    options: [],
    renderValue: (options,value) => {
       console.log(options);
      const department = options?.find((option) => option.id === Number(value));
      return department ? department?.title : "Select your department";
    },
  },
];

export const editGroupFields = [
  {
    id: "name",
    name: "name", // Add `name` here to match state
    label: "Group Name",
    placeholder: "Enter group name",
    type: "text",
  },
  {
    id: "instructor_id",
    name: "instructor", // Add `name` here to match state
    label: "Instructor Name",
    placeholder: "Select instructor name",
    type: "selected",
    path: "/dashboard/instructors/",
    view: "full_name",
    options: [],
    renderValue: (options,value) => {
      const instructor =options?.lenght>0? options?.find((option) => option?.instructor_id === Number(value))?.full_name:value
      return instructor ? instructor : "Select your instructor"
    }
   
  },
  {
    id: "id",
    name: "department", // Add `name` here to match state
    label: "Department Name",
    placeholder: "Select department name",
    type: "selected",
    path: "/dashboard/departments/",
    view: "title",
    options: [],
    renderValue: (options,value) => {
       console.log(options);
      const department =options?.lenght>0? options?.find((option) => option.id === Number(value))?.title:value;
      return department ? department : "Select your department";
    },
  },
];

export const viewGroupFields = [
  {
    id: "name",
    name: "name", // Add `name` here to match state
    label: "Group Name",
    placeholder: "Enter group name",
    type: "text",
    disabled: true,
  },
  {
    id: "instructor",
    name: "instructor", // Add `name` here to match state
    label: "Instructor Name",
    placeholder: "Select instructor name",
    type: "text",
    disabled: true,
  },
  {
    id: "id",
    name: "department", // Add `name` here to match state
    label: "Department Name",
    placeholder: "Select department name",
    type: "selected",
    path: "/dashboard/departments/",
    view: "title",
    options: [],
    renderValue: (options,value) => {
       
      const department = options?.find((option) => option.id === Number(value));
      return department ? department?.title : "Select your department";
    },
    disabled: true,
  },
];
