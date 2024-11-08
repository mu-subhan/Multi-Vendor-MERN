// creat token and saving that in cookies

const sendToken = (user,statusCode,res) =>{
    const token = user.getjwtToken();

    // option for cookes
    const options = {
        expires:new Date(Date.now() + 90 *24 * 60 * 60 *100),
        httpOnly:true,
    };
    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        token,
    });
};

module.exports = sendToken;