import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowDownRight, ArrowRight, Check, ChevronRight, Gamepad2, Globe2, Monitor,
  MonitorCog, MousePointer2, Plus, Settings2, ShieldCheck, Tv, Workflow, Zap,
} from 'lucide-react';

const CONTACT_CONFIG = { whatsappPhone: '5561982842144' };
const whatsappLink = (message: string) =>
  `https://wa.me/${CONTACT_CONFIG.whatsappPhone}?text=${encodeURIComponent(message)}`;

const painPoints = [
  'PCs de um lado, simuladores de outro — e fornecedores que não conversam entre si.',
  'A logística de transporte, montagem e retirada ocupando a semana do evento.',
  'Uma atração diferente para planejar, sem saber como dimensionar equipamento e espaço.',
  'Dúvidas sobre o que está incluso, quanto custa e quem acompanha a operação.',
];

const steps = [
  { title: 'Você conta o que precisa', body: 'Perfil do evento, espaço, público e data.' },
  { title: 'A gente dimensiona', body: 'Equipamentos e estrutura para o seu caso.' },
  { title: 'Você recebe o orçamento', body: 'Escopo, prazo, custo e entregas definidos antes de fechar.' },
  { title: 'A gente leva e monta', body: 'Transporte, logística e montagem das estruturas.' },
  { title: 'A gente acompanha', body: 'Suporte operacional durante o evento, conforme o contrato.' },
  { title: 'A gente desmonta e recolhe', body: 'Retirada e devolução controladas, sem pendência para você.' },
];

const equipment = [
  { label: 'PCs gamers, consoles e controles', icon: Gamepad2 },
  { label: 'Monitores, TVs e periféricos', icon: Tv },
  { label: 'Simuladores de corrida', icon: Settings2 },
  { label: 'Experiências de realidade virtual', icon: MousePointer2 },
  { label: 'Estruturas para atividades gamer', icon: Monitor },
  { label: 'Produção e operação de eventos', icon: Workflow },
];

const benefits = [
  'Você fala com um fornecedor só, em vez de coordenar vários.',
  'Você sabe o que está incluso e quanto custa antes de assinar.',
  'Você ganha uma atração que dá o que falar, sem precisar entender de equipamento.',
  'Você não perde a semana do evento resolvendo transporte e montagem.',
  'Você tem equipe acompanhando a operação, conforme o contrato.',
  'O projeto é dimensionado para o seu espaço e seu público, não um pacote genérico.',
];

const faqs = [
  {
    q: 'Que tipo de evento a LinkerLoc atende?',
    a: 'Eventos que precisam de equipamentos, tecnologia e experiências interativas: ações promocionais, eventos corporativos, espaços gamer e outros projetos. Conte o que você está planejando para dimensionar a solução.',
  },
  {
    q: 'Como funciona o orçamento?',
    a: 'É sob medida. Você conta sobre o evento e recebe uma proposta com escopo, prazo e custo. O investimento depende dos equipamentos, da duração e do local.',
  },
  {
    q: 'A LinkerLoc monta e desmonta tudo?',
    a: 'Transporte, montagem e desmontagem das estruturas contratadas fazem parte do projeto.',
  },
  {
    q: 'Tem equipe acompanhando durante o evento?',
    a: 'O acompanhamento operacional e o suporte seguem o que for combinado em contrato.',
  },
  {
    q: 'Quais equipamentos podem entrar no projeto?',
    a: 'PCs gamers, consoles, controles, monitores, TVs, periféricos, simuladores de corrida e experiências de realidade virtual. A disponibilidade depende da data.',
  },
  {
    q: 'A LinkerLoc também faz sites e sistemas?',
    a: 'Sim. A LinkerLoc também desenvolve sites, sistemas de reservas, automações de atendimento e soluções de IA para empresas.',
  },
];

function useScrollReveals() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function App() {
  useScrollReveals();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [feedback, setFeedback] = useState('');

  const handleBriefing = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const briefing = [
      'Olá! Quero conversar sobre tecnologia para um evento.',
      `Nome: ${String(data.get('name') ?? '')}`,
      `Data do evento: ${String(data.get('date') ?? '') || 'A definir'}`,
      `Espaço / local: ${String(data.get('place') ?? '') || 'A definir'}`,
      `O que estou planejando: ${String(data.get('details') ?? '') || 'Quero entender as possibilidades.'}`,
    ].join('\n');

    if (CONTACT_CONFIG.whatsappPhone) {
      window.open(whatsappLink(briefing), '_blank', 'noopener,noreferrer');
      setFeedback('Seu briefing está pronto para enviar pelo WhatsApp.');
      return;
    }
    try {
      await navigator.clipboard.writeText(briefing);
      setFeedback('Briefing copiado. Agora é só colar no seu canal de contato com a LinkerLoc.');
    } catch {
      setFeedback('Não foi possível copiar automaticamente. Selecione e copie os dados do briefing para compartilhar.');
    }
  };

  return (
    <main>
      <header className="nav-shell">
        <div className="wrap nav">
          <a className="brand" href="#inicio" aria-label="LinkerLoc, início" data-testid="link-home">
            <img src="/images/logo-linkerloc.jpeg" alt="LinkerLoc — Tecnologia que impulsiona seu negócio" />
          </a>
          <nav className="nav-links" aria-label="Navegação principal">
            <a href="#solucao">Como funciona</a>
            <a href="#experiencias">Experiências</a>
            <a href="#digital">Soluções digitais</a>
            <a href={whatsappLink('Olá! Quero um orçamento para o meu evento.')} target="_blank" rel="noreferrer" className="button button-orange" data-testid="link-nav-orcamento">Pedir orçamento <ArrowRight size={15} /></a>
          </nav>
        </div>
      </header>
      <section className="hero" id="inicio">
        <div className="hero-art" aria-hidden="true">
          <img src="/images/pc-gamer-eventos.jpeg" alt="" />
          <div className="hero-art-shade" />
        </div>
        <div className="wrap">
          <div className="hero-content">
            <div className="hero-copy">
              <div className="eyebrow reveal">Tecnologia que move o seu evento</div>
              <h1 className="display reveal reveal-delay-1">Um fornecedor só para a <span>tecnologia</span> do seu evento.</h1>
              <p className="hero-lead reveal reveal-delay-2">A LinkerLoc cuida de tudo: equipamento, transporte, montagem, operação e desmontagem. Você organiza o evento e a gente entrega a tecnologia funcionando.</p>
              <div className="hero-actions reveal reveal-delay-3">
                <a className="button button-orange" href={whatsappLink('Olá! Quero tecnologia para o meu evento.')} target="_blank" rel="noreferrer" data-testid="link-hero-orcamento">Quero tecnologia no meu evento <ArrowRight size={17} /></a>
                <a className="button button-outline" href="#solucao" data-testid="link-como-funciona">Veja como funciona <ArrowDownRight size={16} /></a>
              </div>
              <p className="micro reveal reveal-delay-3">Orçamento sob medida · Sem pacote engessado</p>
            </div>
            <div className="hero-mark" aria-hidden="true"><div className="hero-mark-inner" /></div>
            <div className="hero-stamp reveal">
              <strong>01</strong><span>operação integrada, do planejamento à retirada</span>
            </div>
          </div>
        </div>
        <div className="scroll-cue">Role para descobrir</div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((group) => <span key={group}>PC GAMER <i /> SIMULADORES <i /> REALIDADE VIRTUAL <i /> EVENTOS COMPLETOS <i /> UM FORNECEDOR SÓ <i /></span>)}
        </div>
      </div>

      <section className="section-pad">
        <div className="wrap intro">
          <div className="reveal">
            <div className="eyebrow">Uma operação, do começo ao fim</div>
            <h2 className="display">A tecnologia vira atração. A logística fica com a gente.</h2>
          </div>
          <div className="intro-copy reveal reveal-delay-1">
            <p>Quem organiza evento sabe: a atração tecnológica é o que faz o público <strong>parar, jogar, filmar e voltar.</strong></p>
            <p>Mas contratar PC gamer de um lado, simulador de outro, VR de um terceiro e ainda coordenar transporte e montagem vira dor de cabeça.</p>
            <p><strong className="copy-highlight">A LinkerLoc junta tudo em uma operação só.</strong> Você conta o que o evento precisa e recebe um projeto sob medida.</p>
          </div>
        </div>
      </section>

      <section className="dark-band section-pad">
        <div className="wrap">
          <div className="pain-head reveal">
            <div>
              <div className="eyebrow">Sem juntar peças no improviso</div>
              <h2 className="section-title display">Mais evento.<br />Menos coordenação.</h2>
            </div>
            <p>Montar a estrutura tecnológica costuma dar mais trabalho do que parece. Um projeto integrado simplifica a conversa, o escopo e a operação.</p>
          </div>
          <div className="pain-list">
            {painPoints.map((item, index) => (
              <div className={`pain-item reveal reveal-delay-${index % 2 + 1}`} key={item}>
                <span className="num">0{index + 1}</span><p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="solution section-pad" id="solucao">
        <div className="wrap">
          <div className="solution-heading reveal">
            <div>
              <div className="eyebrow">O Evento Completo LinkerLoc</div>
              <h2 className="section-title display">Um projeto.<br />Um responsável. Uma operação.</h2>
            </div>
            <p>Você acompanha cada decisão com escopo claro — sem pacote genérico e sem deixar ponta solta.</p>
          </div>
          <div className="steps">
            {steps.map((step, index) => (
              <article className={`step reveal reveal-delay-${index % 3 + 1}`} key={step.title}>
                <span className="step-no">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
          <div className="equipment-band reveal">
            <div className="equipment-copy">
              <div className="eyebrow">Escolha por projeto</div>
              <h3 className="display">O que pode entrar no seu evento</h3>
              <p>Uma composição pensada para o espaço, o público e a experiência que você quer criar.</p>
            </div>
            <div className="equipment-list">
              {equipment.map(({ label, icon: Icon }) => (
                <div className="equipment" key={label}><Icon size={21} strokeWidth={1.8} /><span>{label}</span></div>
              ))}
            </div>
          </div>
          <div className="quote-row reveal">
            <p>O orçamento detalha escopo, prazo, custo e entregas antes de fechar.</p>
            <a className="button button-orange" href={whatsappLink('Olá! Quero conversar sobre tecnologia para o meu evento.')} target="_blank" rel="noreferrer" data-testid="link-solucao-orcamento">Conversar sobre meu evento <ArrowRight size={16} /></a>
          </div>
        </div>
      </section>

      <section className="gallery-section section-pad" id="experiencias">
        <div className="wrap">
          <div className="gallery-header reveal">
            <div><div className="eyebrow">Experiências que chamam para perto</div><h2 className="section-title display">Tecnologia que<br />entra em cena.</h2></div>
            <p>Gaming, simuladores e produção de eventos para criar um espaço interativo e memorável.</p>
          </div>
          <div className="gallery-grid">
            <article className="gallery-card reveal">
              <img src="/images/producao-eventos.jpeg" alt="Estrutura LinkerLoc de produção de eventos com iluminação, palco e estações gamer" />
              <div className="gallery-label"><span>Estrutura & operação</span><h3>Produção de eventos</h3></div>
            </article>
            <article className="gallery-card reveal reveal-delay-1">
              <img src="/images/simuladores-corrida.jpeg" alt="Cockpit e telas de simulador de corrida em ambiente de evento" />
              <div className="gallery-label"><span>Experiência imersiva</span><h3>Simuladores de corrida</h3></div>
            </article>
            <article className="gallery-card reveal reveal-delay-2">
              <img src="/images/pc-gamer-eventos.jpeg" alt="Estação de PC gamer montada para eventos" />
              <div className="gallery-label"><span>Setup gamer</span><h3>PC gamer para eventos</h3></div>
            </article>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="wrap features">
          <div className="reveal">
            <div className="eyebrow">O que muda para você</div>
            <h2 className="section-title display">Mais clareza antes. Mais tranquilidade no dia.</h2>
          </div>
          <div className="feature-lines">
            {benefits.map((benefit, index) => (
              <div className={`feature-line reveal reveal-delay-${index % 3 + 1}`} key={benefit}>
                <Check size={18} /><p>{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="digital section-pad" id="digital">
        <div className="wrap digital-inner">
          <div className="reveal">
            <div className="eyebrow">Uma segunda frente LinkerLoc</div>
            <h2 className="section-title display">Seu negócio também precisa de tecnologia?</h2>
            <p>Além dos eventos, a LinkerLoc desenvolve soluções digitais para empresas. Sites e sistemas sob medida para apoiar a operação do seu negócio.</p>
            <a className="button button-orange" href={whatsappLink('Olá! Quero conversar sobre uma solução digital para a minha empresa.')} target="_blank" rel="noreferrer" data-testid="link-digital-contato">Falar sobre uma solução digital <ArrowRight size={16} /></a>
          </div>
          <div className="digital-list reveal reveal-delay-1">
            <div><Globe2 size={19} /> Desenvolvimento de sites</div>
            <div><MonitorCog size={19} /> Sistemas de reservas</div>
            <div><Workflow size={19} /> Automação de atendimento</div>
            <div><Zap size={19} /> Soluções de IA</div>
          </div>
        </div>
      </section>

      <section className="offer section-pad">
        <div className="wrap offer-grid">
          <div className="offer-copy reveal">
            <div className="eyebrow">Orçamento sob medida</div>
            <h2 className="display">Sem pacote engessado.<br />Sem preço genérico.</h2>
            <p>O investimento depende dos equipamentos, da duração e do local. Você recebe uma proposta com escopo, prazo, custo e responsabilidades — e só fecha se estiver claro.</p>
            <a className="button button-orange" href={whatsappLink('Olá! Quero um orçamento sob medida para o meu evento.')} target="_blank" rel="noreferrer" data-testid="link-oferta-orcamento">Pedir um projeto sob medida <ArrowRight size={16} /></a>
          </div>
          <div className="reveal reveal-delay-1">
            <div className="offer-list">
              {[
                'Equipamentos dimensionados para o seu evento',
                'Transporte e logística',
                'Montagem e desmontagem',
                'Acompanhamento operacional, conforme o contrato',
                'Retirada e devolução dos equipamentos',
              ].map((item, index) => (
                <div className="offer-row" key={item}><span>0{index + 1}</span><span>{item}</span><ChevronRight size={17} /></div>
              ))}
            </div>
            <div className="clarity"><ShieldCheck size={19} /><span>Escopo, responsabilidades, prazos e custos definidos por escrito. Acompanhamento conforme o contrato.</span></div>
          </div>
        </div>
      </section>

      <section className="faq section-pad">
        <div className="wrap faq-grid">
          <div className="reveal">
            <div className="eyebrow">Antes de conversar</div>
            <h2 className="section-title display">Dúvidas que podem surgir.</h2>
            <p style={{ color: 'var(--muted-ink)', lineHeight: 1.7, maxWidth: 370 }}>O projeto começa pelo que você precisa. Se ainda está descobrindo, a conversa também ajuda a dimensionar.</p>
          </div>
          <div className="faq-list reveal reveal-delay-1">
            {faqs.map((item, index) => (
              <div className="faq-item" key={item.q}>
                <button className="faq-question" aria-expanded={openFaq === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpenFaq(openFaq === index ? null : index)} data-testid={`button-faq-${index}`}>
                  <span>{item.q}</span><Plus size={17} />
                </button>
                <div id={`faq-answer-${index}`} className={`faq-answer ${openFaq === index ? 'open' : ''}`} aria-hidden={openFaq !== index}>
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact section-pad" id="contato">
        <div className="wrap contact-inner">
          <div className="reveal">
            <div className="eyebrow">Vamos tirar do papel?</div>
            <h2 className="display">Seu próximo evento começa com uma boa conversa.</h2>
            <p className="contact-copy">Conte a data, o espaço e o tipo de experiência que imaginou. A LinkerLoc prepara uma proposta dimensionada para o seu evento.</p>
            <p className="contact-note">Orçamento sob medida · Sem compromisso</p>
          </div>
          <form className="briefing reveal reveal-delay-1" onSubmit={handleBriefing}>
            <h3>Comece pelo seu evento</h3>
            <input name="name" aria-label="Seu nome" placeholder="Seu nome" required data-testid="input-contato-nome" />
            <input name="date" aria-label="Data do evento" placeholder="Data do evento (se já souber)" data-testid="input-contato-data" />
            <input name="place" aria-label="Espaço ou local" placeholder="Espaço / local (se já souber)" data-testid="input-contato-local" />
            <textarea name="details" aria-label="Conte sobre o que está planejando" placeholder="O que você está planejando?" data-testid="input-contato-detalhes" />
            <button className="button" type="submit" data-testid="button-preparar-briefing">
              {CONTACT_CONFIG.whatsappPhone ? 'Continuar pelo WhatsApp' : 'Preparar meu briefing'} <ArrowRight size={16} />
            </button>
            <p className="briefing-feedback" role="status" aria-live="polite">{feedback}</p>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap footer-inner">
          <a href="#inicio" aria-label="Voltar ao início"><img src="/images/logo-linkerloc.jpeg" alt="LinkerLoc" /></a>
          <span>Tecnologia que impulsiona seu negócio.</span>
          <a href="#inicio">Voltar ao topo ↑</a>
        </div>
      </footer>
    </main>
  );
}

export default App;
