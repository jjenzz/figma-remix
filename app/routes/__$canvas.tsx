import type { Shape as ShapeModel } from '~/models/shape.server';
import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import * as Remix from '@remix-run/react';
import * as shapeModel from '~/models/shape.server';
import * as Toolbar from '~/components/toolbar';
import * as Layers from '~/components/layers';
import * as Ruler from '~/components/ruler';
import * as Shape from '~/components/shape';

type LoaderData = {
  shapes: ShapeModel[];
  activeShapeId?: ShapeModel['id'];
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: Toolbar.styles },
  { rel: 'stylesheet', href: Layers.styles },
  { rel: 'stylesheet', href: Ruler.styles },
  { rel: 'stylesheet', href: Shape.styles },
];

export const loader: LoaderFunction = async ({ params }) => {
  const shapes = await shapeModel.getAllShapes();
  const activeShapeId = params.id ? Number(params.id) : undefined;
  const data: LoaderData = { shapes, activeShapeId };
  return json(data);
};

export default function Index() {
  const data = Remix.useLoaderData<LoaderData>();

  return (
    <>
      <header className="header">
        <a href="/" className="logo">
          F
        </a>
        <Toolbar.Root action="/new/#shape">
          <Toolbar.Item type="circle">circle</Toolbar.Item>
          <Toolbar.Item type="rect">rectangle</Toolbar.Item>
        </Toolbar.Root>
      </header>

      <main className="main">
        <Layers.Root>
          {data.shapes.map((shape) => (
            <Layers.Item key={shape.id} layerId={shape.id} active={shape.id === data.activeShapeId}>
              {{ RECT: 'Rectangle', CIRCLE: 'Circle' }[shape.type] || null} {shape.id}
            </Layers.Item>
          ))}
        </Layers.Root>

        <div className="canvas">
          <Ruler.Root orientation="horizontal" />
          <Ruler.Root orientation="vertical" />

          <div className="canvas__inner">
            {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
            <a href="/" className="canvas__focus" />

            {data.shapes.map((shape) => (
              <Shape.Root
                key={shape.id}
                href={`/s/${shape.id}`}
                id={`shape-${shape.id}`}
                active={shape.id === data.activeShapeId}
                type={shape.type.toLowerCase() as any}
                width={shape.width}
                height={shape.height}
                x={shape.x || undefined}
                y={shape.y || undefined}
                backgroundColor={shape.background_color || undefined}
              />
            ))}
          </div>
        </div>

        <Remix.Outlet />
      </main>
    </>
  );
}
