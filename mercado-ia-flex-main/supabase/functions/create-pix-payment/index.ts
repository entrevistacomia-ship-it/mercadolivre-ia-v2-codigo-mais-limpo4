import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentRequest {
  name: string;
  phone: string;
  email: string;
  cpf: string;
  amount: number;
  description: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone, email, cpf, amount, description }: PaymentRequest = await req.json();
    
    const ABACATEPAY_API_KEY = Deno.env.get("ABACATEPAY_API_KEY");
    if (!ABACATEPAY_API_KEY) {
      throw new Error("ABACATEPAY_API_KEY não configurada");
    }

    console.log("Criando pagamento PIX:", { name, email, amount });

    // Chamada para a API da AbacatePay
    const response = await fetch("https://api.abacatepay.com/v1/pixQrCode/create", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${ABACATEPAY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
        expiresIn: 3600, // 1 hora em segundos
        description: description,
        customer: {
          name: name,
          cellphone: phone,
          email: email,
          taxId: cpf,
        },
        metadata: {
          externalId: `order-${Date.now()}`,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro da AbacatePay:", response.status, errorText);
      throw new Error(`Erro ao criar pagamento: ${response.status}`);
    }

    const data = await response.json();
    console.log("Pagamento criado com sucesso:", data);

    return new Response(
      JSON.stringify({
        success: true,
        payment: data,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Erro ao criar pagamento:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
