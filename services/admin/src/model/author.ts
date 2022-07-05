import { Media } from "./media";

export type Author = {
  id?: string | null;
  name: string;
  description: string;
  imageUrl?: string;
  isDeleted?: boolean;
  count?: number;
  medias: Media[];
};
