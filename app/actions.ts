"use server";

import { auth } from "@clerk/nextjs/server";
import {
  addUserWithContext,
  checkIfUserExists,
  getContext,
  getCredits,
} from "@/utils/mongo/mongo";
import OpenAI from "openai";

export async function logUser(formData: FormData) {
  const { userId } = auth();

  if (userId) {
    await addUser(userId);
  }
}

export async function userExists() {
  const { userId } = auth();

  if (userId) {
    const exists = await checkIfUserExists(userId);
    return exists;
  }
}

export async function addUser(context: string) {
  const { userId } = auth();

  if (userId) {
    addUserWithContext(userId, context);
  }
}

export async function generateCoverLetter(description: string) {
  const { userId } = auth();

  let context;
  let credits = 0;

  if (userId) {
    credits = await getCredits(userId);
    if (credits <= 0) {
      return "You ran out of credits";
    }
    context = await getContext(userId);
  }

  if (!description) {
    return "Error occurred with description";
  }

  if (!context) {
    return "Error occurred while getting resume information";
  }

  const prompt = `Generate a cover letter for a person with the specified resume and job description.
  Do not use any specifics (such as names or addresses). Each past role is separated by #### delimiters.
  Keep it less than 100 words:
  
  Resume:
  ${context}

  Position description:
  ${description}
  `;

  // const openai = new OpenAI();

  // const completion = await openai.chat.completions.create({
  //   messages: [
  //     { role: "system", content: "You are a helpful assistant." },
  //     { role: "user", content: prompt },
  //   ],
  //   model: "gpt-3.5-turbo",
  // });

  // const coverLetter = completion.choices[0].message.content;

  const coverLetter = 'cover letter'

  return coverLetter;
}

export async function getUserCredits(){
  const {userId} = auth();

  if(userId) {
    const credits = await getCredits(userId);
    return credits;
  }
}