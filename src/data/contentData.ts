export interface ColorItem {
  name: string;
  hex: string;
  icon: string;
  objectName: string;
}

export const COLORS_DATA: ColorItem[] = [
  { name: 'Merah', hex: '#EF4444', icon: '🍎', objectName: 'Apel Merah' },
  { name: 'Kuning', hex: '#EAB308', icon: '🍌', objectName: 'Pisang Kuning' },
  { name: 'Hijau', hex: '#22C55E', icon: '🍃', objectName: 'Daun Hijau' },
  { name: 'Biru', hex: '#3B82F6', icon: '🌊', objectName: 'Laut Biru' },
  { name: 'Ungu', hex: '#A855F7', icon: '🍇', objectName: 'Anggur Ungu' },
  { name: 'Merah Muda', hex: '#EC4899', icon: '🌸', objectName: 'Bunga Pink' },
  { name: 'Cokelat', hex: '#8B5CF6', icon: '🍫', objectName: 'Cokelat Lezat' },
  { name: 'Oranye', hex: '#F97316', icon: '🍊', objectName: 'Jeruk Manis' },
];

export interface ShapeItem {
  name: string;
  icon: string;
  description: string;
}

export const SHAPES_DATA: ShapeItem[] = [
  { name: 'Lingkaran', icon: '⚪', description: 'Bentuk bulat seperti bola!' },
  { name: 'Persegi', icon: '⏹️', description: 'Punya 4 sisi yang sama panjang!' },
  { name: 'Segitiga', icon: '🔺', description: 'Punya 3 sudut seperti atap rumah!' },
  { name: 'Bintang', icon: '⭐', description: 'Bersinar di langit malam!' },
  { name: 'Hati', icon: '❤️', description: 'Bentuk cinta yang manis!' },
];

export interface NumberItem {
  num: number;
  word: string;
  countIcon: string;
}

export const NUMBERS_DATA: NumberItem[] = [
  { num: 0, word: 'Nol', countIcon: '🎈' },
  { num: 1, word: 'Satu', countIcon: '🎈' },
  { num: 2, word: 'Dua', countIcon: '🎈' },
  { num: 3, word: 'Tiga', countIcon: '🎈' },
  { num: 4, word: 'Empat', countIcon: '🎈' },
  { num: 5, word: 'Lima', countIcon: '🎈' },
  { num: 6, word: 'Enam', countIcon: '🎈' },
  { num: 7, word: 'Tujuh', countIcon: '🎈' },
  { num: 8, word: 'Delapan', countIcon: '🎈' },
  { num: 9, word: 'Sembilan', countIcon: '🎈' },
  { num: 10, word: 'Sepuluh', countIcon: '🎈' },
];