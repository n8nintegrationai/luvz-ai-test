function renderBody(status, content) {
    return `
    <!DOCTYPE html>
    <html>
    <head><title>Authorizing...</title></head>
    <body>
      <script>
        (function() {
          const status = "${status}";
          const content = ${JSON.stringify(content)};
          
          // Try to find the opener
          const targetWindow = window.opener || window.parent;
          
          if (targetWindow) {
            targetWindow.postMessage(
              "authorization:github:" + status + ":" + JSON.stringify(content),
              "*" 
            );
            // Give it a moment to send, then close
            setTimeout(() => window.close(), 1000);
          } else {
            document.body.innerHTML = "Configuration Error: Main window not found. Please refresh the admin page and try again.";
          }
        })()
      </script>
    </body>
    </html>
    `;
}

export async function onRequest(context) {
    const {
        request, // same as existing Worker API
        env, // same as existing Worker API
        params, // if filename includes [id] or [[path]]
        waitUntil, // same as ctx.waitUntil in existing Worker API
        next, // used for middleware or to fetch assets
        data, // arbitrary space for passing data between middlewares
    } = context;

    const client_id = env.GITHUB_CLIENT_ID;
    const client_secret = env.GITHUB_CLIENT_SECRET;

    try {
        const url = new URL(request.url);
        const code = url.searchParams.get('code');
        const response = await fetch(
            'https://github.com/login/oauth/access_token',
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'user-agent': 'cloudflare-functions-github-oauth-login-demo',
                    'accept': 'application/json',
                },
                body: JSON.stringify({ client_id, client_secret, code }),
            },
        );
        const result = await response.json();
        if (result.error) {
            return new Response(renderBody('error', result), {
                headers: {
                    'content-type': 'text/html;charset=UTF-8',
                },
                status: 401
            });
        }
        const token = result.access_token;
        const provider = 'github';
        const responseBody = renderBody('success', {
            token,
            provider,
        });
        return new Response(responseBody, {
            headers: {
                'content-type': 'text/html;charset=UTF-8',
            },
            status: 200
        });

    } catch (error) {
        console.error(error);
        return new Response(error.message, {
            headers: {
                'content-type': 'text/html;charset=UTF-8',
            },
            status: 500,
        });
    }
}