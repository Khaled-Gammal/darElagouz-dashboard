export const editCurrentStudentsFields = [
    {
        id: "user_image",
        name: "user_image",  // Add `name` here to match state
        label: "Student Name",
        placeholder: "Enter your name",
        type: "image",
        required: true,
      },
    {
      id: "full_name",
      name: "full_name",  // Add `name` here to match state
      label: "Student Name",
      placeholder: "Enter your name",
      type: "text",
      required: true,
    },
    {
      id: "code",
      name: "code",  // Add `name` here to match state
      label: "Student Code",
      placeholder: "Enter your student code",
      type: "text",
      required: true,
    },
    {
      id:"phone_number",
      name: "phone_number",  // Add `name` here to match state
      label: "Phone Number",
      placeholder: "Enter your phone number",
      type: "phone",
      required: true,
    },
    {
      id: "age",
      name: "age",  // Add `name` here to match state
      label: "Age",
      placeholder: "Enter your age",
      type: "number",
      required: true,
    },
    {
      id: "email",
      name: "email",  // Add `name` here to match state
      label: "E-mail address",
      placeholder: "Enter your email",
      type: "email",
      required: true,
    },
    {
      id: "group_id",
      name: "group_id", // Add `name` here to match state
      label: "Group Name",
      placeholder: "Select group name",
      type: "selected",
      path:'/dashboard/groups/',
      view:'name',
      options: [],
      renderValue: (options, value) => {  
        const department = options?.find((option) => option.id === Number(value))?.name;
        return department ? department : "Select your group";
      },
      required: true,
    },
    {
      id:"gender",
      name: "gender",  // Add `name` here to match state
      label: "Gender",
      placeholder: "select your gender",
      type: "selected",
      options: ["Male", "Female", "Other"],
      
    },
    
  ];

  export const viewCurrentStudentsFields = [
    {
        id: "user_image",
        name: "user_image",  // Add `name` here to match state
        label: "Student Name",
        placeholder: "Enter your name",
        type: "image",
        disabled: true,
      },
    {
      id: "full_name",
      name: "full_name",  // Add `name` here to match state
      label: "Student Name",
      placeholder: "Enter your name",
      type: "text",
      disabled: true,
    },
    {
      id: "code",
      name: "code",  // Add `name` here to match state
      label: "Student Code",
      placeholder: "Enter your student code",
      type: "text",
      disabled: true,
    },
    {
      id:"phone_number",
      name: "phone_number",  // Add `name` here to match state
      label: "Phone Number",
      placeholder: "Enter your phone number",
      type: "phone",
      disabled: true,
    },
    {
      id: "age",
      name: "age",  // Add `name` here to match state
      label: "Age",
      placeholder: "Enter your age",
      type: "number",
      disabled: true,
    },
    {
      id: "email",
      name: "email",  // Add `name` here to match state
      label: "E-mail address",
      placeholder: "Enter your email",
      type: "email",
      disabled: true,
    },
    {
      id: "group_id",
      name: "group_id", // Add `name` here to match state
      label: "Group Name",
      placeholder: "Select group name",
      type: "selected",
      path:'/dashboard/groups/',
      view:'name',
      options: [],
      renderValue: (options, value) => {  
        const department = options?.find((option) => option.id === Number(value))?.name;
        return department ? department : "Select your group";
      },
      required: true,
    },
    {
      id:"gender",
      name: "gender",  // Add `name` here to match state
      label: "Gender",
      placeholder: "select your gender",
      type: "selected",
      options: ["Male", "Female", "Other"],
      disabled: true,
    },
    
  ];