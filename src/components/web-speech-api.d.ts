declare interface SpeechRecognition {
  continuous: boolean;
  lang: string;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult: (event: any) => void;
}

// declare var SpeechRecognition: {
//   prototype: SpeechRecognition;
//   new (): SpeechRecognition;
// };

declare const webkitSpeechRecognition: {
  prototype: SpeechRecognition;
  new (): SpeechRecognition;
};
