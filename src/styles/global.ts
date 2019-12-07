import { css } from "@emotion/core"

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
    --color-secondary: #73737D;
    --color-grey: #73737D;
    --color-background: #fafafa;
    --color-accent: #6166DC;
    --color-hover: rgba(0, 0, 0, 0.07);
    --color-gradient: linear-gradient(180deg, rgba(217, 219, 224, 0) 0%, #D9DBE0 100%);
    --color-articleText: #08080B;
    --color-track: rgba(8, 8, 11, 0.3);
    --color-progress: #000;
    --color-card: #fff;
    --color-error: #EE565B;
    --color-success: #46B17B;
    --color-errorBackground: rgba(238, 86, 91, 0.1);
    --color-horizontalRule: rgba(8, 8, 11, 0.15);
    --color-inputBackground: rgba(0, 0, 0, 0.05);


    -ms-overflow-style: -ms-autohiding-scrollbar;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    cursor: default;
    font-size: 0.625rem;
    line-height: 1.4;
  }

  #dark {
    --color-primary: #eee;
    --color-grey: #73737D;
    --color-primary: #ddd;
    --color-secondary: #fff;
    --color-accent: #E9DAAC;
    --color-background: #111216;
    --color-hover: rgba(255, 255, 255, 0.07);
    --color-gradient: linear-gradient(180deg, #111216 0%, rgba(66, 81, 98, 0.36) 100%);
    --color-articleText: #fff;
    --color-track: rgba(255, 255, 255, 0.3);
    --color-progress: #fff;
    --color-card: #1D2128;
    --color-error: #EE565B;
    --color-success: #46B17B;
    --color-errorBackground: rgba(238, 86, 91, 0.1);
    --color-horizontalRule: rgba(255, 255, 255, 0.15);
    --color-inputBackground: rgba(255, 255, 255, 0.07);

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
    font-family: "FF Meta VF", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
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
    font-family: "FF Meta VF", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
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

    &[type="number"] {
      width: auto;
    }
  }

  img.Image__Zoom ~ div {
    background: transparent !important;
  }
`
