CREATE TABLE IF NOT EXISTS "comments" (
	"user_id" uuid NOT NULL,
	"news_id" uuid NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "comments_user_id_news_id_pk" PRIMARY KEY("user_id","news_id")
);
--> statement-breakpoint
ALTER TABLE "chat_history" ALTER COLUMN "message" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "chat_history" ALTER COLUMN "message" DROP DEFAULT;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_news_id_news_id_fk" FOREIGN KEY ("news_id") REFERENCES "news"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
