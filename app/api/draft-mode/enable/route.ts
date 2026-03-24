import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  // Require a custom secret to prevent unauthorized users from viewing drafts
  if (!process.env.SANITY_PREVIEW_SECRET || secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response("Invalid secret or missing SANITY_PREVIEW_SECRET in environment", { status: 401 });
  }

  // Enable Draft Mode by setting the cookie
  const draft = await draftMode();
  draft.enable();

  // Redirect to the blog index or specifically to a passed slug
  const slug = searchParams.get("slug");
  if (slug) {
    redirect(`/blog/${slug}`);
  } else {
    redirect("/blog");
  }
}
