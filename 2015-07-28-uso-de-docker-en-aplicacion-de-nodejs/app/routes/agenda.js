var Agenda = require('./../models/agenda');
var winston = require('winston');

//Crear una nueva agenda
exports.createAgenda = function(req,res,next){
  winston.info('Creating a new agenda');
  agendaValidation(req);
  var errors = req.validationErrors();
  if (errors) {
      console.log(errors);
      winston.info('Something failed while creating the agenda.');
      res.status(400);
      res.json({errors:errors});
      next();
  }else{
    agenda = new Agenda(req.body);
    agenda.save(function(err) {
      if (err) {
        res.send(err);
        next();
      }
      winston.info('Agendas has been created successfuly.');
      res.status(201);
      res.json({agenda: agenda});
    });
  }
}

//Elimina una agenda de nuestro sistem, así como los contactos incluidos dentro de ella.
exports.deleteAgenda = function(req,res,next){
  winston.info('Deleting existing agenda and its contacts.');
  Agenda.remove({_id: req.param('agenda_id')}, function(err) {
    if (err) {
        res.status(500);
        res.json({errors:err});
        next();
    }
    winston.info('The agenda with id '+req.param('agenda_id')+' has been removed successfuly.');
    res.status(204);
    next();
  });
}

//Devuelve la lista de agendas almacenadas en nuestro sistema.
exports.getListOfAgendas= function(req,res,next){
  winston.info('Return the list of agendas.');
  Agenda.find({})
  .select('title description')
  .exec(function(err,agendas) {
    if(err){
      winston.info('Unexpected error while invoking mongo database.');
      res.status(500);
      res.json({errors:err});
      next();
    }
    res.status(200);
    res.json(agendas);
    next();
  });
}



function agendaValidation(req){
    winston.info('Validaing the agenda request.');
    req.checkBody('title','required').notEmpty();
}
