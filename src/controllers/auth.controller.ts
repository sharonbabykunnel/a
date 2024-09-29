import asyncHadler from "express-async-handler";
import * as authS from "./../services/auth.services";
import CustomError from '../helpers/customError'

export const signup = asyncHadler(async (req, res) => {
  try {
    const values = req.body;
    const response = await authS.signup(values);

    genarateToken(res, response._id);
    const accessToken = Token(response._id);

    res
      .status(201)
      .json({
        success: true,
        data: response,
        message: "Account created successfully.",
        accessToken,
      });
  } catch (error) {
    console.log(error);
    if (error instanceof CustomError)
      return handleError(res, error.statusCode, error.message, error.code);
    return handleError(
      res,
      500,
      "An unexpected error occured. Please try again later."
    );
  }
});

export const signin = asyncHadler(async (req, res) => {
  try {
    const { credential, password } = req.body;
    const response = await authS.signin(credential, password);
    console.log("response", response);
    genarateToken(res, response._id);
    const accessToken = Token(response._id);
    console.log(accessToken, "asdf");
    res
      .status(200)
      .json({
        success: true,
        data: response,
        message: "Loggined",
        accessToken,
      });
  } catch (error) {
    console.log(error);

    if (error instanceof CustomError)
      return handleError(res, error.statusCode, error.message, error.code);
    return handleError(
      res,
      500,
      "An unexpected errro occured. Please try again later."
    );
  }
});

export const logout = asyncHadler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "User logged out", success: true });
});
