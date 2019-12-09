import { css } from '@emotion/core'

export const globalStyles = css`
  /**
   * Thanks to Benjamin De Cock
   * https://gist.github.com/bendc/ac03faac0bf2aee25b49e5fd260a727d
   */
  :root {
    --ease-in-quad: cubic-bezier(0.55, 0.085, 0.68, 0.53);
    --ease-in-quart: cubic-bezier(0.895, 0.03, 0.685, 0.22);
    --ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
    --ease-in-out-quad: cubic-bezier(0.455, 0.03, 0.515, 0.955);
    --ease-in-out-quart: cubic-bezier(0.77, 0, 0.175, 1);

    --color-primary: #333;
    --color-secondary: #73737d;
    --color-grey: #73737d;
    --color-background: #fafafa;
    --color-accent: #6166dc;
    --color-hover: rgba(0, 0, 0, 0.07);
    --color-gradient: linear-gradient(180deg, rgba(217, 219, 224, 0) 0%, #d9dbe0 100%);
    --color-articleText: #08080b;
    --color-track: rgba(8, 8, 11, 0.3);
    --color-progress: #000;
    --color-card: #fff;
    --color-error: #ee565b;
    --color-success: #46b17b;
    --color-errorBackground: rgba(238, 86, 91, 0.1);
    --color-horizontalRule: rgba(8, 8, 11, 0.15);
    --color-inputBackground: rgba(0, 0, 0, 0.05);
    --color-tooltip: #000;
    --color-tooltip-background: rgba(0, 0, 0, 0.1);

    -ms-overflow-style: -ms-autohiding-scrollbar;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    cursor: default;
    line-height: 1.4;
  }

  #dark {
    --color-primary: #eee;
    --color-grey: #73737d;
    --color-primary: #ddd;
    --color-secondary: #fff;
    --color-accent: #e9daac;
    --color-background: #111216;
    --color-hover: rgba(255, 255, 255, 0.07);
    --color-gradient: linear-gradient(180deg, #111216 0%, rgba(66, 81, 98, 0.36) 100%);
    --color-articleText: #fff;
    --color-track: rgba(255, 255, 255, 0.3);
    --color-progress: #fff;
    --color-card: #1d2128;
    --color-error: #ee565b;
    --color-success: #46b17b;
    --color-errorBackground: rgba(238, 86, 91, 0.1);
    --color-horizontalRule: rgba(255, 255, 255, 0.15);
    --color-inputBackground: rgba(255, 255, 255, 0.07);
    --color-tooltip: #fff;
    --color-tooltip-background: #000;

    color: var(--color-primary);
    background-color: var(--color-background);
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
    font-size: inherit;
    font-display: block;
  }

  body {
    min-height: 100vh;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
  }

  /* Remove list styles on ul, ol elements with a class attribute */
  ul[class],
  ol[class] {
    list-style: none;
  }

  /* A elements that don't have a class get default styles */
  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  /* Make images easier to work with */
  img {
    max-width: 100%;
    display: block;
  }

  /* Natural flow and rhythm in articles by default */
  article > * + * {
    margin-top: 1em;
  }

  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  /* Remove all animations and transitions for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  body {
    font-family: 'FF Meta VF', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 1.6rem;
    margin: 0;
    font-weight: 400;
    height: 100%;
  }

  button,
  a {
    text-decoration: none;
    cursor: pointer;
  }

  a:focus {
    outline: none;
  }

  audio,
  canvas,
  iframe,
  img,
  svg,
  video {
    vertical-align: middle;
  }

  input,
  textarea,
  select,
  button {
    font-family: 'FF Meta VF', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .underline {
    text-decoration: underline;
  }

  button,
  input,
  select,
  textarea {
    color: inherit;
    font-family: inherit;
    font-style: inherit;
    font-weight: inherit;
  }

  code,
  kbd,
  pre,
  samp {
    font-family: monospace;
  }

  fieldset,
  button {
    appearance: none;
    border: none;
    outline: none;
    background: transparent;
  }

  table {
    border-collapse: separate;
    border-spacing: 0;
  }

  audio:not([controls]) {
    display: none;
  }

  details {
    display: block;
  }

  input {
    &:focus,
    &:active {
      outline: none;
    }

    &[type='number'] {
      width: auto;
    }
  }

  img.Image__Zoom ~ div {
    background: transparent !important;
  }

  #progress,
  .Logo__Desktop {
    display: none;
  }
`
