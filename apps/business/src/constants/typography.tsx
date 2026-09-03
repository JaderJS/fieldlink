import { ArrowRightLeft, AudioLines, BicepsFlexed, BicepsFlexedIcon, Cable, Calculator, Calendar, Clock3, Cog, Cpu, DollarSign, Dumbbell, Factory, FileDigit, FileQuestion, Globe2, GraduationCap, Ham, HeartHandshake, HelpCircle, History, KeyRound, Lightbulb, MapPin, MessageCircle, Microscope, Mountain, Network, Radar, Radio, Repeat, SatelliteDish, ShieldCheck, Signal, SignalHigh, SignalLow, Siren, SlidersVertical, Smartphone, Target, Tent, Thermometer, Tractor, Trees, Trophy, Truck, UserCheck, Users, Waves, Wrench, X } from "lucide-react"
import logo from '@/public/logo.png'

import imageAboutBannerOne from "@/public/image-04.jpg"
import imageAboutBannerTwo from "@/public/image-12.jpg"
import imageAboutBannerThree from "@/public/image-19.jpg"

import imageHomeBrandsOne from "@/public/brands/kenwood.png"
import imageHomeBrandsTwo from "@/public/brands/motorola.png"
import imageHomeBrandsThree from "@/public/brands/hytera.png"
import imageHomeBrandsFour from "@/public/brands/baofeng.png"

import imageDigitalBannerOne from "@/public/image-06.jpg"
import imageDigitalBannerTwo from "@/public/image-10.jpg"
import imageDigitalBannerThree from "@/public/image-17.jpg"
import imageDigitalBannerFour from "@/public/image-15.jpg"

const business = "Fieldlink Solutions"

const IconRange = (props: any) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a8 8 0 0 0 0-6" /><path d="M4.6 9a8 8 0 0 0 0 6" /></svg>
)
const IconShield = (props: any) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l7 4v6c0 5-4 9-7 10-3-1-7-5-7-10V6l7-4z" /></svg>
)
const IconTools = (props: any) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3l3 3" /><path d="M9 13l-4 4" /><path d="M7 7l10 10" /></svg>
)
const IconEvent = (props: any) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4" /><path d="M8 2v4" /></svg>
)


const WIKI = {
    coverage: {
        intro: {
            banner: {
                title: 'Cobertura',
                description: 'Como funcionam enlaces VHF, por que a linha de visada é tão crítica e quando o uso de repetidoras muda completamente o alcance e a confiabilidade.',
                src: imageDigitalBannerOne,
            },
            icon: Radar,
            title: 'Como o sistema funciona',
            overView: `
        A cobertura, ou alcance, de rádios de comunicação é determinada pela interação entre as ondas de rádio e o ambiente. 
        As faixas mais convencionais são VHF (Very High Frequency, 136-174 MHz) e UHF (Ultra High Frequency, 400-470 MHz) e
        possuem características distintas que as tornam ideais para cada situações específicas.
        A escolha entre elas não se trata de qual é "melhor", mas de qual é mais adequada para o cada caso.
        No geral os sinais de rádio se propagam principalmente por linha visada. 
        Obstáculos, morros, prédios e vegetação, podem bloquear parcial ou totalmente o caminho. Em muitos cenários, repetidoras resolvem essas barreiras ao receber e retransmitir o sinal para ampliar cobertura.
        `.trim()
        },

        sectionOne: {
            title: "O Princípio Fundamental",
            description: `
            Ambas as faixas operam primariamente em linha de visada.
            Isso significa que o sinal se propaga em linha reta do transmissor para o receptor. 
            A curvatura da Terra é o maior limitador natural do alcance. Portanto, a altura das antenas é um fator crítico: quanto mais altas, maior o alcance.
            Uma estação repetidora no topo de uma montanha, por exemplo, pode estender a cobertura para centenas de quilómetros, superando a limitação do horizonte.
            `.trim()
        },


        sectionOne_: {
            title: 'Por que usar repetidoras',
            description:
                'Repetidores eliminam a limitação da visada direta, elevam a potência efetiva e criam áreas amplas de cobertura. Mesmo quando não há obstáculos, repetidoras aumentam alcance e estabilidade ao centralizar o tráfego.',
            items: [
                {
                    icon: IconRange,
                    text: 'Superação de obstáculos',
                    description:
                        'Ao colocar o repetidor em um ponto alto, dois rádios sem visada direta conseguem se comunicar usando o caminho refletido via estação.'
                },
                {
                    icon: IconShield,
                    text: 'Maior potência e cobertura',
                    description:
                        'Enquanto portáteis trabalham com 5 W e móveis com 15 W, repetidores operam entre 25 e 50 W, ampliando significativamente a área atendida.'
                },
                {
                    icon: IconTools,
                    text: 'Rede expansível',
                    description:
                        'Múltiplos repetidores podem ser interligados via IP, criando áreas gigantes de cobertura contínua.'
                }
            ]
        },

        sectionTwo: {
            src: '/images/p2p-vs-repeater.jpg',
            text: '',
            description: [
                'Ponto-a-ponto é ideal quando existe visada e objetivo é fechar um link dedicado entre duas estações.',
                'Repetidora é a melhor escolha quando a região é acidentada, extensa ou quando usuários móveis precisam de cobertura ampla.'
            ]
        },

        sectionThree: {
            src: '/images/p2p-vs-repeater.jpg',
            text: 'Ponto-a-ponto vs Repetidor',
            description: [
                'Ponto-a-ponto é ideal quando existe visada e objetivo é fechar um link dedicado entre duas estações.',
                'Repetidora é a melhor escolha quando a região é acidentada, extensa ou quando usuários móveis precisam de cobertura ampla.'
            ]
        },

        technical: {
            banner: {
                title: 'Fenômenos da propagação',
                description: 'Sinais VHF sofrem influência direta do meio: topografia, atmosfera e obstáculos determinam alcance, qualidade e estabilidade.',
                src: '/images/vhf-technical.jpg'
            },
            title: 'Conceitos essenciais',
            points: [
                {
                    title: 'Linha de visada e obstruções',
                    text: 'VHF depende fortemente da visada. Obstáculos na zona de Fresnel degradam rapidamente o sinal, mesmo sem bloquear completamente a linha visada.'
                },
                {
                    title: 'Difração e espalhamento',
                    text: 'Por ter comprimento de onda maior que UHF, VHF contorna parcialmente obstáculos, mas a perda pode ser alta dependendo do tamanho e distância.'
                },
                {
                    title: 'Fading',
                    text: 'Reflexões e multipercurso criam reforço ou cancelamento do sinal, tornando a qualidade variável em ambientes urbanos ou com muita vegetação.'
                },
                {
                    title: 'Clutter e terreno',
                    text: 'Árvores, prédios, morros e até água alteram a propagação: podem absorver, refletir ou espalhar energia, mudando alcance diário.'
                },
                {
                    title: 'Curva de desempenho',
                    text: 'Sistemas analógicos degradam progressivamente à medida que o sinal enfraquece. Sistemas digitais mantêm áudio limpo até o limite da cobertura, onde o sinal cai abruptamente.'
                }
            ]
        },
        pointToPoint: {
            title: 'Ponto a ponto',
            src: "",
            text: [
                `Em sistemas mais simples ou ainda que não requerem tantas funcionalidades pode-se optar pelo sistema de rádio ponto a ponto, 
                que visa se comunicar apenas entre os equipamentos de rádio. 
                Isso cria uma comunicação que faz com que cada rádio comunique-se apenas com aquele que está dentro da sua zona de cobertura.
                `.trim(),
                `No geral sistema ponto-a-ponto atendem demandas de comunicação próximas entre sí sendo de total utilidade para coordenações de atividades`.trim()
            ]
        },
        repeater: {},
        simulation: {},

        faq: [
            {
                icon: Thermometer,
                question: 'Por que o alcance muda de um dia para o outro?',
                answer: 'Temperatura, umidade e refletores naturais como vegetação e relevo afetam a propagação. Alguns dias o sinal alcança mais longe por ducting atmosférico; em outros o desempenho volta ao normal.'
            },
            {
                icon: Calculator,
                question: `Existe alguma maneira de calcular essa cobertura?`,
                answer: `Sim! Existem softwares especializados que realizam cálculos de rádio propagação e emitem relatórios técnicos que ajudam a entender qual a cobertura do sistema de rádio`
            },
            // {
            //     question: 'Vale mais a pena usar repetidora ou ponto-a-ponto?',
            //     answer: 'Não existe receita de bolo. Cada cenário e aplicação requer um estudo para dimensionar o que faz mais sentido. No entanto sistemas ponto-a-ponto tendem a serem mais simples, mas com o alcance limitado já que o sinal de rádio esta mais sujeito a geografia do terreno, enquanto a repetidora é ideal para ampliar área de cobertura e estender funcionalidades.'
            // },
            {
                icon: FileDigit,
                question: 'Equipamento digital tem mais alcance?',
                answer: 'O alcance é idêntico. A vantagem está na curva de desempenho, enquanto o áudio digital fica limpo até o limite, o analógico introduz ruído progressivo.'
            }
        ]
    },
    digital: {
        intro: {
            title: "Comunicação avançada para o mundo moderno.",
            overView: [
                "Rádios digitais são a evolução natural das comunicações profissionais: preservam a simplicidade do push-to-talk e somam recursos avançados como encriptação, chamadas seletivas, dados embutidos (GPS/telemetria) e melhor uso do espectro.",
                "Projetados para operações onde latência, previsibilidade e segurança importam, indústrias, agronegócio, logística, segurança privada e eventos, os sistemas digitais oferecem ferramentas para reduzir custo operacional e aumentar eficiência."
            ],
            banner: {
                src: imageDigitalBannerOne,
                title: "Bem vindo ao mundo Digital",
                description: "O melhor da tecnologia aliado à alta disponibilidade, voz clara, controle e telemetria para operações críticas.",
            }
        },

        sectionOne: {
            title: 'Quais são os benefícios do sistema digital?',
            description: [
                'O lançamento do sistema MOTOTRBO consistiu em uma revolução nas soluções de comunicação corporativa, pois o rádio analógico, usado até então, apresentava uma série de restrições de funcionalidades, disponibilidade e qualidade.',
                'Assim, os benefícios proporcionados pelo MOTOTRBO foram fundamentais na expansão dessa opção de comunicação. As características mais determinantes a serem destacadas são:'
            ],
            items: [
                { icon: SignalLow, text: 'Audio de qualidade onde for', description: 'Clareza e qualidade do áudio em toda a área de cobertura independentemente da distância do ponto de repetição' },
                { icon: Cpu, text: 'Tecnologia de ponta', description: 'Tecnologia IMPRES para elevar a sensibilidade dos microfones, melhorando a propagação do som' },
                { icon: AudioLines, text: 'Supressão de ruídos', description: 'Tecnologia para supressão dos ruídos externos' },
                { icon: ArrowRightLeft, text: 'Faça mais com menos', description: 'Maior capacidade de transmissão com uma repetidora que disponibiliza duas comunicações simultâneas' },
                { icon: Users, text: 'Opção de chamadas em grupo ou particulares', description: 'Seja capaz de realizar chamadas seletivas vinculadas a um ID especifico de cada equipamento ou ainda em grupo' },
                { icon: UserCheck, text: 'Veja quem fala', description: 'Identificação dos usuários por nome ou número em cada rádio' },
                { icon: SlidersVertical, text: 'Controle total', description: 'Monitoramento remoto com abertura do áudio do funcionário, usado principalmente quando não há retorno das chamadas' },
                { icon: X, text: 'Desativação remota', description: 'Impeça que terceiros escutem as chamadas em caso de roubo ou perda do rádio' },
                { icon: MapPin, text: 'Monitore as atividades', description: 'Monitore a distância a movimentação de cada usuário e seu histórico de movimentações' }
            ]

        },

        technical: {
            title: 'Conceitos técnicos essenciais',
            banner: {
                src: imageDigitalBannerTwo,
                title: "Conceitos técnicos essenciais",
                description: "Viu um monte de termos diferentes e nem faz ideia do que sejam? Calma, a gente te ajuda. "
            },
            points: [
                { title: 'DMR (Digital Mobile Radio)', text: 'Padrão aberto para rádios comerciais que usa TDMA em 12,5 kHz para criar dois canais lógicos por portadora.' },
                { title: 'TDMA', text: 'Acesso em divisão de tempo, permite dois slots por canal, aumentando eficiência espectral.' },
                { title: 'Vocoder / codecs', text: 'Compressão de voz digital: melhora uso da banda e mantém inteligibilidade. Implementações variam entre fabricantes.' },
                { title: 'Repetidoras e enlaces', text: 'Repetidoras recebem e retransmitem sinal com maior potência; enlaces (micro-ondas / IP) conectam sites geograficamente dispersos.' },
                { title: 'Talkgroups e IDs', text: 'Talkgroups funcionam como “canais lógicos” (grupos); IDs identificam remetente e permitem chamadas privadas.' },
                { title: 'Backhaul e integração', text: 'Trabalhamos integração com backhaul via fibra, rádio ponto-a-ponto ou internet (VPN) para conectar repetidoras e sistemas dispatch.' }
            ]
        },

        sectionTwo: {
            text: 'Até duas repetidoras em uma só',
            src: logo,
            description: [
                'O padrão DMR também especifica o uso da tecnologia TDMA. TDMA significa Acesso Múltiplo por Divisão de Tempo. O TDMA fornece dois canais lógicos e cada espaço de canal de 12,5 kilohertz (consulte o diagrama abaixo). Isso fornece uma duplicação útil da capacidade dentro do mesmo espaço de canal analógico.',
                'Permitindo dois caminhos de conversa simultâneos e independentes em um único canal de 12,5 KHz.'
            ]
        },

        //Deploy
        deployChecklist: {
            banner: {
                src: imageDigitalBannerFour,
                title: "Implantação",
                description: "Agora que já sabe mais sobre o rádio digital, podemos conversar um pouco sobre o processo de implantação..."
            },
            title: 'Checklist rápido de implantação',
            steps: [
                { icon: Ham, text: 'Brief inicial: número de usuários, criticidade, área de atuação e orçamento.' },
                { icon: Ham, text: 'Levantamento de site: coordenadas, torres existentes, energia disponível e obstáculos.' },
                { icon: Ham, text: 'Predição de cobertura: modelagem com nosso software + validação local (drive/walk tests).' },
                { icon: Ham, text: 'Projeto técnico: seleção de repetidoras, antenas, enlaces e plano de frequências/licenciamento.' },
                { icon: Ham, text: 'Instalação: montagem, alinhamento e testes de RX/TX.' },
                { icon: Ham, text: 'Treinamento e SOPs: operação, manutenção básica e planos de contingência.' },
            ]
        },

        //Glossário
        glossary: {
            DMR: 'Digital Mobile Radio, padrão aberto para rádios profissionais.',
            TDMA: 'Acesso Múltiplo por Divisão de Tempo, divide o tempo em slots em um canal.',
            Repetidora: 'Equipamento que recebe e retransmite sinal para estender cobertura.',
            Talkgroup: 'Grupo lógico que permite comunicação entre subset de usuários.',
            Backhaul: 'Meio de interconexão entre sites (fibra, rádio enlace, internet).'
        },

        // Casos de uso
        useCases: {
            banner: {
                src: imageDigitalBannerThree,
                title: "Casos de uso",
                description: "Conheça mais sobre os casos em que o uso do rádio é indispensável..."
            },
            title: 'Casos de uso práticos',
            items: [
                { icon: Tractor, title: 'Agronegócio', text: 'Coordenação de equipes no campo, suporte logístico, segurança de maquinário e operadores.' },
                { icon: Mountain, title: 'Mineração e construção', text: 'Comunicação em áreas de baixa cobertura celular com prioridade para emergências.' },
                { icon: Truck, title: 'Transporte e logística', text: 'Rastreamento de frota, coordenação de cargas e despacho simultâneo.' },
                { icon: ShieldCheck, title: 'Segurança privada', text: 'Canais de emergência, identificação de usuários e encriptação em áreas sensíveis.' },
                { icon: Tent, title: 'Eventos/Operações temporárias', text: 'Instalação rápida de rede de rádio local para coordenação e segurança.' }
            ]
        },

        //Perguntas frequentes
        faq: [
            {
                icon: Smartphone,
                question: 'Rádio digital substitui celular?',
                answer: 'Não substitui totalmente, complementa. Rádios são mais previsíveis e imediatos para coordenação crítica; celulares servem para dados, apps e backhaul.'
            },
            {
                icon: ShieldCheck,
                question: 'Preciso de licença ANATEL?',
                answer: 'Sim, a operação em faixas comerciais exige homologação/licenciamento. Nós ajudamos no processo.'
            },
            {
                icon: DollarSign,
                question: 'Quanto custa implantar?',
                answer: 'Depende: número de sites, repetidoras, infraestrutura e cuidados com backhaul. Melhor resposta: estimativa após estudo de cobertura.'
            },
            {
                icon: Cable,
                question: 'Posso usar repetidoras remotas conectadas por internet?',
                answer: 'Sim, backhaul IP é uma opção comum (com segurança via VPN), útil em áreas com infraestrutura.'
            }
        ],
    },
    analog: {
        intro: {
            banner: {
                text: 'Robusto e confiável',
                description: 'Comunicação fácil e simples para atender suas necessidades.',
                src: 'https://c.pxhere.com/photos/c5/25/field_grass_winding_road_sunset_nature_landscape_countryside_outdoors_grass_field-533868.jpg!d'
            },
            title: "Visão geral dos rádios analógicos",
            icon: Radio,
            overview: [
                'Considerados os "vovôs" da rádio comunicação, os rádios analógicos ainda têm seu lugar garantido na era da comunicação moderna. Embora muitas vezes confundidos com rádios amadores, eles estão a quilômetros de distância em robustez e aplicação profissional. Equipados com a confiável tecnologia de transmissão em FM, esses rádios continuam a entregar, com consistência, uma comunicação direta, robusta e confiável, mesmo em circunstâncias adversas.',
                'Os rádios analógicos estão disponíveis tanto nas faixas de frequência VHF quanto UHF. Cada uma delas oferece benefícios específicos de alcance e penetração de sinal, sendo essenciais em diversas situações operacionais. É importante lembrar que, para operar qualquer sistema de rádio no Brasil, as frequências precisam ser devidamente homologadas e licenciadas pela ANATEL, assegurando um funcionamento legal e protegido contra interferências indesejadas.',
                'Quando o assunto é comunicação por áudio, os rádios analógicos foram pioneiros em permitir transmissões em tempo real, e essa vantagem tecnológica moldou a maneira como operações críticas se comunicam até hoje. Seja em segurança pública, logística, transporte ou construção, esses rádios cumprem um papel essencial em manter equipes conectadas, garantindo a coordenação e segurança necessárias para o sucesso das operações diárias.',
                'Embora novas tecnologias estejam em alta, os rádios analógicos continuam a ser a escolha certa para quem busca simplicidade com máxima confiabilidade. Suas funcionalidades de fácil manuseio e manutenção, somadas à construção robusta, fazem desses rádios um parceiro ideal em ambientes onde a comunicação não pode falhar.'
            ],
        },
        features: {
            banner: {
                src: 'https://c.pxhere.com/photos/db/92/police_cop_police_uniforms_police_uniform_guard_watch_police_officers_handcuffs-957362.jpg!d',
                title: 'Soluções acessíveis e versáteis',
                subtitle: 'Os rádios analógicos oferecem uma solução de comunicação econômica, sendo ideais para casos que precisem de robustez e simplicidade.',

            },
            itens: [
                {
                    icon: Dumbbell,
                    text: 'Confiabilidade comprovada',
                    description: 'Equipamentos com desempenho sólido mesmo em condições adversas.',
                },
                {
                    icon: GraduationCap,
                    text: 'Operação intuitiva',
                    description: 'Facilidade de uso que permite comunicação rápida e direta.',
                },
                {
                    icon: BicepsFlexed,
                    text: 'Alta durabilidade',
                    description: 'Construção resistente, adequada para ambientes industriais e externos.',
                }
            ]
        },
        useCases: {
            banner: {
                src: 'https://c.pxhere.com/photos/9b/0a/summer_sky_field_clouds_rural_landscape_cornfield_pennsylvania-122700.jpg!d',
                title: 'Preenche a sua necessidade',
                subtitle: ''
            },
            itens: [
                { icon: Factory, title: 'Indústrias', description: 'Ideal para segurança, logística, transporte e construção.' },
                { icon: Trees, title: 'Campo e lavoura', description: 'Conexão contínua entre equipes em diferentes locais, garantindo coordenação eficiente.' },
                { icon: Siren, title: 'Segurança e monitoramento', description: 'Fundamental para comunicação em sistemas de segurança e vigilância.' },
            ],
        },
        faq: [
            {
                icon: Radio,
                question: "Qual é a principal vantagem do rádio analógico?",
                answer:
                    "É simples, robusto, amplamente compatível e fácil de operar. Ideal para quem precisa de comunicação direta e confiável.",
            },
            {
                icon: Waves,
                question: "Por que o áudio analógico degrada com a distância?",
                answer:
                    "O sinal analógico perde força gradualmente, aumentando o ruído de fundo. Isso causa o efeito de 'chiado' típico em longas distâncias.",
            },
            {
                icon: Repeat,
                question: "Posso usar repetidora com rádio analógico?",
                answer: "Sim. Repetidoras analógicas ampliam a cobertura retransmitindo o sinal, mas não oferecem recursos como criptografia ou múltiplos slots.",
            },
            {
                icon: SignalHigh,
                question: "O alcance do analógico é maior que o digital?",
                answer: "O alcance físico é semelhante. A diferença é que no analógico o áudio degrada suavemente, enquanto no digital ele cai abruptamente no limite.",
            },
            {
                icon: DollarSign,
                question: "O rádio analógico é mais barato?",
                answer: "Normalmente sim. A tecnologia é antiga, madura e com ampla disponibilidade de peças e acessórios — reduzindo custos.",
            },
            {
                icon: Radio,
                question: "Posso misturar marcas diferentes de rádio analógico?",
                answer: "Sim. Desde que estejam na mesma frequência e modulação (FM analógica), rádios de fabricantes diferentes se comunicam normalmente.",
            },
        ],
    },
}

export const TYPOGRAPHY = {
    wiki: {
        ...WIKI
    },
    home: {
        brands: [
            {
                title: "Kenwood",
                src: imageHomeBrandsOne
            },
            {
                title: "Motorola",
                src: imageHomeBrandsTwo
            },
            {
                title: "Hytera",
                src: imageHomeBrandsThree
            },
            {
                title: "Baofeng",
                src: imageHomeBrandsFour
            }
        ]
    },

    about: {
        intro: {
            banner: {
                title: "Quem somos?",
                image: imageAboutBannerOne,
                description: `Sente-se e venha descobrir como nós da ${business} nos tornamos referencia em sistemas de rádio comunicação.`,
            },
            title: "Nossa essência",
            text: `
            Nascidos no coração de Mato Grosso, 
            somos uma empresa familiar movida por paixão à engenharia e à comunicação. 
            Crescemos unindo experiência prática e inovação tecnológica para criar soluções de rádio que mantêm o campo e a indústria sempre conectados.
            `.trim(),
            icon: Radio,
        },
        mission: {
            text: 'Nossa missão',
            description: `Entregar comunicações ágeis e confiáveis para o setor operacional de empresas e 
            agronegócios, garantindo eficiência e continuidade onde a conectividade tradicional falha.`.trim(),
            icon: Target,
        },
        vision: {
            text: 'Nossa visão',
            description: `Ser referência no Centro-Oeste em soluções de rádio comunicação profissional, 
            unindo engenharia, experiência de campo e inovação para conectar pessoas e operações em qualquer cenário.`.trim(),
            icon: Trophy,
        },
        values: {
            text: 'Nossos valores',
            icon: Lightbulb,
            topics: [
                {
                    title: 'Foco em resultados',
                    description: 'cada projeto nasce para resolver um problema real de comunicação.',
                    icon: Signal,
                },
                {
                    title: 'Comprometimento técnico',
                    description: 'excelência em engenharia, instalação e suporte.',
                    icon: Cpu,
                },
                {
                    title: 'Inovação constante',
                    description: 'aplicação de tecnologias que agregam valor prático.',
                    icon: SatelliteDish,
                },
                {
                    title: 'Transparência e confiança',
                    description: 'relações duradouras com clientes e parceiros.',
                    icon: HeartHandshake,
                },
                {
                    title: 'Paixão pelo que fazemos',
                    description: 'amor pela engenharia e comunicação eficaz.',
                    icon: Users,
                }
            ],
        },
        history: {
            banner: {
                image: imageAboutBannerThree,
                title: "Nossa história.",
            },
            title: 'De volta no tempo.',
            icon: History,
            timeline: [
                {
                    year: "Anos 90",
                    text: `O nome ${business} veio recente, mas nossa história começou como uma pequena loja de eletrônica em Colíder–MT.`,
                    icon: Calendar,
                },
                {
                    year: "2000",
                    text: "Fundada por José Carlos da Silva, a empresa tinha como principal objetivo implantar sistemas de telefone rural.",
                    icon: Calendar,
                },
                {
                    year: "2005–2010",
                    text: "Com a desativação das linhas telefônicas, a antiga Digitel se reinventou, migrando para soluções de rádio comunicação voltadas a pequenas propriedades rurais.",
                    icon: Calendar,
                },
                {
                    year: "Hoje",
                    text: "Com a chegada da nova geração, engenheiro elétrico formado pela UFMT, a empresa evoluiu para projetos completos em telecomunicações, unindo campo e tecnologia.",
                    icon: Calendar,
                },
            ],
            texts: [
                `O nome ${business} veio recente, mas nascemos como uma simples loja de eletrônica geral, situada na cidade de Colíder-MT`.trim(),
                `Ainda muito jovem fundada por José Carlos da Silva tinha por principal objetivo a implantação de sistemas de telefone rural`.trim(),
                `Com o passar dos anos e queda das linhas telefônicas no Brasil a até então Digitel se reinventou e passou a criar soluções na linha de rádio comunicadores para atender pequenas propriedades rurais, que almejavam comunicação rápida por rádio`.trim(),
                `Muito tempo se passou até a chegada de seu filho mais novo recém formado pela Faculdade Federal do Mato Grosso em Engenharia Elétrica com enfase em Telecomunicações`.trim(),
                `Hoje a empresa conta com uma vasta bagagem em sistema de telecomunicações que vão muito além de apenas projetar, mas desenvolver e aplicar soluções modernas que muitas vezes nem existem ainda no mercado`.trim()
            ],
        },
        laboratory: {
            banner: {
                title: 'Nosso laboratório',
                image: imageAboutBannerTwo,
            },
            text: 'Laboratório e equipe preparada',
            icon: Wrench,
            description: [
                'Com um Laboratório montado e especializado para serviços de rádio propagação, temos uma equipe sempre pronta para diagnosticar e resolver defeitos para solucionar problemas da área.',
                'Contando ainda com toda o aparato necessário para verificação em pleno campo, de modo que o cliente muita das vezes nem precise remover o equipamento com defeito, bastando que nossa equipe vá até você'
            ]
        },

        capabilities: {
            title: "O que nos move?",
            items: [
                {
                    icon: Cog,
                    title: "Engenharia aplicada",
                    text: "Projetos customizados com base em análise técnica real, da topologia à propagação.",
                },
                {
                    icon: Factory,
                    title: "Integração com o campo",
                    text: "Experiência direta com o agronegócio e ambientes industriais.",
                },
                {
                    icon: ShieldCheck,
                    title: "Segurança e confiabilidade",
                    text: "Soluções projetadas para resistir e funcionar onde outras tecnologias falham.",
                },
            ],
        },
    },

    budget: {
        question: 'E ai! Gostou e quer saber mais?',
        text: 'Solicite já um orçamento'
    },
    faq: {
        title: 'Perguntas frequentes',
        icon: FileQuestion,
        asks: [
            ...WIKI.coverage.faq,
            ...WIKI.digital.faq,
            ...WIKI.analog.faq,
            {
                icon: Radio,
                question: 'Qual rádio devo comprar?',
                answer: 'existem inúmeros modelos e valores disponíveis no mercado, sendo alguma das mais famosas Motorola, Hytera, Baofeng, Vertex, Radiodity e entre outras, contando cada uma com uma infinidade de modelos e recursos disponíveis. Se atente em ter certeza na sua compra que seus equipamentos operam na mesma faixa de frequência e com os recursos que deseja utilizar.'
            },
            {
                icon: Waves,
                question: 'Qual a diferença prática entre VHF e UHF?',
                answer: 'Em termos gerais frequências em UHF tem maior poder de refração e são indicadas para ambientes urbanos, já as frequências em VHF operam melhor em ambiente rural.'
            },
            {
                icon: Network,
                question: 'Tenho um rádio em UHF posso utiliza-lo em um sistema VHF?',
                answer: 'Não, equipamentos projetados para operar em VHF/UHF não deslocam a faixa de funcionamento, salvo exceções equipamentos dual band, que são projetados para operar nas duas.'
            },
            {
                icon: SignalHigh,
                question: 'Qual o alcance?',
                answer: 'Essa pergunta é sempre um gigantesco depende, isso pois existem inúmeras variáveis a serem levadas em conta para determinar tal pergunta. Em média um rádio móvel (carro) opera por volta de 10Km de rádio e um equipamento portátil apenas 4Km.Contudo esses valores são uma média e não determinam o real alcance de um sistema, por isso é sempre recomendado que você possa entrar em contato para melhor esclarecimento.'
            },
            {
                icon: Repeat,
                question: 'O que é uma repetidora?',
                answer: 'Repetidoras são células de rádio receptor e transmissor interligadas entre sí através de uma interface, posicionadas estrategicamente para receberem toda a comunicação e retransmiti-la com maior potência e eventualmente estendendo a cobertura do sistema de rádio.'
            },
            {
                icon: Globe2,
                question: 'Preciso de internet para usar o rádio?',
                answer:
                    'Não! Esse é um dos grandes diferenciais do rádio: ele cria sua própria rede de comunicação independente da internet ou de operadoras de celular. Ideal para áreas remotas ou quando a rede cai.',
            },
            {
                icon: Users,
                question: 'Posso falar com mais de uma pessoa ao mesmo tempo?',
                answer:
                    'Sim! O sistema de rádio permite chamadas em grupo, o que torna a comunicação instantânea entre equipes, sem precisar discar ou abrir aplicativos.',
            },
            {
                icon: Cpu,
                question: 'O rádio digital é muito diferente do analógico?',
                answer:
                    'O rádio digital tem áudio mais limpo, criptografia (segurança), e funções extras como mensagens de texto, GPS, e chamadas privadas. Além disso, uma única repetidora digital pode dobrar a capacidade de comunicação em relação à analógica.',
            },
            {
                icon: Smartphone,
                question: 'Posso integrar o rádio com o celular?',
                answer:
                    'Sim! Com gateways ou aplicativos dedicados, é possível conectar rádios a smartphones ou sistemas via IP, mantendo a praticidade do rádio com o alcance da internet quando necessário.',
            },
            {
                icon: ShieldCheck,
                question: 'Preciso de licença para usar rádios?',
                answer:
                    'Em muitos casos, sim. O uso profissional de rádios em empresas, fazendas e serviços exige autorização da Anatel e registro das frequências. Nós podemos te ajudar nesse processo para garantir tudo dentro da lei.',
            },
            {
                icon: MessageCircle,
                question: 'Por que não usar apenas WhatsApp ou Starlink?',
                answer:
                    'O rádio é instantâneo, não depende de internet e funciona até sem energia. Em operações críticas, segundos fazem diferença, e o rádio é o único meio que garante resposta imediata e comunicação em grupo mesmo fora de área.',
            },
            {
                icon: Clock3,
                question: 'O rádio ainda é relevante nos dias de hoje?',
                answer:
                    'Mais do que nunca. Em segurança, logística, agronegócio e obras, a comunicação confiável salva tempo e recursos. Com o avanço dos sistemas digitais, o rádio se tornou ainda mais moderno, seguro e integrado.',
            },
        ],
    },
    glossary: {
        snr: 'Relação de sinal ruido',
    },
    contact: {
        instagram: {
            user: "@Jader.js",
            src: "https://instagram.com/jader.js",
        },
        Linkedin: {
            user: "jader.js",
            src: 'https://instagram.com/jader.js'
        },
        googleMaps: "https://www.google.com/maps/place/Link+R%C3%A1dio+Comunica%C3%A7%C3%B5es/@-10.8013696,-55.4603515,17z/data=!3m1!4b1!4m6!3m5!1s0x930789305fc81def:0xf631976cbaf9a685!8m2!3d-10.8013696!4d-55.4577766!16s%2Fg%2F11rjlvb9n0?authuser=0&entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D"
    }
}