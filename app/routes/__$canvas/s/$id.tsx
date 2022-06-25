import type { LoaderFunction, ActionFunction, LinksFunction } from '@remix-run/node';
import type { Prisma } from '~/models/prisma.server';
import type { Shape as ShapeModel } from '~/models/shape.server';
import { json, redirect } from '@remix-run/node';
import * as Remix from '@remix-run/react';
import * as shapeModel from '~/models/shape.server';
import * as Config from '~/components/config';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: Config.styles }];

export const loader: LoaderFunction = async ({ params }) => {
  const shape = await shapeModel.getShapeById(Number(params.id!));
  return json(shape);
};

export const action: ActionFunction = async ({ params, request }) => {
  const formData = await request.formData();
  const shapeId = Number(params.id!);
  const action = formData.get('__action');
  switch (action) {
    case 'update':
      const shapeData = shapeModel.parse<Prisma.ShapeUpdateInput>(formData);
      await shapeModel.updateShape(shapeId, shapeData);
      return redirect(`/s/${shapeId}`);
    case 'delete':
      await shapeModel.deleteShape(shapeId);
      return redirect('/');
    case 'move':
      await shapeModel.moveShape(Number(formData.get('id')), Number(formData.get('z')));
      // prevent redirects when called from a fetcher
      if (formData.get('fetcher')) return null;
      return redirect('/');
    default:
      return redirect(`/s/${shapeId}`);
  }
};

export default function NewShape() {
  const shape = Remix.useLoaderData<ShapeModel>();

  return (
    <Config.Root key={shape.id}>
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
          defaultValue={shape.width}
        />

        <Config.Input
          type="number"
          label="height"
          name="height"
          pattern="[0-9]+"
          defaultValue={shape.height}
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
        <button name="__action" value="update">
          update
        </button>
        <button name="__action" value="delete">
          delete
        </button>
      </Config.Footer>
    </Config.Root>
  );
}
