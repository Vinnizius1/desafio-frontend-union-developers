export default function App() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '2.5rem', marginBottom: '1rem', background: 'linear-gradient(90deg, #FE012F 0%, #FE6B0C 88%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Desafio Técnico Frontend — Union Developers
      </h1>
      <p style={{ color: '#C3C3C3', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
        Ambiente configurado com React 19, Vite, TypeScript, SCSS Modules, TanStack Query e TDD com Jest & RTL.
      </p>
      <div style={{ backgroundColor: '#31323F', padding: '1rem 2rem', borderRadius: '12px', color: '#F4DF73', fontWeight: 600 }}>
        ⚡ Projeto Inicializado com Sucesso!
      </div>
    </main>
  );
}
