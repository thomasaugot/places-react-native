const GOOGLE_API_KEY = "AIzaSyA0O8JeGJ58f5FkvJBIycgKCNK9YnGqQ";

export const getMapPreview = (lat, lng) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=400x300&markers=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
};

export async function getAdress(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?${lat},${lng}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch address");
  }

  const data = await response.json();
  const address = data.result[0].formatted_address;
  return address;
}
