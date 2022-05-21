import type { Shape, Prisma, ShapeType } from './prisma.server';
import { prisma } from '~/models/prisma.server';

type KeysOfType<T, K> = { [Key in keyof T]: K extends T[Key] ? Key : never }[keyof T];
type NumberKeys<T> = KeysOfType<T, number>;
type StringKeys<T> = KeysOfType<T, string> | KeysOfType<T, ShapeType>;

async function createShape(shape: Prisma.ShapeCreateInput) {
  return prisma.shape.create({ data: shape });
}

async function updateShape(shapeId: Shape['id'], shape: Prisma.ShapeUpdateInput) {
  return prisma.shape.update({ data: shape, where: { id: shapeId } });
}

async function getAllShapes() {
  return prisma.shape.findMany({ orderBy: [{ id: 'asc' }] });
}

async function getShapeById(shapeId: Shape['id']) {
  return prisma.shape.findUnique({ where: { id: shapeId } });
}

async function deleteShape(shapeId: Shape['id']) {
  return prisma.shape.delete({ where: { id: shapeId } });
}

const NUMBER_KEYS: NumberKeys<Shape>[] = ['x', 'y', 'width', 'height'];
const STRING_KEYS: StringKeys<Shape>[] = ['type', 'background_color'];
const ALL_KEYS: (keyof Shape)[] = [...NUMBER_KEYS, ...STRING_KEYS];

function parse<S = Partial<Prisma.ShapeCreateInput>>(formData: FormData) {
  return Array.from(formData.entries()).reduce((acc, [key, value]) => {
    const isShapeKey = ALL_KEYS.includes(key as any);
    const isNumberKey = NUMBER_KEYS.includes(key as any);
    return isShapeKey ? { ...acc, [key]: isNumberKey ? Number(value) : value } : acc;
  }, {} as S);
}
/* ---------------------------------------------------------------------------------------------- */

export { createShape, updateShape, getAllShapes, getShapeById, deleteShape, parse };
export type { Shape, Prisma } from '~/models/prisma.server';
