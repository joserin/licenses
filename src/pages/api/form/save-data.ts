import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase"


export const POST: APIRoute = async ({ request, redirect }) => {

    const formData = await request.formData();

    let complete = true
    const LICENSE_KEY=3108

    for (const [name, value] of formData.entries()) {
        if (value.toString().trim() === '') {
            complete = false
            return new Response(JSON.stringify({ message: 'Campos requeridos vacios' }), { status: 400 });
        }
    }
    const productName = formData.get('productname') as string;
    const fingerprint = formData.get('fingerprint') as string;
    const dateDuration = formData.get('durationDays') as string;
    
    const { data: userData, error: userError } = await supabase.auth.getUser()
        if (userError || !userData.user) {
            return new Response(JSON.stringify({ error: "Usuario no encontrado" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
        })
    }

    const effectiveStartDate = new Date();

    const effectiveEndDate = new Date(effectiveStartDate);

    effectiveEndDate.setMonth(effectiveEndDate.getMonth() + parseInt(dateDuration));

    const userId = userData.user.id;
    const product = { license_key: LICENSE_KEY, user_id: userId, machine_fingerprint: fingerprint, created_at: effectiveStartDate, issued_at: effectiveEndDate, product_name: productName, status: false}

    try {
        const { data, error } = await supabase.from('license').upsert(product).eq('id', LICENSE_KEY);
        
        if (error) {
            throw error;
        }
            
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error al guardar' }), { status: 400 });
    }

    return new Response(JSON.stringify({ message: 'Datos guardados con éxito' }), { status: 200 });
}