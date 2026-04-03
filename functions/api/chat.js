export async function onRequestPost(context) {
    const { env, request } = context;
    const { message } = await request.json();

    try {
        // 1. Fetch your product data
        const productDataUrl = "https://cdn.jsdelivr.net/gh/n8nintegrationai/luvz-collection-dev/data/products.json";
        const productRes = await fetch(productDataUrl);
        const fullData = await productRes.json();

        // 2. Slim down the data to stay under the free tier token limit
        const categories = ['jhumkas', 'earrings', 'necklace', 'bangles', 'sets', 'pendant', 'top_sellers', 'new_collection'];
        let slimInventory = [];

        categories.forEach(cat => {
            if (fullData[cat]) {
                fullData[cat].forEach(item => {
                    slimInventory.push({
                        n: item.name,
                        p: item.price,
                        d: item.description.substring(0, 60), // Truncate description
                        wa: `https://wa.me/918919359961?text=I%20am%20interested%20in%20${encodeURIComponent(item.name)}`
                    });
                });
            }
        });

        // 3. System Instructions for Gemini
        const systemPrompt = `
      You are the Luvz Collection Assistant. Help users find jewelry from this inventory: ${JSON.stringify(slimInventory)}.
      Return Policy: 7 days in original condition.
      Style: Helpful and elegant. 
      CRITICAL: For every product you recommend, you MUST include the "Buy on WhatsApp" link provided in the 'wa' field.
    `;

        // 4. Call Gemini 1.5 Flash
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`;

        const response = await fetch(geminiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{ text: systemPrompt + "\n\nUser Question: " + message }]
                }]
            })
        });

        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text;

        return new Response(JSON.stringify({ response: aiText }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch response" }), { status: 500 });
    }
}