const API_URL = 'https://ai-chat-backend-divc.onrender.com/api';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const chatService = {
  async sendMessage(message: string): Promise<string> {
    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ message }),
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  async getHistory(): Promise<ChatMessage[]> {
    try {
      const response = await fetch(`${API_URL}/history`, {
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch chat history');
      }

      const data = await response.json();
      return data.history || [];
    } catch (error) {
      console.error('Error fetching chat history:', error);
      return [];
    }
  },

  async clearHistory(): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/clear`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to clear chat history');
      }
    } catch (error) {
      console.error('Error clearing chat history:', error);
      throw error;
    }
  },
}; 