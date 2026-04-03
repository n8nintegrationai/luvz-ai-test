export async function onRequestPost(context) {
    const { env, request } = context;

    try {
        const { message } = await request.json();

        // 1. Check for API Key
        if (!env.GEMINI_API_KEY) {
            return new Response(JSON.stringify({ response: "Config Error: GEMINI_API_KEY is missing in Cloudflare Settings." }));
        }

        // 2. Fetch using the EXACT path you provided
        const productDataUrl = "https://raw.githubusercontent.com/n8nintegrationai/luvz-ai-test/refs/heads/main/public/data/products.json";

        const productRes = await fetch(productDataUrl);

        if (!productRes.ok) {
            return new Response(JSON.stringify({
                response: `Fetch Error: GitHub returned ${productRes.status}. Check if the file is public.`
            }));
        }

        const fullData = await productRes.json();
        let slimInventory = [];

        // 3. Robust scanning based on your Schema (Bangles, Jhumkas, Top Sellers, etc.)
        // This loops through all keys in the JSON to find arrays of products
        Object.keys(fullData).forEach(category => {
            if (Array.isArray(fullData[category])) {
                fullData[category].forEach(item => {
                    // We only add valid product objects
                    if (item.name && item.price) {
                        slimInventory.push({
                            n: item.name,
                            p: item.price,
                            d: (item.description || "").substring(0, 60),
                            // Dynamic WhatsApp link generation
                            wa: `https://wa.me/YOUR_NUMBER?text=I%20am%20interested%20in%20${encodeURIComponent(item.name)}`
                        });
                    }
                });
            }
        });

        // 4. Call Gemini 1.5 Flash (Updated to v1 Stable Endpoint)
        const geminiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`;

        const geminiRes = await fetch(geminiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `You are the Luvz Style Assistant. Use this inventory: ${JSON.stringify(slimInventory.slice(0, 150))}. Return policy: 7 days. For any product recommended, you MUST provide the WhatsApp link. Question: ${message}` }]
                }]
            })
        });

        const data = await geminiRes.json();

        if (data.error) {
            return new Response(JSON.stringify({ response: "Gemini Error: " + data.error.message }));
        }

        const aiText = data.candidates[0].content.parts[0].text;
        return new Response(JSON.stringify({ response: aiText }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (err) {
        return new Response(JSON.stringify({ response: "System Crash: " + err.message }));
    }
}