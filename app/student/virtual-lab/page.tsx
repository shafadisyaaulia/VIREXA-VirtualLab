"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  User, 
  BookOpen, 
  FlaskConical, 
  Award,
  Camera,
  Send,
  AlertTriangle,
  Activity,
  Trash2,
  ThumbsUp,
  XCircle,
  Move,
  Info
} from "lucide-react";

// Struktur 14 Bahan Praktikum Kimia Organ VIREXA
const DAFTAR_BAHAN: Record<string, {
  nama: string;
  warnaHex: string;
  pH: number;
  aman: boolean;
  icon: string;
  jenisZat: string;
  senyawaDominan: string;
  dampakTubuh: string;
  warnaCampuran: string;
  hipotesis: string;
}> = {
  'Susu Sapi':       { nama: 'Susu Sapi',        warnaHex: '#F3F4F6', pH: 6.6, aman: true,  icon: '🥛', jenisZat: 'Hampir Netral', senyawaDominan: 'Kasein, Laktosa, Ca²⁺', dampakTubuh: 'Aman dikonsumsi sehari-hari.', warnaCampuran: 'rgba(243,244,246,0.95)', hipotesis: 'pH susu ≈ 6.6 karena mengandung asam laktat ringan.' },
  'Cuka Apel':       { nama: 'Cuka Apel',        warnaHex: '#F59E0B', pH: 3.2, aman: false, icon: '🍎', jenisZat: 'Asam Kuat',    senyawaDominan: 'CH₃COOH (Asam Asetat)', dampakTubuh: 'Merusak email gigi dan lapisan lambung.', warnaCampuran: 'rgba(245,158,11,0.7)', hipotesis: 'pH cuka ≈ 3.2 karena asam asetat melepas banyak ion H⁺.' },
  'Minuman Cola':    { nama: 'Minuman Cola',      warnaHex: '#7F1D1D', pH: 2.5, aman: false, icon: '🥤', jenisZat: 'Asam Sangat Kuat', senyawaDominan: 'H₃PO₄ + CO₂', dampakTubuh: 'Merangsang peningkatan sekresi asam lambung.', warnaCampuran: 'rgba(127,29,29,0.75)', hipotesis: 'pH cola ≈ 2.5 karena adanya asam fosfat.' },
  'Yogurt':        { nama: 'Yogurt Fermentasi', warnaHex: '#FEF3C7', pH: 4.0, aman: true,  icon: '🍦', jenisZat: 'Asam Sedang',  senyawaDominan: 'Asam Laktat', dampakTubuh: 'Probiotik baik untuk mikroflora usus.', warnaCampuran: 'rgba(254,243,199,0.9)', hipotesis: 'pH yogurt ≈ 4.0 akibat fermentasi bakteri baik.' },
  'Air Kelapa':    { nama: 'Air Kelapa',        warnaHex: '#0ea5e9', pH: 6.2, aman: true,  icon: '🥥', jenisZat: 'Hampir Netral', senyawaDominan: 'Elektrolit K⁺, Na⁺', dampakTubuh: 'Menghidrasi cairan tubuh dengan baik.', warnaCampuran: 'rgba(14,165,233,0.85)', hipotesis: 'pH air kelapa netral karena kaya mineral alkali.' },
  'Air Murni':     { nama: 'Air Murni',         warnaHex: '#BAE6FD', pH: 7.0, aman: true,  icon: '💧', jenisZat: 'Netral',        senyawaDominan: 'H₂O', dampakTubuh: 'Sangat aman dan vital bagi kerja ginjal.', warnaCampuran: 'rgba(186,230,253,0.7)', hipotesis: 'pH air murni = 7.0 karena ion H⁺ dan OH⁻ seimbang sempurna.' },
  'Baking Soda':   { nama: 'Baking Soda',       warnaHex: '#E2E8F0', pH: 9.0, aman: true,  icon: '🧂', jenisZat: 'Basa Sedang',   senyawaDominan: 'NaHCO₃ (Natrium Bikarbonat)', dampakTubuh: 'Membantu meredakan asam lambung berlebih.', warnaCampuran: 'rgba(226,232,240,0.85)', hipotesis: 'pH baking soda ≈ 9.0 karena senyawa bikarbonat menangkap ion hidrogen.' },
  'Boraks':        { nama: 'Boraks Pengawet',   warnaHex: '#CBD5E1', pH: 9.5, aman: false, icon: '📦', jenisZat: 'Basa Kuat',     senyawaDominan: 'Na₂B₄O₇·10H₂O', dampakTubuh: 'Toksik! Akumulasi zat merusak ginjal dan hati.', warnaCampuran: 'rgba(203,213,225,0.9)', hipotesis: 'pH boraks tinggi karena hidrolisis garam basa kuat.' },
  'Saos':          { nama: 'Saos Sambal',       warnaHex: '#EF4444', pH: 3.8, aman: false, icon: '🌶️', jenisZat: 'Asam Sedang',   senyawaDominan: 'Asam Sitrat & Cuka', dampakTubuh: 'Konsumsi berlebih memicu gastritis/lambung perih.', warnaCampuran: 'rgba(239,68,68,0.8)', hipotesis: 'pH saos ≈ 3.8 akibat asam organik pengawet rasa.' },
  'Aspartame':     { nama: 'Aspartame',         warnaHex: '#F8FAFC', pH: 5.5, aman: true,  icon: '🍬', jenisZat: 'Asam Ringan',   senyawaDominan: 'Pemanis Ester', dampakTubuh: 'Aman dikonsumsi dalam batas wajar.', warnaCampuran: 'rgba(248,250,252,0.9)', hipotesis: 'pH aspartame cenderung asam ringan dalam larutan air.' },
  'Tomat':         { nama: 'Tomat Segar',       warnaHex: '#FCA5A5', pH: 4.3, aman: true,  icon: '🍅', jenisZat: 'Asam Sedang',   senyawaDominan: 'Asam Sitrat', dampakTubuh: 'Kaya vitamin C, sehat melindungi mukosa usus.', warnaCampuran: 'rgba(252,165,165,0.85)', hipotesis: 'pH tomat berkisar 4.3 karena asam sitrat alami.' },
  'Daging':        { nama: 'Ekstrak Daging',    warnaHex: '#F87171', pH: 5.6, aman: true,  icon: '🥩', jenisZat: 'Asam Ringan',   senyawaDominan: 'Asam Amino', dampakTubuh: 'Sumber protein tinggi pembentuk sel.', warnaCampuran: 'rgba(248,113,113,0.85)', hipotesis: 'pH daging sekitar 5.6 dipengaruhi protein amino.' },
  'Tahu':          { nama: 'Air Tahu',          warnaHex: '#FFFBEB', pH: 6.0, aman: true,  icon: '⬜', jenisZat: 'Asam Ringan',   senyawaDominan: 'Protein Kedelai', dampakTubuh: 'Sangat aman dan ramah untuk ginjal.', warnaCampuran: 'rgba(255,251,235,0.9)', hipotesis: 'pH tahu mendekati netral berkat kandungan protein kedelai.' },
  'Green Tea':     { nama: 'Green Tea',         warnaHex: '#A7F3D0', pH: 6.0, aman: true,  icon: '🍵', jenisZat: 'Asam Ringan',   senyawaDominan: 'Katekin & Antioksidan', dampakTubuh: 'Kaya antioksidan, baik melindungi ginjal.', warnaCampuran: 'rgba(167,243,208,0.85)', hipotesis: 'pH teh hijau sekitar 6.0 karena katekin organik.' }
};

const MODEL_URL = "https://teachablemachine.withgoogle.com/models/zgMrK9Ovj/";

function campurWarna(hexColors: string[]) {
  if (!hexColors.length) return '#BAE6FD';
  const parseHex = (h: string) => ({
    r: parseInt(h.slice(1, 3), 16),
    g: parseInt(h.slice(3, 5), 16),
    b: parseInt(h.slice(5, 7), 16)
  });
  const sum = hexColors.map(parseHex).reduce((acc, curr) => ({
    r: acc.r + curr.r,
    g: acc.g + curr.g,
    b: acc.b + curr.b
  }), { r: 0, g: 0, b: 0 });
  const n = hexColors.length;
  const toHex = (v: number) => Math.round(v / n).toString(16).padStart(2, '0');
  return `#${toHex(sum.r)}${toHex(sum.g)}${toHex(sum.b)}`;
}

export default function VirtualLabPage() {
  const router = useRouter();
  const [studentInfo, setStudentInfo] = useState<{ nama: string; kelas: string } | null>(null);

  const [mode, setMode] = useState<'camera' | 'dragdrop'>('camera');
  const [cameraActive, setCameraActive] = useState(false);
  const [aiPrediction, setAiPrediction] = useState('Menunggu Reagen...');
  const [gesturePrediction, setGesturePrediction] = useState('Tidak ada gestur');
  const [bahanList, setBahanList] = useState<string[]>([]);
  const [warnaCampuranHex, setWarnaCampuranHex] = useState('#BAE6FD');
  const [pHCampuran, setPHCampuran] = useState(7.0);
  const [isStirred, setIsStirred] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const [promptZat, setPromptZat] = useState<{ nama: string; pH: number; senyawa: string; dampak: string; icon: string } | null>(null);

  const promptZatRef = useRef(promptZat);
  const isStirredRef = useRef(isStirred);
  const bahanListRef = useRef(bahanList);
  
  useEffect(() => { promptZatRef.current = promptZat; }, [promptZat]);
  useEffect(() => { isStirredRef.current = isStirred; }, [isStirred]);
  useEffect(() => { bahanListRef.current = bahanList; }, [bahanList]);

  const [gigiHealth, setGigiHealth] = useState(100);
  const [lambungHealth, setLambungHealth] = useState(100);
  const [ginjalHealth, setGinjalHealth] = useState(100);

  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    { role: 'assistant', text: 'Halo! Saya VirexaBot AI 🤖. Tanyakan efek organ atau pH zat di sini!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const modelRef = useRef<any>(null); // Teachable Machine
  const handsModelRef = useRef<any>(null); // MediaPipe Hands
  const animRef = useRef<number | null>(null);
  const lastScannedRef = useRef<string | null>(null);
  const lastGestureTimeRef = useRef<number>(0);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      window.speechSynthesis.speak(utterance);
    }
  };

  // ==========================================
  // PEMUATAN GANDA (TEACHABLE MACHINE & MEDIAPIPE)
  // ==========================================
  useEffect(() => {
    const loadLibrariesAndModel = async () => {
      if (typeof window !== "undefined") {
        try {
          // 1. TensorFlow & Teachable Machine untuk Kartu Reagen
          if (!(window as any).tf) {
            await new Promise<void>((resolve, reject) => {
              const script = document.createElement("script");
              script.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.18.0/dist/tf.min.js";
              script.onload = () => resolve();
              script.onerror = () => reject(new Error("Gagal mengunduh TensorFlow.js"));
              document.head.appendChild(script);
            });
          }
          if (!(window as any).tmImage) {
            await new Promise<void>((resolve, reject) => {
              const script = document.createElement("script");
              script.src = "https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8.5/dist/teachablemachine-image.min.js";
              script.onload = () => resolve();
              script.onerror = () => reject(new Error("Gagal mengunduh Teachable Machine"));
              document.head.appendChild(script);
            });
          }
          const tmImage = (window as any).tmImage;
          if (tmImage) {
            modelRef.current = await tmImage.load(`${MODEL_URL}model.json`, `${MODEL_URL}metadata.json`);
            console.log("Model Teachable Machine (Kartu) berhasil dimuat!");
          }

          // 2. MediaPipe Hands untuk Gestur Tangan
          if (!(window as any).Hands) {
            await new Promise<void>((resolve, reject) => {
              const script = document.createElement("script");
              script.src = "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js";
              script.crossOrigin = "anonymous";
              script.onload = () => resolve();
              script.onerror = () => reject(new Error("Gagal mengunduh MediaPipe Hands"));
              document.head.appendChild(script);
            });
          }

          if ((window as any).Hands) {
            const hands = new (window as any).Hands({
              locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
            });
            hands.setOptions({
              maxNumHands: 1,
              modelComplexity: 1,
              minDetectionConfidence: 0.7,
              minTrackingConfidence: 0.5
            });
            hands.onResults(onMediaPipeResults);
            handsModelRef.current = hands;
            console.log("Model MediaPipe Hands (Gestur) berhasil dimuat!");
          }

        } catch (e) {
          console.error("Gagal memuat pustaka AI", e);
        }
      }
    };
    loadLibrariesAndModel();

    const session = localStorage.getItem("virexa_student_session");
    if (session) {
      setStudentInfo(JSON.parse(session));
    } else {
      router.push("/student/identity");
    }

    return () => {
      matikanKamera();
    };
  }, []);

  // Update campuran warna & organ damage calculation
  useEffect(() => {
    if (!bahanList.length) {
      setWarnaCampuranHex('#BAE6FD');
      setPHCampuran(7.0);
      setGigiHealth(100);
      setLambungHealth(100);
      setGinjalHealth(100);
      return;
    }

    const data = bahanList.map(n => DAFTAR_BAHAN[n]).filter(Boolean);
    const calculatedPH = data.reduce((acc, curr) => acc + curr.pH, 0) / data.length;
    setPHCampuran(calculatedPH);
    setWarnaCampuranHex(campurWarna(data.map(d => d.warnaHex)));

    let tempGigi = 100;
    let tempLambung = 100;
    let tempGinjal = 100;

    data.forEach(item => {
      if (item.pH < 4.5) tempGigi -= 25;
      if (item.pH < 3.5) tempLambung -= 30;
      if (item.nama === 'Boraks Pengawet') tempGinjal -= 55;
      if (item.nama === 'Baking Soda' && calculatedPH < 5.0) tempLambung += 15;
    });

    setGigiHealth(Math.max(10, Math.min(100, tempGigi)));
    setLambungHealth(Math.max(10, Math.min(100, tempLambung)));
    setGinjalHealth(Math.max(10, Math.min(100, tempGinjal)));

  }, [bahanList]);


  // ==========================================
  // ALGORITMA MEDIAPIPE GESTURE RECOGNITION
  // ==========================================
  const onMediaPipeResults = (results: any) => {
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      const landmarks = results.multiHandLandmarks[0];

      // helper fungsi untuk mengecek jari melengkung atau lurus
      const isFingerCurled = (tip: number, pip: number) => landmarks[tip].y > landmarks[pip].y;
      const isFingerExtended = (tip: number, pip: number) => landmarks[tip].y < landmarks[pip].y;

      // Jari Telunjuk (8), Tengah (12), Manis (16), Kelingking (20)
      const indexCurled = isFingerCurled(8, 6);
      const middleCurled = isFingerCurled(12, 10);
      const ringCurled = isFingerCurled(16, 14);
      const pinkyCurled = isFingerCurled(20, 18);

      const indexExtended = isFingerExtended(8, 6);
      const middleExtended = isFingerExtended(12, 10);
      const ringExtended = isFingerExtended(16, 14);
      const pinkyExtended = isFingerExtended(20, 18);

      // Jempol (4) - y lebih kecil berarti menunjuk ke atas
      const thumbExtendedUp = landmarks[4].y < landmarks[3].y && landmarks[4].y < landmarks[5].y;

      let detectedGesture = "Tidak ada gestur";

      // LOGIKA: MENGEPAL (Semua Jari Menekuk, Jempol Tidak Ke Atas Sekali)
      if (indexCurled && middleCurled && ringCurled && pinkyCurled) {
        if (thumbExtendedUp) {
          detectedGesture = "Jempol";
        } else {
          detectedGesture = "Mengepal";
        }
      } 
      // LOGIKA: BUKA TANGAN (Semua Jari Lurus Terbuka)
      else if (indexExtended && middleExtended && ringExtended && pinkyExtended) {
        detectedGesture = "Buka Tangan";
      }

      setGesturePrediction(detectedGesture);

      // Mencegah Spam Gestur berlebihan (Jeda 2 detik)
      const now = Date.now();
      if (now - lastGestureTimeRef.current < 2000) return;

      if (detectedGesture === "Mengepal" && bahanListRef.current.length > 0 && !isStirredRef.current) {
        adukLarutan();
        lastGestureTimeRef.current = now;
      } else if (detectedGesture === "Jempol" && promptZatRef.current) {
        tuangkanBahan(promptZatRef.current.nama);
        lastGestureTimeRef.current = now;
      } else if (detectedGesture === "Buka Tangan" && promptZatRef.current) {
        tolakBahan();
        lastGestureTimeRef.current = now;
      }
    } else {
      setGesturePrediction("Tidak ada tangan");
    }
  };


  // ==========================================
  // AI LOOP MANAGER (MENJALANKAN KEDUA MODEL)
  // ==========================================
  const loopAI = useCallback(async () => {
    if (!videoRef.current || !streamRef.current) return;
    try {
      if (videoRef.current.readyState === 4) {
        
        // 1. Prediksi Kartu Reagen dengan Teachable Machine
        if (modelRef.current && bahanListRef.current.length < 3 && !promptZatRef.current) {
          const preds = await modelRef.current.predict(videoRef.current);
          if (preds && preds.length > 0) {
            let bestProb = 0;
            let bestLabel = 'Kosong';

            preds.forEach((p: any) => {
              if (p.probability > bestProb) {
                bestProb = p.probability;
                bestLabel = p.className;
              }
            });

            if (bestProb > 0.80 && bestLabel !== 'Kosong' && bestLabel.toLowerCase() !== 'background') {
              const labelLower = bestLabel.toLowerCase();
              setAiPrediction(`Kartu: ${bestLabel} (${Math.round(bestProb * 100)}%)`);

              // Pemetaan Cerdas Kartu Reagen
              let mappedKey: string | null = null;
              if (labelLower.includes('cola') || labelLower.includes('soda')) mappedKey = 'Minuman Cola';
              else if (labelLower.includes('cuka')) mappedKey = 'Cuka Apel';
              else if (labelLower.includes('susu')) mappedKey = 'Susu Sapi';
              else if (labelLower.includes('kelapa')) mappedKey = 'Air Kelapa';
              else if (labelLower.includes('baking') || labelLower.includes('kue')) mappedKey = 'Baking Soda';
              else if (labelLower.includes('boraks') || labelLower.includes('borax')) mappedKey = 'Boraks Pengawet';
              else if (labelLower.includes('saos') || labelLower.includes('sambal')) mappedKey = 'Saos Sambal';
              else if (labelLower.includes('tomat')) mappedKey = 'Tomat Segar';
              else if (labelLower.includes('daging')) mappedKey = 'Ekstrak Daging';
              else if (labelLower.includes('tahu')) mappedKey = 'Air Tahu';
              else if (labelLower.includes('tea') || labelLower.includes('teh')) mappedKey = 'Green Tea';
              else if (labelLower.includes('aspartam') || labelLower.includes('pemanis')) mappedKey = 'Aspartame';
              else if (labelLower.includes('murni') || labelLower.includes('air')) mappedKey = 'Air Murni';
              else if (labelLower.includes('yogurt')) mappedKey = 'Yogurt';
              else {
                 const matched = Object.keys(DAFTAR_BAHAN).find(k => labelLower.includes(k.toLowerCase()) || k.toLowerCase().includes(labelLower));
                 if (matched) mappedKey = matched;
              }

              if (mappedKey && lastScannedRef.current !== mappedKey && !bahanListRef.current.includes(mappedKey)) {
                const d = DAFTAR_BAHAN[mappedKey];
                if (d && !promptZatRef.current) {
                  lastScannedRef.current = mappedKey;
                  setPromptZat({
                    nama: mappedKey,
                    pH: d.pH,
                    senyawa: d.senyawaDominan,
                    dampak: d.dampakTubuh,
                    icon: d.icon
                  });
                  speakText(`Kartu ${mappedKey} terdeteksi. Nilai pH ${d.pH}. Angkat jempol untuk menuangkan, atau buka tangan untuk membatalkan.`);
                }
              }
            } else {
              setAiPrediction('Menunggu kartu reagen...');
            }
          }
        }

        // 2. Prediksi Gestur Tangan dengan MediaPipe Hands
        if (handsModelRef.current) {
          await handsModelRef.current.send({ image: videoRef.current });
        }

      }
    } catch (e) {
      console.error(e);
    }
    if (streamRef.current && mode === 'camera') {
      animRef.current = requestAnimationFrame(loopAI);
    }
  }, [mode]);

  const aktifkanKamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
      streamRef.current = stream;
      setCameraActive(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().then(() => loopAI()).catch(console.error);
        }
      }, 200);
    } catch (err) {
      console.error("Gagal membuka kamera", err);
    }
  };

  const matikanKamera = () => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }
    setCameraActive(false);
  };

  const tuangkanBahan = (nama: string) => {
    setBahanList((prev) => {
       if (prev.includes(nama) || prev.length >= 3) return prev;
       return [...prev, nama];
    });
    setPromptZat(null);
    lastScannedRef.current = null;
    setIsStirred(false); 
    speakText(`${nama} berhasil dituangkan. Kepalkan tanganmu ke kamera untuk mengaduk larutan.`);
  };

  const tolakBahan = () => {
    setPromptZat(null);
    lastScannedRef.current = null;
    speakText("Penuangan dibatalkan.");
  };

  const adukLarutan = () => {
    setIsStirred(true);
    speakText("Larutan berhasil diaduk sempurna. Warna larutan menyatu secara merata.");
  };

  const resetTabungReaksi = () => {
    setBahanList([]);
    setPromptZat(null);
    setIsStirred(false);
    lastScannedRef.current = null;
    speakText("Tabung reaksi telah dibersihkan.");
  };

  const handleDragStart = (e: React.DragEvent, namaBahan: string) => {
    e.dataTransfer.setData("text/plain", namaBahan);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const namaBahan = e.dataTransfer.getData("text/plain");
    if (namaBahan && DAFTAR_BAHAN[namaBahan] && !bahanList.includes(namaBahan) && bahanList.length < 3) {
      tuangkanBahan(namaBahan);
    }
  };

  const kirimObrolanKeAI = async () => {
    if (!chatInput.trim()) return;
    const userText = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userText }]);
    setChatInput('');
    setChatLoading(true);

    const systemPrompt = `Kamu adalah asisten guru sains cerdas VirexaBot AI di platform lab virtual VIREXA. Tugasmu membantu siswa SMP mencatatkan laporan praktikum kimia organ di lembar kertas LKPD fisik mereka. Berikan ulasan interaktif tentang reagen, pH, dan dampak patologisnya.`;

    const payload = {
      contents: [{ parts: [{ text: userText }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] }
    };

    const apiKey = ""; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    let resText = "Maaf, VirexaBot sedang sibuk memantau sensor. Silakan kirim pesan kembali.";
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        const result = await response.json();
        const generated = result.candidates?.[0]?.content?.parts?.[0]?.text;
        if (generated) resText = generated;
      }
    } catch (e) {
      console.error(e);
    }

    setChatMessages(prev => [...prev, { role: 'assistant', text: resText }]);
    setChatLoading(false);
  };

  const handleSelesaiPraktikum = () => {
    const session = localStorage.getItem("virexa_student_session");
    if (session) {
      const parsed = JSON.parse(session);
      localStorage.setItem("virexa_student_session", JSON.stringify({
        ...parsed,
        labSelesai: true,
        pHCampuranAkhir: pHCampuran,
        bahanDicampur: bahanList
      }));
    }
    router.push("/student/post-test");
  };

  return (
    <div className="h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden">
      
      {/* Top Navigation Bar */}
      <header className="flex justify-between items-center w-full px-6 py-4 z-50 sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="flex items-center gap-2">
          {/* Teks VIREXA lama sudah dihapus, diganti panggil logo gambar di bawah ini */}
          <img 
            src="/images/virexa-logo.png" 
            alt="VIREXA Logo" 
            className="h-12 w-auto object-contain" 
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
            <User className="h-5 w-5" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative h-[calc(100vh-50px)] overflow-hidden">
        
        {/* Left Side Navigation Bar */}
        <nav className="h-full flex flex-col py-3 z-40 bg-white border-r border-slate-100 w-56 hidden xl:flex shrink-0">
          <div className="px-3 mb-3">
            <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                SL
              </div>
              <div>
                <h3 className="font-display text-xs text-indigo-600 leading-tight font-bold">Science Lab</h3>
                <p className="text-[10px] text-slate-500 font-medium">Junior High School</p>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-1 overflow-y-auto px-2">
            <button onClick={() => router.push("/student/identity")} className="w-full text-slate-600 hover:bg-slate-50 rounded-lg px-3 py-2 flex items-center gap-3 transition-all text-left">
              <User className="h-4 w-4 text-slate-400" />
              <span className="text-[11px] tracking-wider font-semibold">1. Identitas</span>
            </button>
            <button onClick={() => router.push("/student/pre-test")} className="w-full text-slate-600 hover:bg-slate-50 rounded-lg px-3 py-2 flex items-center gap-3 transition-all text-left">
              <HelpCircle className="h-4 w-4 text-slate-400" />
              <span className="text-[11px] tracking-wider font-semibold">2. Pre-Test</span>
            </button>
            <button onClick={() => router.push("/student/materials")} className="w-full text-slate-600 hover:bg-slate-50 rounded-lg px-3 py-2 flex items-center gap-3 transition-all text-left">
              <BookOpen className="h-4 w-4 text-slate-400" />
              <span className="text-[11px] tracking-wider font-semibold">3. Materi & Kuis</span>
            </button>
            <div className="bg-indigo-50/50 text-indigo-600 font-bold rounded-lg px-3 py-2 flex items-center gap-3 border border-indigo-100/50 transition-all cursor-default">
              <FlaskConical className="h-4 w-4 text-indigo-500" />
              <span className="text-[11px] tracking-wider">4. Virtual Lab</span>
            </div>
            <button 
              onClick={() => router.push("/student/post-test")}
              className="w-full text-slate-600 hover:bg-slate-50 rounded-lg px-3 py-2 flex items-center gap-3 transition-all text-left"
            >
              <Award className="h-4 w-4 text-slate-400" />
              <span className="text-[11px] tracking-wider font-semibold">5. Post-Test</span>
            </button>
          </div>

          <div className="px-3 mt-auto pt-2">
            <div className="w-full py-2 px-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-[9px] font-semibold flex items-center gap-1.5 border border-emerald-100">
              <Sparkles className="h-3 w-3 text-emerald-500 fill-emerald-100" />
              <span>Sambil isi LKPD Fisik ya!</span>
            </div>
          </div>
        </nav>

        {/* Main Work Bench Canvas - Strict 3 Columns Layout Sejajar untuk 1 Layar */}
        <main className="flex-1 p-3 flex flex-col relative h-full w-full overflow-hidden">
          
          {/* TAMPILAN PROMPT DETEKSI KARTU REAGEN */}
          {promptZat && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-[100] w-11/12 max-w-xl bg-white border-2 border-indigo-500 p-3 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-3 animate-[bounce_1s_ease-in-out]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-xl shadow-inner shrink-0">
                  {promptZat.icon}
                </div>
                <div className="text-left">
                  <span className="bg-indigo-100 text-indigo-800 text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Reagen Terpindai</span>
                  <h3 className="font-display text-base font-extrabold text-slate-900 leading-tight">{promptZat.nama} (pH {promptZat.pH})</h3>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => tuangkanBahan(promptZat.nama)} className="px-2.5 py-1.5 bg-emerald-600 text-white font-bold rounded-lg text-[9px] flex items-center gap-1.5 shadow-md hover:bg-emerald-700 active:scale-95 transition-all">
                  <ThumbsUp className="h-3 w-3" /> <span>Tuang (👍)</span>
                </button>
                <button onClick={tolakBahan} className="px-2.5 py-1.5 bg-rose-50 text-rose-800 font-bold rounded-lg text-[9px] flex items-center gap-1.5 hover:bg-rose-100 transition-all border border-rose-100">
                  <XCircle className="h-3 w-3" /> <span>Batal (🖐️)</span>
                </button>
              </div>
            </div>
          )}

          {/* TATA LETAK 3 KOLOM SEJAJAR PASTI (MENGGUNAKAN FLEX ROW) AGAR PAS 1 LAYAR */}
          <div className="w-full h-full flex flex-col lg:flex-row gap-3 relative z-10 overflow-hidden max-w-[1400px] mx-auto">
            
            {/* ======================================================== */}
            {/* KOLOM 1: AI CAMERA DUAL MODEL (33% Width) */}
            {/* ======================================================== */}
            <div className="flex-1 w-full lg:w-1/3 bg-[#E8E5FF]/40 rounded-3xl p-3.5 border border-indigo-100/50 flex flex-col h-full overflow-hidden shrink-0">
              <div className="flex justify-between items-center mb-2.5 shrink-0">
                <h3 className="font-bold text-xs text-indigo-800 flex items-center gap-1.5">
                  <Camera className="h-4 w-4" />
                  <span>Kamera Sensor AI</span>
                </h3>
                {cameraActive && (
                  <span className="px-2 py-0.5 bg-rose-500 text-white rounded-full text-[8px] font-bold flex items-center gap-1 shadow-md">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> LIVE
                  </span>
                )}
              </div>

              <div className="w-full flex-1 rounded-2xl bg-[#0F172A] relative overflow-hidden flex items-center justify-center border border-indigo-200 min-h-0 shadow-inner">
                {cameraActive ? (
                  <>
                    <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform scale-x-[-1]" />
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-[scan_2s_linear_infinite] z-10" />
                    <button onClick={matikanKamera} className="absolute top-2 right-2 bg-rose-600/80 backdrop-blur text-white font-bold text-[9px] px-2 py-1 rounded-md hover:bg-rose-700 transition-all">
                      Matikan
                    </button>
                  </>
                ) : (
                  <div className="text-center p-2">
                    <button onClick={aktifkanKamera} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-[10px] tracking-wider transition-all shadow-lg">
                      Nyalakan Kamera
                    </button>
                  </div>
                )}

                {cameraActive && (
                  <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded-md text-white flex flex-col gap-0.5 z-20">
                    <span className="text-[8px] font-bold text-indigo-300">TM (Kartu): {aiPrediction}</span>
                    <span className="text-[8px] font-bold text-emerald-300">MP (Gestur): {gesturePrediction}</span>
                  </div>
                )}
              </div>

              <div className="mt-2.5 p-2 bg-rose-50 rounded-xl border border-rose-200/60 shrink-0">
                <h4 className="text-[9px] font-bold text-rose-800 flex items-center gap-1 mb-0.5"><AlertTriangle className="w-2.5 h-2.5"/> Info Gestur MediaPipe</h4>
                <p className="text-[8.5px] text-rose-700 leading-tight font-medium">
                  Sistem kini memakai **MediaPipe Hands** khusus untuk tangan. Kepalkan tangan (Aduk), Angkat Jempol (Tuang), dan Buka Tangan (Batal). Kamera akan mendeteksi sendi jari Anda secara langsung!
                </p>
              </div>
            </div>

            {/* ======================================================== */}
            {/* KOLOM 2: MEJA TABUNG REAKSI (33% Width) */}
            {/* ======================================================== */}
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex-1 w-full lg:w-1/3 bg-white rounded-3xl p-3.5 border flex flex-col h-full overflow-hidden transition-all duration-300 relative shrink-0 ${
                isDraggingOver ? "border-indigo-500 bg-indigo-50/20 ring-2 ring-indigo-500/20" : "border-slate-200/60"
              }`}
            >
              <div className="flex justify-between items-center mb-2.5 shrink-0 border-b border-slate-50 pb-2">
                <h3 className="font-display font-extrabold text-slate-900 text-sm">Meja Reaksi</h3>
                {bahanList.length > 0 && (
                  <button onClick={resetTabungReaksi} className="px-2 py-1 bg-rose-50 text-rose-700 font-bold rounded-md text-[9px] hover:bg-rose-100 transition-all border border-rose-100 flex items-center gap-1">
                    <Trash2 className="h-3 w-3" /> Bersihkan
                  </button>
                )}
              </div>

              <div className="flex-1 flex flex-col items-center justify-center min-h-0 relative w-full pb-1">
                <div className="relative w-24 h-36 flex items-end justify-center">
                  <div className="absolute inset-0 border-[4px] border-indigo-600/10 rounded-b-full rounded-t-xl bg-slate-50/50 backdrop-blur-md z-10 overflow-hidden shadow-inner flex flex-col justify-end">
                    <div 
                      className={`absolute bottom-0 left-0 w-full transition-all duration-1000 ${isStirred ? "opacity-90" : "opacity-70"}`}
                      style={{ 
                        height: `${(bahanList.length / 3) * 85}%`, 
                        backgroundColor: isStirred ? warnaCampuranHex : '#BAE6FD',
                        backgroundImage: !isStirred && bahanList.length ? 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.2) 10px, rgba(255,255,255,0.2) 20px)' : 'none'
                      }}
                    />
                    {isStirred && (
                      <div className="absolute inset-0 bg-white/10 flex items-center justify-center pointer-events-none">
                        <div className="w-8 h-8 border-4 border-dashed border-white/40 rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute top-1/2 left-[110%] z-30 bg-indigo-600 text-white p-2 rounded-xl shadow-md flex flex-col items-center min-w-[45px] border border-indigo-500">
                    <span className="text-[7px] font-bold uppercase opacity-80">pH</span>
                    <span className="text-base font-extrabold leading-none mt-0.5">{pHCampuran.toFixed(1)}</span>
                  </div>
                </div>

                {bahanList.length > 0 && !isStirred && (
                  <div className="mt-2 p-1.5 bg-amber-50 rounded-lg border border-amber-200 flex flex-col items-center text-center w-full max-w-[160px] animate-pulse shrink-0">
                    <p className="text-[8px] font-bold text-amber-800 leading-tight mb-1">Kepalkan Tangan (✊) ke kamera untuk mengaduk!</p>
                    <button onClick={adukLarutan} className="px-3 py-1 bg-amber-500 text-white font-bold text-[8px] rounded-md hover:bg-amber-600 w-full">Aduk Manual</button>
                  </div>
                )}
              </div>

              <div className="w-full pt-1.5 border-t border-slate-100 shrink-0 h-28 overflow-hidden flex flex-col">
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block mb-1 shrink-0">Rak Reagen (Seret ke Tabung)</span>
                <div className="grid grid-cols-2 gap-1.5 overflow-y-auto pr-1 pb-1">
                  {Object.entries(DAFTAR_BAHAN).map(([key, item]) => {
                    const isSelected = bahanList.includes(key);
                    return (
                      <div
                        key={key}
                        draggable={!isSelected && bahanList.length < 3}
                        onDragStart={(e) => handleDragStart(e, key)}
                        onClick={() => {
                          if (!isSelected && bahanList.length < 3) {
                            setPromptZat({ nama: key, pH: item.pH, senyawa: item.senyawaDominan, dampak: item.dampakTubuh, icon: item.icon });
                          }
                        }}
                        className={`p-1.5 rounded-md text-[9px] font-bold flex items-center gap-1.5 border transition-all ${
                          isSelected ? "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed" : "bg-white text-slate-700 border-slate-200 hover:border-indigo-400 cursor-grab"
                        }`}
                      >
                        <span className="text-sm shrink-0">{item.icon}</span>
                        <span className="truncate">{key}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* KOLOM 3: FULL BODY ORGAN MONITOR REALISTIS (33% Width) */}
            {/* ======================================================== */}
            <div className="flex-1 w-full lg:w-1/3 bg-white rounded-3xl p-3.5 border border-slate-200/60 flex flex-col h-full overflow-hidden shrink-0 relative">
              
              <div className="flex items-center justify-between border-b border-slate-50 pb-2 mb-2 shrink-0">
                <h3 className="font-display font-extrabold text-indigo-600 text-sm">Monitor Badan Manusia</h3>
                <Activity className="h-4 w-4 text-indigo-600 animate-pulse" />
              </div>

              {/* 3D FULL BODY RENDER DENGAN TITIK INFEKSI MENGAMBANG */}
              <div className="flex-1 bg-slate-50/50 rounded-2xl border border-slate-100 relative flex justify-center items-center p-1 min-h-0 overflow-hidden">
                
                {/* Gambar 3D Full Body (Gunakan human-body-organs.png di public/images) */}
                <img 
                   src="/images/human-body-organs.png" 
                   onError={(e) => e.currentTarget.src = "https://cdn.pixabay.com/photo/2013/07/13/11/44/human-158542_1280.png"} // Fallback Silhouette
                   alt="Anatomi Full Body" 
                   className="h-full w-auto object-contain drop-shadow-xl z-10" 
                />
                
                {/* Pendaran Infeksi Mulut/Gigi (Merespons Asam Kuat) */}
                <div className={`absolute top-[12%] left-[50%] -translate-x-1/2 z-20 flex justify-center items-center ${gigiHealth < 80 ? 'animate-pulse' : ''}`}>
                   {gigiHealth < 80 && <div className="absolute w-10 h-10 bg-rose-500/60 rounded-full blur-xl" />}
                   <div className={`w-2.5 h-2.5 rounded-full border-2 border-white relative z-30 shadow-md ${gigiHealth < 80 ? 'bg-rose-500' : 'bg-emerald-400'}`} />
                </div>

                {/* Pendaran Infeksi Lambung (Merespons Asam Ekstrem) */}
                <div className={`absolute top-[42%] left-[53%] -translate-x-1/2 z-20 flex justify-center items-center ${lambungHealth < 80 ? 'animate-pulse' : ''}`}>
                   {lambungHealth < 80 && <div className="absolute w-14 h-14 bg-rose-500/60 rounded-full blur-xl" />}
                   <div className={`w-3.5 h-3.5 rounded-full border-2 border-white relative z-30 shadow-md ${lambungHealth < 80 ? 'bg-rose-500' : 'bg-emerald-400'}`} />
                </div>

                {/* Pendaran Infeksi Ginjal (Merespons Basa/Boraks) */}
                <div className={`absolute top-[55%] left-[47%] -translate-x-1/2 z-20 flex justify-center items-center ${ginjalHealth < 80 ? 'animate-pulse' : ''}`}>
                   {ginjalHealth < 80 && <div className="absolute w-14 h-14 bg-rose-500/60 rounded-full blur-xl" />}
                   <div className={`w-3.5 h-3.5 rounded-full border-2 border-white relative z-30 shadow-md ${ginjalHealth < 80 ? 'bg-rose-500' : 'bg-emerald-400'}`} />
                </div>

                <div className="absolute top-1 left-1 bg-white/90 px-1.5 py-0.5 rounded text-[7px] font-bold text-slate-500 shadow-sm z-30">Real-time Tracker</div>
              </div>

              {/* Organ Status Bars (Di Bawah Body Model) */}
              <div className="flex flex-col gap-1.5 mt-2 shrink-0">
                
                <div className="flex gap-2 items-center text-left">
                  <div className="w-5 h-5 bg-slate-100 rounded flex items-center justify-center shrink-0 text-[10px]">🦷</div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-end mb-0.5">
                      <span className="text-[8px] font-bold text-slate-800">Email Gigi</span>
                      <span className={`text-[8px] font-bold ${gigiHealth < 80 ? "text-rose-600" : "text-emerald-600"}`}>{gigiHealth}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${gigiHealth < 80 ? "bg-rose-500" : "bg-emerald-500"}`} style={{ width: `${gigiHealth}%` }} />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 items-center text-left">
                  <div className="w-5 h-5 bg-slate-100 rounded flex items-center justify-center shrink-0 text-[10px]">🤢</div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-end mb-0.5">
                      <span className={`text-[8px] font-bold ${lambungHealth < 80 ? "text-rose-800" : "text-slate-800"}`}>Mukosa Lambung</span>
                      <span className={`text-[8px] font-bold ${lambungHealth < 80 ? "text-rose-600" : "text-emerald-600"}`}>{lambungHealth}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${lambungHealth < 80 ? "bg-rose-500" : "bg-emerald-500"}`} style={{ width: `${lambungHealth}%` }} />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 items-center text-left">
                  <div className="w-5 h-5 bg-slate-100 rounded flex items-center justify-center shrink-0 text-[10px]">🧬</div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-end mb-0.5">
                      <span className="text-[8px] font-bold text-slate-800">Filtrasi Ginjal</span>
                      <span className={`text-[8px] font-bold ${ginjalHealth < 80 ? "text-rose-600" : "text-emerald-600"}`}>{ginjalHealth}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${ginjalHealth < 80 ? "bg-rose-500" : "bg-emerald-500"}`} style={{ width: `${ginjalHealth}%` }} />
                    </div>
                  </div>
                </div>

              </div>

              {/* CTA Selesai Praktikum */}
              <button 
                onClick={handleSelesaiPraktikum}
                disabled={bahanList.length === 0 || !isStirred}
                className="w-full mt-2.5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-[10px] tracking-wider shadow-lg shadow-emerald-600/10 hover:bg-emerald-700 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              >
                <span>Selesai &amp; Isi LKPD</span>
                <ArrowRight className="h-3 w-3" />
              </button>

            </div>

          </div>

        </main>
      </div>

      {/* CHATBOT AI VIRTUAL HELPER UI */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
        {chatOpen && (
          <div className="w-72 h-80 bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-[fadeIn_0.3s_ease-out]">
            <div className="flex items-center justify-between bg-indigo-600 p-3 text-white text-left">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider leading-none">VirexaBot AI</h4>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-white font-bold hover:opacity-85 text-base">×</button>
            </div>
            
            <div className="flex-grow p-3 overflow-y-auto space-y-2.5 bg-slate-50 text-left">
              {chatMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`p-2.5 rounded-2xl text-[10px] font-semibold leading-relaxed max-w-[85%] ${
                    msg.role === 'user' 
                      ? "bg-indigo-600 text-white rounded-tr-none ml-auto" 
                      : "bg-white text-slate-700 rounded-tl-none border border-slate-200/50 mr-auto"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {chatLoading && (
                <div className="p-2.5 bg-white text-slate-400 rounded-2xl rounded-tl-none text-[9px] font-bold italic animate-pulse">
                  Berpikir...
                </div>
              )}
            </div>

            <div className="p-2 border-t border-slate-100 flex gap-2 bg-white">
              <input 
                type="text" 
                placeholder="Tanya efek zat..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") kirimObrolanKeAI(); }}
                className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-[10px] focus:outline-none focus:border-indigo-500 font-semibold"
              />
              <button onClick={kirimObrolanKeAI} className="p-1.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">
                <Send className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}

        {/* Floating Chat Button */}
        <button 
          onClick={() => setChatOpen(!chatOpen)}
          className="w-12 h-12 rounded-full bg-white shadow-2xl border-4 border-indigo-100 flex items-center justify-center p-1 hover:scale-105 transition-all relative"
        >
          <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
          <span className="text-xl">🤖</span>
        </button>
      </div>

    </div>
  );
}