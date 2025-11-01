import express from "express";
const router = express.Router();

import {
  getTracks,
  getTrackById,
  getPlaylistsByTrackId,
} from "#db/queries/tracks";

import getUserFromToken from "#middleware/getUserFromToken";
import requireUser from "#middleware/requireUser";

router.get("/", async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

router.get("/:id", async (req, res) => {
  const track = await getTrackById(req.params.id);
  if (!track) return res.status(404).send("Track not found.");
  res.send(track);
});

//shows a user which of their playlists contains a certain track. this is the only protected route in tracks router
router.get(
  "/:id/playlists",
  getUserFromToken,
  requireUser,
  async (req, res) => {
    const track = await getTrackById(req.params.id);
    if (!track) {
      return res.status(404).send("Track not found.");
    }

    const playlists = await getPlaylistsByTrackId(track.id, req.user.id);
    res.send(playlists);
  }
);

export default router;
