// Validation middleware for request bodies

export const validateRegister = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields (username, email, password)'
    });
  }

  if (username.trim().length < 3) {
    return res.status(400).json({
      success: false,
      message: 'Username must be at least 3 characters long'
    });
  }

  if (username.trim().length > 30) {
    return res.status(400).json({
      success: false,
      message: 'Username cannot exceed 30 characters'
    });
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address'
    });
  }

  if (password.length < 4) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 4 characters long'
    });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide username and password'
    });
  }

  next();
};

export const validateStudyMaterial = (req, res, next) => {
  const { title, originalContent } = req.body;

  if (!title || !originalContent) {
    return res.status(400).json({
      success: false,
      message: 'Title and content are required'
    });
  }

  if (title.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Title cannot be empty'
    });
  }

  if (title.trim().length > 200) {
    return res.status(400).json({
      success: false,
      message: 'Title cannot exceed 200 characters'
    });
  }

  if (originalContent.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Content cannot be empty'
    });
  }

  next();
};

