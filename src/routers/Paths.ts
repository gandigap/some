class Paths {
  private paths: Map<string, string>;
  readonly serverUrl: string;

  constructor() {
    this.paths = new Map([
      ['/', 'Home'],
      ['/about', 'About Us'],
      ['/forms', 'Forms'],
    ]);
    this.serverUrl = 'https://rickandmortyapi.com/api/character';
  }

  getPath = (path: string) => this.paths.get(path) || '404';

  getDatas = () => [...this.paths.entries()];
}

const paths = new Paths();

export { paths };
