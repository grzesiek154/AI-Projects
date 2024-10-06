// This code sets up an Express server with a chat endpoint that uses OpenAI's API.

import express from 'express';
import { OpenAIService } from './OpenAIService';
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { isValidMessage } from './helpers';

// Initialize Express server
const app = express();
const port = 3000;
app.use(express.json());
app.listen(port, () => console.log(`Server running at http://localhost:${port}. Listening for POST /api/chat requests`));

// Define chat endpoint
app.post('/api/chat', _validateMessages, async (req, res) => {
  const openaiService = new OpenAIService();
  const { messages } = req.body;

  // Set up system prompt for OpenAI
  const systemPrompt: ChatCompletionMessageParam = { 
    role: "system", 
    content: "You are a helpful assistant who speaks using as fewest words as possible." 
  };

  try {
    // Send request to OpenAI and return response
    const answer = await openaiService.completion([systemPrompt, ...messages]);
    res.json(answer);
  } catch (error) {
    console.error('Error in OpenAI completion:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

// Middleware function to validate incoming messages
function _validateMessages(req: express.Request, res: express.Response, next: express.NextFunction) {
  const { messages } = req.body;

  // Check if messages is an array and not empty
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid or missing messages in request body' });
  }

  // Check if all messages have valid format
  if (!messages.every(isValidMessage)) {
    return res.status(400).json({ error: 'Invalid message format in request body' });
  }

  next();
}
