/* tinykeys ships types at dist/tinykeys.d.ts but its `exports` map doesn't
 * expose a `types` subpath, so TypeScript under moduleResolution: Bundler
 * can't find them. Re-expose via an ambient module declaration. */
declare module 'tinykeys' {
  export type KeyBindingMap = Record<string, (event: KeyboardEvent) => void>;
  export type KeyBindingOptions = {
    event?: 'keydown' | 'keyup';
    capture?: boolean;
    timeout?: number;
  };
  export function tinykeys(
    target: Window | HTMLElement,
    keyBindingMap: KeyBindingMap,
    options?: KeyBindingOptions,
  ): () => void;
}
