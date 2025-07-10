const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');
router.get('/', 
    /* #swagger.tags = ['Contacts']
       #swagger.description = 'Get all contacts' */
    contactsController.getAll);
  
  router.get('/:id', 
    /* #swagger.tags = ['Contacts']
       #swagger.description = 'Get a contact by ID' */
    contactsController.getSingle);
  
  router.post('/', 
    /* #swagger.tags = ['Contacts']
       #swagger.description = 'Create a new contact'
       #swagger.parameters['body'] = {
           in: 'body',
           required: true,
           schema: {
             $firstName: 'María',
             $lastName: 'Lopez',
             $email: 'marilo@example.com',
             $favoriteColor: 'purple',
             $birthday: '2003-03-01'
           }
         }
     */
    contactsController.createContact);
  
    router.put('/:id',
        /* #swagger.tags = ['Contacts']
           #swagger.description = 'Update a contact by ID'
           #swagger.parameters['body'] = {
             in: 'body',
             required: true,
             schema: {
               $firstName: 'Ana',
               $lastName: 'González',
               $email: 'ana.gonzalez@example.com',
               $favoriteColor: 'blue',
               $birthday: '1995-12-01'
             }
           }
        */
    contactsController.updateContact);
      
  router.delete('/:id',
    /* #swagger.tags = ['Contacts']
       #swagger.description = 'Delete a contact by ID' */
    contactsController.deleteContact);
  
module.exports = router;