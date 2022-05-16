import { Media } from "./media";

export type Author = {
  id?: string | null;
  name: string;
  imageUrl?: string;
  isDeleted?: boolean;
  count?: number;
  medias: Media[];
};
