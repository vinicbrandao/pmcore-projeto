# Documentação Técnica e Funcional — PMCore

- **Projeto:** PMCore, plataforma acadêmica para controle financeiro e gerenciamento de projetos.
- **Contexto:** o sistema foi criado a partir de telas desenhadas no Figma e depois implementadas em código.
- **Objetivo:** centralizar informações financeiras, planos, perfil de usuário e indicadores em uma aplicação web.
- **Foco:** pequenas e médias equipes que desejam reduzir dependência de planilhas extensas.
- **Escopo atual:** telas principais implementadas, backend Express, autenticação com JWT e banco MongoDB Atlas conectado.
- **Abordagem:** primeiro foram feitas as telas, depois as rotas e por fim a persistência de dados.
- **Tipo de entrega:** projeto acadêmico desenvolvido como aplicação web funcional.
- **Público de avaliação:** professores, colegas, possíveis usuários leigos e interessados em gestão financeira.
- **Estado geral:** funcional para cadastro, login, perfil, contratação simulada de plano e acesso ao dashboard.

## 1. Visão Geral do PMCore

- O PMCore é uma aplicação web para organizar dados financeiros de projetos de forma simples.
- A solução apresenta uma landing page institucional para explicar o valor da plataforma.
- A tela de planos permite comparar as opções Básico e Pro antes da contratação.
- A tela de pagamento simula a assinatura de um plano e grava esse plano no banco.
- A tela de perfil centraliza dados pessoais e a situação do plano contratado.
- O dashboard mostra uma visão inicial de receitas, despesas, saldo e projetos demonstrativos.
- O backend atua como intermediário entre o navegador e o MongoDB Atlas.
- A autenticação impede que usuários sem login acessem áreas internas do sistema.
- A arquitetura separa frontend, backend, rotas, modelos e autenticação para manter o projeto organizado.

## 2. Problema que o Projeto Resolve

- Muitas equipes ainda acompanham projetos em planilhas manuais e arquivos dispersos.
- Esse modelo dificulta a visualização rápida do orçamento e dos principais indicadores.
- A duplicação de informações aumenta a chance de erro e retrabalho.
- A falta de centralização reduz a confiabilidade dos dados usados na tomada de decisão.
- O PMCore propõe uma interface única para reunir planos, perfil e dados financeiros.
- O sistema reduz a necessidade de procurar dados em várias fontes diferentes.
- A plataforma ajuda a transformar informações financeiras em uma visualização mais objetiva.
- O projeto também serve como demonstração acadêmica de integração frontend, backend e banco.
- A solução foi pensada para ser compreensível também para pessoas sem conhecimento técnico profundo.

## 3. Objetivos Funcionais

- Permitir que visitantes entendam a proposta do PMCore pela página inicial.
- Permitir que usuários consultem planos disponíveis antes de criar ou usar uma conta.
- Permitir que usuários visualizem detalhes completos dos planos Básico e Pro.
- Permitir cadastro de conta com nome, e-mail e senha.
- Permitir login com e-mail e senha usando validação no backend.
- Permitir edição de dados pessoais na tela de perfil.
- Permitir contratação simulada de plano e gravação do plano no MongoDB.
- Permitir acesso ao dashboard apenas para usuários com plano ativo.
- Permitir exclusão da conta do usuário por meio da tela de perfil.

## 4. Objetivos Não Funcionais

- Manter o visual simples, direto e compatível com o protótipo do Figma.
- Evitar complexidade excessiva para preservar clareza em uma entrega acadêmica.
- Separar os arquivos públicos do frontend da estrutura do backend.
- Proteger senhas com criptografia antes de salvar no banco de dados.
- Guardar informações sensíveis como conexão do banco dentro do arquivo `.env`.
- Evitar envio de `.env` e `node_modules` para o GitHub.
- Usar rotas REST para organizar a comunicação entre frontend e servidor.
- Manter o sistema executável localmente por `http://localhost:3000`.

## 5. Stack de Tecnologias

- HTML5 foi usado para estruturar as páginas visuais do sistema.
- CSS3 foi usado para definir cores, espaçamentos, cards, formulários e responsividade.
- JavaScript foi usado no navegador para interações, validações e requisições à API.
- Node.js foi usado como ambiente de execução do backend.
- Express foi usado para criar o servidor HTTP e organizar as rotas.
- MongoDB Atlas foi usado como banco de dados em nuvem.
- Mongoose foi usado para criar schema, model e conexão com o MongoDB.
- JWT foi usado para autenticar usuários por token.
- bcryptjs foi usado para criptografar senhas antes de armazená-las.

## 6. Estrutura Geral do Projeto

- A pasta `public` contém os arquivos acessados pelo navegador.
- A pasta `public/css` contém o arquivo principal de estilos `style.css`.
- A pasta `public/js` contém scripts de navegação, autenticação, perfil e dashboard.
- A pasta `public/assets/images` armazena imagens usadas nas telas visuais.
- A pasta `models` contém os modelos de dados do MongoDB.
- A pasta `routes` contém as rotas de autenticação, perfil e planos.
- A pasta `middleware` contém o middleware de autenticação JWT.
- O arquivo `server.js` inicializa o Express, registra rotas e conecta ao banco.
- O arquivo `.env` guarda configurações locais sensíveis como `MONGO_URI` e `JWT_SECRET`.

## 7. Página Inicial — Landing Page

- A landing page é a primeira apresentação do PMCore ao usuário visitante.
- O cabeçalho possui logo, links para recursos, planos, contato e botão de autenticação.
- Quando o usuário não está logado, o botão do cabeçalho exibe Entrar.
- Quando o usuário está logado, o botão passa a exibir Perfil.
- A seção principal comunica a proposta de controle financeiro sem planilhas intermináveis.
- A seção de recursos mostra benefícios como dashboards simples e centralização.
- A seção de planos apresenta um resumo visual das opções Básico e Pro.
- O rodapé identifica o projeto como acadêmico.
- A página carrega `nav.js` para atualizar o estado do botão do cabeçalho.

## 8. Tela de Planos

- A tela de planos apresenta as assinaturas disponíveis para o usuário.
- O Plano Básico é apresentado como opção para equipes pequenas e poucos projetos.
- O Plano Pro é apresentado como opção para equipes com maior volume de projetos.
- Cada plano possui imagem, título, descrição curta e lista de recursos.
- O botão Ver detalhes envia o usuário para a página dinâmica de detalhes.
- O botão Escolher envia o usuário para a tela de pagamento.
- Os links usam parâmetros de URL para informar plano e período ao JavaScript.
- A tela mantém identidade visual escura no cabeçalho e cards claros no conteúdo.
- Essa tela representa a etapa comercial de seleção de plano dentro do fluxo.

## 9. Tela de Detalhes do Plano

- A tela de detalhes usa `detalhesPlano.js` para definir qual plano aparece na página.
- O parâmetro `?plano=basico` carrega dados do Plano Básico.
- O parâmetro `?plano=pro` carrega dados do Plano Pro.
- Se o parâmetro for ausente ou inválido, o sistema usa o Básico como padrão.
- A tela mostra tag, título, subtítulo, imagem, preço e descrição.
- A tela também mostra público indicado e recursos incluídos.
- Existe um comparativo rápido entre Básico e Pro.
- O botão Escolher este plano direciona para a tela de pagamento.
- Essa página evita duplicação, pois uma única tela atende os dois planos.

## 10. Tela de Pagamento

- A tela de pagamento simula a contratação de um plano pelo usuário.
- O plano selecionado vem pela URL e é interpretado pelo arquivo `pagamento.js`.
- O usuário pode alternar entre período mensal e anual.
- O Plano Básico mensal custa R$ 49,90.
- O Plano Básico anual custa R$ 508,98 com desconto de 15%.
- O Plano Pro mensal custa R$ 99,90.
- O Plano Pro anual custa R$ 1.018,98 com desconto de 15%.
- Ao confirmar, o frontend envia os dados para `/api/plans/purchase`.
- Depois da confirmação, um pop-up informa Compra Finalizada e permite ir ao Perfil.

## 11. Tela de Login

- A tela de login recebe e-mail e senha do usuário.
- O envio é interceptado por `auth.js` para evitar recarregamento da página.
- O frontend envia uma requisição POST para `/api/auth/login`.
- O backend procura o e-mail no MongoDB.
- Se o usuário existir, a senha digitada é comparada com o hash salvo.
- A comparação é feita com bcryptjs.
- Se a autenticação for válida, o backend gera um token JWT.
- O token é salvo no navegador como `pmcoreToken`.
- Após login, o usuário é redirecionado para `perfil.html`.

## 12. Tela de Cadastro

- A tela de cadastro recebe nome, e-mail, senha e confirmação de senha.
- O usuário precisa aceitar os termos antes de finalizar o cadastro.
- O frontend valida campos vazios e igualdade entre senha e confirmação.
- Depois da validação, os dados são enviados para `/api/auth/register`.
- O backend verifica se o e-mail já existe no MongoDB.
- Se o e-mail estiver livre, a senha é criptografada com bcryptjs.
- O usuário é criado na collection `users`.
- O backend gera um token JWT para iniciar a sessão automaticamente.
- Um pop-up confirma a criação da conta e redireciona para a página inicial.

## 13. Tela de Contato

- A tela de contato possui campos de nome, e-mail, assunto e mensagem.
- Existe uma opção visual para anexar arquivos na interface da tela de contato.
- O usuário precisa concordar com o uso dos dados para retorno do contato.
- O script `contato.js` valida campos obrigatórios antes de confirmar o envio.
- No estado atual, o envio é apenas simulado no frontend.
- Após validação, a tela mostra um pop-up de mensagem enviada.
- O usuário é redirecionado para a página inicial após alguns segundos.

## 14. Tela de Perfil

- A tela de perfil é uma área protegida por autenticação.
- Ela exige token JWT salvo no navegador.
- O script `perfil.js` busca os dados reais em `/api/user/profile`.
- A tela exibe nome, e-mail e campo de nova senha opcional.
- Os campos podem ser editados pelo ícone de lápis.
- Ao salvar, os dados são enviados por PUT para `/api/user/profile`.
- Se uma nova senha for enviada, o backend criptografa antes de salvar.
- A tela exibe o plano contratado ou a mensagem de ausência de plano.
- O botão Excluir Conta chama DELETE em `/api/user/profile` e remove a conta do banco.

## 15. Tela de Dashboard

- O dashboard representa o ambiente interno do PMCore.
- Ele só abre se houver token válido no navegador.
- Ele também exige que o usuário tenha um plano contratado.
- Se o usuário não estiver logado, ele é enviado para login.
- Se o usuário estiver logado sem plano, ele é enviado para o perfil.
- A tela mostra receitas, despesas, saldo e número de projetos.
- Os projetos e movimentações exibidos são dados demonstrativos usados para apresentar a interface.
- O botão Sair remove a sessão local e retorna para a página inicial.

## 16. Arquivo nav.js

- O arquivo `nav.js` controla o botão Entrar ou Perfil no cabeçalho.
- Ele verifica se existe `pmcoreToken` no localStorage.
- Se existe token, o link muda para Perfil.
- Se não existe token, o link fica como Entrar.
- O botão precisa possuir o atributo `data-auth-link` no HTML.
- Esse script deve ser carregado em todas as páginas com cabeçalho.
- Ele evita que cada página tenha lógica própria de navegação autenticada.
- O comportamento visual depende do estado local da sessão.
- Se o usuário sair, o token é removido e o botão volta a ser Entrar.

## 17. Arquivo auth.js

- O arquivo `auth.js` controla login e cadastro no frontend.
- Ele intercepta o envio dos formulários para usar fetch em vez de recarregar a página.
- No cadastro, envia nome, e-mail e senha para `/api/auth/register`.
- No login, envia e-mail e senha para `/api/auth/login`.
- Ele trata respostas de erro exibindo mensagens ao usuário.
- Quando o backend retorna token, ele salva `pmcoreToken` no localStorage.
- Também salva uma cópia básica do usuário em `pmcoreUsuario`.
- Após login, redireciona para a tela de perfil.
- Após cadastro, exibe pop-up e depois volta para a landing page.

## 18. Arquivo pagamento.js

- O arquivo `pagamento.js` interpreta o plano escolhido pela URL.
- Ele define os preços mensais e anuais dos planos Básico e Pro.
- Ele atualiza o resumo visual quando o usuário troca o período.
- Ele verifica se existe token antes de permitir contratação.
- Se não houver token, envia o usuário para login.
- Ao confirmar pagamento, envia POST para `/api/plans/purchase`.
- O corpo da requisição inclui tipo do plano e período.
- Quando o backend confirma, atualiza o usuário salvo localmente.
- Depois exibe o pop-up de compra finalizada.

## 19. Arquivo perfil.js

- O arquivo `perfil.js` protege e preenche a tela de perfil.
- Ele exige token salvo no localStorage.
- Ele busca os dados reais do usuário em `/api/user/profile`.
- Ele preenche nome e e-mail com dados vindos do MongoDB.
- Ele deixa a senha vazia porque a senha real nunca deve voltar ao frontend.
- Ele renderiza o card de plano ou a mensagem de ausência de plano.
- Ele permite habilitar campos para edição por botões de lápis.
- Ele salva alterações por meio de requisição PUT autenticada.
- Ele exclui a conta usando requisição DELETE autenticada.

## 20. Arquivo dashboard.js

- O arquivo `dashboard.js` controla o acesso ao dashboard.
- Ele verifica se existe token antes de carregar a página.
- Ele busca o perfil real para confirmar se existe plano ativo.
- Se não houver plano, redireciona para o perfil.
- Ele carrega cards de resumo financeiro com dados demonstrativos.
- Ele renderiza projetos em andamento com barra de progresso.
- Ele renderiza resumo por categoria em barras visuais.
- Ele renderiza uma tabela de movimentações financeiras.
- Ele controla o botão Sair removendo token e usuário do localStorage.

## 21. Backend com Express

- O backend é responsável por receber requisições do frontend.
- Ele foi criado com Express para simplificar a criação de rotas.
- Ele usa `express.json()` para interpretar corpos JSON.
- Ele usa `express.static()` para servir os arquivos da pasta `public`.
- Ele usa `cors()` para evitar bloqueios de comunicação em ambiente local.
- As rotas são separadas em arquivos por domínio funcional.
- A conexão com o MongoDB ocorre antes de iniciar o servidor.
- Se a conexão falhar, o erro aparece no terminal.
- Quando a conexão funciona, o servidor abre em `http://localhost:3000`.

## 22. Arquivo server.js

- O `server.js` é o arquivo principal do backend.
- Ele importa Express, Mongoose, dotenv, cors e path.
- Ele importa as rotas `authRoutes`, `userRoutes` e `planRoutes`.
- Ele carrega variáveis de ambiente com `dotenv.config()`.
- Ele define a porta usando `process.env.PORT` ou 3000 como padrão.
- Ele registra a pasta `public` como pasta estática.
- Ele vincula `/api/auth` às rotas de autenticação.
- Ele vincula `/api/user` às rotas de perfil.
- Ele vincula `/api/plans` às rotas de contratação de planos.

## 23. Model User.js

- O model `User.js` define a estrutura do usuário no MongoDB.
- O campo `nome` armazena o nome informado no cadastro ou perfil.
- O campo `email` é obrigatório, único, normalizado e usado no login.
- O campo `senha` guarda o hash da senha criada ou atualizada.
- O campo `plano.tipo` guarda `basico`, `pro` ou null.
- O campo `plano.nome` guarda o nome exibido do plano.
- O campo `plano.periodo` guarda mensal, anual ou null.
- O campo `plano.preco` guarda o valor contratado.
- O campo `criadoEm` registra automaticamente a data de criação da conta.

## 24. authMiddleware.js

- O `authMiddleware.js` protege rotas que dependem de login.
- Ele procura o cabeçalho Authorization na requisição.
- O formato esperado é `Bearer TOKEN`.
- Se o token não existir, retorna status 401.
- Se o formato estiver incorreto, retorna status 401.
- Se a validação do JWT falhar, retorna status 401.
- Se o token for válido, extrai o id do usuário.
- O id do usuário é anexado em `req.userId`.
- As rotas protegidas usam esse id para buscar o usuário no MongoDB.

## 25. Rotas de Autenticação

- As rotas de autenticação ficam no arquivo `authRoutes.js`.
- A rota POST `/api/auth/register` cria uma nova conta.
- A rota POST `/api/auth/login` autentica uma conta existente.
- No cadastro, o backend exige nome, e-mail e senha.
- No cadastro, o backend impede e-mails duplicados.
- No cadastro, a senha é criptografada antes de salvar.
- No login, o backend valida e-mail e senha.
- Em sucesso, ambas as rotas retornam token e usuário formatado.
- A senha nunca é enviada de volta ao navegador.

## 26. Rotas de Perfil

- As rotas de perfil ficam no arquivo `userRoutes.js`.
- A rota GET `/api/user/profile` retorna os dados do usuário logado.
- A rota PUT `/api/user/profile` atualiza nome, e-mail e senha.
- A rota DELETE `/api/user/profile` exclui a conta do usuário.
- Todas as rotas de perfil usam `authMiddleware`.
- A atualização de e-mail verifica se outro usuário já usa o mesmo e-mail.
- A atualização de senha aplica bcrypt antes de salvar.
- A exclusão remove o documento do usuário no MongoDB.
- Essas rotas sustentam a tela de perfil do sistema.

## 27. Rotas de Planos

- As rotas de planos ficam no arquivo `planRoutes.js`.
- A rota POST `/api/plans/purchase` registra a contratação de plano.
- A rota exige token JWT válido.
- O frontend envia `tipo` e `periodo` no corpo da requisição.
- O backend valida se o tipo é Básico ou Pro.
- O backend valida se o período é mensal ou anual.
- O plano escolhido é salvo dentro do documento do usuário.
- A data de compra é registrada com `new Date()`.
- A resposta retorna o plano salvo para atualização da interface.

## 28. MongoDB Atlas

- O MongoDB Atlas é o banco em nuvem usado pelo PMCore.
- O projeto usa um cluster remoto para armazenar usuários.
- O banco configurado na connection string se chama `pmcore`.
- A collection de usuários é criada automaticamente como `users`.
- O Atlas exige usuário e senha de banco para conexão.
- O Atlas exige liberação do IP em Network Access.
- Se o IP não estiver liberado, a conexão falha com erro de whitelist.
- Se a rede bloquear DNS SRV, pode ocorrer erro `querySrv ECONNREFUSED`.
- Depois da conexão correta, o terminal mostra MongoDB conectado com sucesso.

## 29. Variáveis de Ambiente

- O arquivo `.env` guarda informações que não devem ficar no código público.
- `PORT` define a porta do servidor local.
- `MONGO_URI` define a conexão com o MongoDB Atlas.
- `JWT_SECRET` define a chave usada para assinar tokens JWT.
- A senha real do MongoDB fica dentro de `MONGO_URI`.
- O `.env` deve estar listado no `.gitignore`.
- Se a senha aparecer em print ou commit, ela deve ser trocada no Atlas.
- Em hospedagem, essas variáveis devem ser cadastradas no painel do provedor.
- Sem `.env` correto, o backend não conecta ao banco nem gera tokens corretamente.

## 30. Autenticação JWT

- JWT significa JSON Web Token.
- No PMCore, o JWT representa a sessão do usuário logado.
- O backend gera o token após cadastro ou login bem-sucedido.
- O token contém o id do usuário assinado com `JWT_SECRET`.
- O frontend guarda o token em `localStorage`.
- Rotas protegidas exigem o token no cabeçalho Authorization.
- O middleware verifica se o token é válido.
- Se o token for inválido ou expirado, o acesso é bloqueado.
- O token atual foi configurado com validade de 7 dias.

## 31. Criptografia com bcryptjs

- O PMCore não salva senhas em texto puro.
- Ao cadastrar, a senha passa por `bcrypt.hash()`.
- O resultado é um hash salvo no campo `senha` do usuário.
- Ao logar, a senha digitada passa por `bcrypt.compare()`.
- A comparação confirma se a senha corresponde ao hash salvo.
- Ao atualizar senha no perfil, o mesmo processo de hash é aplicado.
- O hash reduz o risco caso o banco seja visualizado indevidamente.
- O frontend nunca recebe a senha real nem o hash da senha.
- Essa prática é essencial para qualquer sistema com autenticação.

## 32. LocalStorage no Projeto

- O localStorage deixou de ser o banco falso principal do projeto.
- Agora ele guarda apenas dados de sessão no navegador.
- A chave `pmcoreToken` guarda o token JWT.
- A chave `pmcoreUsuario` guarda uma cópia simples do usuário.
- A fonte oficial dos dados é o MongoDB.
- Se o localStorage for limpo, o usuário precisa logar novamente.
- O botão Entrar ou Perfil depende do token salvo.
- O dashboard depende do token para validar acesso.
- O comando `localStorage.clear()` reseta a sessão local durante testes.

## 33. Fluxo de Cadastro

- O usuário abre `cadastro.html`.
- O usuário preenche nome, e-mail, senha e confirmação.
- O usuário marca o aceite dos termos.
- O frontend valida os campos.
- O frontend envia POST para `/api/auth/register`.
- O backend verifica duplicidade de e-mail.
- O backend criptografa a senha e cria o usuário.
- O backend retorna token e usuário formatado.
- O frontend salva a sessão, mostra pop-up e redireciona para a página inicial.

## 34. Fluxo de Login

- O usuário abre `login.html`.
- O usuário informa e-mail e senha.
- O frontend envia POST para `/api/auth/login`.
- O backend busca o usuário pelo e-mail.
- O backend compara a senha digitada com o hash salvo.
- Se os dados forem inválidos, o backend retorna erro.
- Se forem válidos, o backend retorna token e usuário.
- O frontend salva `pmcoreToken` e `pmcoreUsuario`.
- O usuário é redirecionado para a tela de perfil.

## 35. Fluxo de Contratação de Plano

- O usuário acessa `planos.html`.
- O usuário escolhe um plano Básico ou Pro.
- A URL da tela de pagamento recebe o plano escolhido.
- O usuário seleciona período mensal ou anual.
- O usuário confirma o pagamento simulado.
- O frontend exige token para continuar.
- O frontend envia POST para `/api/plans/purchase`.
- O backend salva o plano dentro do documento do usuário.
- A tela mostra o pop-up Compra Finalizada.

## 36. Fluxo de Perfil

- O usuário acessa `perfil.html`.
- O script verifica se existe token.
- O frontend busca dados em `/api/user/profile`.
- O backend valida o token pelo middleware.
- O backend retorna nome, e-mail e plano.
- A tela preenche os campos com os dados recebidos.
- Se não houver plano, exibe Você não possui nenhum plano.
- Se houver plano, renderiza o card com ações.
- O usuário pode editar dados ou excluir a conta.

## 37. Fluxo de Dashboard

- O usuário clica em Acessar Ambiente no perfil.
- O dashboard verifica se existe token local.
- O dashboard busca o perfil real na API.
- Se não houver plano ativo, redireciona para o perfil.
- Se houver plano ativo, carrega a interface interna.
- A tela mostra indicadores financeiros demonstrativos.
- A tela mostra projetos e movimentações de exemplo.
- O usuário pode sair pelo botão Sair.
- Ao sair, o token é removido e a sessão é encerrada.

## 38. Regras de Acesso

- Visitantes podem acessar página inicial, planos, detalhes, contato, login e cadastro.
- Visitantes sem token não devem acessar perfil.
- Visitantes sem token não devem acessar dashboard.
- Usuários logados podem acessar perfil.
- Usuários logados podem contratar plano.
- Usuários logados sem plano não acessam dashboard.
- Usuários com plano ativo acessam dashboard.
- Usuários podem editar dados próprios.
- Usuários podem excluir a própria conta.

## 39. Preços dos Planos

- O Plano Básico mensal custa R$ 49,90.
- O Plano Básico anual custa R$ 508,98.
- O Plano Pro mensal custa R$ 99,90.
- O Plano Pro anual custa R$ 1.018,98.
- O valor anual considera desconto de 15% em relação ao mensal acumulado.
- Os preços aparecem em detalhes de plano e pagamento.
- O preço contratado é salvo em `plano.preco`.
- O sistema atual não processa pagamento real.
- A contratação serve para registrar funcionalmente o plano no banco.

## 40. Segurança e Boas Práticas

- Não commitar `.env` no GitHub.
- Não commitar `node_modules` no GitHub.
- Usar senhas fortes para usuários do Atlas.
- Manter `JWT_SECRET` fora do código público.
- Não salvar senha no navegador.
- Validar dados também no backend.

## 41. Git e GitHub

- O projeto foi versionado com Git.
- O repositório remoto foi configurado com `origin`.
- O comando `git remote -v` confirma o repositório conectado.
- O `.gitignore` protege arquivos sensíveis e pesados.
- O comando `git status` deve ser usado antes do commit.
- O comando `git add .` prepara arquivos para commit.
- O comando `git commit -m` registra as alterações localmente.
- O comando `git push -u origin main` envia para o GitHub.
- Mensagens de commit devem descrever a mudança realizada.

## 42. Como Rodar Localmente

- Abrir a pasta raiz do PMCore no VS Code.
- Criar ou conferir o arquivo `.env` na raiz.
- Executar `npm install` para instalar dependências.
- Executar `node server.js` para iniciar o servidor.
- Aguardar a mensagem MongoDB conectado com sucesso.
- Abrir `http://localhost:3000` no navegador.
- Não usar Live Server após a integração com backend.
- Testar cadastro, login, pagamento, perfil e dashboard.
- Verificar os dados no MongoDB Atlas pelo Data Explorer.

## 43. Testes Recomendados

- Testar cadastro com e-mail novo.
- Testar cadastro com e-mail já existente.
- Testar login com senha incorreta.
- Testar login com dados corretos.
- Testar contratação do Plano Básico mensal.
- Testar contratação do Plano Pro anual.
- Testar perfil sem plano e com plano.
- Testar acesso ao dashboard sem plano.
- Testar exclusão de conta e limpeza da sessão.

## 44. Problemas Resolvidos

- Correção do fechamento incorreto em `detalhesPlano.js`.
- Correção do botão Entrar que não mudava para Perfil.
- Remoção de nome fixo no perfil.
- Substituição do localStorage falso por API real.
- Correção da connection string do MongoDB.
- Resolução de erro DNS relacionado a `mongodb+srv`.
- Resolução de erro de IP não liberado no MongoDB Atlas.
- Organização das telas dentro da pasta `public`.
- Configuração correta de Git remoto e `.gitignore`.

## 45. Conclusão

- O PMCore foi implementado como uma aplicação web acadêmica com frontend, backend, autenticação e banco de dados.
- O sistema possui páginas de apresentação, planos, detalhes de plano, pagamento, login, cadastro, contato, perfil e dashboard.
- O fluxo de cadastro, login, edição de perfil, exclusão de conta e contratação simulada de plano está estruturado.
- O MongoDB Atlas armazena usuários e planos contratados.
- O JWT protege rotas internas e mantém a sessão do usuário no navegador.
- O bcryptjs protege as senhas antes do armazenamento no banco.
- O dashboard apresenta uma visão demonstrativa de indicadores financeiros, projetos e movimentações.
- A estrutura atual é adequada para apresentação acadêmica e demonstração das funcionalidades implementadas.
- Esta documentação registra apenas os recursos existentes no estado atual do projeto.
