const SEEDED = "2026-09-15";

type StepPhase = "before" | "service" | "closing" | "week";

type Step = {
  phase: StepPhase;
  detail?: string;
  title: string;
  tool?: string;
}

type Departments = {
  updatedAt: string;
  toolNote: string;
  summary: string;
  intro: string;
  motif: string;
  steps: Step[];
  slug: string;
  name: string;
  tool: string;
  tint: string;
  icon: string;
}

export const departments: Departments[] = [
  {
    slug: "projecao",
    name: "Projeção",
    summary: "Letras e avisos na tela do templo",
    tool: "Holyrics",
    toolNote: "Computador da projeção · serviço “Domingo” já salvo",
    intro:
      "Você controla o que a igreja vê na tela: letras dos louvores, versículos e avisos. Chegue uns 40 minutos antes para ligar tudo com calma. O segredo é acompanhar a banda e o pregador sem atrasar o slide.",
    tint: "lilac",
    motif: "projecao",
    icon: "monitor-play",
    updatedAt: SEEDED,
    steps: [
      {
        title: "Ligar o computador e o projetor",
        detail:
          "Ligue primeiro o projetor/luzes centrais no dijuntor, vai estar escrito Projetor e Luzes,  depois o computador. Confirme se o projetor realmente foi ligado",
        phase: "before",
      },
      {
        title: "Abrir o Holyrics no serviço do domingo",
        detail:
          "O programa Holyrics fica localizado na aréa de trabalho, se não estiver, procure na barra de pesquisa do Windows.",
        phase: "before",
        tool: "Holyrics",
      },
      {
        title: "Escreva a lista de louvores e conferir a ordem",
        detail:
          "Compare com a lista que o líder de louvor enviou no grupo. Se faltar alguma música, avise antes do ensaio acabar.",
        phase: "before",
      },
      {
        title: "Testar a TV de retorno",
        detail:
          "Projete um slide de teste. A TV de retorno mostra a prévia da letra; a do projetor, o slide atual.",
        phase: "before",
      },
      {
        title: "Cor do tema de fundo",
        detail: "Analise a cor da roupa da dança e altere o tema do fundo de acordo com a cor. Para fazer isso, verifique a lista de temas na direta e escolha um tema que combine com a cor da roupa.",
        phase: "before",
      },
      {
        title: "Acompanhar os louvores",
        detail:
          "Troque o slide uma linha antes de a banda cantar. Se repetirem o refrão, volte o slide.",
        phase: "service",
      },
      {
        title: "Anúncios",
        detail:
          "Na aba de imagens no holyrics, selecione os anúncios de acordo com a ordem de quem vai falar.",
        phase: "service",
      },
      {
        title: "Projetar os versículos da pregação",
        detail:
          "O pregador avisa a referência. Digite no campo de busca bíblica e projete.",
        phase: "service",
      },
      {
        title: "Finalizar o culto e desligar tudo",
        detail:
          "Depois que finalizar, desligue o computador, e a chave no dijuntor do projetor e das luzes centrais.",
        phase: "closing",
      },
    ],
  },
  {
    slug: "transmissao",
    name: "Transmissão",
    summary: "Live no YouTube do início ao fim",
    tool: "OBS Studio",
    toolNote: "Notebook da transmissão · perfil “Culto” + cenas prontas",
    intro:
      "A live é a igreja para quem não pôde vir. Chegue com uns 50 minutos de antecedência: é o departamento que mais depende de tempo de preparo. Sua meta é começar na hora, manter o áudio limpo e nunca deixar a tela preta.",
    tint: "citron",
    motif: "transmissao",
    icon: "radio",
    updatedAt: SEEDED,
    steps: [
      {
        title: "Ligar o computador",
        detail:
          "Ligue o computador da transmissão",
        phase: "before",
      },
      {
        title: "Abrir o OBS",
        detail:
          "Abra o OBS studio localizado na área de trabalho, se não estiver, procure na barra de pesquisa do Windows.",
        phase: "before",
        tool: "OBS Studio",
      },
      {
        title: "Celular da transmissão",
        detail:
          "Pegue o celular da transmissão na gaveta escrita Celular/Cabos, abra o aplicativo escrito Irium Webcam.",
        phase: "before",
      },
      {
        title: "Conectar Irium Webcam no OBS",
        detail:
          "Apenas abra o aplicativo Irium webcam no computador da transmissão, e verifique se o que esta sendo transmitido no celular, esta aparecendo no computador da transmissão.",
        phase: "before",
      },
      {
        title: "Posicionamento da câmera",
        detail: "Caminhe até o suporte da camera localizado na parede e encaixe o celular no suporte, depois, volte até o computador e verifique se esta posiconado corretamente, caso não esteja, ajuste a posição da câmera.",
        phase: "before",
      },
      {
        title: "Áudio transmissão",
        detail:
          "Conecte um fone no aparelho de áudio na parte de out e verifique se o som da live esta bom",
        phase: "before",
      },
      {
        title: "Gerenciar transmissão",
        detail: "Clique em gerenciar transmissão, depois altere o titulo para o culto do dia, e altere a tumbnail para a imagem correta, por exemplo, se for culto de Santa Ceia, escreva Santa Ceia e a Data, depois altere a imagem para a imagem correta, que esta localizada na pasta de imagens do computador da transmissão.",
        phase: "before",
      },
      {
        title: "Iniciar transmissão",
        detail:
          "Quando faltar 5 minutos para o inicio do culto, clique em inciar transmissão, e verifique se a transmissão esta funcionando corretamente. Depois disso, entre no youtube pelo seu celular e mande o link da transmissão para o grupo da igreja.",
        phase: "service",
      },
      {
        title: "Passar para cena",
        detail:
          "Depois que a contagem regressiva terminar, selecione a camera principal no OBS, e clique em esmaecer para passar a camera para o ao vivo.",
        phase: "service",
      },
      {
        title: "Finalizar transmissão",
        detail:
          "Assim que o pastor der a benção final, clique em esmaecer para passar a imagem Culto Online, e depois encerre a transmissão, e desligue o computador da transmissão.",
        phase: "closing",
      },
    ],
  },
  {
    slug: "fotos",
    name: "Fotos e Stories",
    summary: "Registro do culto em foto e story",
    tool: "Capcut",
    toolNote: "Celular da mídia · preset “Culto” já instalado",
    intro:
      "Fotos contam a história do culto. Pegue o celular da mídia uns 20 minutos antes. Busque rostos, mãos levantadas e detalhes — e poste os stories ainda durante o culto.",
    tint: "coral",
    motif: "fotos",
    icon: "camera",
    updatedAt: SEEDED,
    steps: [
      {
        title: "Pegar o celular da mídia e conferir bateria",
        detail: "Mínimo de 70%. Leve o carregador na mochila.",
        phase: "before",
      },
      {
        title: "Limpar a lente e liberar espaço",
        detail:
          "Apague os vídeos antigos já enviados. Deixe pelo menos 8 GB livres.",
        phase: "before",
      },
      {
        title: "Fotografar o louvor",
        detail:
          "Fique nas laterais, nunca de costas para a congregação. Sem flash.",
        phase: "service",
      },
      {
        title: "Postar o primeiro story",
        detail: "Um clipe curto do louvor com a localização da igreja.",
        phase: "service",
      },
      {
        title: "Registrar a pregação e a congregação",
        detail:
          "Duas ou três fotos do pregador e uma panorâmica de quem ouve.",
        phase: "service",
      },
      {
        title: "Editar e enviar as selecionadas",
        detail:
          "Aplique o preset Culto, escolha as 10 melhores e suba na pasta do Drive do domingo.",
        phase: "closing",
        tool: "Lightroom Mobile",
      },
    ],
  },
  {
    slug: "camera2",
    name: "Câmera Secundária",
    summary: "Segundo ângulo para a transmissão",
    tool: "Irium Webcam",
    toolNote: "Baixar aplicativo Irium Webcam no celular (Android ou IOS)",
    intro:
      "Você dá o segundo ponto de vista da live. Movimento lento, enquadramento estável: a imagem entra no ar com aviso do operador do OBS.",
    tint: "sky",
    motif: "camera2",
    icon: "video",
    updatedAt: SEEDED,
    steps: [
      {
        title: "Baixar Irium Webcam",
        detail:
          "Depois de baixar o aplicativo, certifique-se de que esta conectado na mesma rede Wi-Fi do computador da transmissão, pois só assim o Irium funcionará corretamente.",
        phase: "before",
      },
      {
        title: "Transmitir Segunda Câmera",
        detail:
          "Abra o app, e pergunte para o operador do OBS se a segunda câmera esta aparecendo no computador da transmissão.",
        phase: "service",
      },
      {
        title: "Ajustar foco e enquadramento",
        detail: "Enquadre corretamente. Ajuste o foco, sempre se comunique com o operador do OBS para que ele avise se a imagem esta boa ou não.",
        phase: "service",
      },
    ],
  },
  {
    slug: "banner",
    name: "Criação de Banner",
    summary: "Artes dos avisos e da série",
    tool: "Canva",
    toolNote: "Conta da igreja · pasta “Templates OnDeck”",
    intro:
      "Toda arte sai dos templates da igreja. O trabalho acontece ao longo da semana, da terça à sexta. Você não inventa a identidade: você aplica com cuidado e entrega no prazo.",
    tint: "mint",
    motif: "banner",
    icon: "pen-tool",
    updatedAt: SEEDED,
    steps: [
      {
        title: "Receber o pedido no grupo",
        detail:
          "Confirme texto, data, horário e local antes de começar. Sem essas quatro coisas, não abra o Canva.",
        phase: "week",
      },
      {
        title: "Pesquisar inspirações",
        detail:
          "Pesquise no behance, dribbble e pinterest inspirações para o design, pesquise por nomes como Church Design, Church Poster, Church Banner, Church Flyer, Church Social Media, Church Branding.",
        phase: "week",
        tool: "Canva",
      },
      {
        title: "Iniciar o design",
        detail:
          "Abra o Canva, escolha o template correto e aplique a identidade da igreja. Não invente cores, fontes ou elementos.",
        phase: "week",
      },
      {
        title: "Aplicar identidade da igreja",
        detail:
          "Aplique a paleta de cores, fontes e elementos da identidade visual da igreja. E crie um design que faça sentido com o pedido, e que seja legível e atraente.",
        phase: "week",
      },
      {
        title: "Exportar em dois formatos",
        detail: "Story 1080×1920 e projeção 1920×1080.",
        phase: "week",
      },
      {
        title: "Enviar para aprovação",
        detail: "Poste no grupo da mídia e aguarde o OK do líder antes de tudo.",
        phase: "week",
      },
      {
        title: "Subir na pasta do Drive",
        detail: "Pasta do mês, nome no formato data-assunto.",
        phase: "week",
      },
    ],
  },
  {
    slug: "videos",
    name: "Vídeos",
    summary: "Cortes e reels da semana",
    tool: "Capcut",
    toolNote: "Computador da edição · projeto “Reels Semana”",
    intro:
      "Da gravação do domingo saem os cortes da semana. O trabalho começa no domingo à noite e vai até quinta. Escolha momentos que fazem sentido sozinhos, sem contexto.",
    tint: "rose",
    motif: "videos",
    icon: "film",
    updatedAt: SEEDED,
    steps: [
      {
        title: "Copiar a gravação do HD da mídia",
        detail: "Pasta do domingo, arquivo completo da transmissão.",
        phase: "week",
      },
      {
        title: "Assistir e marcar os momentos",
        detail:
          "Anote os tempos de três trechos de até 60 segundos que se entendem sozinhos.",
        phase: "week",
      },
      {
        title: "Montar os cortes no projeto da semana",
        detail: "Formato vertical 1080×1920, legenda sempre ligada.",
        phase: "week",
        tool: "Capcut",
      },
      {
        title: "Conferir áudio e legenda",
        detail:
          "Áudio normalizado, legenda revisada palavra por palavra. Erro de legenda é o que mais aparece.",
        phase: "week",
      },
      {
        title: "Exportar e enviar para aprovação",
        detail: "H.264, alta qualidade. Poste no grupo da mídia.",
        phase: "week",
      },
      {
        title: "Publicar conforme o calendário",
        detail: "Um corte por dia, sempre às 19h.",
        phase: "week",
      },
    ],
  },
];
