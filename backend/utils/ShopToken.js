const sendShopToken = (user, statusCode, res) => {
    const token = user.getJwtToken();
  
    // Options for cookies
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };
  
    res.status(statusCode).cookie("seller_token", token, options).json({
      success: true,
      seller: user,
      token,
    });
  };
  
  module.exports = sendShopToken;