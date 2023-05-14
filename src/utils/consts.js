export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/iryna_lisogor",
  behance: "https://www.behance.net/lisogorka8741b",
  email: "iryna.lisogor.artwrk@gmail.com",
};

export const socialLinks = [
  {
    href: SOCIAL_LINKS.instagram,
    component: "IconInstagram",
  },
  {
    href: SOCIAL_LINKS.behance,
    component: "IconBehance",
  },
  {
    href: `mailto:${SOCIAL_LINKS.email}`,
    component: "IconMail",
  },
];
