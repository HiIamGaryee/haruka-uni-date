import { createApp } from './app.js'
import { env } from './config/env.js'
import { startSoulmateMatcherCron } from './cron/SoulmateMatcherCron.js'

const app = createApp()

app.listen(env.PORT, () => {
  console.log(`Haruka Match Engine running on http://localhost:${env.PORT}`)
  startSoulmateMatcherCron()
})
