import type { LoaderFunction, ActionFunction, LinksFunction } from '@remix-run/node';
import type { Prisma } from '~/models/prisma.server';
import type { Shape as ShapeModel } from '~/models/shape.server';
import { json, redirect } from '@remix-run/node';
import * as Remix from '@remix-run/react';
import * as shapeModel from '~/models/shape.server';
import * as Config from '~/components/config';
import * as Shape from '~/components/shape';

const SHAPE_TYPE: Record<string, ShapeModel['type']> = {
  rect: 'RECT',
  circle: 'CIRCLE',
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: Config.styles },
  { rel: 'stylesheet', href: Shape.styles },
];

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const shapeParam = url.searchParams.get('shape');
  const type: ShapeModel['type'] = SHAPE_TYPE[shapeParam || 'rect'];
  return json({ type });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const shapeData = shapeModel.parse<Prisma.ShapeCreateInput>(formData);
  const shape = await shapeModel.createShape(shapeData);
  return redirect(`/${shape.id}/#shape-${shape.id}`);
};

export default function NewShape() {
  const shape = Remix.useLoaderData<ShapeModel>();
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
      <Shape.Root
        active
        type={shape.type.toLowerCase() as any}
        style={{ pointerEvents: 'none', transform: 'translate(-50%, -50%)' }}
      />

      <Config.Root>
        <input type="hidden" name="type" value={shape.type} />
        <Config.Panel>
          <Config.Input
            type="number"
            label="x"
            name="x"
            pattern="[0-9]+"
            autoFocus
            defaultValue={shape.x || undefined}
          />

          <Config.Input
            type="number"
            label="y"
            name="y"
            pattern="[0-9]+"
            defaultValue={shape.y || undefined}
          />

          <Config.Input
            type="number"
            label="width"
            name="width"
            pattern="[0-9]+"
            defaultValue={shape.width || undefined}
          />

          <Config.Input
            type="number"
            label="height"
            name="height"
            pattern="[0-9]+"
            defaultValue={shape.height || undefined}
          />
        </Config.Panel>
        <Config.Panel>
          <Config.Input
            type="color"
            label="background"
            name="background_color"
            defaultValue={shape.background_color || undefined}
          />
        </Config.Panel>
        <Config.Footer>
          <button>create</button>
        </Config.Footer>
      </Config.Root>
    </>
  );
}
