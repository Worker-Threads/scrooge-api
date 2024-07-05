CREATE SCHEMA IF NOT EXISTS "user";

CREATE TABLE IF NOT EXISTS "user"."user" (
  "id" SERIAL,
  "username" VARCHAR(50) NOT NULL UNIQUE,
  "email" VARCHAR(50) NOT NULL UNIQUE,
  "password" VARCHAR(255) NOT NULL, 
	PRIMARY KEY ("id")
);

CREATE TYPE "user"."asset_type" AS ENUM(
    'crypto',
    'etf',
    'stock',
    'fiat',
    'deposit',
    'mixed'
);

CREATE TABLE IF NOT EXISTS "user"."portfolio" (
  "id" SERIAL,
  "userId" INT NOT NULL REFERENCES "user"."user"("id"),
	"type" "user"."asset_type" NOT NULL,
  "title" VARCHAR(255) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE SCHEMA IF NOT EXISTS "abstract";

CREATE TABLE IF NOT EXISTS "abstract"."transaction" (
  "id" SERIAL,
  "portfolioId" INT NOT NULL REFERENCES "user"."portfolio"("id"),
	"volume" NUMERIC(40, 17) NOT NULL,
  "timestamp" TIMESTAMP NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "fiat"."transaction" (
  "currency" VARCHAR(10) REFERENCES fiat.currency("symbol"),
  "price" NUMERIC(40, 17) NOT NULL
) INHERITS ("abstract"."transaction");

CREATE TABLE IF NOT EXISTS "crypto"."transaction" (
  "ticker" VARCHAR(10) REFERENCES crypto.ticker("symbol"),
  "price" NUMERIC(40, 17) NOT NULL
) INHERITS ("abstract"."transaction");

CREATE TABLE IF NOT EXISTS "etf"."transaction" (
  "ticker" VARCHAR(10) REFERENCES etf.ticker("symbol"),
  "price" NUMERIC(40, 17) NOT NULL
) INHERITS ("abstract"."transaction");

CREATE TABLE IF NOT EXISTS "stock"."transaction" (
  "ticker" VARCHAR(10) REFERENCES stock.ticker("symbol"),
  "price" NUMERIC(40, 17) NOT NULL
) INHERITS ("abstract"."transaction");
