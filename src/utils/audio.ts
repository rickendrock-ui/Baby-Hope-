// Fungsi pemutar suara anak-anak dengan kecepatan (rate) & nada (pitch) yang fleksibel
export const playAudio = (
  text: string, 
  rate: number = 0.95, 
  pitch: number = 1.5
) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    // Hentikan suara sebelumnya jika sedang berjalan
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();

    // Utamakan suara bahasa Indonesia
    const idVoice = voices.find(
      (v) => v.lang.includes('id') || v.lang.includes('ID')
    );
    
    if (idVoice) {
      utterance.voice = idVoice;
    }

    utterance.lang = 'id-ID';
    
    // --- PENGATURAN SUARA ---
    utterance.pitch = pitch; // Nada suara (1.5 = nada tinggi anak kecil)
    utterance.rate = rate;   // Kecepatan bicara (0.8 = lambat & jelas)

    window.speechSynthesis.speak(utterance);
  }
};