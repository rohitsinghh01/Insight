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
