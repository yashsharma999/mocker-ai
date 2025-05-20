const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!;

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export { baseUrl, fetcher };
