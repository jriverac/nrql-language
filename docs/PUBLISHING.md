# Publishing to VSCode Marketplace

This guide walks you through publishing the NRQL Formatter extension to the Visual Studio Code Marketplace.

## Prerequisites

- A Microsoft account
- Git repository (recommended, for source control badge)

## Step 1: Create a Publisher Account

1. Go to [Visual Studio Marketplace Publisher Management](https://marketplace.visualstudio.com/manage)
2. Sign in with your Microsoft account
3. Click **"Create publisher"**
4. Fill in the form:
   - **ID**: Unique identifier (lowercase, no spaces) - this will be your publisher name
   - **Name**: Your display name
   - **Email**: Contact email
5. Click **"Create"**

## Step 2: Generate a Personal Access Token (PAT)

### Direct Link Method (Easiest)

1. Go directly to: **https://dev.azure.com/_usersSettings/tokens**
2. Sign in with the same Microsoft account you used for the publisher
3. If prompted to create an organization:
   - Click **"Continue"** or **"Create new organization"**
   - You can use the default name or choose your own
   - Region doesn't matter for publishing extensions
4. You'll be redirected to the Personal Access Tokens page

### Or Navigate Manually

1. Go to [Azure DevOps](https://dev.azure.com)
2. Sign in with the same Microsoft account
3. You may need to create an organization if you don't have one:
   - Click **"Create new organization"**
   - Accept the defaults and continue
4. Click your profile icon (top right corner - it's a circle with your initial/photo)
5. Select **"Personal access tokens"** from the dropdown
   - Or click the user settings gear icon → **"Personal access tokens"**

### Create the Token

1. Click **"+ New Token"** button
2. Configure the token:
   - **Name**: `VSCode Publishing` (or any name you prefer)
   - **Organization**: Select **"All accessible organizations"**
   - **Expiration**: Choose your preferred duration (recommended: 90 days or custom)
   - **Scopes**: Select **"Custom defined"**
     - Scroll down to **"Marketplace"** section
     - Check **"Manage"** checkbox (this includes Acquire and Publish)
3. Click **"Create"**
4. **IMPORTANT**: Copy the token immediately - you won't be able to see it again!
5. Store it securely (password manager recommended)

### Troubleshooting

- If you can't find the PAT page, make sure you're signed in to Azure DevOps
- You may need to create at least one organization before you can create PATs
- The PAT page URL should look like: `https://dev.azure.com/YOUR_ORG/_usersSettings/tokens`

## Step 3: Update package.json

Edit `package.json` and replace these placeholders:

```json
{
  "publisher": "YOUR_PUBLISHER_NAME",  // Replace with the ID from Step 1
  "repository": {
    "url": "https://github.com/YOUR_USERNAME/nrql-formatter"  // Your actual repo
  },
  "bugs": {
    "url": "https://github.com/YOUR_USERNAME/nrql-formatter/issues"
  },
  "homepage": "https://github.com/YOUR_USERNAME/nrql-formatter#readme"
}
```

## Step 4: Login to the Marketplace

Run the login command and enter your PAT when prompted:

```bash
make login
```

Or manually:
```bash
npx vsce login YOUR_PUBLISHER_NAME
```

When prompted, paste your Personal Access Token.

## Step 5: Publish the Extension

### First-time Publish

```bash
make publish
```

This will:
1. Run tests
2. Run TypeScript checks
3. Build the extension
4. Publish to the marketplace

### Manual Publish

```bash
npx vsce publish
```

## Step 6: Verify Publication

1. Go to your [publisher dashboard](https://marketplace.visualstudio.com/manage)
2. You should see your extension listed
3. Click on it to view details
4. The extension will be available at: `https://marketplace.visualstudio.com/items?itemName=YOUR_PUBLISHER_NAME.nrql-formatter`

## Publishing Updates

### Patch Version (0.1.0 → 0.1.1)
```bash
npx vsce publish patch
```

### Minor Version (0.1.0 → 0.2.0)
```bash
npx vsce publish minor
```

### Major Version (0.1.0 → 1.0.0)
```bash
npx vsce publish major
```

### Specific Version
```bash
npx vsce publish 1.2.3
```

## Recommended: Add an Icon

1. Create a 128x128 PNG icon
2. Save it as `icon.png` in the project root
3. Add to `package.json`:
   ```json
   {
     "icon": "icon.png"
   }
   ```

## Recommended: Initialize Git Repository

If you haven't already:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/nrql-formatter.git
git push -u origin main
```

## Troubleshooting

### Error: "Missing publisher name"
- Make sure you've updated `"publisher"` in `package.json`

### Error: "Authentication failed"
- Re-run `make login` or `npx vsce login YOUR_PUBLISHER_NAME`
- Make sure your PAT has the "Marketplace (Manage)" scope

### Error: "Extension already exists"
- You can only publish updates to your own extensions
- Change the extension name or publisher

### PAT Expired
- Generate a new PAT following Step 2
- Run `make login` again with the new token

## Resources

- [VSCode Publishing Extensions Guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [vsce (Visual Studio Code Extensions) CLI](https://github.com/microsoft/vscode-vsce)
- [Extension Marketplace](https://marketplace.visualstudio.com/)
