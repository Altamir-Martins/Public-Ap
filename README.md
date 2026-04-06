# APOLO — Segurança Comunitária

Protótipo mobile (HTML/CSS/JS) do aplicativo APOLO, plataforma de segurança comunitária baseada em denúncias anônimas e navegação segura.

## ✅ Funcionalidades Implementadas

### Navegação
- Sistema de navegação entre telas totalmente funcional e sem travamentos
- Botão X do menu lateral **corrigido e funcional**
- Backdrop clicável fecha qualquer overlay aberto
- Tecla ESC fecha overlays (modo desktop)
- Swipe para a esquerda fecha o menu lateral (touch)
- Histórico de navegação (botões "voltar")
- Zero travamentos de tela

### Telas
| Tela | Status |
|------|--------|
| Splash com animação do sol | ✅ |
| Onboarding (3 slides) | ✅ |
| Login | ✅ |
| Cadastro + força de senha + máscara CPF | ✅ |
| Home com mapa Leaflet + GPS | ✅ |
| Lista de ocorrências | ✅ |
| Detalhe da ocorrência | ✅ |
| Formulário de denúncia (3 etapas) | ✅ |
| Emergência com hold 3s | ✅ |
| Notificações | ✅ |
| Perfil | ✅ |
| Configurações + Dark Mode | ✅ |
| Ajuda/FAQ | ✅ |
| Tela de sucesso | ✅ |

### Overlays / Modais
| Componente | Fecha com X | Fecha com Backdrop |
|------------|-------------|-------------------|
| Menu lateral | ✅ | ✅ |
| Busca (bottom sheet) | ✅ | ✅ |
| Filtro (bottom sheet) | ✅ | ✅ |
| Localização (bottom sheet) | ✅ | ✅ |
| Suporte (bottom sheet) | ✅ | ✅ |
| Zona de risco (bottom sheet) | ✅ | ✅ |
| Modal de confirmação | ✅ | ✅ |

### Mapa
- Localização em tempo real via GPS
- Zonas de risco coloridas (verde/amarelo/laranja/vermelho)
- Marcadores de ocorrências com ícones
- Click em zona: abre bottom sheet com ocorrências da área
- Dark mode: troca de tiles do mapa

## 📱 Estrutura de Arquivos

```
index.html              — Estrutura completa do app (todas as telas e overlays)
css/
  design-system.css     — Tokens, variáveis CSS, reset, componentes base
  app.css               — Estilos de todas as telas e componentes
js/
  navigation.js         — Sistema de navegação (telas, overlays, modais, backdrop)
  app.js                — Lógica do app (mapa, formulários, dados mock, emergência)
```

## 🔗 URLs de Entrada

- `/` — index.html (splash → onboarding → login → home)

## 🗺️ Fluxo Principal

1. Splash (3s) → Onboarding (3 slides) → Login → Home/Mapa
2. Home: abrir menu, pesquisar, ver zonas de risco, denunciar, emergência
3. Botão Megafone → Formulário de Denúncia (3 etapas) → Sucesso
4. FAB Emergência (hold 3s) → Tela Emergência → Acionamento

## 🎨 Design System

- Fonte: Inter
- Grid: 8pt
- Cores: Preto/Branco + Amarelo (#FDD835) + Azul (#1E88E5)
- Estados de risco: Verde → Amarelo → Laranja → Vermelho
- Dark Mode suportado

## 🚀 Próximas Etapas (Para Kotlin/Android Studio)

- [ ] Implementar autenticação real (JWT/Firebase)
- [ ] API backend para denúncias
- [ ] Notificações push (FCM)
- [ ] Criptografia ponta-a-ponta
- [ ] Upload de mídia
- [ ] Anonimização de IP
- [ ] Dashboard para órgãos parceiros
