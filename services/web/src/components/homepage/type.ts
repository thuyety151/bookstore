export interface ICategoryType {
  icon: string;
  title: string;
  description: string;
  path: string;
  icon_color: string;
}

export const color = ["#faf1ff", "#faf4eb", "#f4e6e5", "#e6f2f4", "#fff6f6"];

export const dataCategories: ICategoryType[] = [
    {
      icon: "perm_media",
      title: "Arts & Photos",
      description: "Shop ",
      path: "",
      icon_color: "#a200fc",
    },
    {
      icon: "lunch_dining",
      title: "Food & Drink",
      description: "Food & Drink",
      path: "",
      icon_color: "#f79400",
    },
    {
      icon: "favorite_border",
      title: "Romance",
      description: "Romance",
      path: "",
      icon_color: "#f01000",
    },
    {
      icon: "health_and_safety",
      title: "Health",
      description: "Health",
      path: "",
      icon_color: "#00cdef",
    },
    {
      icon: "assignment",
      title: "Biography",
      description: "Biography",
      path: "",
      icon_color: "#ff8e8e",
    },
  ];