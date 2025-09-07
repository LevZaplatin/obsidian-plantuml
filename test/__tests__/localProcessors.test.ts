import { LocalProcessors } from '../../src/processors/localProcessors';

class FakeReplacer { getFullPath(_: string) { return 'C:/vault'; } }
class FakePlugin {
  settings = {
      localJar: 'C:/Program Files/plantuml.jar',
      javaPath: 'C:/Program Files/Java/bin/java.exe',
      dotPath: 'C:/Program Files/Graphviz/bin/dot.exe',
  };
  replacer = new FakeReplacer();
}

describe('LocalProcessors resolveLocalJarCmd', () => {
  test('wraps java path in quotes when jar specified', () => {
    const lp: any = new LocalProcessors(new FakePlugin() as any);
    const args = lp["resolveLocalJarCmd"]();
    // First element should be quoted java path
    expect(args[0]).toBe('"C:/Program Files/Java/bin/java.exe"');
    // Contains -jar and quoted jar path
    expect(args).toContain('-jar');
    expect(args).toContain('"C:/Program Files/plantuml.jar"');
    // Contains graphviz with quoted path
    expect(args).toContain('-graphvizdot');
    expect(args).toContain('"C:/Program Files/Graphviz/bin/dot.exe"');
  });

  test('supports non-jar command path unchanged', () => {
    const plugin: any = new FakePlugin();
    plugin.settings.localJar = 'plantuml';
    const lp: any = new LocalProcessors(plugin);
    const args = lp["resolveLocalJarCmd"]();
    expect(args[0].replace(/\\/g, '/')).toBe('"C:/vault/plantuml"');
  });
});
