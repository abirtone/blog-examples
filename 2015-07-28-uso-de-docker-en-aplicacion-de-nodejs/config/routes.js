/**
 * Created by Ivan on 4/5/15.
 */
var agendaRoute = require('../app/routes/agenda');
var contactRoute = require('../app/routes/contact');


module.exports = function (app) {

  //Crear una nueva agenda
  app.post('/agendas',agendaRoute.createAgenda);

  //Elimina una agenda de nuestro sistem, así como los contactos incluidos dentro de ella.
  app.delete('/agendas/:agenda_id',agendaRoute.deleteAgenda);

  //Devuelve la lista de agendas almacenadas en nuestro sistema.
  app.get('/agendas',agendaRoute.getListOfAgendas);

  //Da de alta un nuevo contacto en una agenda
  app.post('/agendas/:agenda_id/contacts',contactRoute.createContact);

  //Devuelve la lista de contactos almacenados en una agenda
  app.get('/agendas/:agenda_id/contacts',contactRoute.getContactsInAgenda);

  //Devuelve los detalles de un contacto
  app.get('/agendas/:agenda_id/contacts/:contact_id',contactRoute.getContactDetail);



}
