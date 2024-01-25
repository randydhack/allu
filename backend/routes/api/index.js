
const router = require('express').Router();
const sessionRouter = require('./session.js')
const userRouter = require('./users.js')
const productRouter = require('./products.js')
const productImageRouter = require('./product-images.js')
const designRouter = require('./design.js')
const userDesignRouter = require('./userdesign.js')
const batchRouter = require('./batch.js')
const { restoreUser } = require('../../utils/auth.js');

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
  router.use(restoreUser);

  router.use('/session', sessionRouter);

  router.use('/users', userRouter);

  router.use('/products', productRouter);

  router.use('/productImages', productImageRouter)

  router.use('/designs', designRouter)

  router.use('/userDesigns', userDesignRouter)
  
  router.use('/batch', batchRouter)
module.exports = router;
