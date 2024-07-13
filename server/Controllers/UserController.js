import User from '../models/User.js';


export const searchUsers = (req, res) => {
  try {
    let { query } = req.body;
    User.find({ 'personal_info.username': new RegExp(query, 'i') })
      .limit(50)
      .select(
        'personal_info.fullname personal_info.username personal_info.profile_img -_id'
      )
      .then((users) => {
        return res.status(200).json({ users });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProfile = (req, res) => {
  try {
    let { username } = req.body;
    User.findOne({ 'personal_info.username': username })
      .select('-personal_info.password -google_auth -updatedAt -blogs')
      .then((user) => {
        return res.status(200).json(user);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: err.message });
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const changePassword = (req, res) => {
  let { currentPassword, newPassword } = req.body;

  if (
    !passwordRegex.test(currentPassword) ||
    !passwordRegex.test(newPassword)
  ) {
    return res
      .status(403)
      .json({
        error:
          'password should be 6 to 20 characters long with a numeric, 1 uppercase and 1 lowercase lettes',
      });
  }

  User.findOne({ _id: req.user })
    .then((user) => {
      if (user.google_auth) {
        return res
          .status(403)
          .json({
            error:
              "You cannot change account's password because you logged in through google",
          });
      }

      bcrypt.compare(
        currentPassword,
        user.personal_info.password,
        (err, result) => {
          if (err) {
            return res
              .status(500)
              .json({
                error:
                  'Some error occured while changing the password, please try again later',
              });
          }

          if (!result) {
            return res
              .status(403)
              .json({ error: 'Incorrect current Password' });
          }

          bcrypt.hash(newPassword, 10, (err, hashed_password) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
            User.findOneAndUpdate(
              { _id: req.user },
              { 'personal_info.password': hashed_password }
            )
              .then((u) => {
                return res.status(200).json({ status: 'password changed' });
              })
              .catch((err) => {
                return res
                  .status(500)
                  .json({
                    error:
                      'Some error occured while saving the new password, please try again later',
                  });
              });
          });
        }
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'User not found' });
    });
};