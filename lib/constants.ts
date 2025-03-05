import { BookOpen, Bot, GalleryVerticalEnd, LucideIcon, SquareTerminal } from "lucide-react";

export const dataNavbar = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: {
    name: "Acme Inc",
    logo: GalleryVerticalEnd as LucideIcon,
    plan: "Enterprise",
  },

  navMain: [
    {
      title: "Master Data",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "Data Karyawan",
          url: "/dashboard/karyawan",
        },
      ],
    },
    {
      title: "Kriteria & Bobot",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Kriteria Benefit",
          url: "/dashboard/kriteria-benefit",
        },
        {
          title: "Kriteria Cost",
          url: "/dashboard/kriteria-cost",
        },
        {
          title: "Bobot",
          url: "/dashboard/bobot",
        },
      ],
    },
    {
      title: "Penilaian",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Penilaian SAW Benefit",
          url: "/dashboard/penilaian-saw-benefit",
        },
        {
          title: "Penilaian SAW Cost",
          url: "/dashboard/penilaian-saw-cost",
        },
      ],
    },
  ],
};

export const dataType = [
  {
    title: "Benefit",
    value: "BENEFIT",
  },
  {
    title: "Cost",
    value: "COST",
  },
];
