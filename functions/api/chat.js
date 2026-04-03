export async function onRequestPost(context) {
    const { env, request } = context;

    try {
        const { message } = await request.json();

        if (!env.GEMINI_API_KEY) {
            return new Response(JSON.stringify({ response: "Error: GEMINI_API_KEY is missing in Cloudflare Settings." }));
        }

        // UPDATED URL: Points directly to your new repo's raw content
        const productDataUrl = "https://raw.githubusercontent.com/n8nintegrationai/luvz-ai-test/main/data/products.json";

        const productRes = await fetch(productDataUrl, {
            headers: { 'User-Agent': 'Cloudflare-Pages-Function' }
        });

        if (!productRes.ok) {
            return new Response(JSON.stringify({
                response: `Backend Error: Could not fetch products. status: ${productRes.status}. Ensure file exists at /data/products.json in the main branch.`
            }));
        }

        const fullData = await productRes.json();
        let slimInventory = [];

        // Categories based on your schema
        const categories = ['bangles', 'jhumkas', 'earrings', 'sets', 'necklace', 'pendant', 'top_sellers', 'new_collection'];

        categories.forEach(cat => {
            if (fullData[cat] && Array.isArray(fullData[cat])) {
                fullData[cat].forEach(item => {
                    slimInventory.push({
                        n: item.name,
                        p: item.price,
                        d: (item.description || "").substring(0, 60),
                        // Ensure you replace YOUR_NUMBER with your actual WhatsApp number
                        wa: `https://wa.me/YOUR_NUMBER?text=I%20am%20interested%20in%20${encodeURIComponent(item.name)}`
                    });
                });
            }
        });

        // Final Gemini Call
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`;

        const geminiRes = await fetch(geminiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{ text: `You are the Luvz Style Assistant. Inventory: ${JSON.stringify(slimInventory.slice(0, 150))}. Policy: 7-day returns. Provide product name, price, and the WhatsApp link. Question: ${message}` }]
                }]
            })
        });

        const data = await geminiRes.json();
        const aiText = data.candidates[0].content.parts[0].text;

        return new Response(JSON.stringify({ response: aiText }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (err) {
        return new Response(JSON.stringify({ response: "System Error: " + err.message }));
    }
}