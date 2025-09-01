import type { APIRoute } from "astro"
import { supabase } from "../../../../lib/supabase"

export const GET: APIRoute = async ({ params }) => {
  try {
    const { licenseId } = params

    if (!licenseId) {
      return new Response("License ID required", { status: 400 })
    }

    const { data: license, error } = await supabase
      .from("licenses")
      .select("*")
      .eq("licenseId", Number.parseInt(licenseId as string))
      .single()

    if (error || !license) {
      return new Response("License not found", { status: 404 })
    }

    const licenseContent = JSON.stringify(license, null, 2)
    const filename = `license_${licenseId}.lic`

    return new Response(licenseContent, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": licenseContent.length.toString(),
      },
    })
  } catch (error) {
    console.error("Error downloading license:", error)
    return new Response("Internal server error", { status: 500 })
  }
}
