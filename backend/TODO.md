# Fix Node.js ESM Import Error

## Steps:
- [ ] 1. Edit backend/instrument.mjs: Change import from \".config/env.js\" to \"./config/env.js\"
- [ ] 2. Test: cd backend && npm run dev (expect server start without crash)
- [ ] 3. Verify no other import errors
- [ ] 4. Complete task
