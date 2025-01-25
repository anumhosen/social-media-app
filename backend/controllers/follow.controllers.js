import User from "../models/user.model.js";

/**
 * Follow a user
 */
export const followUser = async (req, res) => {
  const { userIdToFollow } = req.params; // ID of the user to follow
  const userId = req.user._id; // Authenticated user's ID

  try {
    if (userId.toString() === userIdToFollow.toString()) {
      return res.status(400).json({ error: "You cannot follow yourself." });
    }

    const userToFollow = await User.findById(userIdToFollow);
    const currentUser = await User.findById(userId);

    if (!userToFollow) {
      return res.status(404).json({ error: "User to follow not found." });
    }

    if (currentUser.following.includes(userIdToFollow)) {
      return res.status(400).json({ error: "You are already following this user." });
    }

    // Add userIdToFollow to the authenticated user's "following" array
    currentUser.following.push(userIdToFollow);

    // Add the authenticated user's ID to the userToFollow's "followers" array
    userToFollow.followers.push(userId);

    await currentUser.save();
    await userToFollow.save();

    res.status(200).json({ message: "User followed successfully." });
  } catch (error) {
    console.error("Error in followUser:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

/**
 * Unfollow a user
 */
export const unfollowUser = async (req, res) => {
  const { userIdToUnfollow } = req.params; // ID of the user to unfollow
  const userId = req.user._id; // Authenticated user's ID

  try {
    if (userId.toString() === userIdToUnfollow.toString()) {
      return res.status(400).json({ error: "You cannot unfollow yourself." });
    }

    const userToUnfollow = await User.findById(userIdToUnfollow);
    const currentUser = await User.findById(userId);

    if (!userToUnfollow) {
      return res.status(404).json({ error: "User to unfollow not found." });
    }

    if (!currentUser.following.includes(userIdToUnfollow)) {
      return res.status(400).json({ error: "You are not following this user." });
    }

    // Remove userIdToUnfollow from the authenticated user's "following" array
    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== userIdToUnfollow.toString()
    );

    // Remove the authenticated user's ID from the userToUnfollow's "followers" array
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== userId.toString()
    );

    await currentUser.save();
    await userToUnfollow.save();

    res.status(200).json({ message: "User unfollowed successfully." });
  } catch (error) {
    console.error("Error in unfollowUser:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

/**
 * Get a user's followers
 */
export const getFollowers = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("followers", "username profilePicture");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(user.followers);
  } catch (error) {
    console.error("Error in getFollowers:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

/**
 * Get a user's following list
 */
export const getFollowing = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("following", "username profilePicture");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(user.following);
  } catch (error) {
    console.error("Error in getFollowing:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};
