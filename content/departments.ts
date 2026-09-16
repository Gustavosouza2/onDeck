const SEEDED = "2026-09-15";

export const departments = [
  {
    slug: "projecao",
    name: "Projeção",
    summary: "Letras e avisos na tela do templo",
    tool: "OpenLP",
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
          "Ligue primeiro o projetor, depois o computador. Confirme que a saída está em HDMI 2.",
        phase: "before",
      },
      {
        title: "Abrir o OpenLP no serviço do domingo",
        detail:
          "O arquivo do culto fica na área de trabalho, na pasta Culto. Abra o do domingo atual.",
        phase: "before",
        tool: "OpenLP",
      },
      {
        title: "Conferir a ordem dos louvores",
        detail:
          "Compare com a lista que o líder de louvor enviou no grupo. Se faltar alguma música, avise antes do ensaio acabar.",
        phase: "before",
      },
      {
        title: "Testar a tela dupla",
        detail:
          "Projete um slide de teste. A tela do operador mostra a prévia; a do templo, o slide atual.",
        phase: "before",
      },
      {
        title: "Subir o slide de boas-vindas",
        detail: "Deixe o slide de abertura no ar enquanto o povo entra.",
        phase: "before",
      },
      {
        title: "Acompanhar os louvores",
        detail:
          "Troque o slide uma linha antes de a banda cantar. Se repetirem o refrão, volte o slide.",
        phase: "service",
      },
      {
        title: "Projetar os versículos da pregação",
        detail:
          "O pregador avisa a referência. Digite no campo de busca bíblica e projete.",
        phase: "service",
      },
      {
        title: "Avisos e encerramento",
        detail:
          "Suba os slides de avisos, apague a tela e desligue o projetor antes do computador.",
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
        title: "Ligar o notebook e as câmeras",
        detail:
          "Conecte a captura USB antes de abrir o OBS, senão as cenas ficam sem sinal.",
        phase: "before",
      },
      {
        title: "Abrir o OBS no perfil “Culto”",
        detail:
          "Perfil Culto, coleção de cenas Domingo. Confirme as três cenas: Palco, Pregação e Avisos.",
        phase: "before",
        tool: "OBS Studio",
      },
      {
        title: "Checar o áudio da mesa",
        detail:
          "Peça um teste ao operador de som. O canal 3 é a saída da mesa; o pico deve ficar em torno de -12 dB.",
        phase: "before",
      },
      {
        title: "Criar a transmissão no YouTube",
        detail:
          "Título com data do culto, visibilidade pública, miniatura da semana. As credenciais da conta ficam com o líder da mídia.",
        phase: "before",
      },
      {
        title: "Iniciar a live e conferir o delay",
        detail: "Abra a live em outro aparelho para confirmar imagem e som.",
        phase: "before",
      },
      {
        title: "Trocar de cena conforme o momento",
        detail:
          "Palco no louvor, Pregação quando o pregador subir, Avisos no encerramento.",
        phase: "service",
      },
      {
        title: "Acompanhar o chat",
        detail: "Responda saudações e some o pedido de oração ao grupo da equipe.",
        phase: "service",
      },
      {
        title: "Encerrar a transmissão",
        detail:
          "Espere a bênção final, suba a cena de encerramento por 30 segundos e finalize.",
        phase: "closing",
      },
      {
        title: "Salvar a gravação",
        detail:
          "Copie o arquivo local para o HD da mídia e avise a equipe de vídeos.",
        phase: "closing",
      },
    ],
  },
  {
    slug: "fotos",
    name: "Fotos e Stories",
    summary: "Registro do culto em foto e story",
    tool: "Lightroom Mobile",
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
    tool: "Câmera Sony + tripé",
    toolNote: "Tripé da lateral direita · cabo HDMI 10 m até a mesa",
    intro:
      "Você dá o segundo ponto de vista da live. Chegue uns 40 minutos antes para montar o tripé sem pressa. Movimento lento, enquadramento estável: a imagem entra no ar sem aviso.",
    tint: "sky",
    motif: "camera2",
    icon: "video",
    updatedAt: SEEDED,
    steps: [
      {
        title: "Montar o tripé na lateral direita",
        detail:
          "Marque as pernas com a fita no chão para não atrapalhar a passagem.",
        phase: "before",
      },
      {
        title: "Conectar HDMI e energia",
        detail:
          "Passe o cabo pela borda da parede e prenda com fita. Nunca no meio do corredor.",
        phase: "before",
      },
      {
        title: "Confirmar sinal com a transmissão",
        detail: "Peça ao operador do OBS para checar a cena Câmera 2.",
        phase: "before",
      },
      {
        title: "Ajustar foco e enquadramento",
        detail: "Enquadre o púlpito com folga em cima. Foco manual, travado.",
        phase: "before",
      },
      {
        title: "Seguir o pregador com movimento lento",
        detail: "Só panorâmica suave. Nada de zoom durante a fala.",
        phase: "service",
      },
      {
        title: "Desmontar e guardar",
        detail:
          "Bateria no carregador, cabo enrolado em oito, tripé no armário da mídia.",
        phase: "closing",
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
        title: "Abrir o template da categoria",
        detail:
          "Aviso, série ou evento — cada um tem seu template na pasta da igreja.",
        phase: "week",
        tool: "Canva",
      },
      {
        title: "Aplicar o texto sem mudar a fonte",
        detail:
          "Se o texto não couber, reduza a quantidade de palavras, não o tamanho da fonte.",
        phase: "week",
      },
      {
        title: "Exportar nos três formatos",
        detail: "Feed 1080×1080, story 1080×1920 e projeção 1920×1080.",
        phase: "week",
      },
      {
        title: "Enviar para aprovação",
        detail: "Poste no grupo da mídia e aguarde o OK do líder antes de publicar.",
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
    tool: "Premiere Pro",
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
        tool: "Premiere Pro",
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
