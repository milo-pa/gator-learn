/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
<<<<<<< HEAD
 * Author: Hill
 * Created: 12/18/2025
 * Description: this is for sending media files to database from frontend
=======
 * Author: Milo Pesce Ares
 * Created: 12/19/2025
 * Description:
 *  This utility file is used for routing media to port-forwarded port 8081 during local deployment
>>>>>>> origin/develop
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
<<<<<<< HEAD
=======

>>>>>>> origin/develop
const MEDIA_BASE_URL = (process.env.REACT_APP_MEDIA_BASE_URL || "").replace(/\/$/, "");

export function buildMediaUrl(path) {
  if (!path) return null;

  // Absolute URLs (http only in your setup)
  if (path.startsWith("http://")) return path;

  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  return MEDIA_BASE_URL ? `${MEDIA_BASE_URL}/${cleanPath}` : `/${cleanPath}`;
}