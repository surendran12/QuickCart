import { Inngest } from "inngest";
import connectDB from "./dbs";
import User from "@/models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "cart" });

//Inngest Function save to a database
export const syncUserCreation = inngest.createFunction(
    {
        id:'sync-user-from-clerk'
    },
    {
        event: 'clerk/user.created'
    },
    async ({event}) => {
        const { id, first_name, last_name, email_addresses, image_url} = event.data
        const userData = {
            _id:id,
            email:email_addresses[0],email_address,
            name:first_name + '' + last_name,
            imageUrl: image_url
        }
        //save to DB
        await connectDB()
        await User.create(userData)
    }
)

//inngest Function to update user data in database
export const syncUserUpdation = inngest.createFunction(
    {
        id: 'update-user-from-clerk'
    },
    { event: 'clerk/user.updated'},
    async ({event}) => {
        const { id, first_name, last_name, email_addresses, image_url} = event.data
        const userData = {
            _id:id,
            email:email_addresses[0],email_address,
            name:first_name + '' + last_name,
            imageUrl: image_url
        }
        //save to DB
        await connectDB()
        await User.findByIdAndUpdate(id,userData)
    }
)

//Inngest Function to Delete user from database
export const syncUserDeletion = Inngest.createFunction(
    {
        id: 'delete-user-with-clerk'
    },
    { event: 'clerk/user.deleted'},
    async ({event}) => {
        const {id} = event.data

        await connectDB()
        await User.findByIdAndDelete(id)
    }
)
