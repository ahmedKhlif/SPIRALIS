import type * as React from "react";

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        "model-viewer": React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLElement>,
          HTMLElement
        > & {
          [key: string]: unknown;
          src?: string;
          alt?: string;
          poster?: string;
        };
      }
    }
  }
}

export {};
