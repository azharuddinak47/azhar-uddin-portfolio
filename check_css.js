const http = require('http');

http.get('http://localhost:3000', (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    console.log('HTML status:', res.statusCode);
    const cssLinks = [...html.matchAll(/href=["'](\/_next\/static\/css\/[^"']+)["']/g)].map(m => m[1]);
    console.log('CSS links found:', cssLinks);
    if (cssLinks.length > 0) {
      http.get('http://localhost:3000' + cssLinks[0], (cRes) => {
        let css = '';
        cRes.on('data', chunk => css += chunk);
        cRes.on('end', () => {
          console.log('CSS size:', css.length);
          console.log('CSS preview:', css.slice(0, 400));
          console.log('Contains flex?:', css.includes('.flex'));
          console.log('Contains grid?:', css.includes('.grid'));
          console.log('Contains text-white?:', css.includes('text-white'));
        });
      });
    } else {
      // Check inline styles
      const styles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m => m[1]);
      console.log('Style tags found:', styles.length);
    }
  });
}).on('error', err => console.error('HTTP Error:', err.message));
