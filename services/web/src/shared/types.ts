export const ROLE_ADMIN = "admin";
export const ROLE_CUSTOMER = "customer";
export const ROLE_VIEWER = "viewer";

export const DEFAULT_AVATARS = {
  user: "/img/icons/avatar-placeholder-80.svg",
  image: "/img/icons/image-placeholder.svg",
  video: "/img/icons/video-placeholder.svg",
};

export const ALLOWED_ROLE_ACCESS = [ROLE_CUSTOMER];

export const ROLES = [ROLE_CUSTOMER];

export type AppPermission = typeof ROLE_CUSTOMER;
