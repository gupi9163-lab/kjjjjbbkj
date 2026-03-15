# Render.com Deploy Instructions

## Deployment Steps

1. **GitHub Repository**
   - Repository: https://github.com/gupi9163-lab/kjjjjbbkj
   - Branch: main

2. **Create Static Site on Render.com**
   - Go to: https://dashboard.render.com/
   - Click "New +" → "Static Site"
   - Connect your GitHub repository: `gupi9163-lab/kjjjjbbkj`

3. **Configure Build Settings**
   - **Name**: akademik-hesablayici (or any name you prefer)
   - **Branch**: main
   - **Root Directory**: leave blank (files are in root)
   - **Build Command**: leave blank (no build needed)
   - **Publish Directory**: `.` (current directory - all files)

4. **Deploy**
   - Click "Create Static Site"
   - Render will automatically deploy your site
   - You'll get a URL like: `https://akademik-hesablayici.onrender.com`

## Alternative: Using render.yaml

If you prefer using a configuration file, create `render.yaml` in the repository root:

```yaml
services:
  - type: web
    name: akademik-hesablayici
    env: static
    buildCommand: ""
    staticPublishPath: .
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

## Important Notes

- **No Build Required**: This is a pure static site with HTML/CSS/JavaScript
- **PWA Features**: Service Worker will work automatically after deployment
- **Offline Support**: Users can install the app and use it offline
- **Custom Domain**: You can add a custom domain in Render settings

## Testing the Deployment

After deployment, test these features:
1. Open the site URL
2. Check if banner appears at top with WhatsApp button
3. Test "Buraxılış Bal Hesablama" calculator
4. Test "Blok Bal Hesablama" calculator
5. Test "Yaş Hesablayıcı"
6. Check all links work
7. Try installing as PWA (browser should show install prompt)
8. Test offline functionality after installation

## Troubleshooting

If PWA doesn't work:
- Make sure HTTPS is enabled (Render provides this automatically)
- Check browser console for Service Worker registration
- Clear cache and reload
- Try different browser

If styles don't load:
- Check if all files are in root directory
- Verify file paths in HTML are correct (all start with `/`)

## Support

WhatsApp: +994559406018
