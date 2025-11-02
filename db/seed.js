import db from "#db/client";

import { createUser } from "#db/queries/users";
import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { createTrack } from "#db/queries/tracks";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  //playlists now requires a user: create users
  const alice = await createUser("alice", "password123");
  const bob = await createUser("bob", "password321");

  console.log("Created users:", alice.username, bob.username);

  //create tracks
  const tracks = [];
  for (let i = 1; i <= 20; i++) {
    const track = await createTrack("Track" + i, i * 50000);
    tracks.push(track);
  }

  console.log("Created 20 tracks");

  //create alice's playlists (playlists now require a user id which I must add to the function parameters so its name, description, userid)
  const alicePlaylist1 = await createPlaylist(
    "Alice's Chill Mix",
    "Relaxing tunes",
    alice.id
  );

  const alicePlaylist2 = await createPlaylist(
    "Alice's Workout Mix",
    "High energy tunez",
    alice.id
  );

  const alicePlaylist3 = await createPlaylist(
    "Alice's roadtrip mix",
    "songs for the road",
    alice.id
  );

  console.log("Created 3 playlists for alice");

  //add 5 tracks to alice's playlists each. I already made 20 tracks above.
  for (let i = 0; i < 5; i++) {
    await createPlaylistTrack(alicePlaylist1.id, tracks[i].id);
  }

  for (let i = 5; i < 10; i++) {
    await createPlaylistTrack(alicePlaylist2.id, tracks[i].id);
  }

  for (let i = 10; i < 15; i++) {
    await createPlaylistTrack(alicePlaylist3.id, tracks[i].id);
  }

  console.log("Added tracks to alice's playlists");

  const bobPlaylist1 = await createPlaylist(
    "Bob's jazz collection",
    "smooth jazz all day",
    bob.id
  );

  const bobPlaylist2 = await createPlaylist(
    "Bob's party mix",
    "party anthems baby",
    bob.id
  );

  console.log("Created 2 playlists for bob");

  for (let i = 0; i < 6; i++) {
    await createPlaylistTrack(bobPlaylist1.id, tracks[i].id);
  }

  for (let i = 14; i < 20; i++) {
    await createPlaylistTrack(bobPlaylist2.id, tracks[i].id);
  }

  console.log("added tracks to bob's playlists");
  console.log("Seeding complete");
}
