const GOOGLE_API_KEY = "AIzaSyA0O8JeGJ58fqn5FkvJBIycgKCNK9YnGqQ";

export const getMapPreview = (lat, lng) => {
  const imagePreviewUrl = `.......${lat},${lng}&key=${GOOGLE_API_KEY}...`;
  return imagePreviewUrl;
};
