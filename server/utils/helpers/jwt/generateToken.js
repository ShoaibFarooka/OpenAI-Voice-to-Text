import jwt from 'jsonwebtoken'

export default (data, isRemembered) => {
  const payload = { email: data.email, role: data.role, _id: data._id, name: data.name };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: isRemembered ? '30d' : process.env.TOKEN_SECRET_EXP });
  return token;
};