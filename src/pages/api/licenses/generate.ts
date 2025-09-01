import type { APIRoute } from "astro"
import { supabase } from "../../../lib/supabase"
import crypto from "crypto"
import machineId from "node-machine-id"

export const POST: APIRoute = async ({ request }) => {

    try {
        const { userId, productId, serialNumber, durationDays = 365 } = await request.json()

        console.log("userId:", userId)
        console.log("productId:", productId)
        console.log("serialNumber:", serialNumber)

        if (!userId || !productId || !serialNumber) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            })
        }

        const machineUid = await machineId.machineId()
        const machineFingerprint = crypto
        .createHash("sha256")
        .update(machineUid + "mi-app-secreta")
        .digest("hex")

        const effectiveStartDate = new Date().toISOString()
        const effectiveEndDate = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString()

        const { data: userData, error: userError } = await supabase.auth.admin.getUserById(userId)
        if (userError || !userData.user) {
        return new Response(JSON.stringify({ error: "User not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        })
        }

        const licenseData = {
        licenseId: Math.floor(Math.random() * 1000000) + Date.now(),
        productId,
        serialNumber,
        effectiveStartDate,
        effectiveEndDate,
        user: {
            id: userData.user.id,
            email: userData.user.email,
            name: userData.user.user_metadata?.name || userData.user.email,
        },
        machineId: machineFingerprint,
        featureFlags: {
            premium: true,
            analytics: true,
            support: true,
            multiUser: false,
        },
        }

        const dataToSign = JSON.stringify(licenseData)
        const privateKey = "mi-clave-privada-super-secreta" // En producción, usar una clave RSA real
        const signature = crypto.createHmac("sha256", privateKey).update(dataToSign).digest("hex")

        const finalLicense = {
        ...licenseData,
        signature,
        }
        /*
        const { data: savedLicense, error: saveError } = await supabase
        .from("licenses")
        .insert([finalLicense])
        .select()
        .single()

        if (saveError) {
        console.error("Error saving license:", saveError)
        // Continuar aunque no se pueda guardar en la DB
        }*/

        return new Response(JSON.stringify({
            success: true,
            license: finalLicense,
            licenseId: finalLicense.licenseId,
        }),
        {
            headers: { "Content-Type": "application/json" },
        },
        )
    } catch (error) {
        console.error("Error generating license:", error)
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        })
    }
}
