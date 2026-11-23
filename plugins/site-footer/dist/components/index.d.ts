import { QuartzComponent } from '@quartz-community/types';

interface FooterOptions {
    links: Record<string, string>;
    /**
     * Extra text shown in the footer, below the "Created with Quartz" line. HTML is allowed
     * (e.g. `'Licensed under <a href="/license">CC BY 4.0</a>'`).
     */
    message?: string;
}
declare const _default: (opts?: FooterOptions) => QuartzComponent;

export { _default as Footer, type FooterOptions };
