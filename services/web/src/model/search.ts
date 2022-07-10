import { uniq } from "lodash";

export const saveKeywords = (keywords: string) => {
  if (!keywords) {
    return;
  }
  localStorage.setItem(
    "keywords",
    JSON.stringify([
      ...(localStorage.getItem("keywords")
        ? JSON.parse(localStorage.getItem("keywords") as string)
        : []),
      keywords,
    ])
  );
};

export const getKeywords = () => {
  if (!localStorage.getItem("keywords")) {
    return [];
  }
  return uniq(JSON.parse(localStorage.getItem("keywords") as string));
};

export const removeKeywords = (value: string) => {
  localStorage.setItem(
    "keywords",
    JSON.stringify(
      JSON.parse(localStorage.getItem("keywords") as string).filter(
        (x: string) => x !== value
      )
    )
  );
};
