001 - # Documentação Técnica e Funcional — PMCore
002 - - **Projeto:** PMCore, plataforma acadêmica para controle financeiro e gerenciamento de projetos.
003 - - **Contexto:** o sistema foi criado a partir de telas desenhadas no Figma e depois implementadas em código.
004 - - **Objetivo:** centralizar informações financeiras, planos, perfil de usuário e indicadores em uma aplicação web.
005 - - **Foco:** pequenas e médias equipes que desejam reduzir dependência de planilhas extensas.
006 - - **Escopo atual:** frontend completo, backend Express, autenticação com JWT e banco MongoDB Atlas conectado.
007 - - **Abordagem:** primeiro foram feitas as telas, depois as rotas e por fim a persistência de dados.
008 - - **Tipo de entrega:** projeto acadêmico com potencial de evolução para MVP de startup universitária.
009 - - **Público de avaliação:** professores, colegas, possíveis usuários leigos e interessados em gestão financeira.
010 - - **Estado geral:** funcional para cadastro, login, perfil, contratação simulada de plano e acesso ao dashboard.
011 - ## 1. Visão Geral do PMCore
012 - - O PMCore é uma aplicação web para organizar dados financeiros de projetos de forma simples.
013 - - A solução apresenta uma landing page institucional para explicar o valor da plataforma.
014 - - A tela de planos permite comparar as opções Básico e Pro antes da contratação.
015 - - A tela de pagamento simula a assinatura de um plano e grava esse plano no banco.
016 - - A tela de perfil centraliza dados pessoais e a situação do plano contratado.
017 - - O dashboard mostra uma visão inicial de receitas, despesas, saldo e projetos fictícios.
018 - - O backend atua como intermediário entre o navegador e o MongoDB Atlas.
019 - - A autenticação impede que usuários sem login acessem áreas internas do sistema.
020 - - A arquitetura foi montada para permitir crescimento gradual sem recomeçar o projeto.
021 - ## 2. Problema que o Projeto Resolve
022 - - Muitas equipes ainda acompanham projetos em planilhas manuais e arquivos dispersos.
023 - - Esse modelo dificulta a visualização rápida do orçamento e dos principais indicadores.
024 - - A duplicação de informações aumenta a chance de erro e retrabalho.
025 - - A falta de centralização reduz a confiabilidade dos dados usados na tomada de decisão.
026 - - O PMCore propõe uma interface única para reunir planos, perfil e dados financeiros.
027 - - O sistema reduz a necessidade de procurar dados em várias fontes diferentes.
028 - - A plataforma ajuda a transformar informações financeiras em uma visualização mais objetiva.
029 - - O projeto também serve como demonstração acadêmica de integração frontend, backend e banco.
030 - - A solução foi pensada para ser compreensível também para pessoas sem conhecimento técnico profundo.
031 - ## 3. Objetivos Funcionais
032 - - Permitir que visitantes entendam a proposta do PMCore pela página inicial.
033 - - Permitir que usuários consultem planos disponíveis antes de criar ou usar uma conta.
034 - - Permitir que usuários visualizem detalhes completos dos planos Básico e Pro.
035 - - Permitir cadastro de conta com nome, e-mail e senha.
036 - - Permitir login com e-mail e senha usando validação no backend.
037 - - Permitir edição de dados pessoais na tela de perfil.
038 - - Permitir contratação simulada de plano e gravação do plano no MongoDB.
039 - - Permitir acesso ao dashboard apenas para usuários com plano ativo.
040 - - Permitir exclusão da conta do usuário por meio da tela de perfil.
041 - ## 4. Objetivos Não Funcionais
042 - - Manter o visual simples, direto e compatível com o protótipo do Figma.
043 - - Evitar complexidade excessiva para preservar clareza em uma entrega acadêmica.
044 - - Separar os arquivos públicos do frontend da estrutura do backend.
045 - - Proteger senhas com criptografia antes de salvar no banco de dados.
046 - - Guardar informações sensíveis como conexão do banco dentro do arquivo `.env`.
047 - - Evitar envio de `.env` e `node_modules` para o GitHub.
048 - - Usar rotas REST para organizar a comunicação entre frontend e servidor.
049 - - Manter o sistema executável localmente por `http://localhost:3000`.
050 - - Preparar a aplicação para hospedagem futura em uma plataforma web.
051 - ## 5. Stack de Tecnologias
052 - - HTML5 foi usado para estruturar as páginas visuais do sistema.
053 - - CSS3 foi usado para definir cores, espaçamentos, cards, formulários e responsividade.
054 - - JavaScript foi usado no navegador para interações, validações e requisições à API.
055 - - Node.js foi usado como ambiente de execução do backend.
056 - - Express foi usado para criar o servidor HTTP e organizar as rotas.
057 - - MongoDB Atlas foi usado como banco de dados em nuvem.
058 - - Mongoose foi usado para criar schema, model e conexão com o MongoDB.
059 - - JWT foi usado para autenticar usuários por token.
060 - - bcryptjs foi usado para criptografar senhas antes de armazená-las.
061 - ## 6. Estrutura Geral do Projeto
062 - - A pasta `public` contém os arquivos acessados pelo navegador.
063 - - A pasta `public/css` contém o arquivo principal de estilos `style.css`.
064 - - A pasta `public/js` contém scripts de navegação, autenticação, perfil e dashboard.
065 - - A pasta `public/assets/images` armazena imagens usadas nas telas visuais.
066 - - A pasta `models` contém os modelos de dados do MongoDB.
067 - - A pasta `routes` contém as rotas de autenticação, perfil e planos.
068 - - A pasta `middleware` contém o middleware de autenticação JWT.
069 - - O arquivo `server.js` inicializa o Express, registra rotas e conecta ao banco.
070 - - O arquivo `.env` guarda configurações locais sensíveis como `MONGO_URI` e `JWT_SECRET`.
071 - ## 7. Página Inicial — Landing Page
072 - - A landing page é a primeira apresentação do PMCore ao usuário visitante.
073 - - O cabeçalho possui logo, links para recursos, planos, contato e botão de autenticação.
074 - - Quando o usuário não está logado, o botão do cabeçalho exibe Entrar.
075 - - Quando o usuário está logado, o botão passa a exibir Perfil.
076 - - A seção principal comunica a proposta de controle financeiro sem planilhas intermináveis.
077 - - A seção de recursos mostra benefícios como dashboards simples e centralização.
078 - - A seção de planos apresenta um resumo visual das opções Básico e Pro.
079 - - O rodapé identifica o projeto como acadêmico.
080 - - A página carrega `nav.js` para atualizar o estado do botão do cabeçalho.
081 - ## 8. Tela de Planos
082 - - A tela de planos apresenta as assinaturas disponíveis para o usuário.
083 - - O Plano Básico é apresentado como opção para equipes pequenas e poucos projetos.
084 - - O Plano Pro é apresentado como opção para equipes com maior volume de projetos.
085 - - Cada plano possui imagem, título, descrição curta e lista de recursos.
086 - - O botão Ver detalhes envia o usuário para a página dinâmica de detalhes.
087 - - O botão Escolher envia o usuário para a tela de pagamento.
088 - - Os links usam parâmetros de URL para informar plano e período ao JavaScript.
089 - - A tela mantém identidade visual escura no cabeçalho e cards claros no conteúdo.
090 - - Essa tela representa a etapa comercial de seleção de plano dentro do fluxo.
091 - ## 9. Tela de Detalhes do Plano
092 - - A tela de detalhes usa `detalhesPlano.js` para decidir qual plano será exibido.
093 - - O parâmetro `?plano=basico` carrega dados do Plano Básico.
094 - - O parâmetro `?plano=pro` carrega dados do Plano Pro.
095 - - Se o parâmetro for ausente ou inválido, o sistema usa o Básico como padrão.
096 - - A tela mostra tag, título, subtítulo, imagem, preço e descrição.
097 - - A tela também mostra público indicado e recursos incluídos.
098 - - Existe um comparativo rápido entre Básico e Pro.
099 - - O botão Escolher este plano direciona para a tela de pagamento.
100 - - Essa página evita duplicação, pois uma única tela atende os dois planos.
101 - ## 10. Tela de Pagamento
102 - - A tela de pagamento simula a contratação de um plano pelo usuário.
103 - - O plano selecionado vem pela URL e é interpretado pelo arquivo `pagamento.js`.
104 - - O usuário pode alternar entre período mensal e anual.
105 - - O Plano Básico mensal custa R$ 49,90.
106 - - O Plano Básico anual custa R$ 508,98 com desconto de 15%.
107 - - O Plano Pro mensal custa R$ 99,90.
108 - - O Plano Pro anual custa R$ 1.018,98 com desconto de 15%.
109 - - Ao confirmar, o frontend envia os dados para `/api/plans/purchase`.
110 - - Depois da confirmação, um pop-up informa Compra Finalizada e permite ir ao Perfil.
111 - ## 11. Tela de Login
112 - - A tela de login recebe e-mail e senha do usuário.
113 - - O envio é interceptado por `auth.js` para evitar recarregamento da página.
114 - - O frontend envia uma requisição POST para `/api/auth/login`.
115 - - O backend procura o e-mail no MongoDB.
116 - - Se o usuário existir, a senha digitada é comparada com o hash salvo.
117 - - A comparação é feita com bcryptjs.
118 - - Se a autenticação for válida, o backend gera um token JWT.
119 - - O token é salvo no navegador como `pmcoreToken`.
120 - - Após login, o usuário é redirecionado para `perfil.html`.
121 - ## 12. Tela de Cadastro
122 - - A tela de cadastro recebe nome, e-mail, senha e confirmação de senha.
123 - - O usuário precisa aceitar os termos antes de finalizar o cadastro.
124 - - O frontend valida campos vazios e igualdade entre senha e confirmação.
125 - - Depois da validação, os dados são enviados para `/api/auth/register`.
126 - - O backend verifica se o e-mail já existe no MongoDB.
127 - - Se o e-mail estiver livre, a senha é criptografada com bcryptjs.
128 - - O usuário é criado na collection `users`.
129 - - O backend gera um token JWT para iniciar a sessão automaticamente.
130 - - Um pop-up confirma a criação da conta e redireciona para a página inicial.
131 - ## 13. Tela de Contato
132 - - A tela de contato possui campos de nome, e-mail, assunto e mensagem.
133 - - Existe uma opção visual para anexar arquivos, embora o upload real ainda não exista.
134 - - O usuário precisa concordar com o uso dos dados para retorno do contato.
135 - - O script `contato.js` valida campos obrigatórios antes de confirmar o envio.
136 - - No estado atual, o envio é apenas simulado no frontend.
137 - - Após validação, a tela mostra um pop-up de mensagem enviada.
138 - - O usuário é redirecionado para a página inicial após alguns segundos.
139 - - No futuro, a mensagem pode ser salva em uma collection específica do MongoDB.
140 - - Também é possível integrar essa tela a um serviço real de e-mail.
141 - ## 14. Tela de Perfil
142 - - A tela de perfil é uma área protegida por autenticação.
143 - - Ela exige token JWT salvo no navegador.
144 - - O script `perfil.js` busca os dados reais em `/api/user/profile`.
145 - - A tela exibe nome, e-mail e campo de nova senha opcional.
146 - - Os campos podem ser editados pelo ícone de lápis.
147 - - Ao salvar, os dados são enviados por PUT para `/api/user/profile`.
148 - - Se uma nova senha for enviada, o backend criptografa antes de salvar.
149 - - A tela exibe o plano contratado ou a mensagem de ausência de plano.
150 - - O botão Excluir Conta chama DELETE em `/api/user/profile` e remove a conta do banco.
151 - ## 15. Tela de Dashboard
152 - - O dashboard representa o ambiente interno do PMCore.
153 - - Ele só abre se houver token válido no navegador.
154 - - Ele também exige que o usuário tenha um plano contratado.
155 - - Se o usuário não estiver logado, ele é enviado para login.
156 - - Se o usuário estiver logado sem plano, ele é enviado para o perfil.
157 - - A tela mostra receitas, despesas, saldo e número de projetos.
158 - - Os projetos e movimentações exibidos ainda são dados fictícios.
159 - - Existe uma área reservada para futura integração de agente de IA.
160 - - O botão Sair remove a sessão local e retorna para a página inicial.
161 - ## 17. Arquivo nav.js
162 - - O arquivo `nav.js` controla o botão Entrar ou Perfil no cabeçalho.
163 - - Ele verifica se existe `pmcoreToken` no localStorage.
164 - - Se existe token, o link muda para Perfil.
165 - - Se não existe token, o link fica como Entrar.
166 - - O botão precisa possuir o atributo `data-auth-link` no HTML.
167 - - Esse script deve ser carregado em todas as páginas com cabeçalho.
168 - - Ele evita que cada página tenha lógica própria de navegação autenticada.
169 - - O comportamento visual depende do estado local da sessão.
170 - - Se o usuário sair, o token é removido e o botão volta a ser Entrar.
171 - ## 18. Arquivo auth.js
172 - - O arquivo `auth.js` controla login e cadastro no frontend.
173 - - Ele intercepta o envio dos formulários para usar fetch em vez de recarregar a página.
174 - - No cadastro, envia nome, e-mail e senha para `/api/auth/register`.
175 - - No login, envia e-mail e senha para `/api/auth/login`.
176 - - Ele trata respostas de erro exibindo mensagens ao usuário.
177 - - Quando o backend retorna token, ele salva `pmcoreToken` no localStorage.
178 - - Também salva uma cópia básica do usuário em `pmcoreUsuario`.
179 - - Após login, redireciona para a tela de perfil.
180 - - Após cadastro, exibe pop-up e depois volta para a landing page.
181 - ## 19. Arquivo pagamento.js
182 - - O arquivo `pagamento.js` interpreta o plano escolhido pela URL.
183 - - Ele define os preços mensais e anuais dos planos Básico e Pro.
184 - - Ele atualiza o resumo visual quando o usuário troca o período.
185 - - Ele verifica se existe token antes de permitir contratação.
186 - - Se não houver token, envia o usuário para login.
187 - - Ao confirmar pagamento, envia POST para `/api/plans/purchase`.
188 - - O corpo da requisição inclui tipo do plano e período.
189 - - Quando o backend confirma, atualiza o usuário salvo localmente.
190 - - Depois exibe o pop-up de compra finalizada.
191 - ## 20. Arquivo perfil.js
192 - - O arquivo `perfil.js` protege e preenche a tela de perfil.
193 - - Ele exige token salvo no localStorage.
194 - - Ele busca os dados reais do usuário em `/api/user/profile`.
195 - - Ele preenche nome e e-mail com dados vindos do MongoDB.
196 - - Ele deixa a senha vazia porque a senha real nunca deve voltar ao frontend.
197 - - Ele renderiza o card de plano ou a mensagem de ausência de plano.
198 - - Ele permite habilitar campos para edição por botões de lápis.
199 - - Ele salva alterações por meio de requisição PUT autenticada.
200 - - Ele exclui a conta usando requisição DELETE autenticada.
201 - ## 21. Arquivo dashboard.js
202 - - O arquivo `dashboard.js` controla o acesso ao dashboard.
203 - - Ele verifica se existe token antes de carregar a página.
204 - - Ele busca o perfil real para confirmar se existe plano ativo.
205 - - Se não houver plano, redireciona para o perfil.
206 - - Ele carrega cards de resumo financeiro com dados fictícios.
207 - - Ele renderiza projetos em andamento com barra de progresso.
208 - - Ele renderiza resumo por categoria em barras visuais.
209 - - Ele renderiza uma tabela de movimentações financeiras.
210 - - Ele controla o botão Sair removendo token e usuário do localStorage.
211 - ## 22. Backend com Express
212 - - O backend é responsável por receber requisições do frontend.
213 - - Ele foi criado com Express para simplificar a criação de rotas.
214 - - Ele usa `express.json()` para interpretar corpos JSON.
215 - - Ele usa `express.static()` para servir os arquivos da pasta `public`.
216 - - Ele usa `cors()` para evitar bloqueios de comunicação em ambiente local.
217 - - As rotas são separadas em arquivos por domínio funcional.
218 - - A conexão com o MongoDB ocorre antes de iniciar o servidor.
219 - - Se a conexão falhar, o erro aparece no terminal.
220 - - Quando a conexão funciona, o servidor abre em `http://localhost:3000`.
221 - ## 23. Arquivo server.js
222 - - O `server.js` é o arquivo principal do backend.
223 - - Ele importa Express, Mongoose, dotenv, cors e path.
224 - - Ele importa as rotas `authRoutes`, `userRoutes` e `planRoutes`.
225 - - Ele carrega variáveis de ambiente com `dotenv.config()`.
226 - - Ele define a porta usando `process.env.PORT` ou 3000 como padrão.
227 - - Ele registra a pasta `public` como pasta estática.
228 - - Ele vincula `/api/auth` às rotas de autenticação.
229 - - Ele vincula `/api/user` às rotas de perfil.
230 - - Ele vincula `/api/plans` às rotas de contratação de planos.
231 - ## 24. Model User.js
232 - - O model `User.js` define a estrutura do usuário no MongoDB.
233 - - O campo `nome` armazena o nome informado no cadastro ou perfil.
234 - - O campo `email` é obrigatório, único, normalizado e usado no login.
235 - - O campo `senha` guarda o hash da senha criada ou atualizada.
236 - - O campo `plano.tipo` guarda `basico`, `pro` ou null.
237 - - O campo `plano.nome` guarda o nome exibido do plano.
238 - - O campo `plano.periodo` guarda mensal, anual ou null.
239 - - O campo `plano.preco` guarda o valor contratado.
240 - - O campo `criadoEm` registra automaticamente a data de criação da conta.
241 - ## 25. authMiddleware.js
242 - - O `authMiddleware.js` protege rotas que dependem de login.
243 - - Ele procura o cabeçalho Authorization na requisição.
244 - - O formato esperado é `Bearer TOKEN`.
245 - - Se o token não existir, retorna status 401.
246 - - Se o formato estiver incorreto, retorna status 401.
247 - - Se a validação do JWT falhar, retorna status 401.
248 - - Se o token for válido, extrai o id do usuário.
249 - - O id do usuário é anexado em `req.userId`.
250 - - As rotas protegidas usam esse id para buscar o usuário no MongoDB.
251 - ## 26. Rotas de Autenticação
252 - - As rotas de autenticação ficam no arquivo `authRoutes.js`.
253 - - A rota POST `/api/auth/register` cria uma nova conta.
254 - - A rota POST `/api/auth/login` autentica uma conta existente.
255 - - No cadastro, o backend exige nome, e-mail e senha.
256 - - No cadastro, o backend impede e-mails duplicados.
257 - - No cadastro, a senha é criptografada antes de salvar.
258 - - No login, o backend valida e-mail e senha.
259 - - Em sucesso, ambas as rotas retornam token e usuário formatado.
260 - - A senha nunca é enviada de volta ao navegador.
261 - ## 27. Rotas de Perfil
262 - - As rotas de perfil ficam no arquivo `userRoutes.js`.
263 - - A rota GET `/api/user/profile` retorna os dados do usuário logado.
264 - - A rota PUT `/api/user/profile` atualiza nome, e-mail e senha.
265 - - A rota DELETE `/api/user/profile` exclui a conta do usuário.
266 - - Todas as rotas de perfil usam `authMiddleware`.
267 - - A atualização de e-mail verifica se outro usuário já usa o mesmo e-mail.
268 - - A atualização de senha aplica bcrypt antes de salvar.
269 - - A exclusão remove o documento do usuário no MongoDB.
270 - - Essas rotas sustentam a tela de perfil do sistema.
271 - ## 28. Rotas de Planos
272 - - As rotas de planos ficam no arquivo `planRoutes.js`.
273 - - A rota POST `/api/plans/purchase` registra a contratação de plano.
274 - - A rota exige token JWT válido.
275 - - O frontend envia `tipo` e `periodo` no corpo da requisição.
276 - - O backend valida se o tipo é Básico ou Pro.
277 - - O backend valida se o período é mensal ou anual.
278 - - O plano escolhido é salvo dentro do documento do usuário.
279 - - A data de compra é registrada com `new Date()`.
280 - - A resposta retorna o plano salvo para atualização da interface.
281 - ## 29. MongoDB Atlas
282 - - O MongoDB Atlas é o banco em nuvem usado pelo PMCore.
283 - - O projeto usa um cluster remoto para armazenar usuários.
284 - - O banco configurado na connection string se chama `pmcore`.
285 - - A collection de usuários é criada automaticamente como `users`.
286 - - O Atlas exige usuário e senha de banco para conexão.
287 - - O Atlas exige liberação do IP em Network Access.
288 - - Se o IP não estiver liberado, a conexão falha com erro de whitelist.
289 - - Se a rede bloquear DNS SRV, pode ocorrer erro `querySrv ECONNREFUSED`.
290 - - Depois da conexão correta, o terminal mostra MongoDB conectado com sucesso.
291 - ## 30. Variáveis de Ambiente
292 - - O arquivo `.env` guarda informações que não devem ficar no código público.
293 - - `PORT` define a porta do servidor local.
294 - - `MONGO_URI` define a conexão com o MongoDB Atlas.
295 - - `JWT_SECRET` define a chave usada para assinar tokens JWT.
296 - - A senha real do MongoDB fica dentro de `MONGO_URI`.
297 - - O `.env` deve estar listado no `.gitignore`.
298 - - Se a senha aparecer em print ou commit, ela deve ser trocada no Atlas.
299 - - Em hospedagem, essas variáveis devem ser cadastradas no painel do provedor.
300 - - Sem `.env` correto, o backend não conecta ao banco nem gera tokens corretamente.
301 - ## 31. Autenticação JWT
302 - - JWT significa JSON Web Token.
303 - - No PMCore, o JWT representa a sessão do usuário logado.
304 - - O backend gera o token após cadastro ou login bem-sucedido.
305 - - O token contém o id do usuário assinado com `JWT_SECRET`.
306 - - O frontend guarda o token em `localStorage`.
307 - - Rotas protegidas exigem o token no cabeçalho Authorization.
308 - - O middleware verifica se o token é válido.
309 - - Se o token for inválido ou expirado, o acesso é bloqueado.
310 - - O token atual foi configurado com validade de 7 dias.
311 - ## 32. Criptografia com bcryptjs
312 - - O PMCore não salva senhas em texto puro.
313 - - Ao cadastrar, a senha passa por `bcrypt.hash()`.
314 - - O resultado é um hash salvo no campo `senha` do usuário.
315 - - Ao logar, a senha digitada passa por `bcrypt.compare()`.
316 - - A comparação confirma se a senha corresponde ao hash salvo.
317 - - Ao atualizar senha no perfil, o mesmo processo de hash é aplicado.
318 - - O hash reduz o risco caso o banco seja visualizado indevidamente.
319 - - O frontend nunca recebe a senha real nem o hash da senha.
320 - - Essa prática é essencial para qualquer sistema com autenticação.
321 - ## 33. LocalStorage no Projeto
322 - - O localStorage deixou de ser o banco falso principal do projeto.
323 - - Agora ele guarda apenas dados de sessão no navegador.
324 - - A chave `pmcoreToken` guarda o token JWT.
325 - - A chave `pmcoreUsuario` guarda uma cópia simples do usuário.
326 - - A fonte oficial dos dados é o MongoDB.
327 - - Se o localStorage for limpo, o usuário precisa logar novamente.
328 - - O botão Entrar ou Perfil depende do token salvo.
329 - - O dashboard depende do token para validar acesso.
330 - - O comando `localStorage.clear()` reseta a sessão local durante testes.
331 - ## 34. Fluxo de Cadastro
332 - - O usuário abre `cadastro.html`.
333 - - O usuário preenche nome, e-mail, senha e confirmação.
334 - - O usuário marca o aceite dos termos.
335 - - O frontend valida os campos.
336 - - O frontend envia POST para `/api/auth/register`.
337 - - O backend verifica duplicidade de e-mail.
338 - - O backend criptografa a senha e cria o usuário.
339 - - O backend retorna token e usuário formatado.
340 - - O frontend salva a sessão, mostra pop-up e redireciona para a página inicial.
341 - ## 35. Fluxo de Login
342 - - O usuário abre `login.html`.
343 - - O usuário informa e-mail e senha.
344 - - O frontend envia POST para `/api/auth/login`.
345 - - O backend busca o usuário pelo e-mail.
346 - - O backend compara a senha digitada com o hash salvo.
347 - - Se os dados forem inválidos, o backend retorna erro.
348 - - Se forem válidos, o backend retorna token e usuário.
349 - - O frontend salva `pmcoreToken` e `pmcoreUsuario`.
350 - - O usuário é redirecionado para a tela de perfil.
351 - ## 36. Fluxo de Contratação de Plano
352 - - O usuário acessa `planos.html`.
353 - - O usuário escolhe um plano Básico ou Pro.
354 - - A URL da tela de pagamento recebe o plano escolhido.
355 - - O usuário seleciona período mensal ou anual.
356 - - O usuário confirma o pagamento simulado.
357 - - O frontend exige token para continuar.
358 - - O frontend envia POST para `/api/plans/purchase`.
359 - - O backend salva o plano dentro do documento do usuário.
360 - - A tela mostra o pop-up Compra Finalizada.
361 - ## 37. Fluxo de Perfil
362 - - O usuário acessa `perfil.html`.
363 - - O script verifica se existe token.
364 - - O frontend busca dados em `/api/user/profile`.
365 - - O backend valida o token pelo middleware.
366 - - O backend retorna nome, e-mail e plano.
367 - - A tela preenche os campos com os dados recebidos.
368 - - Se não houver plano, exibe Você não possui nenhum plano.
369 - - Se houver plano, renderiza o card com ações.
370 - - O usuário pode editar dados ou excluir a conta.
371 - ## 38. Fluxo de Dashboard
372 - - O usuário clica em Acessar Ambiente no perfil.
373 - - O dashboard verifica se existe token local.
374 - - O dashboard busca o perfil real na API.
375 - - Se não houver plano ativo, redireciona para o perfil.
376 - - Se houver plano ativo, carrega a interface interna.
377 - - A tela mostra indicadores financeiros fictícios.
378 - - A tela mostra projetos e movimentações de exemplo.
379 - - O usuário pode sair pelo botão Sair.
380 - - Ao sair, o token é removido e a sessão é encerrada.
381 - ## 39. Regras de Acesso
382 - - Visitantes podem acessar página inicial, planos, detalhes, contato, login e cadastro.
383 - - Visitantes sem token não devem acessar perfil.
384 - - Visitantes sem token não devem acessar dashboard.
385 - - Usuários logados podem acessar perfil.
386 - - Usuários logados podem contratar plano.
387 - - Usuários logados sem plano não acessam dashboard.
388 - - Usuários com plano ativo acessam dashboard.
389 - - Usuários podem editar dados próprios.
390 - - Usuários podem excluir a própria conta.
391 - ## 40. Preços dos Planos
392 - - O Plano Básico mensal custa R$ 49,90.
393 - - O Plano Básico anual custa R$ 508,98.
394 - - O Plano Pro mensal custa R$ 99,90.
395 - - O Plano Pro anual custa R$ 1.018,98.
396 - - O valor anual considera desconto de 15% em relação ao mensal acumulado.
397 - - Os preços aparecem em detalhes de plano e pagamento.
398 - - O preço contratado é salvo em `plano.preco`.
399 - - O sistema atual não processa pagamento real.
400 - - A contratação serve para registrar funcionalmente o plano no banco.
401 - ## 41. Segurança e Boas Práticas
402 - - Não commitar `.env` no GitHub.
403 - - Não commitar `node_modules` no GitHub.
404 - - Trocar a senha do MongoDB se ela for exposta.
405 - - Usar senhas fortes para usuários do Atlas.
406 - - Evitar liberar `0.0.0.0/0` em produção.
407 - - Manter `JWT_SECRET` fora do código público.
408 - - Não salvar senha no navegador.
409 - - Validar dados também no backend.
410 - - Usar HTTPS quando o projeto for hospedado.
411 - ## 42. Git e GitHub
412 - - O projeto foi versionado com Git.
413 - - O repositório remoto foi configurado com `origin`.
414 - - O comando `git remote -v` confirma o repositório conectado.
415 - - O `.gitignore` protege arquivos sensíveis e pesados.
416 - - O comando `git status` deve ser usado antes do commit.
417 - - O comando `git add .` prepara arquivos para commit.
418 - - O comando `git commit -m` registra as alterações localmente.
419 - - O comando `git push -u origin main` envia para o GitHub.
420 - - Mensagens de commit devem descrever a mudança realizada.
421 - ## 43. Como Rodar Localmente
422 - - Abrir a pasta raiz do PMCore no VS Code.
423 - - Criar ou conferir o arquivo `.env` na raiz.
424 - - Executar `npm install` para instalar dependências.
425 - - Executar `node server.js` para iniciar o servidor.
426 - - Aguardar a mensagem MongoDB conectado com sucesso.
427 - - Abrir `http://localhost:3000` no navegador.
428 - - Não usar Live Server após a integração com backend.
429 - - Testar cadastro, login, pagamento, perfil e dashboard.
430 - - Verificar os dados no MongoDB Atlas pelo Data Explorer.
431 - ## 44. Testes Recomendados
432 - - Testar cadastro com e-mail novo.
433 - - Testar cadastro com e-mail já existente.
434 - - Testar login com senha incorreta.
435 - - Testar login com dados corretos.
436 - - Testar contratação do Plano Básico mensal.
437 - - Testar contratação do Plano Pro anual.
438 - - Testar perfil sem plano e com plano.
439 - - Testar acesso ao dashboard sem plano.
440 - - Testar exclusão de conta e limpeza da sessão.
441 - ## 45. Problemas Resolvidos
442 - - Correção do fechamento incorreto em `detalhesPlano.js`.
443 - - Correção do botão Entrar que não mudava para Perfil.
444 - - Remoção de nome fixo no perfil.
445 - - Substituição do localStorage falso por API real.
446 - - Correção da connection string do MongoDB.
447 - - Resolução de erro DNS relacionado a `mongodb+srv`.
448 - - Resolução de erro de IP não liberado no MongoDB Atlas.
449 - - Organização das telas dentro da pasta `public`.
450 - - Configuração correta de Git remoto e `.gitignore`.
451 - ## 46. Limitações Atuais
452 - - O dashboard ainda usa dados financeiros fictícios.
453 - - O pagamento ainda é apenas simulado.
454 - - O formulário de contato ainda não salva dados no MongoDB.
455 - - Não existe recuperação real de senha.
456 - - Não existe validação real de CPF ou cartão.
457 - - Não existe CRUD real de projetos.
458 - - Não existe CRUD real de receitas e despesas.
459 - - Não existe controle de permissões por equipe.
460 - - Não existe integração real com agente de IA.
461 - ## 47. Melhorias Futuras
462 - - Criar model de projetos no MongoDB.
463 - - Criar rotas CRUD para projetos.
464 - - Criar model de movimentações financeiras.
465 - - Permitir cadastro real de receitas e despesas.
466 - - Transformar o dashboard em painel dinâmico.
467 - - Criar gráficos baseados nos dados do banco.
468 - - Criar envio real de contato por e-mail.
469 - - Criar recuperação de senha.
470 - - Hospedar o projeto em uma plataforma pública.
471 - ## 48. Integração Futura com IA
472 - - A área de IA já aparece como espaço reservado no dashboard.
473 - - A IA pode interpretar receitas, despesas e saldo.
474 - - A IA pode sugerir alertas de risco financeiro.
475 - - A IA pode responder perguntas sobre projetos.
476 - - A IA pode gerar resumos mensais para gestores.
477 - - A IA pode identificar projetos que precisam de atenção.
478 - - A IA pode explicar indicadores em linguagem simples.
479 - - A IA deve usar dados reais do banco para gerar respostas úteis.
480 - - A integração deve ocorrer depois da criação dos módulos financeiros reais.
481 - ## 49. Hospedagem e Testes Externos
482 - - Outra pessoa pode testar localmente se tiver Node.js e o projeto completo.
483 - - Essa pessoa precisará executar `npm install`.
484 - - Ela precisará ter um `.env` válido.
485 - - O IP dela precisará estar liberado no MongoDB Atlas.
486 - - Outra opção é rodar o servidor em um computador e acessar pela mesma rede local.
487 - - Nesse caso, outros usuários acessam pelo IP local da máquina servidor.
488 - - Para acesso de qualquer lugar, o ideal é hospedar backend e frontend.
489 - - Na hospedagem, variáveis de ambiente devem ser configuradas no painel da plataforma.
490 - - Com hospedagem, os usuários acessam por um link público em vez de localhost.
491 - ## 50. Conclusão
492 - - O PMCore saiu de um protótipo visual para uma aplicação web integrada.
493 - - O projeto demonstra uso de frontend, backend, autenticação e banco de dados.
494 - - A aplicação possui fluxo funcional de cadastro, login, plano, perfil e dashboard.
495 - - O MongoDB Atlas armazena usuários e planos contratados.
496 - - O JWT protege rotas internas e mantém sessão no navegador.
497 - - O bcryptjs protege as senhas antes de salvar no banco.
498 - - A estrutura atual é adequada para apresentação acadêmica.
499 - - A próxima etapa recomendada é criar dados financeiros reais no dashboard.
500 - - Esta documentação resume as features, tecnologias, componentes e evolução do PMCore.
