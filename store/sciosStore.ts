import { create } from "zustand";

type Mode = "NORMAL" | "FAULT" | "REVEAL";

interface SciosState {
  mode: Mode;
  loss: number;
  running: boolean;

  autoplay: () => Promise<void>;
  reset: () => void;
}

const delay = (ms: number) =>
  new Promise((res) => setTimeout(res, ms));

export const useSciOSStore = create<SciosState>((set) => ({
  mode: "NORMAL",
  loss: 0,
  running: false,

  autoplay: async () => {
    // RESET SYSTEM
    set({
      running: true,
      mode: "NORMAL",
      loss: 0,
    });

    // NORMAL STATE
    await delay(4000);

    // FAULT STATE
    set({
      mode: "FAULT",
    });

    let totalLoss = 0;

    const lossInterval = setInterval(() => {
      totalLoss += 2500;

      set({
        loss: totalLoss,
      });
    }, 200);

    // SHOW CHAOS
    await delay(7000);

    // REVEAL ROOT CAUSE
    set({
      mode: "REVEAL",
    });

    // STOP COUNTER
    clearInterval(lossInterval);

    // END DEMO
    set({
      running: false,
    });
  },

  reset: () => {
    set({
      mode: "NORMAL",
      loss: 0,
      running: false,
    });
  },
}));