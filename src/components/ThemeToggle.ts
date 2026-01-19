export const ThemeToggle = `
  <div class="theme-toggle-container" x-data>
    <button 
      id="theme-toggle" 
      class="text-small font-medium font-mono hover:text-primary transition-colors"
      @click="$store.theme.toggle()"
      x-text="'[' + ($store.theme.current === 'dark' ? 'light' : 'dark') + ']'"
    >
      [dark]
    </button>
  </div>
`;
