import { StreamChat } from "stream-chat";
import { ENV } from "./env.js";

const streamClient = StreamChat.getInstance(
  ENV.STREAM_API_KEY,
  ENV.STREAM_API_SECRET
);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUser(userData);
    console.log("Stream user upserted:", userData.name);
  } catch (error) {
    console.error("Stream upsert error:", error.message);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await streamClient.deleteUser(userId);
    console.log("Stream user deleted:", userId);
  } catch (error) {
    console.error("Stream delete error:", error.message);
  }
};

export const generateStreamToken = (userId) => {
  try {
    return streamClient.createToken(userId.toString());
  } catch (error) {
    console.error("Token error:", error.message);
    return null;
  }
};

export const addUserToPublicChannels = async (newUserId) => {
  try {
    const channels = await streamClient.queryChannels({
      discoverable: true,
    });

    for (const channel of channels) {
      await channel.addMembers([newUserId.toString()]);
    }

    console.log("User added to public channels");
  } catch (error) {
    console.error("Channel error:", error.message);
  }
};