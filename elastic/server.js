/**
 * The starting point of the application.
 *
 * @author Maria Olsson
 * @version 1.0.0
 */

 import express from 'express'
 import hbs from 'express-hbs'
 import session from 'express-session'
 import logger from 'morgan'
 import { dirname, join } from 'path'
 import { fileURLToPath } from 'url'
 import { router } from './routes/router.js'
 import { connectDB } from './config/mongoose.js'
 import helmet from 'helmet'
 
 /**
  * The main function of the application.
  */
 const main = async () => {
   await connectDB()
 
   const app = express() // Light-weight web application Node.js framework to help organize
   // har moduler för att skapa en webbserver. Hantera webrequests, middleware
   const directoryFullName = dirname(fileURLToPath(import.meta.url)) // får directory
 
   // KOLLA över för produktionssättning
   const baseURL = process.env.BASE_URL || '/'
 
   // Set up a morgan logger using the dev format for log entries.
   app.use(logger('dev'))
 
   // View engine setup. Vilken engine som ska användas
   app.engine('hbs', hbs.express4({
     defaultLayout: join(directoryFullName, 'views', 'layouts', 'default'),
     partialsDir: join(directoryFullName, 'views', 'partials')
   }))
   app.set('view engine', 'hbs')
   app.set('views', join(directoryFullName, 'views'))
 
   // Parse requests of the content type application/x-www-form-urlencoded.
   // Populates the request object with a body object (req.body).
   app.use(express.urlencoded({ extended: false }))
 
   // Serve static files.
   app.use(express.static(join(directoryFullName, '..', 'public')))
 
   // Use helmet to detect Cross Site Scripting (XSS) and data injection attacks
   app.use(helmet())
   app.use(
     // configurate helmet to accecpt javascript from some externa sources and from myself
     // https://helmetjs.github.io/
     helmet.contentSecurityPolicy({
       directives: {
         ...helmet.contentSecurityPolicy.getDefaultDirectives(),
         'default-src': ["'self'"],
         'script-src': ["'self'", 'cdn.jsdelivr.net', 'code.jquery.com']
       }
     })
   )
 

 
   app.use(session(sessionOptions))
 
   // Middleware to be executed before the routes.
   app.use((req, res, next) => {
     req.user = req.session.user
     // Flash messages - survives only a round trip.
   
     // Pass the base URL to the views.
     res.locals.baseURL = baseURL
     res.locals.session = req.session
 
     next()
   })
 
   // Register routes.
   app.use('/', router) // roten för applikationen
 
   // Error handler. När gått igenom alla middleware och inte hittats
   app.use(function (err, req, res, next) {
     // 404 Not Found.
     if (err.status === 404) {
       return res
         .status(404)
         .sendFile(join(directoryFullName, 'views', 'errors', '404.html'))
     }
     if (err.status === 403) {
       return res
         .status(403)
         .sendFile(join(directoryFullName, 'views', 'errors', '403.html'))
     }
 
     // 500 Internal Server Error (in production, all other errors send this response).
     if (req.app.get('env') !== 'development') {
       return res
         .status(500)
         .sendFile(join(directoryFullName, 'views', 'errors', '500.html'))
     }
 
     // Development only!
     // Only providing detailed error in development.
 
     // Render the error page.
     res
       .status(err.status || 500)
       .render('errors/error', { error: err })
   })
 
   // Starts the HTTP server listening for connections.
   app.listen(process.env.PORT, () => {
     console.log(`Server running at http://localhost:${process.env.PORT}`)
     console.log('Press Ctrl-C to terminate...')
   })
 }
 
 main().catch(console.error)
 