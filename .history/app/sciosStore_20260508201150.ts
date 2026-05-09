import { create } from "zustand";

type Mode = "NORMAL" | "FAULT" | "REVEAL";

interface State {
  mode: Mode;
  loss: number;
  running: boolean;
  injectFault: () => void;
  reveal: () => void;
  reset: () => void;
  autoplay: () => void;
}

export const useSciOSStore = create<State>((set, get) => ({
  mode: "NORMAL",
  loss: 0,
  running: false,

  injectFault: () => set({ mode: "FAULT" }),
  reveal: () => set({ mode: "REVEAL" }),
  reset: () => set({ mode: "NORMAL", loss: 0, running: false }),

  autoplay: async () => {
    set({ running: true, mode: "NORMAL", loss: 0 });
    
    // 1. Trạng thái bình thường (2 giây)
    await new Promise(r => setTimeout(r, 2000));

    // 2. Kích hoạt lỗi: Tắc nghẽn vi lưu
    set({ mode: "FAULT" });
    const interval = setInterval(() => {
      set(s => ({ loss: s.loss + 85 })); // Mỗi 0.5 giây mất $85 mẫu bệnh phẩm
    }, 500);

    await new Promise(r => setTimeout(r, 5000));

    // 3. SciOS Reveal: Giải mã nhân quả
    set({ mode: "REVEAL" });

    await new Promise(r => setTimeout(r, 5000));

    clearInterval(interval);
    set({ running: false });
  }
}));