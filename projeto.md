# Projeto: Plataforma de Gestão de Eventos

## Objetivo

Desenvolver uma plataforma de gestão de eventos presenciais e online. A aplicação deve permitir que organizadores criem eventos e que participantes se inscrevam neles, garantindo a
integridade das inscrições e a segurança dos dados.

## Requisitos Funcionais (RF)

### Autenticação

- **RF01:** Permitir login de Organizadores e Participantes via Token (Bearer Token).

### Módulo: Participante

- **RF02:** Cadastro de novo participante (Nome, e-mail, CPF).
- **RF03:** Participante logado pode editar seus próprios dados.
- **RF04:** Participante logado pode visualizar todos os eventos em que está inscrito.
- **RF05:** Participante pode cancelar sua inscrição em um evento.

### Módulo: Organizador

- **RF06:** Cadastro de novo organizador.
- **RF07:** Organizador logado pode criar um novo evento.
- **RF08:** Organizador logado pode editar dados de um evento que ele criou.
- **RF09:** Organizador logado pode excluir um evento que ele criou (apenas se não houver inscritos).
- **RF10:** Organizador pode visualizar a lista de participantes de um evento seu.

## Regras de Negócio (RN)

- **RN01 – Capacidade:** O evento deve ter um limite máximo de participantes. O sistema deve impedir novas inscrições se a capacidade for atingida.
- **RN02 – Conflito de Horário:** Um participante não pode se inscrever em dois eventos que ocorram no mesmo dia e horário.
- **RN03 – Unicidade:** O participante não pode se inscrever duas vezes no mesmo evento.
- **RN04 – Propriedade (Ownership):** Um organizador não pode alterar ou deletar eventos criados por outros organizadores. O sistema deve validar isso via Token.
- **RN05 – Dados do Evento:** Deve conter Nome, Data/Hora, Localização e Capacidade Máxima.
