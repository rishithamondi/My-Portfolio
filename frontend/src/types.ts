export type PaperTexture = 'ruled' | 'grid' | 'dots' | 'plain';

export interface PageInfo {
  id: string;
  number: number;
  title: string;
  subtitle: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
