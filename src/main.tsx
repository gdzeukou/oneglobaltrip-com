import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PerformanceOptimizer } from './utils/performanceOptimizer'

// Initialize performance optimizations immediately
const optimizer = PerformanceOptimizer.getInstance();
optimizer.initializeOptimizations();

// Preload critical resources
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    optimizer.initializeAdvancedOptimizations();
  });
} else {
  setTimeout(() => optimizer.initializeAdvancedOptimizations(), 100);
}

createRoot(document.getElementById("root")!).render(<App />);
