const mongodb = require('../data/contacts');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('contacts').find();
        result.toArray().then((contacts) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts);
        });

};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: userId });
        result.toArray().then((contacts) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(contacts[0]);
            
        });
};
//week2 - part2
const createContact = async (req, res) => {
    try {
      const contact = req.body;
      if (!contact.firstName || !contact.lastName || !contact.email || !contact.favoriteColor || !contact.birthday) {
        return res.status(400).json({ error: 'All fields are required.' });
      }
  
      const result = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
      res.status(201).json({ id: result.insertedId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateContact = async (req, res) => {
    try {
      const userId = new ObjectId(req.params.id);
      const contact = req.body;
  
      const result = await mongodb.getDatabase().db().collection('contacts').replaceOne({ _id: userId }, contact);
      if (result.modifiedCount > 0) {
        res.status(204).send(); // no content
      } else {
        res.status(404).json({ error: 'Contact not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const deleteContact = async (req, res) => {
    try {
      const userId = new ObjectId(req.params.id);
      const result = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: userId });
  
      if (result.deletedCount > 0) {
        res.status(200).json({ message: 'Contact deleted' });
      } else {
        res.status(404).json({ error: 'Contact not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};