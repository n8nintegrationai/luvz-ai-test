export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        const { message, fullData } = await request.json();

        // 1. "Extreme Slimming" of your JSON to save tokens
        let slimInventory = [];
        Object.keys(fullData).forEach(cat => {
            if (Array.isArray(fullData[cat])) {
                // Only take the first 12 items per category
                fullData[cat].slice(0, 12).forEach(item => {
                    slimInventory.push({
                        n: item.name,
                        p: item.price,
                        // We exclude descriptions to keep the "input_token_count" low
                        wa: `https://wa.me/YOUR_NUMBER?text=Interested%20in%20${encodeURIComponent(item.name)}`
                    });
                });
            }
        });

        // 2. Limit the total product count sent to the AI (e.g., top 50 items)
        const finalContext = slimInventory.slice(0, 50);

        // 3. Call the 2026 Stable Model: gemini-2.5-flash-lite
        // Note: If 2.5-flash-lite also shows 'limit: 0', use 'gemini-3.1-flash-lite-preview'
        const modelId = "gemini-2.5-flash-lite";
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${env.GEMINI_API_KEY}`;

        const geminiRes = await fetch(geminiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `System: You are the Luvz Style Assistant. 
            Inventory: ${JSON.stringify(finalContext)}. 
            Policy: 7-day returns. 
            Instruction: Be concise. Always provide the WhatsApp link for products.
            User Question: ${message}`
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 500,
                }
            })
        });

        const data = await geminiRes.json();

        // Handle the case where Gemini still returns an error
        if (data.error) {
            return new Response(JSON.stringify({ error: data.error.message }), { status: data.error.code });
        }

        const aiResponse = data.candidates[0].content.parts[0].text;
        return new Response(JSON.stringify({ response: aiResponse }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: "Server Error: " + err.message }), { status: 500 });
    }
}