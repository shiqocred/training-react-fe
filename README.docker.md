# Docker deploy notes

Frontend ini dibuild sebagai Next.js standalone image.

## Internal FE → BE network

Set `API_URL` ke hostname service backend pada internal Docker network, misalnya:

```env
API_URL=http://react-api:3000
```

Dengan model ini server-side fetch dari Next.js akan mengakses backend lewat network internal Docker, bukan lewat public internet.

Jika ada fetch yang dipanggil langsung dari client component/browser, tetap set `NEXT_PUBLIC_API_URL` ke URL publik backend yang diroute oleh Traefik, karena browser user tidak bisa mengakses hostname internal Docker.

```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Traefik

Expose container FE di port `3000`, lalu arahkan router Traefik ke service port `3000`.
