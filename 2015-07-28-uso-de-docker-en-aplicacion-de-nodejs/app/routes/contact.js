var Agenda = require('./../models/agenda');
var Contact = require('./../models/contact');
var winston = require('winston');


//Da de alta un nuevo contacto en una agenda
exports.createContact= function(req,res,next){
  winston.info('Adding new contact into the agenda.');
  contactValidation(req);
  checkRequestValidationErrors(req,res,next);

  Agenda.findOne({_id:req.param('agenda_id')},function(err,agenda){
      if(err){
        res.status(404);
        res.send(err);
        next();
      }
      winston.info("Agenda was found then adding contact to agenda.");
      contact = new Contact(req.body);

      agenda.contacts.push(contact);
      agenda.save(function(err) {
        if (err) {
          res.send(err);
          next();
        }
        winston.info('Contact has been added to the agenda successfuly.');
        res.status(201);
        res.json({contact: contact});
        next();
      });
  });
}

//Devuelve la lista de contactos almacenados en una agenda
exports.getContactsInAgenda= function(req,res,next){
  winston.info('Return the list of contacts  for an agenda.');
  Agenda.findOne({_id:req.param('agenda_id')})
  .select('contacts')
  .exec(function(err,agenda) {
    if(err){
      winston.info('Unexpected error while invoking mongo database.');
      res.status(500);
      res.json({errors:err});
      next();
    }
    res.status(200);
    res.json(agenda.contacts);
    next();
  });
}

//Devuelve los detalles de un contacto
exports.getContactDetail= function(req,res,next){
  winston.info('Return the contact details');
  Agenda.findOne({'contacts._id': req.param('contact_id')}, {'contacts.$': 1},
    function (err, agenda) {
        if (err) {
          winston.info('Unexpected error while invoking mongo database.');
          res.status(500);
          res.json({errors:err});
          next();
        }
        res.status(200);
        res.json(agenda.contacts[0]);
        next();
    }
);
}

function checkRequestValidationErrors(req,res,next){
  var errors = req.validationErrors();
  if (errors) {
      winston.info('Something failed while creating the contact.');
      res.status(400);
      res.json({errors:errors});
      next();
  }
}

function contactValidation(req){
  winston.info('Validaing the contact request.');
  req.checkBody('firstName','required').notEmpty();
}
