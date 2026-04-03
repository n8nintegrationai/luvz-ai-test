export async function onRequestPost(context) {
    const { env, request } = context;

    try {
        const { message } = await request.json();

        // 1. Safety Check: API Key
        if (!env.GEMINI_API_KEY) {
            return new Response(JSON.stringify({ response: "Backend Error: GEMINI_API_KEY is missing in Cloudflare Settings." }), { status: 200 });
        }

        // 2. Fetch Product Data
        const productDataUrl = "https://cdn.jsdelivr.net/gh/n8nintegrationai/luvz-collection-dev/data/products.json";
        const productRes = await fetch(productDataUrl);

        if (!productRes.ok) {
            return new Response(JSON.stringify({ response: "Backend Error: Could not fetch products.json from GitHub." }), { status: 200 });
        }

        const fullData = await productRes.json();
        let slimInventory = [];

        // 3. Safety Check: Product Loop (Matches your specific Schema)
        // We check if the key exists and is an array before mapping
        const categories = ['bangles', 'jhumkas', 'earrings', 'sets', 'necklace', 'pendant', 'top_sellers', 'new_collection'];

        categories.forEach(cat => {
            if (fullData[cat] && Array.isArray(fullData[cat])) {
                fullData[cat].forEach(item => {
                    slimInventory.push({
                        n: item.name || "Product",
                        p: item.price || "Contact for price",
                        d: (item.description || "").substring(0, 60),
                        wa: `https://wa.me/YOUR_PHONE_NUMBER?text=I%20am%20interested%20in%20${encodeURIComponent(item.name || 'this item')}`
                    });
                });
            }
        });

        // 4. Call Gemini
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`;

        const geminiRes = await fetch(geminiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{ text: `You are the Luvz Style Assistant. Inventory: ${JSON.stringify(slimInventory.slice(0, 150))}. Policy: 7-day returns. Recommendation must include the WhatsApp link. Question: ${message}` }]
                }]
            })
        });

        const data = await geminiRes.json();

        if (data.error) {
            return new Response(JSON.stringify({ response: "Gemini API Error: " + data.error.message }), { status: 200 });
        }

        const aiText = data.candidates[0].content.parts[0].text;
        return new Response(JSON.stringify({ response: aiText }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (err) {
        // This catches the exact line where it crashes
        return new Response(JSON.stringify({ response: "Crash Report: " + err.message }), { status: 200 });
    }
}