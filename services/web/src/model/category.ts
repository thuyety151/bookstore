export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: any;
  mediaUrl?: any;
  count: number;
}
export interface CategoryType {
  id: string;
  icon: string;
  title: string;
  description: string;
  path: string;
  icon_color: string;
}

export interface SidebarCategoryResponse {
  id: string;
  name: string;
  slug: string;
  subTotal: number;
  media?: any;
  parentId?: string;
  subCategories: SidebarCategoryResponse[];
}

export interface SideBarItem {
  id: string;
  name: string;
  slug: string;
  subTotal: number;
  media?: string;
  parentId?: string;
  subCategories?: SideBarItem[];
}
export const color = ["#faf1ff", "#faf4eb", "#f4e6e5", "#e6f2f4", "#fff6f6"];

export const dataCategories: CategoryType[] = [
  {
    id: "1",
    icon: "perm_media",
    title: "Arts & Photos",
    description: "Shop ",
    path: "",
    icon_color: "#a200fc",
  },
  {
    id: "2",
    icon: "lunch_dining",
    title: "Food & Drink",
    description: "Food & Drink",
    path: "",
    icon_color: "#f79400",
  },
  {
    id: "3",
    icon: "favorite_border",
    title: "Romance",
    description: "Romance",
    path: "",
    icon_color: "#f01000",
  },
  {
    id: "4",
    icon: "health_and_safety",
    title: "Health",
    description: "Health",
    path: "",
    icon_color: "#00cdef",
  },
  {
    id: "5",
    icon: "assignment",
    title: "Biography",
    description: "Biography",
    path: "",
    icon_color: "#ff8e8e",
  },
];
