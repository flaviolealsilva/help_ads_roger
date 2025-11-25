import { Module, QuestionType } from './types';

export const modules: Module[] = [
  {
    id: 'mod1',
    title: 'Fundamentos & Organização',
    description: 'Dados vs. Informação, Níveis Organizacionais e o Papel do Analista.',
    icon: 'Building',
    color: 'bg-blue-500',
    summary: [
      'Dados: Elementos brutos (textos, números). Informação: Dados processados com contexto.',
      'Sistema de Informação (SI): Entrada -> Processamento -> Saída -> Feedback.',
      'Níveis Decisórios: Estratégico (Alta direção/Longo prazo), Tático (Gerência/Médio prazo), Operacional (Rotina/Curto prazo).',
      'O Analista de Sistemas: Resolve problemas de negócio usando tecnologia.'
    ],
    questions: [
      {
        id: 'q1_1',
        type: QuestionType.MULTIPLE_CHOICE,
        question: 'A Fábrica Nacional de Peças precisa decidir se abre uma nova filial em outro estado (decisão de longo prazo). Qual nível organizacional é responsável por esta decisão?',
        options: [
          { id: 'a', text: 'Nível Operacional', isCorrect: false },
          { id: 'b', text: 'Nível Tático', isCorrect: false },
          { id: 'c', text: 'Nível Estratégico', isCorrect: true },
          { id: 'd', text: 'Nível de Suporte', isCorrect: false }
        ],
        explanation: 'O Nível Estratégico (Alta direção) define metas, lucratividade e caminhos do negócio a longo prazo.'
      },
      {
        id: 'q1_2',
        type: QuestionType.DRAG_DROP, // Simulated via selection
        question: 'Classifique os itens abaixo como DADO ou INFORMAÇÃO:',
        context: 'Cenário: Relatório de Vendas',
        options: [
          { id: 'a', text: 'O número solto "4500"', category: 'DADO', isCorrect: true },
          { id: 'b', text: 'Gráfico de "Vendas por Região em 2025"', category: 'INFORMAÇÃO', isCorrect: true },
          { id: 'c', text: 'Lista de CPFs sem contexto', category: 'DADO', isCorrect: true },
          { id: 'd', text: 'Relatório de clientes inadimplentes', category: 'INFORMAÇÃO', isCorrect: true }
        ],
        explanation: 'Dados são brutos. Informação é o dado processado que gera conhecimento para tomada de decisão.'
      }
    ]
  },
  {
    id: 'mod2',
    title: 'Ciclo de Vida & Métodos',
    description: 'Waterfall, Ágil (Scrum) e as etapas de desenvolvimento.',
    icon: 'RefreshCw',
    color: 'bg-emerald-500',
    summary: [
      'Ciclo de Vida: Planejamento -> Análise -> Projeto -> Implementação -> Testes -> Implantação -> Manutenção.',
      'Waterfall (Cascata): Sequencial, rígido, muita documentação inicial.',
      'Iterativo/Incremental: O sistema cresce em partes funcionais.',
      'Ágil (Scrum): Sprints curtas, feedback constante, adaptabilidade a mudanças.'
    ],
    questions: [
      {
        id: 'q2_1',
        type: QuestionType.MULTIPLE_CHOICE,
        question: 'Você foi contratado para um projeto onde os requisitos mudam constantemente e o cliente precisa de entregas rápidas de valor. Qual metodologia é mais indicada?',
        options: [
          { id: 'a', text: 'Waterfall (Cascata)', isCorrect: false },
          { id: 'b', text: 'Ágil (Scrum)', isCorrect: true },
          { id: 'c', text: 'Prototipagem Descartável', isCorrect: false }
        ],
        explanation: 'Métodos ágeis são ideais para ambientes instáveis e necessidade de feedback rápido (Sprints).'
      },
      {
        id: 'q2_2',
        type: QuestionType.TRUE_FALSE,
        question: 'Na fase de "Projeto" (Design), o foco é escrever o código fonte final da aplicação.',
        options: [
          { id: 'true', text: 'Verdadeiro', isCorrect: false },
          { id: 'false', text: 'Falso', isCorrect: true }
        ],
        explanation: 'Falso. A fase de Projeto define "como" o sistema será (arquitetura, interfaces, banco de dados). A codificação ocorre na fase de Implementação.'
      }
    ]
  },
  {
    id: 'mod3',
    title: 'Engenharia de Requisitos',
    description: 'Funcionais, Não-Funcionais e Técnicas de Elicitação.',
    icon: 'ListChecks',
    color: 'bg-amber-500',
    summary: [
      'Requisito Funcional (RF): O que o sistema faz (ex: Calcular folha de pagamento).',
      'Requisito Não-Funcional (RNF): Como o sistema é (Qualidade, Segurança, Performance, ex: O sistema deve responder em 2s).',
      'Técnicas: Entrevistas (qualitativa), Questionários (quantitativa/geográfica), Etnografia (observação cultural), Prototipação (visualização).'
    ],
    questions: [
      {
        id: 'q3_1',
        type: QuestionType.MULTIPLE_CHOICE,
        question: 'Analise o requisito da Farmácia: "O sistema deve permitir consultar o estoque pelo código de barras". Que tipo de requisito é este?',
        options: [
          { id: 'a', text: 'Requisito Não-Funcional', isCorrect: false },
          { id: 'b', text: 'Requisito Funcional', isCorrect: true },
          { id: 'c', text: 'Regra de Negócio Externa', isCorrect: false }
        ],
        explanation: 'É funcional porque descreve uma tarefa/serviço que o sistema executa.'
      },
      {
        id: 'q3_2',
        type: QuestionType.MULTIPLE_CHOICE,
        question: 'Para entender a cultura de trabalho e rotinas ocultas dos funcionários do almoxarifado, qual a melhor técnica?',
        options: [
          { id: 'a', text: 'Questionário Online', isCorrect: false },
          { id: 'b', text: 'Análise de Documentos', isCorrect: false },
          { id: 'c', text: 'Estudo Etnográfico (Observação)', isCorrect: true }
        ],
        explanation: 'A etnografia/observação permite ver o que as pessoas realmente fazem, não apenas o que dizem fazer.'
      }
    ]
  },
  {
    id: 'mod4',
    title: 'Análise Estruturada (DFD)',
    description: 'Modelando o fluxo da informação e processos.',
    icon: 'GitMerge',
    color: 'bg-purple-500',
    summary: [
      'Foco: Processos e Fluxo de Dados.',
      'DFD (Diagrama de Fluxo de Dados): Mapa lógico de como o dado viaja.',
      'Elementos do DFD: Processo (transforma), Entidade Externa (origem/destino), Depósito de Dados (armazenamento), Fluxo (setas).',
      'Fluxograma: Representa a lógica de decisão e sequência (Losangos para decisão).'
    ],
    questions: [
      {
        id: 'q4_1',
        type: QuestionType.MULTIPLE_CHOICE,
        question: 'No DFD, o que representa um "Retângulo aberto em um dos lados" (ou duas linhas paralelas)?',
        options: [
          { id: 'a', text: 'Um Processo', isCorrect: false },
          { id: 'b', text: 'Uma Entidade Externa', isCorrect: false },
          { id: 'c', text: 'Um Depósito de Dados', isCorrect: true }
        ],
        explanation: 'O depósito de dados é onde a informação repousa (ex: Arquivo, Tabela).'
      },
      {
        id: 'q4_2',
        type: QuestionType.MULTIPLE_CHOICE,
        question: 'Qual a principal diferença entre DFD e Fluxograma?',
        options: [
          { id: 'a', text: 'O DFD mostra a lógica de decisão (se/então), o Fluxograma não.', isCorrect: false },
          { id: 'b', text: 'O DFD foca no movimento dos dados; o Fluxograma foca na sequência de controle e decisão.', isCorrect: true },
          { id: 'c', text: 'São a mesma coisa.', isCorrect: false }
        ],
        explanation: 'DFD é sobre DADOS. Fluxograma é sobre CONTROLE e LÓGICA.'
      }
    ]
  },
  {
    id: 'mod5',
    title: 'Análise Orientada a Objetos & UML',
    description: 'Classes, Casos de Uso, Herança e Componentes.',
    icon: 'BoxSelect',
    color: 'bg-rose-500',
    summary: [
      'AOO: Foca em objetos do mundo real (Identidade, Atributos, Métodos).',
      'Pilares: Abstração, Encapsulamento, Herança, Polimorfismo.',
      'UML - Casos de Uso: Visão funcional (Atores e funcionalidades).',
      'UML - Classes: Estrutura estática (Atributos e Métodos).',
      'UML - Componentes: Arquitetura física e módulos.'
    ],
    questions: [
      {
        id: 'q5_1',
        type: QuestionType.MULTIPLE_CHOICE,
        question: 'No diagrama de classes, temos a classe "Veículo" e as classes "Carro" e "Moto" que derivam dela. Que conceito é esse?',
        options: [
          { id: 'a', text: 'Encapsulamento', isCorrect: false },
          { id: 'b', text: 'Herança (Generalização)', isCorrect: true },
          { id: 'c', text: 'Associação Simples', isCorrect: false }
        ],
        explanation: 'Herança permite que classes especializadas (Carro) herdem atributos/métodos da genérica (Veículo).'
      },
      {
        id: 'q5_2',
        type: QuestionType.MULTIPLE_CHOICE,
        question: 'Qual diagrama UML é usado para mostrar QUEM interage com o sistema e O QUE o sistema faz (funcionalidades)?',
        options: [
          { id: 'a', text: 'Diagrama de Classes', isCorrect: false },
          { id: 'b', text: 'Diagrama de Caso de Uso', isCorrect: true },
          { id: 'c', text: 'Diagrama de Componentes', isCorrect: false }
        ],
        explanation: 'O Diagrama de Caso de Uso foca nos Atores e suas interações com as funcionalidades (Use Cases).'
      }
    ]
  }
];