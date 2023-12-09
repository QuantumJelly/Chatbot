import { LoremIpsum } from "lorem-ipsum";

export const QuickReplies = ["Is free plan avalilable?", "Do you generate lead?", "What is the weather today"];

export const DefaultChat = [
  {
    text: 'Can I assist you with any questions or concerns you might have?',
    user: 'bot',
    datetime: new Date()
  },
];

export const chat = async () => {
  try {
    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 8,
        min: 4
      },
      wordsPerSentence: {
        max: 16,
        min: 4
      }
    });

    return lorem.generateSentences(3);
  } catch (e) {
    console.log(e);
  }
}