import { MongoClient } from "mongodb";

async function connectToCluster() {
  let mongoClient;

  const dbUri = process.env.DB_URI;
  if (!dbUri) {
    throw new Error("DB_URI environment variable is not set");
  }

  try {
    mongoClient = new MongoClient(dbUri);
    await mongoClient.connect();
    return mongoClient;
  } catch (error) {
    throw error;
  }
}

export async function addUserWithContext(userId: string, context: string) {
  let mongoClient;

  try {
    mongoClient = await connectToCluster();
    const db = mongoClient.db("covercraft");
    const collection = db.collection("users");

    await collection.insertOne({
      userId: userId,
      context: context,
      credits: 3
    });
  } catch (error) {
    throw error;
  } finally {
    if (mongoClient) {
      await mongoClient.close();
    }
  }
}

export async function checkIfUserExists(userId: string) {
  let mongoClient;

  try {
    mongoClient = await connectToCluster();
    const db = mongoClient.db("covercraft");
    const collection = db.collection("users");

    const count = await collection.countDocuments({ userId: userId });
    if (count != 0) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  } finally {
    if (mongoClient) {
      await mongoClient.close();
    }
  }
}

export async function getContext(userId: string) {
  let mongoClient;
  try {
    mongoClient = await connectToCluster();
    const db = mongoClient.db("covercraft");
    const collection = db.collection("users");

    await collection.updateOne(
      { userId: userId },
      { $inc: { credits: -1 } }
    );

    const user = await collection.findOne({ userId: userId });

    if (user) {
      return user.context;
    } else {
      return "";
    }
  } catch (error) {
    throw error;
  } finally {
    if (mongoClient) {
      await mongoClient.close();
    }
  }
}

export async function getCredits(userId: string){
  let mongoClient;
  try {
    mongoClient = await connectToCluster();
    const db = mongoClient.db("covercraft");
    const collection = db.collection("users");

    const user = await collection.findOne({ userId: userId });

    if (user) {
      return user.credits;
    } else {
      return -1;
    }
  } catch (error) {
    throw error;
  } finally {
    if (mongoClient) {
      await mongoClient.close();
    }
  }
}