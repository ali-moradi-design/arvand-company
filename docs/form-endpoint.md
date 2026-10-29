# Contact form endpoint

The contact form on `/en/contact/` and `/fa/contact/` posts to the address in
`NEXT_PUBLIC_FORM_ENDPOINT`. The value is inlined at build time, so changing it
needs a new build. With no value, the form opens the visitor's email app
(`mailto:`) instead. The site does not depend on the formcanvas npm packages:
it only needs an HTTPS endpoint that follows this contract, which is
formcanvas' public response API.

Live endpoint: the published formcanvas form `arvand-contact`, owned by its own
account (not the demo account, whose forms are deleted every night):
`https://formcanvas.ali-moradi-develop.com/api/forms/arvand-contact/responses`.
Its document is `docs/formcanvas-contact-form.json` (import it in the builder's
JSON editor, then publish).

## Request

`POST` with `Content-Type: application/json` and `Accept: application/json`:

```json
{
  "values": {
    "name": "Ada Lovelace",
    "email": "ada@example.com",
    "company": "Analytical Ltd",
    "topic": "Engineering review",
    "message": "We need a design review."
  },
  "locale": "en"
}
```

`company` may be an empty string. `locale` is `en` or `fa`. Field names are
fixed; the formcanvas form uses these keys. `topic` is a short text field there,
because the site sends the translated topic label.
A hidden honeypot field (`website`) is checked in the browser and never sent.

## Responses

| Status             | Meaning           | What the visitor sees                                        |
| ------------------ | ----------------- | ------------------------------------------------------------ |
| `2xx`              | Accepted          | Thank-you message, form is cleared                           |
| `400` or `422`     | Validation failed | Errors under the fields, first invalid field focused         |
| `429`              | Rate limited      | "Too many messages, wait a minute"                           |
| other `4xx`, `5xx` | Server problem    | "Something went wrong on our side", form is kept for a retry |
| no answer in 10 s  | Timeout           | "The server took too long", form is kept                     |
| connection error   | Network error     | "Could not reach the server", form is kept                   |

For `400` and `422` the body may carry per-field messages, in any of these shapes:

```json
{ "errors": { "email": "This address looks invalid", "message": ["Too short"] } }
```

```json
{ "errors": [{ "field": "email", "message": "This address looks invalid" }] }
```

```json
{ "error": "invalid", "issues": [{ "key": "email", "code": "pattern" }] }
```

The last one is formcanvas': it has codes, not text, so those fields get the
default text.

Only the keys `name`, `email`, `company`, `topic` and `message` are used. A
field with no message gets a default text; with no `errors` at all the form
shows a general "check the highlighted fields" message.

## What the endpoint host must allow

- CORS for the site origin (`https://arvand-company.ali-moradi-develop.com`):
  `Access-Control-Allow-Origin`, and the preflight `OPTIONS` with
  `Access-Control-Allow-Headers: content-type, accept`.
- Server-side validation and a rate limit (the browser checks are only a courtesy).

## Build settings

| Variable                      | Default                    | Purpose                              |
| ----------------------------- | -------------------------- | ------------------------------------ |
| `NEXT_PUBLIC_FORM_ENDPOINT`   | empty (`mailto:` fallback) | Endpoint address                     |
| `NEXT_PUBLIC_FORM_TIMEOUT_MS` | `10000`                    | Wait time before reporting a timeout |
| `NEXT_PUBLIC_SITE_URL`        | `http://localhost:3030`    | Public site URL                      |

The `Docker` workflow builds the production image with `NEXT_PUBLIC_SITE_URL`
set to the live address and `NEXT_PUBLIC_FORM_ENDPOINT` from the repository
variable `FORM_ENDPOINT`; both are public values, not secrets.

## Tests

- `tests/unit/submit.test.ts`: the request and the mapping of every response.
- `tests/e2e/form.spec.ts`: the whole flow in a browser against a mocked
  endpoint (success, Persian, 422, 429, 500 then retry, network error, timeout,
  double click, honeypot, axe on the error state). It runs on `out-form/`, a
  second standalone build with a fake endpoint (`pnpm build:e2e` creates it).
