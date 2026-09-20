/**
 * direction.ts — Módulo centralizado de direção para o Caminho Digital.
 *
 * Compartilhado por todos os Digimons jogáveis. Nunca crie
 * veemonDirection / agumonDirection — use estas funções genéricas.
 */

export type FacingDirection = "up" | "down" | "left" | "right";

export type DirectionVector = { x: number; y: number };

/**
 * Retorna o vetor unitário correspondente à direção do personagem.
 *
 * right: { x: 1, y: 0 }
 * left:  { x: -1, y: 0 }
 * up:    { x: 0, y: -1 }
 * down:  { x: 0, y: 1 }
 */
export function getFacingVector(dir: FacingDirection): DirectionVector {
  switch (dir) {
    case "up":
      return { x: 0, y: -1 };
    case "down":
      return { x: 0, y: 1 };
    case "left":
      return { x: -1, y: 0 };
    case "right":
      return { x: 1, y: 0 };
  }
}

/**
 * Calcula o offset relativo de spawn a partir da posição do personagem na direção indicada.
 */
export function getProjectileSpawnOffset(
  dir: FacingDirection,
  offset: number,
): DirectionVector {
  const v = getFacingVector(dir);
  return { x: v.x * offset, y: v.y * offset };
}

/**
 * Retorna as coordenadas absolutas (x, y) de spawn à frente do personagem.
 *
 * RIGHT: origin.x + offset, origin.y
 * LEFT:  origin.x - offset, origin.y
 * UP:    origin.x,          origin.y - offset
 * DOWN:  origin.x,          origin.y + offset
 */
export function getAttackSpawnPosition(
  origin: { x: number; y: number },
  dir: FacingDirection,
  offset: number,
): { x: number; y: number } {
  const v = getFacingVector(dir);
  return {
    x: origin.x + v.x * offset,
    y: origin.y + v.y * offset,
  };
}

/**
 * Retorna a posição central da hitbox direcional para ataques melee.
 */
export function getDirectionalHitboxPosition(
  origin: { x: number; y: number },
  dir: FacingDirection,
  offset: number,
): { x: number; y: number } {
  return getAttackSpawnPosition(origin, dir, offset);
}

/**
 * Aplica velocidade direcional com base na direção do personagem.
 *
 * RIGHT: vx = +speed, vy = 0
 * LEFT:  vx = -speed, vy = 0
 * UP:    vx = 0,      vy = -speed
 * DOWN:  vx = 0,      vy = +speed
 */
export function applyDirectionalVelocity(
  dir: FacingDirection,
  speed: number,
): { vx: number; vy: number } {
  const v = getFacingVector(dir);
  return {
    vx: v.x * speed,
    vy: v.y * speed,
  };
}

/**
 * Rotação em radianos para orientar visualmente projéteis ou efeitos
 * cuja arte base aponta para a DIREITA (0 rad).
 *
 * RIGHT: 0 rad (0°)
 * DOWN:  PI / 2 rad (90°)
 * LEFT:  PI rad (180°)
 * UP:    -PI / 2 rad (-90°)
 */
export function getProjectileRotation(dir: FacingDirection): number {
  switch (dir) {
    case "right":
      return 0;
    case "down":
      return Math.PI / 2;
    case "left":
      return Math.PI;
    case "up":
      return -Math.PI / 2;
  }
}

/**
 * Alias para rotação de efeitos visuais direcionais.
 */
export function getDirectionalEffectRotation(dir: FacingDirection): number {
  return getProjectileRotation(dir);
}

/**
 * Tipo de ataque — determina o comportamento direcional da habilidade.
 *
 * DIRECTIONAL_MELEE      — hitbox e efeito melee na frente do personagem
 * DIRECTIONAL_PROJECTILE — projétil disparado na direção que o personagem olha
 * DIRECTIONAL_SPECIAL    — golpe especial com investida / onda frontal orientada
 * RADIAL_AREA            — AoE 360° centrada no personagem
 */
export type AttackDirectionType =
  | "DIRECTIONAL_MELEE"
  | "DIRECTIONAL_PROJECTILE"
  | "DIRECTIONAL_SPECIAL"
  | "RADIAL_AREA";
