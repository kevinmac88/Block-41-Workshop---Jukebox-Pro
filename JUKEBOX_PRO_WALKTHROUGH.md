# Jukebox Pro - Complete Educational Walkthrough

## 📚 Table of Contents
1. [Introduction & Project Overview](#introduction--project-overview)
2. [Git Setup & Workflow](#git-setup--workflow)
3. [Understanding Authentication & Authorization](#understanding-authentication--authorization)
4. [Database Setup (Part 1: Users Table)](#part-1-database-setup---users-table)
5. [Database Setup (Part 2: Updating Playlists)](#part-2-database-setup---updating-playlists)
6. [Database Setup (Part 3: Seeding with Users)](#part-3-database-setup---seeding-with-users)
7. [Creating User Database Queries](#part-4-creating-user-database-queries)
8. [Building the Users Router](#part-5-building-the-users-router)
9. [Protecting Playlist Routes](#part-6-protecting-playlist-routes)
10. [Updating Track Routes](#part-7-updating-track-routes)
11. [Testing Your Application](#part-8-testing-your-application)
12. [Final Git Workflow - Merging to Main](#final-git-workflow---merging-to-main)

---

## Introduction & Project Overview

### What Are We Building?

Jukebox Pro is an upgrade to a basic music playlist application. In this version, we're adding **user accounts** and **authentication** so that:
- Users must register and log in
- Each playlist belongs to a specific user
- Users can only see and manage their own playlists

### Key Concepts You'll Learn

1. **Authentication**: Verifying who a user is (login)
2. **Authorization**: Determining what a user can access
3. **Password Hashing**: Storing passwords securely
4. **JWT (JSON Web Tokens)**: Maintaining login sessions
5. **Protected Routes**: Restricting access to certain endpoints
6. **Database Relationships**: Connecting users to their data
7. **Git Workflow**: Using feature branches and pull requests

---

## Git Setup & Workflow

### Understanding Git Workflow

**Git** is version control - it tracks changes to your code and lets you:
- Save snapshots of your work (commits)
- Work on features separately (branches)
- Collaborate with others safely
- Undo mistakes easily

### The Branch Strategy We'll Use

```
main (production-ready code)
  │
  └─── feature/add-authentication (your work)
```

**Why use a feature branch?**
- Keep main branch stable
- Work independently without breaking things
- Easy to review changes before merging
- Can abandon features if needed

### Initial Setup

#### Step 1: Open VS Code Terminal

In VS Code, open the terminal:
- **Mac**: `Control + `` ` or `Terminal → New Terminal`
- **Windows**: `Ctrl + `` ` or `Terminal → New Terminal`

#### Step 2: Check Current Status

```bash
git status
```

**What this shows:**
- Current branch name
- Modified files
- Untracked files

**Expected output:**
```
On branch main
Your branch is up to date with 'origin/main'.
```

#### Step 3: Make Sure You're Up to Date

```bash
git pull origin main
```

**What this does:**
- `git pull`: Download changes from GitHub
- `origin`: Your GitHub repository
- `main`: The main branch

**Why?** Always start with the latest code to avoid conflicts.

#### Step 4: Create Your Feature Branch

```bash
git checkout -b feature/add-authentication
```

**Breaking this down:**
- `git checkout`: Switch branches
- `-b`: Create a new branch
- `feature/add-authentication`: Your new branch name

**Naming conventions:**
- `feature/` prefix for new features
- Use descriptive names: `feature/user-login`, `feature/add-users-table`
- Use hyphens, not spaces

**Expected output:**
```
Switched to a new branch 'feature/add-authentication'
```

#### Step 5: Verify Your Branch

```bash
git branch
```

**What this shows:**
- List of all local branches
- `*` marks your current branch

**Expected output:**
```
  main
* feature/add-authentication
```

### Git Workflow Pattern

Throughout this tutorial, we'll follow this pattern:

1. **Make changes** to files
2. **Test** your changes work
3. **Stage** the changes: `git add <files>`
4. **Commit** with a message: `git commit -m "message"`
5. **Push** to GitHub: `git push origin feature/add-authentication`

Let's practice this pattern as we build!

---

### 🔧 Checkpoint 1: Setting Up the Feature Branch

Before we start coding, let's make our first commit to establish the branch on GitHub.

```bash
# Check what files have been provided/exist
git status

# If there are already changes, let's commit them
git add .
git commit -m "chore: initial project setup"

# Push the feature branch to GitHub
git push -u origin feature/add-authentication
```

**Understanding the flags:**
- `git add .`: Stage ALL changed files (`.` means "everything in current directory")
- `-u`: Set upstream (connects local branch to GitHub branch)
- First time: Use `-u`, future pushes: just `git push`

**Expected output:**
```
To https://github.com/kevinmac88/Block-41-Workshop---Jukebox-Pro.git
 * [new branch]      feature/add-authentication -> feature/add-authentication
Branch 'feature/add-authentication' set up to track remote branch 'feature/add-authentication' from 'origin'.
```

**Check on GitHub:**
Go to: https://github.com/kevinmac88/Block-41-Workshop---Jukebox-Pro/branches

You should see your new branch! 🎉

---

## Git Setup & Workflow

### Why Use Git and Feature Branches?

**Git** is version control - it tracks all changes to your code over time. Think of it like a save system in a video game with multiple save slots.

**Feature branches** let you work on new features without breaking your main code. It's like having a sandbox to experiment in!

### Understanding the Git Workflow

```
main branch (stable, working code)
    ↓
feature branch (your new work)
    ↓
test and verify
    ↓
merge back to main (combine your changes)
```

### Initial Setup

#### Step 1: Open VS Code Terminal

In VS Code:
1. Press `Ctrl + ` ` (backtick) or go to `Terminal → New Terminal`
2. You should see a terminal at the bottom of VS Code

#### Step 2: Check Your Git Status

```bash
git status
```

**What this shows:**
- Which branch you're on (probably `main`)
- Any files that have changed
- Files that are "staged" (ready to commit)

**Understanding the output:**
```
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

Translation:
- **On branch main**: You're on the main branch
- **up to date with origin/main**: Your local code matches GitHub
- **nothing to commit**: No changes yet

#### Step 3: Create Your Feature Branch

```bash
git checkout -b feature/add-authentication
```

**Breaking it down:**
- `git checkout`: Switch branches
- `-b`: Create a new branch
- `feature/add-authentication`: Name of your new branch

**Naming Convention:**
- `feature/` prefix: Indicates this is a new feature
- `add-authentication`: Descriptive name of what you're building

**What just happened?**
You created a copy of `main` called `feature/add-authentication` and switched to it.

```bash
git status
```

**Output:**
```
On branch feature/add-authentication
nothing to commit, working tree clean
```

You're now on your feature branch! 🎉

### The Git Cycle: Add → Commit → Push

As you work, you'll repeat this cycle:

```
Make changes → Stage changes → Commit changes → Push to GitHub
    (edit)       (git add)       (git commit)      (git push)
```

**Important:** Commit often! Small, frequent commits are better than huge ones.

---

## Understanding Authentication & Authorization

### What's the Difference?

**Authentication** = "Who are you?"
- Like showing your ID at the door
- Proves your identity
- Example: Logging in with username/password

**Authorization** = "What are you allowed to do?"
- Like having a VIP pass vs. general admission
- Determines permissions
- Example: Only viewing your own playlists

### How JWT Tokens Work

Think of a JWT token like a movie ticket:

1. **Registration/Login** = Buying the ticket
   - You provide credentials (username/password)
   - Server verifies them
   - Server gives you a token (ticket)

2. **Making Requests** = Showing your ticket
   - You include the token in each request
   - Server checks if it's valid
   - If valid, you get access

**JWT Structure**: `header.payload.signature`
- **Header**: Type of token and algorithm used
- **Payload**: Data (like user ID)
- **Signature**: Proves it wasn't tampered with

### Password Hashing - Why It Matters

**Never store plain passwords!** If your database is compromised, hackers get all passwords.

**Hashing** is a one-way transformation:
```
"password123" → hash function → "$2b$10$xK3h2..."
```

Key properties:
- **One-way**: Can't reverse it to get original password
- **Deterministic**: Same input always gives same output
- **Unique**: Different inputs give different outputs

We use **bcrypt** which adds "salt" (random data) to make hashing even more secure.

---

## Part 1: Database Setup - Users Table

### Understanding the Schema

Let's look at what we need to add to `db/schema.sql`:

```sql
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username text UNIQUE NOT NULL,
  password text NOT NULL
);
```

**Let's break this down line by line:**

#### Line 1: `DROP TABLE IF EXISTS users CASCADE;`

- `DROP TABLE`: Delete the table if it exists
- `IF EXISTS`: Don't throw error if table doesn't exist
- `CASCADE`: Also delete anything that depends on this table
- **Why?** This lets us reset our database cleanly during development

#### Line 3: `CREATE TABLE users (`

- Creates a new table called `users`
- Think of a table like a spreadsheet with columns

#### Line 4: `id serial PRIMARY KEY,`

- `id`: Column name
- `serial`: Auto-incrementing integer (1, 2, 3...)
- `PRIMARY KEY`: Uniquely identifies each row
- **Why?** Every user needs a unique ID to reference them

#### Line 5: `username text UNIQUE NOT NULL,`

- `username`: Column name
- `text`: Data type (any length string)
- `UNIQUE`: No two users can have same username
- `NOT NULL`: Must have a value (can't be empty)
- **Why?** Usernames must be unique for login and can't be blank

#### Line 6: `password text NOT NULL`

- Stores the hashed password
- `NOT NULL`: Every user must have a password
- **Note**: We store the HASH, never the actual password!

### 📝 Task: Update schema.sql

Open `db/schema.sql` and add the users table **at the very top** (before tracks):

```sql
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS playlists_tracks;
DROP TABLE IF EXISTS playlists;
DROP TABLE IF EXISTS tracks;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username text UNIQUE NOT NULL,
  password text NOT NULL
);

CREATE TABLE tracks (
  id serial PRIMARY KEY,
  name text NOT NULL,
  duration_ms integer NOT NULL
);

-- Rest of your tables...
```

**Why at the top?** Because playlists will reference users, and you must create the table being referenced first!

### 🔧 Git Checkpoint: Commit Schema Changes

After updating `schema.sql`, let's save this progress with Git:

```bash
# 1. Check what changed
git status
```

**Output:**
```
On branch feature/add-authentication
Changes not staged for commit:
  modified:   db/schema.sql
```

Translation: Git sees you modified `schema.sql`, but it's not ready to commit yet.

```bash
# 2. Stage the file (prepare it for commit)
git add db/schema.sql
```

**What staging means:**
- Like putting items in a shopping cart before checkout
- You're saying "I want to include this change in my next commit"

```bash
# 3. Check status again
git status
```

**Output:**
```
On branch feature/add-authentication
Changes to be committed:
  modified:   db/schema.sql
```

The file is now "staged" (in green) - ready to commit!

```bash
# 4. Commit with a descriptive message
git commit -m "Add users table to database schema"
```

**Commit message best practices:**
- Start with a verb: "Add", "Update", "Fix", "Remove"
- Be specific but concise
- Describe WHAT you did, not WHY (save that for code comments)

**Output:**
```
[feature/add-authentication a1b2c3d] Add users table to database schema
 1 file changed, 7 insertions(+), 0 deletions(-)
```

```bash
# 5. Push to GitHub
git push origin feature/add-authentication
```

**Breaking it down:**
- `git push`: Upload your commits to GitHub
- `origin`: Nickname for your GitHub repository
- `feature/add-authentication`: The branch you're pushing

**First time pushing this branch?** Git might show:
```
fatal: The current branch feature/add-authentication has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin feature/add-authentication
```

Just run:
```bash
git push --set-upstream origin feature/add-authentication
```

This tells Git: "Connect my local branch to the GitHub branch."

**Success looks like:**
```
Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Delta compression using up to 8 threads
Compressing objects: 100% (4/4), done.
Writing objects: 100% (4/4), 412 bytes | 412.00 KiB/s, done.
Total 4 (delta 2), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (2/2), completed with 2 local objects.
To https://github.com/kevinmac88/Block-41-Workshop---Jukebox-Pro
 * [new branch]      feature/add-authentication -> feature/add-authentication
```

**Check GitHub:**
1. Go to https://github.com/kevinmac88/Block-41-Workshop---Jukebox-Pro
2. You should see a banner: "feature/add-authentication had recent pushes"
3. Your branch is now on GitHub! 🎉

---

## Part 2: Database Setup - Updating Playlists

Now we need to connect playlists to users. Each playlist should belong to one user.

### Adding the Foreign Key

Add this to your playlists table in `db/schema.sql`:

```sql
CREATE TABLE playlists (
  id serial PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE
);
```

**Let's understand the new line:**

#### `user_id integer NOT NULL`
- New column to store which user owns this playlist
- `integer`: Matches the data type of `users.id`
- `NOT NULL`: Every playlist MUST have an owner

#### `REFERENCES users(id)`
- This is a **foreign key**
- Creates a relationship: "this playlist belongs to a user"
- `users(id)`: Points to the `id` column in the `users` table
- **Database will enforce this**: Can't create playlist with non-existent user_id

#### `ON DELETE CASCADE`
- **Cascade**: "Waterfall effect"
- If a user is deleted, automatically delete all their playlists
- **Why?** Orphaned playlists (no owner) don't make sense

### Visualizing the Relationship

```
users table              playlists table
┌────┬──────────┐       ┌────┬─────────┬─────────┐
│ id │ username │       │ id │ name    │ user_id │
├────┼──────────┤       ├────┼─────────┼─────────┤
│ 1  │ alice    │◄──────┤ 1  │ Chill   │ 1       │
│ 2  │ bob      │◄──┐   │ 2  │ Workout │ 1       │
└────┴──────────┘   │   │ 3  │ Jazz    │ 2       │
                     └───┤ 4  │ Rock    │ 2       │
                         └────┴─────────┴─────────┘
```

Alice (user_id: 1) owns playlists 1 and 2
Bob (user_id: 2) owns playlists 3 and 4

### 📝 Task: Complete schema.sql

Your complete `db/schema.sql` should now look like:

```sql
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS playlists_tracks;
DROP TABLE IF EXISTS playlists;
DROP TABLE IF EXISTS tracks;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username text UNIQUE NOT NULL,
  password text NOT NULL
);

CREATE TABLE tracks (
  id serial PRIMARY KEY,
  name text NOT NULL,
  duration_ms integer NOT NULL
);

CREATE TABLE playlists (
  id serial PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE playlists_tracks (
  id serial PRIMARY KEY,
  playlist_id integer NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
  track_id integer NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  UNIQUE (playlist_id, track_id)
);
```

### 🔧 Git Checkpoint: Commit Updated Schema

```bash
# Stage and commit the updated schema
git add db/schema.sql
git commit -m "Add user_id foreign key to playlists table"
git push
```

**Note:** After the first `git push --set-upstream`, you can just use `git push`! Git remembers where to push.

---

## Part 3: Database Setup - Seeding with Users

Now we need to update `db/seed.js` to create users and associate playlists with them.

### Understanding the Current Seed File

The old seed file created playlists without users:

```javascript
await createPlaylist("Playlist " + i, "lorem ipsum playlist description");
```

**Problem**: This won't work anymore! Playlists now require a `user_id`.

### Creating the New Seed File

Here's the complete new seed file with detailed explanations:

```javascript
import db from "#db/client";

// Import functions we'll need
import { createUser } from "#db/queries/users";
import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { createTrack } from "#db/queries/tracks";

// Connect to database
await db.connect();
// Run our seed function
await seed();
// Close database connection
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // STEP 1: Create Users
  // We need users before we can create their playlists!
  const alice = await createUser("alice", "password123");
  const bob = await createUser("bob", "securepass456");
  
  console.log("✅ Created users:", alice.username, bob.username);

  // STEP 2: Create Tracks (20 tracks)
  // These aren't owned by anyone - they're shared music
  const tracks = [];
  for (let i = 1; i <= 20; i++) {
    const track = await createTrack("Track " + i, i * 50000);
    tracks.push(track);
  }
  
  console.log("✅ Created 20 tracks");

  // STEP 3: Create Playlists for Alice
  // Alice gets 3 playlists
  const alicePlaylist1 = await createPlaylist(
    "Alice's Chill Mix",
    "Relaxing tunes for studying",
    alice.id  // ← IMPORTANT: Pass the user ID!
  );
  
  const alicePlaylist2 = await createPlaylist(
    "Alice's Workout",
    "High energy music",
    alice.id
  );
  
  const alicePlaylist3 = await createPlaylist(
    "Alice's Road Trip",
    "Songs for long drives",
    alice.id
  );

  console.log("✅ Created 3 playlists for Alice");

  // STEP 4: Add Tracks to Alice's Playlists
  // Each playlist needs at least 5 tracks (per requirements)
  
  // Alice's Chill Mix gets tracks 1-5
  for (let i = 0; i < 5; i++) {
    await createPlaylistTrack(alicePlaylist1.id, tracks[i].id);
  }
  
  // Alice's Workout gets tracks 6-10
  for (let i = 5; i < 10; i++) {
    await createPlaylistTrack(alicePlaylist2.id, tracks[i].id);
  }
  
  // Alice's Road Trip gets tracks 11-15
  for (let i = 10; i < 15; i++) {
    await createPlaylistTrack(alicePlaylist3.id, tracks[i].id);
  }

  console.log("✅ Added tracks to Alice's playlists");

  // STEP 5: Create Playlists for Bob
  const bobPlaylist1 = await createPlaylist(
    "Bob's Jazz Collection",
    "Smooth jazz classics",
    bob.id
  );
  
  const bobPlaylist2 = await createPlaylist(
    "Bob's Party Mix",
    "Get the party started!",
    bob.id
  );

  console.log("✅ Created 2 playlists for Bob");

  // STEP 6: Add Tracks to Bob's Playlists
  
  // Bob's Jazz Collection gets tracks 1-6
  for (let i = 0; i < 6; i++) {
    await createPlaylistTrack(bobPlaylist1.id, tracks[i].id);
  }
  
  // Bob's Party Mix gets tracks 15-20
  for (let i = 14; i < 20; i++) {
    await createPlaylistTrack(bobPlaylist2.id, tracks[i].id);
  }

  console.log("✅ Added tracks to Bob's playlists");
  console.log("🎉 Seeding complete!");
}
```

### Key Concepts in the Seed File

#### 1. **Async/Await**
```javascript
const alice = await createUser("alice", "password123");
```
- `await`: Wait for this to complete before continuing
- Database operations take time, so we wait for them
- Without `await`, code would run in wrong order!

#### 2. **Storing Results**
```javascript
const alice = await createUser("alice", "password123");
```
- We save the created user in a variable
- **Why?** We need `alice.id` to create her playlists later

#### 3. **Loops for Efficiency**
```javascript
for (let i = 0; i < 5; i++) {
  await createPlaylistTrack(alicePlaylist1.id, tracks[i].id);
}
```
- Instead of writing 5 separate lines, use a loop
- `tracks[i]`: Array indexing (tracks[0] is first track, tracks[1] is second, etc.)

### 📝 Task: Update db/seed.js

Replace your entire `db/seed.js` file with the code above.

**Before running:** We need to create the `createUser` function first!

### 🔧 Git Checkpoint: Commit Seed File

```bash
# Stage and commit the updated seed file
git add db/seed.js
git commit -m "Update seed file to create users and associate playlists with users"
git push
```

**Pro Tip:** You can stage and commit multiple files at once:
```bash
git add file1.js file2.js file3.js
git commit -m "Your message"
```

Or stage ALL changed files:
```bash
git add .
git commit -m "Your message"
```

**Be careful with `git add .`** - make sure you want to include everything!

---

## Part 4: Creating User Database Queries

We need to create `db/queries/users.js` with functions to interact with the users table.

### Create the Users Query File

Create a new file: `db/queries/users.js`

```javascript
import db from "#db/client";
import bcrypt from "bcrypt";

// How many times to hash the password (10 is standard)
const SALT_ROUNDS = 10;

/**
 * Creates a new user with a hashed password
 * @param {string} username - The username (must be unique)
 * @param {string} password - The plain text password
 * @returns {Promise<Object>} The created user (without password)
 */
export async function createUser(username, password) {
  // STEP 1: Hash the password
  // Never store plain passwords in the database!
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  
  // STEP 2: Insert into database
  const sql = `
    INSERT INTO users
      (username, password)
    VALUES
      ($1, $2)
    RETURNING id, username
  `;
  
  // STEP 3: Execute query and get result
  const {
    rows: [user],
  } = await db.query(sql, [username, hashedPassword]);
  
  return user;
}

/**
 * Gets a user by their ID
 * @param {number} id - The user's ID
 * @returns {Promise<Object|undefined>} The user or undefined if not found
 */
export async function getUserById(id) {
  const sql = `
    SELECT id, username
    FROM users
    WHERE id = $1
  `;
  
  const {
    rows: [user],
  } = await db.query(sql, [id]);
  
  return user;
}

/**
 * Gets a user by their username (used for login)
 * @param {string} username - The username
 * @returns {Promise<Object|undefined>} The user (with password) or undefined
 */
export async function getUserByUsername(username) {
  const sql = `
    SELECT *
    FROM users
    WHERE username = $1
  `;
  
  const {
    rows: [user],
  } = await db.query(sql, [username]);
  
  return user;
}
```

### Understanding Each Function

#### Function 1: `createUser`

**Purpose**: Create a new user account

```javascript
export async function createUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
```

**Line-by-line:**
1. `export async function`: Makes this function available to other files
2. `bcrypt.hash()`: Converts plain password to hashed version
3. `SALT_ROUNDS`: Higher = more secure but slower (10 is good balance)

**The SQL Query:**
```javascript
const sql = `
  INSERT INTO users
    (username, password)
  VALUES
    ($1, $2)
  RETURNING id, username
`;
```

- `INSERT INTO users`: Add a new row to users table
- `(username, password)`: Columns we're inserting into
- `VALUES ($1, $2)`: Placeholders for our data
  - `$1` = first parameter (username)
  - `$2` = second parameter (hashedPassword)
- `RETURNING id, username`: Give back the created user data
  - **Note**: We don't return password for security!

**Executing the Query:**
```javascript
const {
  rows: [user],
} = await db.query(sql, [username, hashedPassword]);
```

**What's happening here?**
- `db.query(sql, [username, hashedPassword])`: Run the query with our data
- Returns: `{ rows: [ { id: 1, username: 'alice' } ] }`
- `rows: [user]`: Destructure to get first row and call it `user`

**Analogy**: It's like filling out a form, submitting it, and getting a receipt back.

#### Function 2: `getUserById`

**Purpose**: Find a user by their ID (used by authentication middleware)

```javascript
export async function getUserById(id) {
  const sql = `
    SELECT id, username
    FROM users
    WHERE id = $1
  `;
```

- `SELECT id, username`: Get only these columns (not password!)
- `WHERE id = $1`: Filter for user with this ID
- **Security**: Never return password unless absolutely necessary!

#### Function 3: `getUserByUsername`

**Purpose**: Find a user by username (used for login)

```javascript
export async function getUserByUsername(username) {
  const sql = `
    SELECT *
    FROM users
    WHERE username = $1
  `;
```

- `SELECT *`: Get ALL columns (including password)
- **Why?** We need the hashed password to compare during login
- **This is the ONLY function that returns the password!**

### 📝 Task: Create db/queries/users.js

1. Create the file `db/queries/users.js`
2. Copy the complete code above
3. Save the file

### 🔧 Git Checkpoint: Commit User Queries

```bash
# Stage the new file
git add db/queries/users.js
git commit -m "Create user database query functions with password hashing"
git push
```

**Understanding Git with New Files:**
- Git automatically detects new files
- They show as "Untracked files" in `git status`
- You must `git add` them to start tracking

---

## Part 5: Building the Users Router

Now let's create the `/users` router that handles registration and login.

### Create the Users API Router

Create a new file: `api/users.js`

```javascript
import express from "express";
const router = express.Router();
export default router;

import bcrypt from "bcrypt";

import { createUser, getUserByUsername } from "#db/queries/users";
import { createToken } from "#utils/jwt";
import requireBody from "#middleware/requireBody";

/**
 * POST /users/register
 * Creates a new user account
 */
router.post(
  "/register",
  requireBody(["username", "password"]),
  async (req, res, next) => {
    try {
      // Get username and password from request body
      const { username, password } = req.body;

      // Create the user (password will be hashed in createUser)
      const user = await createUser(username, password);

      // Create a JWT token containing the user's ID
      const token = createToken({ id: user.id });

      // Send back the token with 201 Created status
      res.status(201).send(token);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /users/login
 * Authenticates a user and returns a token
 */
router.post(
  "/login",
  requireBody(["username", "password"]),
  async (req, res, next) => {
    try {
      // STEP 1: Get credentials from request
      const { username, password } = req.body;

      // STEP 2: Find user in database
      const user = await getUserByUsername(username);

      // STEP 3: Check if user exists
      if (!user) {
        return res.status(401).send("Invalid credentials.");
      }

      // STEP 4: Compare provided password with hashed password
      const isValid = await bcrypt.compare(password, user.password);

      // STEP 5: If password doesn't match, reject
      if (!isValid) {
        return res.status(401).send("Invalid credentials.");
      }

      // STEP 6: Create and send token
      const token = createToken({ id: user.id });
      res.send(token);
    } catch (error) {
      next(error);
    }
  }
);
```

### Understanding the Register Route

#### The Middleware Chain
```javascript
router.post(
  "/register",
  requireBody(["username", "password"]),  // ← Middleware
  async (req, res, next) => {            // ← Route handler
```

**Middleware** runs BEFORE your route handler:
1. `requireBody()` checks if username and password are present
2. If missing → sends 400 error and stops
3. If present → continues to route handler

Think of it like a bouncer checking IDs before letting people into a club.

#### Creating the User
```javascript
const { username, password } = req.body;
const user = await createUser(username, password);
```

- **Destructuring**: Extract username and password from req.body
- `createUser()`: Creates user with hashed password
- Returns: `{ id: 1, username: 'alice' }`

#### Creating the Token
```javascript
const token = createToken({ id: user.id });
```

- Payload: `{ id: 1 }` (just the user ID)
- Creates: `"eyJhbGciOiJIUzI1NiIs..."` (JWT token)
- **Why just ID?** Keep tokens small; we can look up full user info later

#### Sending the Response
```javascript
res.status(201).send(token);
```

- `201`: HTTP status code for "Created"
- Sends the token as plain text
- Client will save this token and include it in future requests

### Understanding the Login Route

#### Step-by-Step Login Process

**Step 1: Get Credentials**
```javascript
const { username, password } = req.body;
```
User sends: `{ username: "alice", password: "password123" }`

**Step 2: Find User**
```javascript
const user = await getUserByUsername(username);
```
Database returns: `{ id: 1, username: "alice", password: "$2b$10$..." }`

**Step 3: Check if User Exists**
```javascript
if (!user) {
  return res.status(401).send("Invalid credentials.");
}
```
- `401`: Unauthorized status code
- **Security tip**: Don't say "user not found" - reveals username exists!
- Generic message: "Invalid credentials" could be wrong username OR password

**Step 4: Compare Passwords**
```javascript
const isValid = await bcrypt.compare(password, user.password);
```

**How bcrypt.compare works:**
1. Takes plain password: `"password123"`
2. Takes hashed password: `"$2b$10$xK3h2..."`
3. Hashes the plain password the same way
4. Compares: do they match?
5. Returns: `true` or `false`

**Why not just compare strings?**
- Hashed passwords are salted (have random data)
- Same password hashes differently each time
- `bcrypt.compare()` knows how to handle this

**Step 5: Validate**
```javascript
if (!isValid) {
  return res.status(401).send("Invalid credentials.");
}
```
Wrong password = same error message as wrong username (security!)

**Step 6: Success!**
```javascript
const token = createToken({ id: user.id });
res.send(token);
```
Password correct → create token → send to user

### Error Handling

```javascript
} catch (error) {
  next(error);
}
```

- `try/catch`: Catches any unexpected errors
- `next(error)`: Passes error to Express error handler
- Error handler in `app.js` will handle it appropriately

### 📝 Task: Create api/users.js and Update app.js

1. **Create** `api/users.js` with the code above

2. **Update** `app.js` to include the users router:

```javascript
import express from "express";
const app = express();
export default app;

import morgan from "morgan";

import usersRouter from "#api/users";  // ← ADD THIS
import tracksRouter from "#api/tracks";
import playlistsRouter from "#api/playlists";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/users", usersRouter);  // ← ADD THIS
app.use("/tracks", tracksRouter);
app.use("/playlists", playlistsRouter);

// ... rest of app.js
```

### 🔧 Git Checkpoint: Commit User Authentication

```bash
# Stage both files
git add api/users.js app.js
git commit -m "Add user registration and login endpoints"
git push
```

**Check your progress:**
```bash
git log --oneline
```

This shows a list of your commits:
```
e4f5g6h Add user registration and login endpoints
d3e4f5g Create user database query functions with password hashing
c2d3e4f Update seed file to create users and associate playlists with users
b1c2d3e Add user_id foreign key to playlists table
a1b2c3d Add users table to database schema
```

**Reading the log:**
- Each line is one commit
- Letters/numbers (e4f5g6h) = unique commit ID
- Message = what you wrote in `git commit -m "..."`
- Most recent commits at the top

---

## Part 6: Protecting Playlist Routes

Now we need to:
1. Require authentication for all playlist routes
2. Filter playlists by user
3. Prevent users from accessing others' playlists

### Update Playlist Database Queries

First, update `db/queries/playlists.js`:

```javascript
import db from "#db/client";

/**
 * Creates a new playlist for a specific user
 */
export async function createPlaylist(name, description, userId) {
  const sql = `
    INSERT INTO playlists
      (name, description, user_id)
    VALUES
      ($1, $2, $3)
    RETURNING *
  `;
  
  const {
    rows: [playlist],
  } = await db.query(sql, [name, description, userId]);
  
  return playlist;
}

/**
 * Gets all playlists for a specific user
 */
export async function getPlaylistsByUserId(userId) {
  const sql = `
    SELECT *
    FROM playlists
    WHERE user_id = $1
  `;
  
  const { rows: playlists } = await db.query(sql, [userId]);
  return playlists;
}

/**
 * Gets a single playlist by ID
 */
export async function getPlaylistById(id) {
  const sql = `
    SELECT *
    FROM playlists
    WHERE id = $1
  `;
  
  const {
    rows: [playlist],
  } = await db.query(sql, [id]);
  
  return playlist;
}
```

**Key Changes:**

1. **createPlaylist now takes userId**:
```javascript
export async function createPlaylist(name, description, userId) {
  // ...
  VALUES ($1, $2, $3)  // ← Three parameters now
```

2. **New function getPlaylistsByUserId**:
```javascript
WHERE user_id = $1  // ← Only get playlists for this user
```

### Update Playlist Router

Now update `api/playlists.js`:

```javascript
import express from "express";
const router = express.Router();
export default router;

import {
  createPlaylist,
  getPlaylistById,
  getPlaylistsByUserId,  // ← Changed!
} from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { getTracksByPlaylistId } from "#db/queries/tracks";

import getUserFromToken from "#middleware/getUserFromToken";
import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

// Apply authentication middleware to ALL routes in this router
router.use(getUserFromToken);  // ← Extract user from token
router.use(requireUser);       // ← Require user to be logged in

/**
 * GET /playlists
 * Get all playlists for the logged-in user
 */
router.get("/", async (req, res) => {
  // req.user is available because of middleware!
  const playlists = await getPlaylistsByUserId(req.user.id);
  res.send(playlists);
});

/**
 * POST /playlists
 * Create a new playlist for the logged-in user
 */
router.post("/", requireBody(["name", "description"]), async (req, res) => {
  const { name, description } = req.body;
  
  // Pass the logged-in user's ID
  const playlist = await createPlaylist(name, description, req.user.id);
  
  res.status(201).send(playlist);
});

/**
 * Middleware: Load playlist and check ownership
 */
router.param("id", async (req, res, next, id) => {
  const playlist = await getPlaylistById(id);
  
  // Check if playlist exists
  if (!playlist) {
    return res.status(404).send("Playlist not found.");
  }
  
  // Check if user owns this playlist
  if (playlist.user_id !== req.user.id) {
    return res.status(403).send("You do not have permission to access this playlist.");
  }
  
  // Attach playlist to request for next handler
  req.playlist = playlist;
  next();
});

/**
 * GET /playlists/:id
 * Get a specific playlist
 */
router.get("/:id", (req, res) => {
  res.send(req.playlist);
});

/**
 * GET /playlists/:id/tracks
 * Get all tracks in a playlist
 */
router.get("/:id/tracks", async (req, res) => {
  const tracks = await getTracksByPlaylistId(req.playlist.id);
  res.send(tracks);
});

/**
 * POST /playlists/:id/tracks
 * Add a track to a playlist
 */
router.post("/:id/tracks", requireBody(["trackId"]), async (req, res) => {
  const { trackId } = req.body;
  
  const playlistTrack = await createPlaylistTrack(req.playlist.id, trackId);
  
  res.status(201).send(playlistTrack);
});

export default router;
```

### Understanding the Protection Strategy

#### Router-Level Middleware
```javascript
router.use(getUserFromToken);
router.use(requireUser);
```

**What does `router.use()` do?**
- Applies middleware to ALL routes in this router
- Runs BEFORE any route handler
- Like a gatekeeper for the entire `/playlists` router

**The Flow:**
```
Request → getUserFromToken → requireUser → Route Handler
         ↓                  ↓              ↓
         Extracts user      Checks if     Handles request
         from token        logged in
```

#### getUserFromToken Middleware (Already Created)

Let's understand what this does:

```javascript
const authorization = req.get("authorization");
// Gets: "Bearer eyJhbGciOiJIUzI1NiIs..."

if (!authorization || !authorization.startsWith("Bearer ")) return next();
// Not logged in → continue without user (other middleware will handle)

const token = authorization.split(" ")[1];
// Extracts: "eyJhbGciOiJIUzI1NiIs..."

const { id } = verifyToken(token);
// Decodes token → { id: 1 }

const user = await getUserById(id);
// Fetches: { id: 1, username: "alice" }

req.user = user;
// Attaches user to request for next middleware/handler
```

#### requireUser Middleware (Already Created)

```javascript
if (!req.user) return res.status(401).send("Unauthorized");
next();
```

**Simple but powerful:**
- If `req.user` doesn't exist → user not logged in → 401 error
- If `req.user` exists → continue to route handler

#### Filtering by User

**Old way** (got ALL playlists):
```javascript
router.get("/", async (req, res) => {
  const playlists = await getPlaylists();  // Everyone's playlists!
  res.send(playlists);
});
```

**New way** (only user's playlists):
```javascript
router.get("/", async (req, res) => {
  const playlists = await getPlaylistsByUserId(req.user.id);  // Just mine!
  res.send(playlists);
});
```

#### Checking Ownership with router.param

```javascript
router.param("id", async (req, res, next, id) => {
```

**What is router.param?**
- Special middleware for route parameters
- Runs whenever there's an `:id` in the URL
- Examples: `/playlists/5`, `/playlists/10/tracks`

**The Ownership Check:**
```javascript
if (playlist.user_id !== req.user.id) {
  return res.status(403).send("You do not have permission...");
}
```

**Status Codes:**
- `401 Unauthorized`: Not logged in
- `403 Forbidden`: Logged in, but not allowed
- `404 Not Found`: Doesn't exist

**Example Scenario:**

Alice (id: 1) tries to access Bob's playlist (user_id: 2):
```
GET /playlists/5
→ Playlist 5 belongs to Bob (user_id: 2)
→ Alice's user_id (1) !== playlist.user_id (2)
→ 403 Forbidden: "You do not have permission..."
```

### 📝 Task: Update Playlist Files

1. **Update** `db/queries/playlists.js` with the new code
2. **Update** `api/playlists.js` with the protected routes

### 🔧 Git Checkpoint: Commit Protected Playlists

```bash
# Stage both files
git add db/queries/playlists.js api/playlists.js
git commit -m "Add authentication and authorization to playlist routes"
git push
```

**What we accomplished:**
- ✅ Playlists now belong to users
- ✅ Users must be logged in to access playlists
- ✅ Users can only see their own playlists
- ✅ Ownership checks prevent unauthorized access

---

## Part 7: Updating Track Routes

Finally, we need to add one protected route to tracks: getting playlists that contain a specific track.

### Update Track Database Queries

Add this function to `db/queries/tracks.js`:

```javascript
/**
 * Gets all playlists containing this track, filtered by user
 */
export async function getPlaylistsByTrackId(trackId, userId) {
  const sql = `
    SELECT DISTINCT playlists.*
    FROM
      playlists
      JOIN playlists_tracks ON playlists_tracks.playlist_id = playlists.id
      JOIN tracks ON tracks.id = playlists_tracks.track_id
    WHERE
      tracks.id = $1
      AND playlists.user_id = $2
  `;
  
  const { rows: playlists } = await db.query(sql, [trackId, userId]);
  return playlists;
}
```

**Understanding the SQL Query:**

```sql
SELECT DISTINCT playlists.*
```
- `SELECT`: Get data
- `DISTINCT`: No duplicates (same playlist shouldn't appear twice)
- `playlists.*`: All columns from playlists table

```sql
FROM
  playlists
  JOIN playlists_tracks ON playlists_tracks.playlist_id = playlists.id
  JOIN tracks ON tracks.id = playlists_tracks.track_id
```

**Understanding JOINs:**

Think of JOIN as connecting related tables:

```
tracks           playlists_tracks         playlists
┌────┬───────┐  ┌────┬─────────┬────┐   ┌────┬──────┬────────┐
│ id │ name  │  │ id │ pl_id   │ tr │   │ id │ name │ user_id│
├────┼───────┤  ├────┼─────────┼────┤   ├────┼──────┼────────┤
│ 1  │Track1 │──│ 1  │ 1       │ 1  │───│ 1  │Chill │ 1      │
│ 2  │Track2 │  │ 2  │ 1       │ 2  │   │ 2  │Rock  │ 2      │
└────┴───────┘  │ 3  │ 2       │ 1  │───└────┴──────┴────────┘
                └────┴─────────┴────┘
```

The query connects these tables to find which playlists contain a track.

```sql
WHERE
  tracks.id = $1
  AND playlists.user_id = $2
```

**Two filters:**
1. `tracks.id = $1`: Only for this specific track
2. `playlists.user_id = $2`: Only playlists owned by this user

**Why filter by user?**
- Security: Only show my playlists
- Privacy: Don't reveal others' playlists

### Update Track Router

Update `api/tracks.js`:

```javascript
import express from "express";
const router = express.Router();
export default router;

import {
  getTracks,
  getTrackById,
  getPlaylistsByTrackId,  // ← ADD THIS
} from "#db/queries/tracks";

import getUserFromToken from "#middleware/getUserFromToken";
import requireUser from "#middleware/requireUser";

/**
 * GET /tracks
 * Public route - anyone can see all tracks
 */
router.get("/", async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

/**
 * GET /tracks/:id
 * Public route - anyone can see a specific track
 */
router.get("/:id", async (req, res) => {
  const track = await getTrackById(req.params.id);
  if (!track) return res.status(404).send("Track not found.");
  res.send(track);
});

/**
 * GET /tracks/:id/playlists
 * Protected route - shows which of MY playlists contain this track
 */
router.get(
  "/:id/playlists",
  getUserFromToken,  // ← Extract user
  requireUser,       // ← Require login
  async (req, res) => {
    // Check if track exists
    const track = await getTrackById(req.params.id);
    if (!track) {
      return res.status(404).send("Track not found.");
    }
    
    // Get user's playlists containing this track
    const playlists = await getPlaylistsByTrackId(track.id, req.user.id);
    res.send(playlists);
  }
);

export default router;
```

**Key Points:**

1. **Mixed Protection**: First two routes are public, last one is protected

2. **Route-Specific Middleware**:
```javascript
router.get(
  "/:id/playlists",
  getUserFromToken,  // These middleware only apply
  requireUser,       // to this specific route
  async (req, res) => {
```

3. **Two-Step Validation**:
```javascript
// First: Does track exist?
const track = await getTrackById(req.params.id);
if (!track) return res.status(404).send("Track not found.");

// Second: Get user's playlists
const playlists = await getPlaylistsByTrackId(track.id, req.user.id);
```

### 📝 Task: Update Track Files

1. **Update** `db/queries/tracks.js` - add `getPlaylistsByTrackId` function
2. **Update** `api/tracks.js` - add the protected route

### 🔧 Git Checkpoint: Commit Track Updates

```bash
# Stage both files
git add db/queries/tracks.js api/tracks.js
git commit -m "Add protected route to get user's playlists containing a track"
git push
```

**Feature Complete!** All code is now written. Time to test! 🎉

---

## Part 8: Testing Your Application

### Running the Database Scripts

1. **Reset the database**:
```bash
npm run db:reset
```

This runs:
- `npm run db:schema` - Creates tables
- `npm run db:seed` - Seeds data

**Expected output:**
```
✅ Created users: alice bob
✅ Created 20 tracks
✅ Created 3 playlists for Alice
✅ Added tracks to Alice's playlists
✅ Created 2 playlists for Bob
✅ Added tracks to Bob's playlists
🎉 Seeding complete!
🌱 Database seeded.
```

2. **Start the server**:
```bash
npm run dev
```

### Running the Tests

```bash
npm run test
```

All tests should pass! ✅

### Manual Testing with curl or Postman

#### 1. Register a New User

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass"}'
```

**Expected Response**: A JWT token
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Save this token!** You'll need it for authenticated requests.

#### 2. Login

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"password123"}'
```

#### 3. Get Your Playlists

```bash
curl http://localhost:3000/playlists \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response**: Array of your playlists
```json
[
  {
    "id": 1,
    "name": "Alice's Chill Mix",
    "description": "Relaxing tunes for studying",
    "user_id": 1
  }
]
```

#### 4. Try Accessing Without Token (Should Fail)

```bash
curl http://localhost:3000/playlists
```

**Expected Response**: 401 Unauthorized

#### 5. Get Tracks in Your Playlist

```bash
curl http://localhost:3000/playlists/1/tracks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### 6. Try Accessing Someone Else's Playlist (Should Fail)

If you're logged in as alice (user_id: 1) and try to access Bob's playlist:

```bash
curl http://localhost:3000/playlists/4 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response**: 403 Forbidden

### Understanding Test Results

The test file checks all requirements:

| Test | What It Checks |
|------|----------------|
| POST /users/register | Creates user with hashed password |
| POST /users/login | Returns token for valid credentials |
| Protected routes without token | Returns 401 |
| GET /playlists | Only returns user's playlists |
| GET /playlists/:id with wrong user | Returns 403 |
| POST /playlists | Creates playlist for logged-in user |
| GET /tracks/:id/playlists | Returns user's playlists containing track |

---

## 🎓 Concepts Summary

### Authentication Flow
```
1. Register/Login → Server creates JWT token
2. Client saves token
3. Client includes token in requests: "Authorization: Bearer TOKEN"
4. Server validates token
5. Server attaches user to request
6. Route handlers use req.user
```

### Key Security Principles

1. **Never store plain passwords** - always hash
2. **Use HTTPS in production** - protect tokens in transit
3. **Validate on server** - never trust client
4. **Appropriate status codes** - 401 vs 403
5. **Generic error messages** - don't reveal user existence

### SQL Relationships

**One-to-Many**: One user → Many playlists
```sql
user_id integer REFERENCES users(id) ON DELETE CASCADE
```

**Many-to-Many**: Playlists ↔ Tracks (through playlists_tracks)
```sql
CREATE TABLE playlists_tracks (
  playlist_id integer REFERENCES playlists(id),
  track_id integer REFERENCES tracks(id)
)
```

### Middleware Patterns

**Router-level** (all routes):
```javascript
router.use(getUserFromToken);
```

**Route-specific** (one route):
```javascript
router.get("/:id", requireUser, async (req, res) => {
```

**Parameter middleware** (when :id in URL):
```javascript
router.param("id", async (req, res, next, id) => {
```

---

## 🐛 Common Errors and Solutions

### Error: "relation 'users' does not exist"
**Solution**: Run `npm run db:schema` to create tables

### Error: "column 'user_id' does not exist"
**Solution**: Make sure you added `user_id` to playlists table in schema.sql

### Error: "Cannot read property 'id' of undefined"
**Solution**: Check that middleware is extracting `req.user` correctly

### Error: "Invalid token"
**Solution**: Make sure you're including "Bearer " before the token

### Error: Test failure: "Expected 401, received 200"
**Solution**: Make sure you added `getUserFromToken` and `requireUser` middleware

---

## Final Git Workflow - Merging to Main

Congratulations! Your feature is complete. Now let's merge it into the main branch using best practices.

### Step 1: Make Sure Everything is Committed

```bash
# Check for uncommitted changes
git status
```

**Expected output:**
```
On branch feature/add-authentication
nothing to commit, working tree clean
```

**If you see modified files:**
```bash
git add .
git commit -m "fix: final cleanup and documentation"
git push
```

### Step 2: Run Final Tests

Before merging, ensure everything works:

```bash
# Run all tests
npm run test
```

**All tests should pass!** ✅

If any tests fail, fix them before proceeding:
1. Fix the issue
2. Stage and commit: `git add .` and `git commit -m "fix: ..."`
3. Push: `git push`
4. Run tests again

### Step 3: View Your Commit History

```bash
# See all commits on your feature branch
git log --oneline
```

**Expected output (your commits):**
```
h7i8j9k Add protected route to get user's playlists containing a track
g6h7i8j Protect playlist routes and add user ownership checks
f5g6h7i Create users API router with register and login endpoints
e4f5g6h Add user database query functions
d3e4f5g Update seed file to create users and user-owned playlists
c2d3e4f Add user_id foreign key to playlists table
b1c2d3e Add users table to database schema
a1b2c3d Initial project setup
```

**This shows your complete feature development! 🎨**

### Step 4: Merge via GitHub Pull Request (Recommended)

**Why use Pull Requests?**
- Visual review of all changes
- Can add descriptions and comments
- Industry standard practice
- Creates documentation of changes
- Can request reviews from others

#### Creating the Pull Request:

1. **Go to your repository on GitHub:**
   ```
   https://github.com/kevinmac88/Block-41-Workshop---Jukebox-Pro
   ```

2. **You should see a banner:**
   ```
   feature/add-authentication had recent pushes [Compare & pull request]
   ```
   Click **"Compare & pull request"**

3. **Fill out the Pull Request form:**

   **Title:**
   ```
   Add user authentication and authorization
   ```

   **Description** (use this template):
   ```markdown
   ## Description
   Adds user authentication system with JWT tokens and protects playlist routes.

   ## Changes
   - ✅ Created users table with username and password fields
   - ✅ Added user_id foreign key to playlists table
   - ✅ Implemented user registration with password hashing (bcrypt)
   - ✅ Implemented user login with JWT token generation
   - ✅ Protected all playlist routes with authentication middleware
   - ✅ Filtered playlists by logged-in user
   - ✅ Added authorization checks (users can only access own playlists)
   - ✅ Added protected track route to get user's playlists containing a track
   - ✅ Updated seed file to create test users with playlists

   ## Testing
   - [x] All tests pass (`npm run test`)
   - [x] Database seeds successfully
   - [x] Can register new users
   - [x] Can login existing users
   - [x] Protected routes return 401 without token
   - [x] Users can only see their own playlists
   - [x] Users receive 403 when accessing others' playlists

   ## Rubric Compliance
   All 13 criteria from the rubric are met:
   - [x] Tables created correctly with constraints
   - [x] Database seeded with users who own playlists containing tracks
   - [x] POST /register creates user and sends token
   - [x] Passwords are hashed in database
   - [x] POST /login sends token for valid credentials
   - [x] Playlist routes protected from unauthenticated access
   - [x] GET /playlists sends only user's playlists
   - [x] GET /playlists/:id sends specific playlist with tracks
   - [x] GET /playlists/:id sends 403 if user doesn't own playlist
   - [x] POST /playlists creates playlist for logged-in user
   - [x] GET /tracks sends all tracks
   - [x] GET /tracks/:id sends specific track
   - [x] GET /tracks/:id/playlists sends user's playlists containing track
   ```

4. **Check the "Files changed" tab:**
   - Review all your changes
   - Make sure no accidental files included (node_modules, .env, etc.)
   - Everything looks good? Continue!

5. **Click "Create pull request"**

6. **Merge the Pull Request:**
   - Once created, click **"Merge pull request"**
   - Click **"Confirm merge"**
   - Click **"Delete branch"** (cleanup remote branch)

### Step 5: Alternative - Merge Locally (Command Line)

If you prefer to merge from the command line:

```bash
# Switch to main branch
git checkout main

# Make sure main is up to date
git pull origin main

# Merge your feature branch
git merge feature/add-authentication

# Push the merged main branch
git push origin main
```

**Expected output:**
```
Updating a1b2c3d..h7i8j9k
Fast-forward
 db/schema.sql              | 15 +++++++++++
 db/seed.js                 | 65 +++++++++++++++++++++++++++++++++++++++++
 db/queries/users.js        | 42 +++++++++++++++++++++++++++
 db/queries/playlists.js    | 25 +++++++++-------
 db/queries/tracks.js       | 18 ++++++++++++
 api/users.js               | 58 +++++++++++++++++++++++++++++++++++++
 api/playlists.js           | 35 +++++++++++-----------
 api/tracks.js              | 15 ++++++++++
 8 files changed, 245 insertions(+), 28 deletions(-)
 create mode 100644 db/queries/users.js
 create mode 100644 api/users.js
```

### Step 6: Clean Up Local Branches

After merging, delete your local feature branch:

```bash
# Make sure you're on main
git checkout main

# Delete the feature branch
git branch -d feature/add-authentication
```

**Expected output:**
```
Deleted branch feature/add-authentication (was h7i8j9k).
```

**The `-d` flag:**
- Safely deletes merged branches
- Prevents accidental deletion of unmerged work
- Git will warn you if branch isn't merged

### Step 7: Verify Everything on Main

```bash
# See your recent commits on main
git log --oneline -10

# Check that all your changes are present
git diff HEAD~10
```

### Understanding the Complete Git Workflow

Here's what we accomplished:

```
Initial State:
main ──○──○──○
              │
              └─ feature/add-authentication (created)

During Development:
main ──○──○──○
              │
              └─ feature ──○──○──○──○──○──○──○
                          (7 commits of work)

After Merge:
main ──○──○──○──○──○──○──○──○──○──○
                          (feature merged in)
```

### Git Best Practices Summary

✅ **DO:**
- Make small, focused commits
- Write clear commit messages
- Commit often (save your progress)
- Test before merging
- Use feature branches
- Pull before pushing
- Delete merged branches

❌ **DON'T:**
- Commit directly to main (use branches!)
- Commit sensitive data (.env files, passwords)
- Make huge commits with many unrelated changes
- Use vague messages ("fix stuff", "updates")
- Force push to shared branches
- Forget to pull before starting work

### Understanding Merge Conflicts (You Probably Won't Have Any)

**What are merge conflicts?**
- Happens when Git can't automatically combine changes
- Usually when two people edit the same line
- Since you're working alone, unlikely to encounter

**If you do see a conflict:**
```bash
# Git will mark the conflicting files
# Open the file and look for:
<<<<<<< HEAD
Your changes
=======
Other changes
>>>>>>> feature/add-authentication

# Decide which to keep, delete the markers, then:
git add <conflicted-file>
git commit -m "resolve: merge conflict in <file>"
```

### Viewing Your Success on GitHub

Go to your repository:
```
https://github.com/kevinmac88/Block-41-Workshop---Jukebox-Pro
```

**What you should see:**
- ✅ Main branch has your latest commits
- ✅ Pull request shows as "Merged"
- ✅ Feature branch deleted (cleanup!)
- ✅ Commit history shows your work
- ✅ Green checkmarks if you set up CI/CD

---

## 🎯 Git Commands Quick Reference

### Daily Workflow
```bash
git status              # Check what's changed
git add <file>          # Stage specific file
git add .               # Stage all changes
git commit -m "msg"     # Commit with message
git push                # Push to GitHub
git pull                # Get latest changes
```

### Branch Management
```bash
git branch                      # List branches
git checkout -b feature/name    # Create & switch to branch
git checkout main               # Switch to main
git merge feature/name          # Merge branch into current
git branch -d feature/name      # Delete merged branch
```

### Viewing History
```bash
git log                 # Full commit history
git log --oneline       # Compact history
git log --oneline -5    # Last 5 commits
git diff                # See uncommitted changes
```

### Undoing Changes
```bash
git checkout -- <file>      # Discard changes in file
git reset HEAD <file>       # Unstage file
git commit --amend          # Edit last commit message
git reset --soft HEAD~1     # Undo last commit, keep changes
```

**⚠️ Be careful with reset commands! Can lose work.**

### Remote Operations
```bash
git remote -v                       # Show remote URLs
git push origin branch-name         # Push specific branch
git push -u origin branch-name      # Push & set upstream
git pull origin main                # Pull specific branch
```

---

## 🚀 Next Steps

Now that you've completed this project, you understand:

✅ User authentication with JWT  
✅ Password hashing with bcrypt  
✅ Protected routes and authorization  
✅ Database relationships (foreign keys)  
✅ Middleware patterns in Express  
✅ SQL queries with JOINs and WHERE clauses  
✅ Git feature branch workflow  
✅ Pull requests and code merging  

**Challenge yourself:**
- Add password reset functionality
- Implement refresh tokens
- Add user profile endpoints
- Create shared playlists
- Add track search functionality
- Set up continuous integration (GitHub Actions)
- Deploy to a hosting service (Render, Railway, or Heroku)

---

## 📚 Additional Resources

**Authentication & Security:**
- JWT: https://jwt.io/introduction  
- bcrypt: https://github.com/kelektiv/node.bcrypt.js  

**Express & Node.js:**
- Express Middleware: https://expressjs.com/en/guide/using-middleware.html  
- Node.js Best Practices: https://github.com/goldbergyoni/nodebestpractices

**Database:**
- PostgreSQL Foreign Keys: https://www.postgresql.org/docs/current/tutorial-fk.html  
- SQL JOIN Visualizer: https://sql-joins.leopard.in.ua/

**Git & Version Control:**
- Git Handbook: https://guides.github.com/introduction/git-handbook/
- Interactive Git Tutorial: https://learngitbranching.js.org/
- Git Command Explorer: https://gitexplorer.com/
- GitHub Pull Requests: https://docs.github.com/en/pull-requests

---

**Congratulations!** 🎉 You've built a secure, authenticated API with user-owned resources AND mastered professional Git workflow. These are fundamental patterns used in every modern web application and development team!


## Final Git Workflow - Merging to Main

Congratulations! Your feature is complete and all tests pass. Now it's time to merge your work into the `main` branch.

### Why Merge?

Right now your changes only exist on `feature/add-authentication`. The `main` branch still has the old code. Merging combines your new code with main.

### The Merge Process

#### Step 1: Ensure Everything is Committed

```bash
# Check for uncommitted changes
git status
```

**If you see any changes:**
```bash
git add .
git commit -m "Final touches and cleanup"
git push
```

**Clean working tree should show:**
```
On branch feature/add-authentication
Your branch is up to date with 'origin/feature/add-authentication'.

nothing to commit, working tree clean
```

#### Step 2: Switch to Main Branch

```bash
git checkout main
```

**Output:**
```
Switched to branch 'main'
Your branch is up to date with 'origin/main'.
```

You're now on the `main` branch! Your files will temporarily revert to the old version (before your changes). Don't worry - your feature branch still has all your work.

#### Step 3: Pull Latest Changes from GitHub

**Always do this before merging!** Someone else might have pushed to main.

```bash
git pull origin main
```

**Output if up to date:**
```
From https://github.com/kevinmac88/Block-41-Workshop---Jukebox-Pro
 * branch            main       -> FETCH_HEAD
Already up to date.
```

#### Step 4: Merge Your Feature Branch

```bash
git merge feature/add-authentication
```

**What happens:**
- Git combines changes from your feature branch into main
- If no conflicts, it automatically creates a merge commit

**Success looks like:**
```
Updating a1b2c3d..e4f5g6h
Fast-forward
 api/playlists.js           | 45 +++++++++++++++++++++++++++--
 api/tracks.js              | 20 +++++++++++++-
 api/users.js               | 58 ++++++++++++++++++++++++++++++++++++++
 app.js                     |  2 ++
 db/queries/playlists.js    | 22 +++++++++++----
 db/queries/tracks.js       | 15 ++++++++++
 db/queries/users.js        | 52 +++++++++++++++++++++++++++++++++
 db/schema.sql              |  7 +++++
 db/seed.js                 | 68 +++++++++++++++++++++++++++++--------------
 9 files changed, 260 insertions(+), 29 deletions(-)
 create mode 100644 api/users.js
 create mode 100644 db/queries/users.js
```

**Understanding the output:**
- **Fast-forward**: Main simply "fast-forwards" to include your changes
- **Files changed**: Shows which files were modified
- **Insertions/deletions**: Lines of code added/removed
- **create mode**: New files you created

#### Step 5: Push Main to GitHub

```bash
git push origin main
```

**Success:**
```
Total 0 (delta 0), reused 0 (delta 0)
To https://github.com/kevinmac88/Block-41-Workshop---Jukebox-Pro
   a1b2c3d..e4f5g6h  main -> main
```

Your changes are now on main! 🎉

#### Step 6: Verify on GitHub

1. Go to https://github.com/kevinmac88/Block-41-Workshop---Jukebox-Pro
2. You should see your recent commits
3. Click on "commits" to see your commit history
4. Your feature branch commits are now part of main!

#### Step 7: Clean Up (Optional)

Delete your feature branch locally:
```bash
git branch -d feature/add-authentication
```

Delete your feature branch on GitHub:
```bash
git push origin --delete feature/add-authentication
```

**Why delete?**
- Keeps your branch list clean
- Feature is merged - branch no longer needed
- You can always see the commits in the history

**Don't want to delete yet?** That's fine! You can keep the branch as a reference.

---

## Understanding Merge Conflicts

### What Are Merge Conflicts?

Sometimes Git can't automatically merge changes. This happens when:
- Two people edit the same line of code
- One person deletes a file another person edited
- Changes are too complex for Git to resolve

### What They Look Like

If you have a conflict, Git will show:
```
Auto-merging api/playlists.js
CONFLICT (content): Merge conflict in api/playlists.js
Automatic merge failed; fix conflicts and then commit the result.
```

### How to Resolve Conflicts

**Step 1: Check which files have conflicts**
```bash
git status
```

Shows:
```
Unmerged paths:
  both modified:   api/playlists.js
```

**Step 2: Open the file in VS Code**

Conflict markers look like:
```javascript
<<<<<<< HEAD (main branch)
router.get("/", async (req, res) => {
  const playlists = await getPlaylists();
=======
router.get("/", async (req, res) => {
  const playlists = await getPlaylistsByUserId(req.user.id);
>>>>>>> feature/add-authentication (your branch)
```

**Step 3: Choose which code to keep**

VS Code makes this easy with clickable options:
- **Accept Current Change** (keep main's version)
- **Accept Incoming Change** (keep your version)
- **Accept Both Changes** (keep both)
- **Manual edit** (write it yourself)

**Step 4: Stage the resolved file**
```bash
git add api/playlists.js
```

**Step 5: Complete the merge**
```bash
git commit -m "Resolve merge conflicts in playlist routes"
```

**Step 6: Push**
```bash
git push origin main
```

---

## Git Best Practices Summary

### Commit Often
✅ Small, focused commits  
✅ Commit after completing each logical piece  
✅ Easier to find bugs - you know which commit caused them  

❌ Don't wait until everything is done  
❌ Don't commit broken code  

### Write Good Commit Messages

**Good:**
```bash
git commit -m "Add user authentication with JWT tokens"
git commit -m "Fix playlist ownership validation bug"
git commit -m "Update seed file to create test users"
```

**Bad:**
```bash
git commit -m "stuff"
git commit -m "asdf"
git commit -m "fix"
git commit -m "I think this works now???"
```

**Format:**
```
[Verb] [What you did]

Verb examples: Add, Update, Fix, Remove, Refactor
```

### Branch Naming

**Good:**
- `feature/add-authentication`
- `feature/user-profiles`
- `bugfix/playlist-deletion`
- `refactor/database-queries`

**Bad:**
- `my-branch`
- `test`
- `new-code`
- `kevin-branch`

### Push Regularly

**Why?**
- ✅ Backs up your work to GitHub
- ✅ Lets others see your progress
- ✅ Prevents losing work if computer crashes

**When?**
- After completing a feature
- End of each coding session
- Before taking a break

### Pull Before You Push

```bash
git pull origin main
```

**Why?**
- Gets latest changes from others
- Prevents conflicts
- Keeps your code up to date

---

## Git Command Cheat Sheet

### Checking Status
```bash
git status                  # See current state
git log --oneline          # See commit history
git branch                 # List all branches
git branch -v              # Branches with last commit
```

### Making Changes
```bash
git add file.js            # Stage specific file
git add .                  # Stage all changes
git commit -m "Message"    # Commit staged changes
git push                   # Push to GitHub
```

### Branching
```bash
git checkout -b new-branch    # Create and switch to new branch
git checkout branch-name      # Switch to existing branch
git branch -d branch-name     # Delete branch (local)
```

### Syncing with GitHub
```bash
git pull origin main          # Get latest from main
git push origin branch-name   # Push branch to GitHub
git push origin --delete branch-name  # Delete remote branch
```

### Undoing Things
```bash
git restore file.js           # Discard changes to file
git restore --staged file.js  # Unstage file
git reset --soft HEAD~1       # Undo last commit (keep changes)
git reset --hard HEAD~1       # Undo last commit (discard changes) ⚠️
```

**⚠️ Warning:** `git reset --hard` permanently deletes changes. Use carefully!

### When Things Go Wrong
```bash
git reflog                    # See all Git actions
git stash                     # Temporarily save changes
git stash pop                 # Restore stashed changes
```

---

## Viewing Your Work on GitHub

### Checking Your Repository

1. **Main Page**: https://github.com/kevinmac88/Block-41-Workshop---Jukebox-Pro
   - See all your files
   - View README
   - Check branches

2. **Commits**: Click "X commits" near the top
   - See all changes over time
   - Click any commit to see what changed

3. **Branches**: Click "main" dropdown
   - See all branches
   - Switch between branches

4. **Code Tab**: View any file
   - See current version
   - View file history
   - See who changed what

### Creating a Pull Request (Alternative to Direct Merge)

Many teams use Pull Requests instead of direct merging:

1. Push your feature branch to GitHub
2. Go to your repository
3. Click "Compare & pull request"
4. Write description of your changes
5. Click "Create pull request"
6. Review the changes
7. Click "Merge pull request"

**Benefits:**
- Code review before merging
- Discussion about changes
- Automated testing
- Professional workflow

**For this project:** Direct merging is fine since you're working solo!

---

## What You've Learned About Git

✅ **Version Control**: Track changes over time  
✅ **Branching**: Work on features without breaking main  
✅ **Committing**: Save snapshots of your work  
✅ **Pushing**: Upload code to GitHub  
✅ **Pulling**: Download latest changes  
✅ **Merging**: Combine branches together  
✅ **Conflict Resolution**: Fix overlapping changes  

**This is how professional developers work!** You're using the same tools as teams at Google, Facebook, Netflix, and every other tech company.

**You now have the skills to contribute to any software project!** 🚀

