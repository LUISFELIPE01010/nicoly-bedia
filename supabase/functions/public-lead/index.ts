import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const clean = (v: unknown, max = 500) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const name = clean(body.name, 120);
    const phone = clean(body.phone, 30);
    const email = clean(body.email, 160);
    const procedure = clean(body.procedure, 120);
    const message = clean(body.message, 1000);

    if (name.length < 2 || phone.replace(/\D/g, "").length < 10) {
      return new Response(JSON.stringify({ error: "Dados inválidos" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: company } = await supabase
      .from("companies")
      .select("id")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (!company) {
      return new Response(JSON.stringify({ error: "Clínica não configurada" }), {
        status: 409,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let procedureId: string | null = null;
    if (procedure) {
      const { data: proc } = await supabase
        .from("procedures")
        .select("id")
        .eq("company_id", company.id)
        .ilike("name", procedure)
        .limit(1)
        .maybeSingle();
      procedureId = proc?.id ?? null;
    }

    const { error } = await supabase.from("leads").insert({
      company_id: company.id,
      name,
      phone,
      email: email || null,
      procedure_id: procedureId,
      notes: procedure && !procedureId ? `Interesse informado: ${procedure}` : null,
      message: message || null,
      origin: "site",
      status: "novo",
    });

    if (error) throw error;

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("public-lead error", e);
    return new Response(JSON.stringify({ error: "Erro ao registrar contato" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
