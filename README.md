# 📅 Plataforma de Gestão de Eventos

Uma plataforma completa para gerenciamento de eventos presenciais e online. A aplicação permite que organizadores criem eventos e que participantes se inscrevam neles, garantindo a
integridade das inscrições e a segurança dos dados.

## 🎯 Objetivo

Desenvolver uma solução robusta para gestão de eventos com autenticação segura e controle de participantes, permitindo organizar e participar de eventos de forma prática e segura.

## 📦 Estrutura do Projeto

Este repositório contém duas aplicações principais:

### **Backend - Event Flow API** (`event-flow-api/`)

- Framework: **AdonisJS** (Node.js)
- Responsável pelas operações de negócio, autenticação e gerenciamento de dados
- Endpoints para gerenciamento de usuários, eventos e inscrições

### **Frontend - Event Flow Web** (`event-flow-web/`)

- Framework: **React**
- Interface para usuarios se autenticarem e gerenciarem seus eventos e inscrições

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### API

```bash
cd event-flow-api

# Instalar dependências
npm install

# Executar migrações do banco de dados
npm run migration:latest

# Iniciar servidor (porta 3333)
npm run dev
```

### Web

```bash
cd event-flow-web

# Instalar dependências
npm install

# Iniciar aplicação (porta 3000)
npm start
```

## ✨ Funcionalidades

### Autenticação

- Login de Organizadores e Participantes via Bearer Token

### Participante

- Cadastro e edição de dados pessoais
- Visualização de eventos inscritos
- Cancelamento de inscrições

### Organizador

- Criação e edição de eventos
- Exclusão de eventos (sem inscritos)
- Visualização de participantes inscritos

## 🔐 Regras de Negócio

- **Capacidade limitada:** Limite máximo de participantes por evento
- **Sem conflitos de horário:** Um participante não pode se inscrever em dois eventos simultaneamente
- **Unicidade:** Cada participante pode se inscrever uma única vez por evento
- **Propriedade:** Organizadores só podem modificar seus próprios eventos
- **Dados obrigatórios:** Nome, Data/Hora, Localização e Capacidade Máxima

## 👥 Contribuidores

Projeto desenvolvido como trabalho da faculdade em grupo.

## 📝 Licença

Projeto acadêmico - ADS1
