export  const addArticleFields = [
    {
      type: "text",
      name: "title",
      id: "title",
      label: "Session Title",
      placeholder: "Enter Session Title",
    },
    {
      type: "text",
      name: "publisher_name",
      id: "publisher_name",
      label: "Publisher name ",
      placeholder: "Enter Session Title",
    },
    {
      type: "description",
      name: "body",
      id: "body",
      label: "Content Article",
      placeholder: "Enter Content Article",
    },
    {
      type: "file",
      name: "image",
      id: "image",
      upload: "image",
      label: "Image",
      placeholder: "Enter Content Article",
    },
    
   
  ];
  export const editArticleFields = [
    {
      type: "text",
      name: "title",
      id: "title",
      label: "Session Title",
      placeholder: "Enter Session Title",
    },
    {
      type: "selected",
      name: "author",
      id: "author",
      label: "Author Name",
      placeholder: "Select Author",
      options: ["Ali", "Ahmed", "Mohamed", "Omar"],
    },
    {
      type: "description",
      name: "content",
      id: "content",
      label: "Content Article",
      placeholder: "Enter Content Article",
    },
    
    {
      type: "date",
      name: "date",
      id: "date",
      label: "Date",
      placeholder: "Select Date",
    },
    {
      type: "time",
      name: "time",
      id: "time",
      label: "Time",
      placeholder: "Select Time",
    }
  ];