class BannerAd {
  constructor(title, image, description, cta, link) {
    this.title = title;
    this.image = image;
    this.description = description;
    this.cta = cta;
    this.link = link;
  }
}

export const ppBannerAd = new BannerAd(
  "Pabu's Press",
  "https://pabuspress.co.za/favicon.ico",
  "The best personal blog in South Africa.",
  "Read Here",
  "https://pabuspress.co.za"
);
