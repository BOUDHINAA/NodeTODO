var express = require('express');
var router = express.Router();
var Contact = require('../models/contact');

// GET all contacts
router.get('/', function(req, res, next) {
    Contact.find({})
        .then(contacts => {
            console.log("Fetched contacts:", contacts);
            res.render('form.twig', {
                title: "Contact list",
                cont: contacts
            });
        })
        .catch(err => {
            console.error("Error fetching contacts:", err);
            res.status(500).send("Error fetching contacts");
        });
});

// GET form to add new contact
router.get('/add', function(req, res, next) {
    res.render('add_contact.twig', { title: 'Add New Contact' });
});

// POST new contact
router.post('/', function(req, res, next) {
    const newContact = new Contact({
        FullName: req.body.FullName,
        Phone: req.body.Phone
    });

    newContact.save()
        .then(savedContact => {
            console.log("New contact added:", savedContact);
            // Redirect back to the contact list page
            res.redirect('/contacts');
        })
        .catch(error => {
            console.error('Error adding contact:', error);
            res.status(500).json({ error: 'Failed to add contact' });
        });
});

// GET contact by ID

router.get('/:id', function(req, res, next) {
    const contactId = req.params.id;

    
    Contact.findById(contactId)
        .then(contact => {
                res.render('contact_details.twig', { contact: contact });
            
        })
        .catch(error => {
            
            console.error('Error finding contact by ID:', error);
            res.render('error.twig', { message: 'Error finding contact by ID' });
        });
});

// DELETE contact by ID


router.get('/delete/:id', function(req, res, next) {
    const contactId = req.params.id;
    Contact.findByIdAndDelete(contactId)
        .then(deletedContact => {
            if (!deletedContact) {
                res.render('contacts', { message: 'Contact not found.' });
            } else {
                res.render('contacts', { message: 'Contact deleted successfully.' });
            }
        })
        .catch(error => {
            console.error('Error deleting contact:', error);
            
            res.render('contacts', { message: 'Failed to delete contact.' });
        });
});



// GET form to edit contact by ID
router.get('/update/:id', function(req, res, next) {
    const contactId = req.params.id;

    Contact.findById(contactId)
        .then(contact => {
            res.render('edit_contact.twig', { contact: contact });
        })
        .catch(error => {
            console.error('Error finding contact by ID for edit:', error);
            res.render('error.twig', { message: 'Error finding contact for edit by ID' });
        });
});

// POST update contact by ID
router.post('/edit/:id', function(req, res, next) {
    const contactId = req.params.id;

    Contact.findByIdAndUpdate(contactId, {
        FullName: req.body.FullName,
        Phone: req.body.Phone
    }, { new: true })
        .then(updatedContact => {
            console.log("Contact updated:", updatedContact);
            res.redirect('/contacts');
        })
        .catch(error => {
            console.error('Error updating contact:', error);
            res.status(500).json({ error: 'Failed to update contact' });
        });
});

module.exports = router;
