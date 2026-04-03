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
                // Only take the first 15 items per category to save tokens
                fullData[cat].slice(0, 15).forEach(item => {
                    slimInventory.push({
                        n: item.name,
                        p: item.price,
                        // REMOVE the description entirely to save massive amounts of tokens
                        wa: `https://wa.me/YOUR_NUMBER?text=I%20am%20interested%20in%20${encodeURIComponent(item.name)}`
                    });
                });
            }
        });

        // 2. Call Gemini 2.0 Flash
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${env.GEMINI_API_KEY}`;

        const geminiRes = await fetch(geminiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `System: You are the Luvz Style Assistant. Inventory: ${JSON.stringify(slimInventory.slice(0, 60))}. Policy: 7-day returns. Recommendation must include the WhatsApp link. Question: ${message}`
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