/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */

import User from '../models/User';

// READ
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriend = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      // eslint-disable-next-line no-shadow
      user.friends.map((id) => User.findById(id)),
    );

    const formattedFriends = friends.map(
      ({
        _id, firstName, lastName, occupation, location, picturePath,
      }) => ({
        _id,
        firstName,
        lastName,
        occupation,
        location,
        picturePath,
      }),
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
