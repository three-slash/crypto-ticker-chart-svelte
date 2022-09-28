declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    // Custom directives
    onclickOutside: () => void;
  }
}
