import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Clean up after each test case
afterEach(() => {
  cleanup();
});

class IntersectionObserverMock implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly thresholds = []

  disconnect() {}
  observe() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
  unobserve() {}
}

Object.defineProperty(globalThis, 'IntersectionObserver', {
  writable: true,
  value: IntersectionObserverMock,
});

// Mock para o objeto window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
  }),
});
