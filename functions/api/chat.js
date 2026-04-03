export async function onRequestPost(context) {
    const { env, request } = context;

    try {
        const { message } = await request.json();

        if (!env.GEMINI_API_KEY) {
            return new Response(JSON.stringify({ response: "Error: GEMINI_API_KEY is missing." }));
        }

        // 1. Fetch Inventory
        const productDataUrl = "https://raw.githubusercontent.com/n8nintegrationai/luvz-ai-test/refs/heads/main/public/data/products.json";
        const productRes = await fetch(productDataUrl);
        const fullData = await productRes.json();

        let slimInventory = [];
        Object.keys(fullData).forEach(cat => {
            if (Array.isArray(fullData[cat])) {
                fullData[cat].forEach(item => {
                    slimInventory.push({
                        n: item.name,
                        p: item.price,
                        wa: `https://wa.me/YOUR_NUMBER?text=I%20am%20interested%20in%20${encodeURIComponent(item.name)}`
                    });
                });
            }
        });

        // 2. THE FIX: Correct URL and Body for Free Tier
        // Note: We use v1beta here because it is more reliable for the 'Flash' model in some regions
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`;

        const geminiRes = await fetch(geminiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `System: You are the Luvz Style Assistant. Inventory: ${JSON.stringify(slimInventory.slice(0, 100))}. Always provide the WhatsApp link for products. User: ${message}`
                    }]
                }]
            })
        });

        const data = await geminiRes.json();

        // 3. Handle specific API errors
        if (data.error) {
            return new Response(JSON.stringify({ response: `Gemini Error (${data.error.code}): ${data.error.message}` }));
        }

        const aiText = data.candidates[0].content.parts[0].text;
        return new Response(JSON.stringify({ response: aiText }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (err) {
        return new Response(JSON.stringify({ response: "System Error: " + err.message }));
    }
}