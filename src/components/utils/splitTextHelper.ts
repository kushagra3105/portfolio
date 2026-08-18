export class CustomSplitText {
  chars: HTMLElement[] = [];
  words: HTMLElement[] = [];
  lines: HTMLElement[] = [];
  private elements: HTMLElement[] = [];
  private originalHTML: Map<HTMLElement, string> = new Map();

  constructor(
    target: string | HTMLElement | (string | HTMLElement)[],
    options?: { type?: string; linesClass?: string }
  ) {
    const targets: HTMLElement[] = [];
    if (typeof target === "string") {
      document.querySelectorAll<HTMLElement>(target).forEach((el) => targets.push(el));
    } else if (Array.isArray(target)) {
      target.forEach((t) => {
        if (typeof t === "string") {
          document.querySelectorAll<HTMLElement>(t).forEach((el) => targets.push(el));
        } else if (t instanceof HTMLElement) {
          targets.push(t);
        }
      });
    } else if (target instanceof HTMLElement) {
      targets.push(target);
    }

    this.elements = targets;
    const type = options?.type || "chars,lines";
    const linesClass = options?.linesClass || "split-line";

    targets.forEach((elem) => {
      this.originalHTML.set(elem, elem.innerHTML);
      const text = elem.textContent || "";
      elem.innerHTML = "";

      if (type.includes("chars")) {
        const charsArr = Array.from(text);
        charsArr.forEach((c) => {
          const charSpan = document.createElement("span");
          charSpan.style.display = c === " " ? "inline" : "inline-block";
          charSpan.textContent = c === " " ? "\u00A0" : c;
          elem.appendChild(charSpan);
          this.chars.push(charSpan);
        });
      } else if (type.includes("words") || type.includes("lines")) {
        const wordsArr = text.trim().split(/\s+/);
        wordsArr.forEach((w) => {
          const wordSpan = document.createElement("span");
          wordSpan.className = linesClass;
          wordSpan.style.display = "inline-block";
          wordSpan.style.marginRight = "0.25em";
          wordSpan.textContent = w;
          elem.appendChild(wordSpan);
          this.words.push(wordSpan);
        });
      }
    });
  }

  revert() {
    this.elements.forEach((elem) => {
      const orig = this.originalHTML.get(elem);
      if (orig !== undefined) elem.innerHTML = orig;
    });
  }
}
