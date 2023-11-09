import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({

  // server: {
  //   proxy: {
  //     '/api': {
  //       // target: 'https://dashboard-mern-sandy.vercel.app',
  //       // target: process.env.VITE_BASE_URL,
  //       target: 'http://localhost/8000',
  //       secure: false,
  //     },
  //   },
  // },
  plugins: [react()],
});
