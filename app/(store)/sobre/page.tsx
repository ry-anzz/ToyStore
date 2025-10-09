// src/app/(store)/sobre/page.tsx


const equipe = [
  { nome: 'Ryan Vicente', cargo: 'Front', imagemSrc: '/assets/ryan.jpg' },
  { nome: 'Guilherme Olivatto', cargo: 'Back', imagemSrc: '/assets/olivatto.jpg' },
   { nome: 'Rafael Willian', cargo: 'BD', imagemSrc: '/assets/willian.jpg' },
  { nome: 'Rafael Narciso', cargo: 'Slide', imagemSrc: '/assets/narciso.jpg' },
  { nome: 'Luiz Pegorari', cargo: '?', imagemSrc: '/assets/luiz.jpg' },
  { nome: 'Jonathan Zen', cargo: '?', imagemSrc: '/assets/zen.jpg' },
  { nome: 'Gustavo Alves', cargo: '?', imagemSrc: '/assets/gustavo.jpg' }
  
];

export default function SobrePage() {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Seção de Introdução (sem alterações) */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold text-slate-800">
          Nossa Missão é <span className="text-amber-500">Espalhar Alegria!</span>
        </h1>
        <p className="mt-6 text-lg text-slate-600 leading-relaxed">
          A BrinqueFeliz nasceu da paixão por brinquedos que despertam a imaginação. Acreditamos que brincar é a forma mais importante de aprender. Conheça a equipe de sonhadores que trabalha todos os dias para levar a melhor experiência até você.
        </p>
      </section>

      {/* Seção da Equipe */}
      <section className="mt-20">
        <h2 className="text-4xl font-bold text-center text-slate-800 mb-12">
          Conheça Nossos <span className="text-sky-600">Artesãos da Brincadeira</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {equipe.map((membro) => (
            <div key={membro.nome} className="flex flex-col items-center text-center group">
              <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg border-4 border-white transform group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
                {/* AQUI ESTÁ A MUDANÇA: Usamos a imagem local */}
                <img
                  src={membro.imagemSrc}
                  alt={`Foto de ${membro.nome}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-700">{membro.nome}</h3>
              <p className="text-sky-600 font-semibold">{membro.cargo}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}