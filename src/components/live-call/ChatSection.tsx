import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";
import { Message } from "./types";

interface ChatSectionProps {
  messages: Message[];
  newMessage: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
}

export const ChatSection = ({
  messages,
  newMessage,
  onMessageChange,
  onSendMessage,
}: ChatSectionProps) => {
  return (
    <Card className="p-4">
      <ScrollArea className="h-[300px] mb-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "patient" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.sender === "patient"
                    ? "bg-medical-primary text-white"
                    : "bg-gray-100"
                }`}
              >
                <p>{message.text}</p>
                <span className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex gap-2">
        <Textarea
          value={newMessage}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="Describe what you're feeling..."
          className="resize-none"
        />
        <Button onClick={onSendMessage}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};