---
name: final-code-review-report
description: Faz a auditoria final de código, integração, assets e documentação do Caminho Digital, registra arquivos alterados, testes, riscos e pendências e bloqueia declaração de pronto sem evidência.
---

# Objetivo

Realizar revisão final verificável, sem notas subjetivas e sem confundir presença de código com funcionamento.

# Checklist técnico

- erros/warnings relevantes no console;
- imports e paths;
- assets obrigatórios;
- IDs duplicados;
- timers/listeners limpos;
- instância Phaser única;
- funções mortas/refatorações inseguras;
- save e migração;
- deterministicidade de seed;
- colisões;
- cooldowns;
- performance óbvia;
- responsividade;
- fallback silencioso;
- placeholders críticos.

# Checklist funcional

- Tamagotchi abre;
- Digimon atual correto;
- Treino não aparece;
- Caminho Digital abre;
- player correto;
- sprite auditado;
- movimento;
- mapa;
- inimigos;
- três habilidades;
- vitória;
- derrota;
- retorno;
- reload;
- reentrada.

# Relatório final

Crie/atualize `docs/digital-path/final-report.md` com:

1. estado real;
2. o que funciona com evidência;
3. o que falha;
4. o que não foi verificado;
5. arquivos criados/alterados/movidos/removidos;
6. resumo da auditoria de sprites;
7. matriz de testes;
8. bugs conhecidos;
9. riscos;
10. próximas tarefas por bloqueador/crítico/MVP/qualidade/polimento.

# Regra de conclusão

Só use `DONE` para itens com teste/evidência. Não declare o projeto pronto se houver bloqueador ou funcionalidade crítica `NOT_VERIFIED`.
