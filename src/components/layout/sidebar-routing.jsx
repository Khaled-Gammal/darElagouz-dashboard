

const {
  LayoutDashboard,
  ContactRound,
  Settings,
  Plug,
  MapPin,
  GitPullRequest,
  Users,
  PanelTopOpen,
  ClipboardMinus,
  ClipboardList,
  ChartColumn,
  Layers,
} = require("lucide-react");

export let PageRoutes = [
  {
    groupName: "Main",
    icon: <Plug />,
  },
  {
    title: "Dashboard",
    path: "/",
    icon: <LayoutDashboard />,
    active: "",
    children: [],
  },
  {
    title: "Contact",
    path: "/contact",
    icon: <ContactRound />,
    active: "contact",
    children: [],
  },
  {
    groupName: "Management",
    icon: <Plug />,
  },
  {
    title: "Student",
    path: "/student",
    icon: <ContactRound />,
    active: "student",
    children: [],
  },
  {
    title: "Employees",
    icon: <Users />,
    active: "employees",
    children: [
      {
        title: "Instructors",
        path: "/employees/instructors",
        active: "instructors",
      },
      {
        title: "Other Employees",
        path: "/employees/other-employees",
        active: "employees",
      },
    ],
  },{
    title: "Departments",
    path: "/departments",
    icon: <Layers />,
    active: "departments",
  },
  {
    title: "Groups",
    path: "/groups",
    icon: <Users />,
    active: "groups",
    children: [],
  },
  {
    title: "Sessions",
    path: "/sessions",
    icon: <PanelTopOpen />,
    active: "sessions",
    children: [],
  },
  {
    title: "Content",
    path: "/content",
    icon: <ClipboardMinus />,
    active: "content",
    children: [],
  },
  {
    title: "Tasks",
    path: "/tasks",
    icon: <ClipboardList />,
    active: "tasks",
    children: [],
  },{
    title: "Sections",
    path: "/sections",
    icon: <GitPullRequest />,
    active: "sections",
    children: [],

  },
  {
    title: "Reports",
    path: "/reports",
    icon: <ChartColumn />,
    active: "reports",
    children: [],
  },{
    title:"Financial",
    path:"financial",
    icon:<ChartColumn />,
    active:"financial",
    children:[]
  },
  {
    groupName: "Custom",
    icon: <Plug />,
  },
  {
    title: "map",
    path: "/map",
    icon: <MapPin />,
    active: "map",
    children: [],
  },
  {
    title: "Settings",
    active: "settings",
    icon: <Settings />,
    children: [
      {
        title: "General",
        path: "/settings/general",
        
      },
    ],
  },
];
