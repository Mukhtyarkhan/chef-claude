import { HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Load Hugging Face API key from environment variables
const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;

if (!HF_ACCESS_TOKEN) {
    console.error("Error: Hugging Face API key not found. Make sure to set HF_ACCESS_TOKEN in your environment variables.");
    process.exit(1);
}

// Initialize Hugging Face Inference API
const hf = new HfInference(HF_ACCESS_TOKEN);

// System prompt to guide the model's behavior
const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`;

/**
 * Get a recipe suggestion from Hugging Face's chat model
 * @param {string[]} ingredientsArr - List of ingredients
 * @returns {Promise<string>} - Recipe suggestion
 */
export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");

    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1", // Adjust the model if needed
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        });

        return response.choices[0].message.content;
    } catch (err) {
        console.error("Error fetching recipe:", err.message);
        throw err;
    }
}

// Example usage
(async () => {
    const ingredients = ["chicken", "garlic", "onions"];
    try {
        const recipe = await getRecipeFromMistral(ingredients);
        console.log("Suggested Recipe:\n", recipe);
    } catch (err) {
        console.error("Failed to get a recipe.");
    }
})();
