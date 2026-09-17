import { Language } from '../types/language';

export class SpeechAssistant {
  private static isSpeaking = false;

  private static langMap: Record<Language, string> = {
    en: 'en-IN',
    hi: 'hi-IN',
    te: 'te-IN',
    ta: 'ta-IN',
    ml: 'ml-IN'
  };

  public static speak(text: string, lang: Language = 'en'): void {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    this.stop();

    const cleanText = text.replace(/<[^>]*>?/gm, '').replace(/[#*_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = this.langMap[lang] || 'en-IN';
    utterance.rate = 0.95; // Slightly slower for clear civic understanding
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      this.isSpeaking = true;
    };

    utterance.onend = () => {
      this.isSpeaking = false;
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
    };

    window.speechSynthesis.speak(utterance);
  }

  public static stop(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
    }
  }

  public static isCurrentlySpeaking(): boolean {
    return this.isSpeaking;
  }
}
