class DF {
  createDiv() { return { innerHTML: '' }; }
}
// @ts-ignore
(global as any).DocumentFragment = DF as any;
