/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Hill
 * Created: 12/18/2025
 * Description: this is for sending media files to database from frontend
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const MEDIA_BASE_URL = (process.env.REACT_APP_MEDIA_BASE_URL || "").replace(/\/$/, "");

export function buildMediaUrl(path) {
  if (!path) return null;

  // Absolute URLs (http only in your setup)
  if (path.startsWith("http://")) return path;

  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  return MEDIA_BASE_URL ? `${MEDIA_BASE_URL}/${cleanPath}` : `/${cleanPath}`;
}