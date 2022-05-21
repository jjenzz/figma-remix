# Figma Remix

- [Remix Docs](https://remix.run/docs)

## Development

1. Follow the "[Create a project](https://supabase.com/docs/guides/with-react#create-a-project)" steps for Supabase
2. [Get the connection string from the Supabase project settings](https://supabase.com/docs/guides/integrations/prisma#step-1-get-the-connection-string-from-supabase-project-settings)
3. Rename the `.env.dev` file to `.env` and replace the `DATABASE_URL` with the connection string from Supabase
4. Remember to change the password in the connection string!

Then, from your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Fly Setup

1. [Install `flyctl`](https://fly.io/docs/getting-started/installing-flyctl/)

2. Sign up and log in to Fly

```sh
flyctl auth signup
```

3. Setup Fly. It might ask if you want to deploy, say no since you haven't built the app yet.

```sh
flyctl launch
```

## Deployment

If you've followed the setup instructions already, all you need to do is run this:

```sh
npm run deploy
```

You can run `flyctl info` to get the url and ip address of your server.

Check out the [fly docs](https://fly.io/docs/getting-started/node/) for more information.
