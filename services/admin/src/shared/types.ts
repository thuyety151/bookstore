export const ROLE_ADMIN = "Admin";
export const ROLE_CUSTOMER = "Customer";
export const ROLE_VIEWER = "viewer";

export const DEFAULT_AVATARS = {
  user: "/img/icons/avatar-placeholder-80.svg",
  image: "/img/icons/image-placeholder.svg",
  video: "/img/icons/video-placeholder.svg",
};

export const ALLOWED_ROLE_ACCESS = [ROLE_ADMIN];

export const ROLES = [ROLE_ADMIN];

export type AppPermission = typeof ROLE_ADMIN;
