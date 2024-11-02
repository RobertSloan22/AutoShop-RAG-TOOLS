import { BaseMessage } from "@langchain/core/messages";
import { Annotation } from "@langchain/langgraph";

// This defines the object that is passed between each node
// in the graph. We will create different nodes for each agent and tool
const AgentState = Annotation.Root({
  messages: Annotation({
    reducer: (x, y) => x.concat(y),
  }),
  sender: Annotation({
    reducer: (x, y) => y ?? x ?? "user",
    default: () => "user",
  }),
})