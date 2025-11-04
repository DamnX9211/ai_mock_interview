import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function GET(){
    return Response.json({ succes: true, data: 'Thank You!', }, {status:200});
}

export async function POST(request: Request){
    const {type, role, level, techstack, amount, userid} = await request.json();

    try {
        const { text: questions } = await generateText({
            model: google('gemini-2.0-flash-001'),
            prompt: `Prepare questions for a job interview.
            The job role is ${role}.
            The experience level is ${level}.
            The tech stack used in the job is: ${techstack}.
            The focus between behavioral and technical questions should learn towards: ${type}.
            Generate a total of ${amount} questions.
            Please return only the questions, without any additional text or formatting.
            The questions are going to be read by a voice assistant so do not use"/" or "*" or any other special characters that might break the voice assistant.
            Return the questions formatted like this:
            ["question1", "question2", "question3", ...]

            Thank You ! <3
            `,
        })
        const interview = {
            role, type, level,
            techstack: techstack.split(','),
            questions: JSON.parse(questions),
            userId: userid,
            createdAt: new Date().toISOString(),
            coverImage: getRandomInterviewCover()
        }

        await db.collection("interview").add(interview);
        return Response.json({ success: true, data: interview}, { status: 200 });
        
    } catch (error) {
        console.error("Error generating interview questions:", error);
        return Response.json({ success: false, error}, { status: 500 });
        
    }
}