import User from "../models/userModel.js";
import Message from "../models/messageModel.js"
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = async (request, response) => {
    try {
        const loggedInUserId = request.user._id;
        const filteredUsers = await User.find({ _id: {$ne:loggedInUserId}}).select("-password");

        response.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSidebar: ", error.message);
        response.status(500).json({
            message: "Internal Server Error"
        });
    };
};


export const getMessages = async (requesst, response) => {
    try {
        const { id:userToChatId } = request.params;
        const myId = request.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })

        response.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessages: ", error.message);
        response.status(500).json({
            message: "Internal Server Error"
        });
    }
}


export const sendMessage = async (request, response) => {
    try {
       const { text, image } = request.body;
       const { id: receiverId } = request.params;
       const senderId = request.user._id;

       let imageUrl;
       if (image) {
        // upload base64 image to cloudinary
        const uploadedResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadedResponse.secure_url;
       } 

       const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
       });

       await newMessage.save();

       // ToDo: Real time functionality goes here => Socket.io


       response.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        response.status(500).json({
            message: "Internal Server Error"
        });
    }
}