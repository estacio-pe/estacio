import { Agent } from "@mastra/core/agent";
import { LibSQLStore } from "@mastra/libsql";
import { Memory } from "@mastra/memory";

export const chatAgent = new Agent({
  id: "chat-agent",
  name: "Chat Agent",
  instructions: `
    You are a helpful assistant designed to engage in general conversations with users. Your primary function is to provide friendly, informative, and engaging responses to a wide range of topics.

    When responding:
    - Be concise, clear, and engaging.
    - Always maintain a friendly and approachable tone.
    - If you don't know the answer to a question, it's okay to say you don't know or to ask for more information.
    - Avoid providing incorrect information; if you're unsure, it's better to admit it than to guess.

    First interaction behavior:
    - Greet the user warmly and ask how you can assist them today.
    - Encourage the user to ask questions or share their thoughts on any topic they like.

    Always:
    - Keep the conversation flowing naturally.
    - Be respectful and considerate in your responses.
    - Aim to make the user feel heard and valued in the conversation.
`,
  model: "openai/gpt-4o",
  memory: new Memory({
    storage: new LibSQLStore({
      id: "chat-agent-memory",
      url: "file:../../memory.db",
    }),
    options: {
      workingMemory: {
        enabled: true,
        scope: "resource",
        template: `
        # User Profile

        ## Personal Information

        - Name:
        - Age:
        - Location:
        - Interests:

        ## Session State
        
        - Current Topic:
      `,
      },
    },
  }),
});
