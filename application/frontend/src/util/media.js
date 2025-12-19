const MEDIA_BASE_URL = (process.env.REACT_APP_MEDIA_BASE_URL || "").replace(/\/$/, "");

export function buildMediaUrl(path) {
  if (!path) return null;

  // Absolute URLs (http only in your setup)
  if (path.startsWith("http://")) return path;

  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  return MEDIA_BASE_URL ? `${MEDIA_BASE_URL}/${cleanPath}` : `/${cleanPath}`;
}