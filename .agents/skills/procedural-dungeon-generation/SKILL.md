---
name: procedural-dungeon-generation
description: Implementa e valida geração procedural reproduzível por seed com salas, corredores, início, saída, recompensa, objetivo/chefe e conectividade garantida.
---

# Objetivo

Criar mapa procedural simples, confiável, determinístico por seed e expansível por bioma.

# Procedimento

1. Defina PRNG/seed central e não misture `Math.random()` fora do gerador durante a geração determinística.
2. Gere salas dentro de limites configuráveis.
3. Evite sobreposição inválida.
4. Conecte salas por corredores.
5. Escolha início e saída em pontos alcançáveis.
6. Distribua salas de combate/recompensa/especial e objetivo final conforme configuração.
7. Gere colisões/obstáculos sem bloquear portas/spawns.
8. Faça uma validação de grafo/flood-fill/BFS após gerar.
9. Se inválido, regenere com tentativa limitada e registre diagnóstico; não use loop infinito.
10. Gere inimigos e recompensas apenas em posições válidas.
11. A dificuldade deve ser função de profundidade/progresso, não ruído arbitrário.

# Testes obrigatórios

- mesma seed => mesma topologia relevante;
- seeds diferentes => variação real;
- início alcança saída;
- salas obrigatórias alcançáveis;
- player não nasce em parede;
- inimigos não nascem fora do walkable area;
- tentativa de geração tem limite;
- mapa pequeno e mapa maior permanecem válidos.

# Critério de pronto

Nenhum mapa aceito pelo runtime pode falhar na validação de conectividade. Seeds problemáticas devem ser registradas no relatório de QA.
