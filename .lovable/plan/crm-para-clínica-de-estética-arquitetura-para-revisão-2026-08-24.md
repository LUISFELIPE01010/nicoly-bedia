# CRM para Clínica de Estética — Arquitetura para Revisão

O site público atual (`/`) permanece intacto. Todo o CRM vive sob a rota `/admin`, com layout, autenticação e navegação próprios.

## 1. Fluxo de autenticação

- Backend: Lovable Cloud (banco Postgres + auth + storage já integrados, sem conta externa).
- Login por e-mail e senha em `/admin/login`. Sem cadastro público aberto: o primeiro usuário cria a empresa no primeiro acesso; usuários seguintes são convidados pelo admin em Configurações.
- Sessão persistida no navegador; rota `/admin/*` protegida por um guard que redireciona para o login quando não há sessão.
- Nenhuma chave de service role no frontend. O app usa somente a chave pública, e toda a proteção real vem das políticas RLS no banco.

## 2. Modelo de dados (todas as tabelas no schema `public`)

Multiempresa desde o início: cada tabela de negócio carrega `company_id`.

| Tabela | Campos principais | Relacionamentos |
|---|---|---|
| `companies` | nome, documento, telefone, endereço, fuso, criado_em | raiz do tenant |
| `profiles` | id (= usuário auth), company_id, nome, telefone, avatar | 1:1 com usuário, N:1 com empresa |
| `user_roles` | user_id, company_id, role (`owner`/`admin`/`atendente`) | tabela separada de papéis, por segurança |
| `lead_sources` | company_id, nome (Instagram, indicação, tráfego pago…), ativo | N:1 empresa |
| `procedures` | company_id, nome, descrição, duração_min, preço_base, ativo | N:1 empresa |
| `leads` | company_id, nome, telefone, email, source_id, procedure_id, status, temperatura, responsável_id, observações, próximo_followup_em | N:1 empresa/origem/procedimento/usuário |
| `clients` | company_id, lead_id (origem, opcional), nome, telefone, email, nascimento, endereço, observações, tags | N:1 empresa, 0..1 lead |
| `interactions` | company_id, lead_id ou client_id, tipo (ligação, mensagem, visita, nota), conteúdo, criado_por, criado_em | histórico cronológico |
| `follow_ups` | company_id, lead_id/client_id, agendado_para, canal, status (pendente/feito/atrasado), responsável, nota | fila de retorno |
| `appointments` | company_id, client_id ou lead_id, procedure_id, início, fim, status (agendado/confirmado/compareceu/faltou/cancelado), profissional, observações | base da Agenda |
| `sales` | company_id, client_id, appointment_id (opcional), data, valor_total, desconto, forma_pagamento, status (pago/pendente/parcial), criado_por | Atendimentos/Vendas |
| `sale_items` | sale_id, procedure_id, quantidade, valor_unitário | itens da venda |
| `pipeline_stages` | company_id, nome, ordem, cor | colunas do Kanban, configuráveis |
| `settings` | company_id, chave, valor (JSON) | preferências da clínica |

Regras de integridade: chaves estrangeiras com `on delete` adequado (cascata a partir de `companies`, `set null` em responsáveis), índices em `company_id`, `status`, `próximo_followup_em` e datas de agendamento.

Status de lead: `novo`, `contatado`, `qualificado`, `agendado`, `compareceu`, `cliente`, `perdido` — a posição no Kanban usa `pipeline_stages` para permitir personalização.

## 3. Segurança e RLS

- Função `get_user_company_id()` e `has_role(user_id, role)` como funções `security definer` (evitam recursão nas políticas).
- RLS habilitado em **todas** as tabelas. Padrão: `company_id = get_user_company_id()` para SELECT/INSERT/UPDATE/DELETE.
- `user_roles` só é lida pelo próprio usuário e por admins da mesma empresa; alterações restritas a `owner`/`admin`.
- Grants explícitos de Data API: `authenticated` recebe SELECT/INSERT/UPDATE/DELETE, `service_role` recebe ALL. Nenhum acesso para visitantes anônimos — o CRM é totalmente privado.
- Dados do site público não passam a depender do banco; nada muda lá.

## 4. Telas do CRM

- **Dashboard** — cartões de leads no período, agendamentos, comparecimentos, clientes novos, faturamento, ticket médio e taxa de conversão; gráficos de leads por origem e procedimentos mais procurados; filtro de período.
- **Leads** — tabela com busca, filtros por status/origem/responsável, criação e edição em painel lateral, histórico de interações.
- **Clientes** — ficha do cliente com dados, histórico de atendimentos, vendas e interações.
- **Pipeline Kanban** — colunas por estágio, arrastar e soltar para mudar status.
- **Follow-ups** — lista de pendentes/atrasados/hoje, marcar como feito, reagendar.
- **Agenda** — visão semanal e diária dos agendamentos, criação rápida, controle de comparecimento.
- **Procedimentos** — cadastro com preço, duração e status ativo.
- **Atendimentos/Vendas** — registro de venda com itens, valores, desconto e pagamento.
- **Relatórios** — desempenho por período, origem, procedimento e responsável, com exportação CSV.
- **Reativação** — clientes sem retorno há X dias e leads perdidos, com ação de gerar follow-up.
- **Configurações** — dados da clínica, usuários e papéis, origens de lead, estágios do pipeline.

## 5. Interface

Layout administrativo próprio: barra lateral fixa com ícones, cabeçalho com busca e usuário, densidade alta de informação, tabelas rápidas e formulários curtos. Visual sóbrio e neutro (não reaproveita a paleta do site público), pensado para uso diário.

## 6. Ordem de implementação

1. Ativar o backend e criar toda a estrutura de tabelas, funções, grants e RLS.
2. Autenticação, criação de empresa no primeiro acesso e guard de rotas.
3. Layout do admin com navegação.
4. Cadastros base: procedimentos, origens, estágios, configurações.
5. Leads, interações, Kanban e follow-ups.
6. Clientes, agenda, vendas.
7. Dashboard, relatórios e reativação.

Sem IA, WhatsApp, ManyChat ou automações nesta fase.
