import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// Server-side proxy so /api/* calls are forwarded to the UOI
// BFF from Vite — browser sees same-origin, no CORS check.
// secure:false intentionally — the Jenkins deploy box sits behind a
// corporate Secure Web Gateway (Trend Micro) that MITMs outbound HTTPS
// for inspection, presenting its own cert. With secure:true Vite rejects
// the handshake and returns 500 to the browser. secure:false tells Vite's
// proxy to skip cert verification for this ONE upstream. Only safe because
// the target (agent.mck.aidendigital.com) is a known-trusted host already
// reachable over HTTPS through the corporate egress.
const proxy = {
  '/api': {
    target: 'https://agent.mck.aidendigital.com',
    changeOrigin: true,
    secure: false,
  },
};

export default defineConfig({
  preview: { host: '0.0.0.0', port: 6464, strictPort: true,
    proxy: {
      '/api': {
        target: 'https://agent.mck.aidendigital.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  server: { host: '0.0.0.0', port: 6464, strictPort: true,
    proxy: {
      '/api': {
        target: 'https://agent.mck.aidendigital.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  
    },
  },
  
    },
  },
  
    },
  },
  
    },
  },
  
    },
  },
  
    },
  },
  
    },
  },
  
    },
  },
  
    },
  },
  
    },
  },
  
    },
  },
  
    },
  },
  plugins: [react()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  
  
});
