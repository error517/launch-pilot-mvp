import mongoose from 'mongoose';
import FormData from '../../models/FormData';
import getGeminiResponse from '../../utils/gemini';
  
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const {
      productOverview,
      coreValueProposition,
      targetAudienceType,
      targetAudienceDetails,
      currentStage,
      goal,
      budget,
      strengths,
      constraints,
      preferredChannels,
      preferredChannelsOther,
      tone,
      email,
    } = req.body;

    const prompt = `You are a marketing expert tasked with creating a mini-marketing plan for a product or service. Consider the following information provided about the product/service and answer with a json. Product Overview: ${productOverview} Core Value Proposition: ${coreValueProposition} Target Audience Type: ${targetAudienceType} Target Audience Details: ${targetAudienceDetails} Current Stage: ${currentStage} Goal: ${goal} Budget: ${budget} Strengths: ${strengths} Constraints: ${constraints} Preferred Channels: ${JSON.stringify(preferredChannels)} Preferred Channels Other: ${preferredChannelsOther} Tone: ${tone} Email: ${email} Based on this information, create a mini-marketing plan. The mini plan should contain an array called channels. Each object in the array should have the following properties: name, tasks. The task property should be an array of tasks, each one with a description. Ensure that each channel has at least two tasks.`;

    const geminiResponse = await getGeminiResponse(prompt);

    let parsedGeminiResponse;
    try {
        parsedGeminiResponse = JSON.parse(geminiResponse);
    } catch (parseError) {
        console.error("Error parsing Gemini response:", parseError);
        return res.status(500).json({ message: 'Error generating content' });
    }
    
    console.log(geminiResponse);


    res.status(200).json(parsedGeminiResponse);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating content' });
  }
}