import * as React from 'react';
import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import * as Remix from '@remix-run/react';
import type { Shape as ShapeModel } from '~/models/shape.server';
import * as shapeModel from '~/models/shape.server';
import * as Toolbar from '~/components/toolbar';
import * as Layers from '~/components/layers';
import * as Ruler from '~/components/ruler';
import * as Shape from '~/components/shape';

type LoaderData = {
  shapes: ShapeModel[];
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: Toolbar.styles },
  { rel: 'stylesheet', href: Layers.styles },
  { rel: 'stylesheet', href: Ruler.styles },
  { rel: 'stylesheet', href: Shape.styles },
];

export const loader: LoaderFunction = async ({ params }) => {
  const shapes = await shapeModel.getAllShapes();
  const data: LoaderData = { shapes };
  return json(data);
};

export default function Index() {
  const params = Remix.useParams();
  const activeShapeId = params.id ? Number(params.id) : undefined;

  const shapes = useOrderedShapes();

  return (
    <>
      <header className="header">
        <Remix.Link replace to="/" className="logo">
          F
        </Remix.Link>
        <Toolbar.Root action="/new/#shape">
          <Toolbar.Item type="circle">circle</Toolbar.Item>
          <Toolbar.Item type="rect">rectangle</Toolbar.Item>
        </Toolbar.Root>
      </header>

      <main className="main">
        <Layers.Root>
          {shapes.map((shape) => (
            <Layers.Item
              key={shape.id}
              id={`shape-${shape.id}`}
              layerId={shape.id}
              active={shape.id === activeShapeId}
              z={shape.z}
              maxZ={shapes[shapes.length - 1].z}
            >
              {{ RECT: 'Rectangle', CIRCLE: 'Circle' }[shape.type] || null} {shape.id}
            </Layers.Item>
          ))}
        </Layers.Root>

        <div className="canvas">
          <Ruler.Root orientation="horizontal" />
          <Ruler.Root orientation="vertical" />

          <div className="canvas__inner">
            {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
            <Remix.Link replace to="/" className="canvas__focus" />

            {shapes.map((shape) => (
              <Shape.Root
                key={shape.id}
                href={`/s/${shape.id}`}
                id={`shape-${shape.id}`}
                active={shape.id === activeShapeId}
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

function useOrderedShapes() {
  const data = Remix.useLoaderData<LoaderData>();
  const fetchers = Remix.useFetchers();

  return React.useMemo(() => {
    const newShapes = JSON.parse(JSON.stringify(data.shapes)) as typeof data.shapes;

    for (let fetcher of fetchers) {
      if (!fetcher.submission || fetcher.submission.formData.get('__action') !== 'move') {
        continue;
      }

      const id = Number(fetcher.submission.formData.get('id'));
      const newZ = Number(fetcher.submission.formData.get('z'));

      let direction: 'down' | 'up' = 'up';
      for (const shape of newShapes) {
        if (shape.id === id) {
          direction = shape.z < newZ ? 'down' : 'up';
          shape.z = newZ;
          break;
        }
      }
      for (const shape of newShapes) {
        if (shape.id === id) {
          continue;
        }

        if (direction === 'down' && shape.z <= newZ) {
          shape.z -= 1;
        } else if (direction === 'up' && shape.z >= newZ) {
          shape.z += 1;
        }
      }
    }

    return newShapes.sort((a, b) => (a.z - b.z > 0 ? 1 : -1));
  }, [data, fetchers]);
}
