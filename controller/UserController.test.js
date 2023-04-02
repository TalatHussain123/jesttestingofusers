import User from '../models/User';
import { app } from '../index';
import supertest from 'supertest';
import mongoose from 'mongoose';

const userone = {
    _id: new mongoose.Types.ObjectId(),
    username: "talat",
    email: "talat@gmail.com",
    password: "password"
}

beforeEach(async () => {
    jest.setTimeout(90000);
    await User.deleteMany();
})

describe("UserController", () => {
    jest.setTimeout(30000);
    //create a user
    it("it should create user in database", async () => {
        const response = await supertest(app).post("/api/v1/users").send(userone);
        console.log(response);
        expect(response.body).not.toBeNull();
    });
    //get a user
    it("should get a single user from database", async () => {
        const response = await supertest(app).get(`/api/v1/users/${userone._id}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data.username", userone.username);
    });
    //delete a user
    it("should delete a user from database", async () => {
        const response = await supertest(app).delete(`/api/v1/users/${userone._id}`);
        expect(response.body.message).toBe("Sucessfully deleted!");
    });
    //update
    it("should update a user in database", async () => {
        const response = await supertest(app)
            .put(`/api/user/${userone._id}`)
            .send({ username: "Talat Khan" });
        expect(response.body.data.username).toBe("Talat Khan");
    });
    //getall user
    it("should get all users from database", async () => {
        const response = await supertest(app).get("/api/v1/users");
        expect(Array.isArray(response.body.data)).toBe(true);
    });
})

// describe("UserController", () => {
//     jest.setTimeout(10000);
//     //create a user
//     it("it should create user in database", async () => {
//         const response = await supertest(app).post("/api/user").send(userone);
//         expect(response.body).not.toBeNull()
//     });
//     //get a user
//     it("it should get a user from database", async () => {
//         const user = await User.findById(userone._id);
//         //expectation
//         expect(user.username).toBe("talat")
//     });
//     //delete a user
//     it("should delete a user from database", async () => {
//         const deletedUser = await User.findByIdAndDelete(userone._id);
//         expect(deletedUser.username).toBe("talat");
//     });
//     //update
//     it("should update a user in database", async () => {
//         const updatedUser = {
//             username: "Talat Khan",
//             email: "talat.khan@example.com"
//         };
//         const result = await User.findByIdAndUpdate(userone._id, updatedUser, { new: true });
//         expect(result.username).toBe("Talat Khan");
//         expect(result.email).toBe("talat.khan@example.com");
//     });
//     //getall user
//     it("should get all users from database", async () => {
//         const getallusers = await User.find();
//         console.log(getallusers);
//     });
// })