import ISideBar, {
  ICurrency,
  ILanguage,
  ISideBarChildren,
} from "../model/sidebar";

const data: ISideBar[] = [
  {
    id: "1",
    name: "Arts & Photography",
    children: [
      { id: "art-1", name: "Architecture", path: "" },
      { id: "art-2", name: "Business of Art", path: "" },
      { id: "art-3", name: "Drawing", path: "" },
    ],
  },
  {
    id: "2",
    name: "History",
    children: [
      { id: "his-1", name: "VietNam", path: "" },
      { id: "his-2", name: "Amed", path: "" },
      { id: "his-3", name: "Mardin", path: "" },
    ],
  },
  {
    id: "3",
    name: "Fiction",
    children: [
      { id: "his-1", name: "VietNam", path: "" },
      { id: "his-2", name: "Amed", path: "" },
      { id: "his-3", name: "Mardin", path: "" },
    ],
  },
];
export const dataHelpSetting: ISideBarChildren[] = [
  {
    id: "1",
    name: "Your Account",
    path: "/account",
  },
  {
    id: "2",
    name: "Help",
    path: "/help",
  },
  {
    id: "3",
    name: "Sign In",
    path: "/sign-in",
  },
];
export const lstLanguage: ILanguage[] = [
  { id: "1", name: "English (United States)" },
  { id: "2", name: "English (UK)" },
];
export const lstCurrency: ICurrency[] = [
  { id: "1", name: "$ USD" },
  { id: "2", name: "VND" },
];
export default data;
