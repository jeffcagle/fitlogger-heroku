/**
 * @desc Get current user data
 * @route POST /api/v1/me
 * @access Private
 */
export const getMe = async (req, res) => {
  const { _id, name, email } = req.user;

  res.status(200).json({
    success: true,
    data: {
      id: _id,
      name,
      email,
    },
  });
};
