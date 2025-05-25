const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!;

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const BYOK_API_KEY = `custom_api_key`;

export { baseUrl, fetcher, BYOK_API_KEY };
