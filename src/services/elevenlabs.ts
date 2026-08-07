// ID Voice Anak Ceria di ElevenLabs (Bisa disesuaikan dengan ID Voice pilihan kamu)
const ELEVENLABS_API_KEY = "YOUR_ELEVENLABS_API_KEY"; // Masukkan API Key kamu di sini
const VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Contoh Voice ID yang imut/ramah anak

export async function speakWithElevenLabs(text: string) {
  if (!ELEVENLABS_API_KEY || ELEVENLABS_API_KEY === "YOUR_ELEVENLABS_API_KEY") {
    console.warn("ElevenLabs API Key belum dipasang. Menggunakan fallback bawaan.");
    return false;
  }

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_multilingual_v2", // Mendukung bahasa Indonesia ekspresif
          voice_settings: {
            stability: 0.35,        // Nilai lebih rendah = intonasi lebih ekspresif & tidak kaku
            similarity_boost: 0.85,
            style: 0.65,            // Gaya ekspresi emosi anak-anak
            use_speaker_boost: true
          }
        }),
      }
    );

    if (!response.ok) throw new Error("Gagal mengambil audio");

    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);
    audio.play();
    return true;
  } catch (error) {
    console.error("ElevenLabs Error:", error);
    return false;
  }
}