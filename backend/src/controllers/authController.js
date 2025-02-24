import { generateToken } from '../lib/utils.js'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs';
import cloudinary from '../lib/cloudinary.js';

export const signup = async (request, response) => {
    const {fullName, email, password} = request.body;
    try {
        if (!fullName || !email || !password) {
            return response.status(400).json({
                message: "All fields are required"
            });
        }

        if (password.length < 6) {
            return response.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        const user = await User.findOne({email})

        if (user) return response.status(400).json({
            message: "Email already exists"
        });

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword 
        });

        if (newUser) {
            // Generate JWT here
            generateToken(newUser._id, response)
            await newUser.save();

            response.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })

        } else {
            response.status(400).json({
                message: "Invalid User Data"
            });
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        response.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const login = async (request, response) => {
    const { email, password } = request.body
    try {
       // Check for User 
       const user = await User.findOne({ email });
       
       // If there is no user - throw this error
       if(!user) {
        return response.status(400).json({
            message: "Invalid Login Credentials"
        })
       }

       // Check if password matches database
       const isPasswordCorrect = await bcrypt.compare(password, user.password)
       // If it does not match
       if (!isPasswordCorrect) {
        return response.status(400).json({
            message: "Invalid Login Credentials"
        });
       }

       generateToken(user._id, response)

       response.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
       });

    } catch (error) {
        consolconsole.log("Error in login controller", error.message);
        response.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const logout = (request, response) => {
    try {
        
        response.cookie("jwt", "", {maxAge:0})
        response.status(200).json({
            message: "Logged Out Successfully"
        });

    } catch (error) {
        console.log("Error in the logout controller", error.message);
        response.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const updateProfile = async (request, response) => {
    try {

        const { profilePic } = request.body;
        const userId = request.user._id;
        
        if(!profilePic) {
            response.status(400).json({
                message: "Profile Picture Is Required"
            });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)

        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url}, {new:true});

        response.status(200).json(updatedUser);

    } catch (error) {
        console.log("Error in update user controller", error.message);
        response.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const checkAuth = (request, response) => {
    try {
        response.status(200).json(request.user);
    } catch (error) {
       console.log("Error in checkAuth controller", error.message);
       response.status(500).json({
        message: "Internal Server Error"
       });
    }
}